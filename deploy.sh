#!/bin/bash
scp -i Users/aadityadesai/keys/crom.pem ./src/weatherAlert.ts ec2-18-191-151-109.us-east-2.compute.amazonaws.com
ssh -i Users/aadityadesai/keys/crom.pem ec2-user@ec2-18-191-151-109.us-east-2.compute.amazonaws.com "crontab -e"