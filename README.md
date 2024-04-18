# DevOps Engineering Test - SwissPine Tech
Folder structure
- app - NodeJS app 
- deployment - Kubernetes Manifest file for NodeJS App deployment
- s3 - Terraform template for AWS S3 bucket
- azure-pipelines.yml - Running test and build image to ACR

## Overview
DevOps test case scenario demonstrating DevOps techniques and approach using OpenSource and Cloud Services (Azure/AWS)

Tools used:
- AKS - Kubernetes Cluster
- ACR - Container Registry
- Azure DevOps - CI/CD Pipeline
- AWS S3 - Storage
- NodeJS - Application

## How to test
Base url: http://20.44.242.66:80

endpoints:
1. GET /api/health
2. GET /api/mirror?word=foobar
3. POST /api/upload-random