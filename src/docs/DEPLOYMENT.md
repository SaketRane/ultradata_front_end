
# Deployment Configuration Guide

## Environment Variables

### Required Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Authentication Configuration  
VITE_USE_MOCK_AUTH=false

# Application Configuration
VITE_APP_NAME=UltraData Financial Dashboard
VITE_APP_VERSION=1.0.0
```

### Development Environment Variables

```bash
# For local development with mock data
VITE_USE_MOCK_AUTH=true
VITE_API_BASE_URL=http://localhost:8080/api
```

### Production Environment Variables

```bash
# For production deployment
VITE_USE_MOCK_AUTH=false
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## Build Configuration

### Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Build Optimization

The build is already optimized with:
- Code splitting for lazy-loaded components
- Tree shaking for unused code elimination
- Minification and compression
- Asset optimization

## Deployment Options

### Static Hosting (Recommended)

Deploy the `dist` folder to any static hosting service:
- Vercel
- Netlify  
- AWS S3 + CloudFront
- GitHub Pages

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Sample `nginx.conf` for SPA routing:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /api/ {
            proxy_pass http://your-backend-url/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy Frontend

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
        VITE_USE_MOCK_AUTH: false
    
    - name: Deploy
      # Add your deployment step here
```

## Performance Considerations

- Enable gzip compression on your web server
- Set appropriate cache headers for static assets
- Use a CDN for global distribution
- Monitor bundle size and lazy load heavy components
- Implement proper error boundaries for production
