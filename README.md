
# UltraData Financial Dashboard

A comprehensive dashboard for visualizing and interacting with financial data in the insurance industry.

## Project Structure

This project is built with:

- **React**: UI components and state management
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS**: Utility-first styling approach
- **Shadcn UI**: Reusable UI components
- **Vite**: Fast development and build tool
- **React Router**: Navigation and routing
- **Tanstack Query**: Data fetching and state management
- **Recharts**: Data visualization components

## Key Folders and Files

- `/src/components`: React components organized by feature
  - `/src/components/ui`: Reusable UI components from shadcn
  - `/src/components/visualizations`: Data visualization components
  - `/src/components/Auth`: Authentication-related components
  - `/src/components/tables`: Financial table components
  - `/src/components/filters`: Filter selection components
- `/src/contexts`: React context providers for global state
- `/src/pages`: Top-level page components
- `/src/utils`: Utility functions and helpers
- `/src/hooks`: Custom React hooks
- `/src/types`: TypeScript type definitions
- `/src/constants`: Constant values and configurations
- `/src/integrations`: External service integrations (Supabase)

## Architecture Overview

### Component Architecture

The application follows a component-based architecture, with a focus on:
- **Separation of concerns**: Each component has a single responsibility
- **Reusability**: Common components are abstracted into reusable modules
- **Type safety**: TypeScript interfaces define component props and data structures
- **Performance optimization**: Memoization is used for heavy components

### Data Flow

1. User selects filters in the `DataFilterSelector` component
2. Selection state is managed in the `Dashboard` component
3. Data is fetched through Tanstack Query hooks
4. Visualizations are rendered based on selected filters

### Financial Tables

Financial tables use a common pattern:
- Consistent use of the `FinancialTable` component
- Type-safe row and column definitions
- Code-based data referencing for integration with backend systems

## Development Guidelines

### Creating New Components

1. Place component in appropriate subfolder
2. Follow naming conventions (PascalCase for components)
3. Use TypeScript interfaces for props
4. Implement memoization for performance when appropriate
5. Keep components focused and small

### Adding New Financial Tables

1. Create a new table component in `/src/components/tables`
2. Use the existing `FinancialTable` component
3. Define row and column structures following the established patterns
4. Register in the appropriate mapper if needed

### Performance Optimization

- Use `React.memo()` for components that don't need frequent re-renders
- Leverage `useCallback` and `useMemo` for performance-critical code
- Implement code-splitting with lazy loading for larger components

## API Integration

The application uses Tanstack Query for data fetching. Data requests follow a consistent pattern:
- Query keys based on selected filters
- Type-safe response handling
- Proper error and loading state management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ultradata_front_end
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:
```
VITE_API_BASE_URL=http://your-backend-url.com/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://194.163.164.118:8080/api` |
| `VITE_APP_NAME` | Application name | `UltraData Financial Dashboard` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

**Important:** Never commit `.env` files to version control. Use `.env.example` as a template.

## Building for Production

### Build the application:
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview production build:
```bash
npm run preview
```

### Build for development mode:
```bash
npm run build:dev
```

## Deployment

### Static Hosting (Recommended)

Deploy the `dist` folder to any static hosting service:
- **Vercel**: Connect your Git repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or use Git integration
- **AWS S3 + CloudFront**: Upload `dist` contents to S3 bucket
- **GitHub Pages**: Use GitHub Actions for automated deployment

### Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t ultradata-frontend .
docker run -p 80:80 ultradata-frontend
```

### Environment-Specific Builds

For different environments, create environment-specific `.env` files:

- `.env.development` - Development environment
- `.env.staging` - Staging environment
- `.env.production` - Production environment

Set the appropriate variables before building:
```bash
# For production
VITE_API_BASE_URL=https://api.production.com/api npm run build
```

## Project Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build with development settings
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Production Checklist

Before deploying to production:

- [ ] Update `VITE_API_BASE_URL` to production backend URL
- [ ] Verify all environment variables are set correctly
- [ ] Run `npm run build` successfully
- [ ] Test the production build with `npm run preview`
- [ ] Ensure `.env` files are not committed to Git
- [ ] Configure CORS on your backend for the frontend domain
- [ ] Set up SSL/HTTPS certificates
- [ ] Configure CDN for static assets (optional)
- [ ] Set up monitoring and error tracking
- [ ] Review and update security headers

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Store sensitive keys on the server side
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure proper CORS policies on backend
5. **Dependencies**: Regularly update dependencies for security patches

## Troubleshooting

### Backend Connection Issues

If you see "Failed to connect" errors:
1. Check `VITE_API_BASE_URL` in `.env`
2. Verify backend server is running
3. Check CORS configuration on backend
4. Ensure network/firewall allows connections

### Build Failures

If build fails:
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear build cache: `rm -rf dist .vite`
3. Check Node.js version: `node --version` (should be v18+)

### Development Server Issues

If dev server won't start:
1. Check if port 5173 is already in use
2. Kill existing processes: `pkill -f vite`
3. Restart the server: `npm run dev`
