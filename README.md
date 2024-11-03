# Do It Yourself - Kanban Board

A simple and elegant Kanban board application built with modern web technologies.

## Deployment Guide

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git (optional)

### Option 1: Deploy to Your Own Server

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   # or download and extract the ZIP file
   ```

2. **Install dependencies**
   ```bash
   cd kanban-board
   npm install
   # or
   yarn install
   ```

3. **Build the application**
   ```bash
   npm run build
   # or
   yarn build
   ```

4. **Deploy the built files**
   - The built files will be in the `dist` directory
   - Upload the contents of the `dist` directory to your web server
   - Configure your web server to serve the application:

   Example Nginx configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/dist;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

### Option 2: Deploy to Netlify

1. Fork or clone this repository to your GitHub account

2. Sign up for a Netlify account at https://www.netlify.com

3. In Netlify:
   - Click "New site from Git"
   - Choose your repository
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `dist`
   - Click "Deploy site"

### Option 3: Deploy to Vercel

1. Fork or clone this repository to your GitHub account

2. Sign up for a Vercel account at https://vercel.com

3. In Vercel:
   - Click "Import Project"
   - Choose your repository
   - The build settings will be automatically detected
   - Click "Deploy"

## Environment Variables

This application doesn't require any environment variables for basic functionality.

## Troubleshooting

- If you encounter a blank page, ensure your server is configured to redirect all routes to index.html
- For 404 errors, check if your server's root directory is set correctly
- For build errors, make sure you're using a compatible Node.js version

## Support

If you encounter any issues during deployment, please:
1. Check the console for error messages
2. Verify all prerequisites are met
3. Ensure all build steps were completed successfully
