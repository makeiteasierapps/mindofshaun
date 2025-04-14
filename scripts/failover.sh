#!/bin/bash

set -e

# Configuration
AWS_INSTANCE_ID="i-xxxxxxxxxxxxx"  # Replace with your AWS instance ID
AWS_REGION="us-east-1"  # Replace with your AWS region
ECR_REPOSITORY="mindofshaun"  # Replace with your ECR repository name
APP_NAME="mindofshaun"
CLOUDFLARE_ZONE_ID="your_zone_id"  # Replace with your Cloudflare Zone ID
DOMAIN="mindofshaun.com"

# Load environment variables if available
if [ -f /etc/failover.conf ]; then
    source /etc/failover.conf
fi

# Log function
log() {
    echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] $1"
}

# Notify function (change this to use your preferred notification method)
notify() {
    local message="$1"
    log "ALERT: $message"
    
    # Uncomment and configure the following line to enable Slack notifications
    # curl -s -X POST -H 'Content-type: application/json' --data "{\"text\":\"$message\"}" $SLACK_WEBHOOK_URL
}

# Check if Cloudflare tunnel is running
check_tunnel() {
    local tunnel_name="$1"
    if pgrep -f "cloudflared tunnel run $tunnel_name" > /dev/null; then
        return 0  # Running
    else
        return 1  # Not running
    fi
}

# Start AWS failover instance
start_aws_instance() {
    log "Starting AWS failover instance $AWS_INSTANCE_ID"
    aws ec2 start-instances --instance-ids $AWS_INSTANCE_ID
    
    # Wait for instance to be running
    aws ec2 wait instance-running --instance-ids $AWS_INSTANCE_ID
    
    # Get public IP
    PUBLIC_IP=$(aws ec2 describe-instances --instance-ids $AWS_INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)
    log "AWS instance is running with IP: $PUBLIC_IP"
    return 0
}

# Update DNS to point to failover server
update_dns() {
    local ip="$1"
    log "Updating DNS record for $DOMAIN to point to $ip"
    
    # Update Cloudflare DNS using API
    RESULT=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records/$DNS_RECORD_ID" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        --data "{\"type\":\"A\",\"name\":\"$DOMAIN\",\"content\":\"$ip\",\"ttl\":60,\"proxied\":true}")
    
    if echo "$RESULT" | grep -q "\"success\":true"; then
        log "DNS updated successfully"
        return 0
    else
        log "DNS update failed: $RESULT"
        return 1
    fi
}

# Deploy containers on failover server
deploy_containers() {
    local server_ip="$1"
    log "Deploying containers to failover server at $server_ip"
    
    # SSH to server and pull latest images
    ssh -o StrictHostKeyChecking=no -i $SSH_KEY_PATH ubuntu@$server_ip << EOF
        set -e
        # Login to ECR
        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
        
        # Pull latest image
        docker pull $ECR_REGISTRY/$ECR_REPOSITORY:latest
        
        # Stop existing container if running
        docker stop $APP_NAME || true
        docker rm $APP_NAME || true
        
        # Start new container
        docker run -d --name $APP_NAME \
            -p 6066:6066 \
            -e NODE_ENV=production \
            --restart=unless-stopped \
            $ECR_REGISTRY/$ECR_REPOSITORY:latest
EOF
    
    if [ $? -eq 0 ]; then
        log "Containers deployed successfully on failover server"
        return 0
    else
        log "Container deployment failed"
        return 1
    fi
}

# Main failover process
main() {
    log "Starting failover process"
    
    # Check if primary tunnel is down
    if ! check_tunnel "primary-tunnel"; then
        notify "Primary Cloudflare tunnel is down, initiating failover"
        
        # Start AWS instance for failover
        if start_aws_instance; then
            # Deploy containers
            if deploy_containers "$PUBLIC_IP"; then
                # Update DNS
                if update_dns "$PUBLIC_IP"; then
                    notify "Failover complete. Application is now running on AWS ($PUBLIC_IP)"
                else
                    notify "Failover partially complete but DNS update failed"
                fi
            else
                notify "Failover failed: Could not deploy containers"
            fi
        else
            notify "Failover failed: Could not start AWS instance"
        fi
    else
        log "Primary tunnel is running, no action needed"
    fi
}

# Run main function
main 