#!/bin/bash

set -e

# Configuration
TUNNEL_NAME="primary-tunnel"
CHECK_INTERVAL=60  # seconds
RECOVERY_CHECK_INTERVAL=300  # seconds
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load environment variables if available
if [ -f /etc/failover.conf ]; then
    source /etc/failover.conf
fi

# Log function
log() {
    echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] $1"
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

# Check if we're in failover mode
is_failover_active() {
    if [ -f "/var/run/failover_active" ]; then
        return 0  # Active
    else
        return 1  # Not active
    fi
}

# Set failover status
set_failover_status() {
    local status="$1"
    if [ "$status" = "active" ]; then
        touch /var/run/failover_active
    else
        rm -f /var/run/failover_active
    fi
}

# Main monitoring process
main() {
    log "Starting Cloudflare tunnel monitoring"
    
    while true; do
        if ! is_failover_active; then
            # Normal mode - check if tunnel is down
            if ! check_tunnel "$TUNNEL_NAME"; then
                log "Tunnel $TUNNEL_NAME appears to be down, checking again in 10 seconds..."
                sleep 10
                
                # Double-check to avoid false positives
                if ! check_tunnel "$TUNNEL_NAME"; then
                    log "Tunnel $TUNNEL_NAME is confirmed down, initiating failover..."
                    
                    # Run failover script
                    $SCRIPT_DIR/failover.sh
                    
                    # Mark failover as active
                    set_failover_status "active"
                    
                    # Wait longer between checks during failover
                    sleep $RECOVERY_CHECK_INTERVAL
                    continue
                fi
            fi
            
            # Tunnel is running, wait for next check
            sleep $CHECK_INTERVAL
            
        else
            # Failover mode - check if tunnel is back up for recovery
            if check_tunnel "$TUNNEL_NAME"; then
                log "Tunnel $TUNNEL_NAME appears to be back up, checking again in 30 seconds..."
                sleep 30
                
                # Double-check to avoid false positives
                if check_tunnel "$TUNNEL_NAME"; then
                    log "Tunnel $TUNNEL_NAME is confirmed back up, initiating recovery..."
                    
                    # Run recovery script
                    $SCRIPT_DIR/recovery.sh
                    
                    # Mark failover as inactive
                    set_failover_status "inactive"
                fi
            fi
            
            # Wait between recovery checks
            sleep $RECOVERY_CHECK_INTERVAL
        fi
    done
}

# Run main function
main 