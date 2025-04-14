#!/bin/bash

set -e

# Configuration
AWS_REGION=${1:-"us-east-1"}
REPOSITORY_NAME=${2:-"mindofshaun"}

# Log function
log() {
    echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] $1"
}

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if user is logged in to AWS
if ! aws sts get-caller-identity &> /dev/null; then
    echo "You are not logged in to AWS. Please run 'aws configure' first."
    exit 1
fi

# Create ECR Repository if it doesn't exist
log "Checking if ECR repository $REPOSITORY_NAME exists..."
if aws ecr describe-repositories --repository-names $REPOSITORY_NAME --region $AWS_REGION &> /dev/null; then
    log "ECR repository $REPOSITORY_NAME already exists."
else
    log "Creating ECR repository $REPOSITORY_NAME..."
    aws ecr create-repository --repository-name $REPOSITORY_NAME --region $AWS_REGION
    log "ECR repository created successfully."
fi

# Get AWS Account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

# Log in to ECR
log "Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

# Create a .env file with ECR information
log "Creating .env file with ECR configuration..."
cat > .ecr.env << EOF
ECR_REGISTRY=${ECR_REGISTRY}
ECR_REPOSITORY=${REPOSITORY_NAME}
AWS_REGION=${AWS_REGION}
EOF

log "Setup complete! Your ECR registry URL is: ${ECR_REGISTRY}/${REPOSITORY_NAME}"
log "Added ECR configuration to .ecr.env file. Use it with docker-compose:"
log "docker-compose --env-file .ecr.env up -d"
log ""
log "To add to GitHub secrets, add the following:"
log "AWS_ACCESS_KEY_ID: Your AWS access key"
log "AWS_SECRET_ACCESS_KEY: Your AWS secret key"
log "AWS_REGION: ${AWS_REGION}"
log "ECR_REPOSITORY: ${REPOSITORY_NAME}" 