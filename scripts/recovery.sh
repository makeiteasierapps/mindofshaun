#!/bin/bash

set -e

# Configuration
AWS_INSTANCE_ID="i-xxxxxxxxxxxxx"  # Replace with your AWS instance ID
AWS_REGION="us-east-1"  # Replace with your AWS region
CLOUDFLARE_ZONE_ID="your_zone_id"  # Replace with your Cloudflare Zone ID
DOMAIN="mindofshaun.com"
PRIMARY_SERVER_IP="your_primary_server_ip"  # Replace with your home server IP

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

# Update DNS to point back to primary server (via Cloudflare Tunnel)
restore_dns() {
    log "Restoring DNS record for $DOMAIN to use Cloudflare Tunnel"
    
    # Update Cloudflare DNS using API to point back to the tunnel
    RESULT=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records/$DNS_RECORD_ID" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        --data "{\"type\":\"CNAME\",\"name\":\"$DOMAIN\",\"content\":\"$TUNNEL_HOSTNAME\",\"ttl\":60,\"proxied\":true}")
    
    if echo "$RESULT" | grep -q "\"success\":true"; then
        log "DNS restored successfully"
        return 0
    else
        log "DNS restoration failed: $RESULT"
        return 1
    fi
}

# Stop AWS failover instance
stop_aws_instance() {
    log "Stopping AWS failover instance $AWS_INSTANCE_ID"
    aws ec2 stop-instances --instance-ids $AWS_INSTANCE_ID --region $AWS_REGION
    
    # Wait for instance to stop
    aws ec2 wait instance-stopped --instance-ids $AWS_INSTANCE_ID --region $AWS_REGION
    log "AWS instance stopped successfully"
    return 0
}

# Main recovery process
main() {
    log "Starting recovery process"
    
    # Check if primary tunnel is back up
    if check_tunnel "primary-tunnel"; then
        notify "Primary Cloudflare tunnel is back online, initiating recovery"
        
        # Wait to ensure tunnel is stable
        log "Waiting 60 seconds to ensure tunnel stability..."
        sleep 60
        
        # Check again to make sure tunnel is still up
        if check_tunnel "primary-tunnel"; then
            # Restore DNS to use tunnel
            if restore_dns; then
                # Stop AWS instance to save costs
                if stop_aws_instance; then
                    notify "Recovery complete. Application is now running on primary server"
                else
                    notify "Recovery partially complete but could not stop AWS instance"
                fi
            else
                notify "Recovery failed: Could not restore DNS"
            fi
        else
            notify "Recovery aborted: Tunnel went offline during stabilization period"
        fi
    else
        log "Primary tunnel is still down, no recovery action needed"
    fi
}

# Run main function
main 