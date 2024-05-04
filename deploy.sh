#!/bin/bash

# Navigate to the project directory
cd /var/www/vtt-cabs-nextapp

# Pull latest changes from your repository
git pull origin main

# Restart PM2 process
pm2 stop vtt-client

# Install dependencies
npm install

# Build the Next.js app
npm run build

# Restart PM2 process
pm2 start vtt-client
