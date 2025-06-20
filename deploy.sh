#!/bin/bash

cd /var/www/vtt-cabs-nextapp && echo npm -v

# Stop PM2 process
cd /var/www/vtt-cabs-nextapp && pm2 stop vtt-client

# Install dependencies
cd /var/www/vtt-cabs-nextapp && npm install

# Build the Next.js app
cd /var/www/vtt-cabs-nextapp && npm run build

# Restart PM2 process
cd /var/www/vtt-cabs-nextapp && pm2 start vtt-client
