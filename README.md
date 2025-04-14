# MindOfShaun - Containerized Microservice

This project is containerized with Docker and supports automatic failover to a cloud VPS when the Cloudflare Tunnel goes offline.

## Architecture

- **Primary Hosting**: Home server with Cloudflare Tunnel
- **Failover Hosting**: AWS t3.micro VPS
- **Container Registry**: AWS ECR (Elastic Container Registry)
- **Container Runtime**: Docker + Docker Compose
- **CI/CD**: GitHub Actions for automated builds and deployments
- **Failover System**: Automatic detection and recovery

## Development

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- Python 3.11+ (for local development)
- AWS CLI (configured with appropriate permissions)

### Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# In a separate terminal, run the Python backend
python run.py --dev
```

### Building Docker Image

```bash
docker build -t mindofshaun:latest .
```

### Running with Docker Compose

```bash
docker-compose up -d
```

## Deployment

The application is automatically built and deployed through GitHub Actions when changes are pushed to the main branch.

### Manual Deployment

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <your-aws-account-id>.dkr.ecr.us-east-1.amazonaws.com

# Pull the latest image
docker pull <your-aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/mindofshaun:latest

# Start the container
docker-compose up -d
```

## Failover System

### Components

- `scripts/monitor.sh`: Monitors the Cloudflare tunnel status
- `scripts/failover.sh`: Triggers failover to AWS when tunnel is down
- `scripts/recovery.sh`: Recovers back to primary server when tunnel is restored

### Installation

1. Copy the scripts to `/opt/mindofshaun/scripts/` on both primary and failover servers
2. Make the scripts executable: `chmod +x /opt/mindofshaun/scripts/*.sh`
3. Install the systemd service:
   ```bash
   cp scripts/cloudflare-monitor.service /etc/systemd/system/
   systemctl daemon-reload
   systemctl enable cloudflare-monitor
   systemctl start cloudflare-monitor
   ```

### Configuration

Create a configuration file at `/etc/failover.conf` with the following variables:

```bash
# AWS Configuration
AWS_INSTANCE_ID="i-xxxxxxxxxxxxx"
AWS_REGION="us-east-1"
ECR_REGISTRY="<your-aws-account-id>.dkr.ecr.us-east-1.amazonaws.com"
ECR_REPOSITORY="mindofshaun"

# Cloudflare Configuration
CLOUDFLARE_ZONE_ID="your_zone_id"
CLOUDFLARE_API_TOKEN="your_api_token"
DNS_RECORD_ID="your_dns_record_id"
TUNNEL_HOSTNAME="your_tunnel_hostname"

# SSH Configuration
SSH_KEY_PATH="/path/to/ssh/key"
```

## AWS ECR Setup

To set up the AWS ECR repository:

1. Create an ECR repository:
   ```bash
   aws ecr create-repository --repository-name mindofshaun --region us-east-1
   ```

2. Set up an IAM user or role with appropriate permissions:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "ecr:GetDownloadUrlForLayer",
           "ecr:BatchGetImage",
           "ecr:BatchCheckLayerAvailability",
           "ecr:PutImage",
           "ecr:InitiateLayerUpload",
           "ecr:UploadLayerPart",
           "ecr:CompleteLayerUpload"
         ],
         "Resource": "arn:aws:ecr:us-east-1:*:repository/mindofshaun"
       },
       {
         "Effect": "Allow",
         "Action": "ecr:GetAuthorizationToken",
         "Resource": "*"
       }
     ]
   }
   ```

3. Add these credentials to your GitHub repository secrets:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION
   - ECR_REPOSITORY

## Health Monitoring

The application exposes a health check endpoint at `/health` that returns the service status.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
