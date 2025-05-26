
# Development Team Handover Guide

## Project Overview

UltraData Financial Dashboard is a React-based web application for visualizing and interacting with financial data in the insurance industry. The project is ready for integration with a Spring Boot backend.

## Architecture Summary

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components
- **Routing**: React Router v6
- **State Management**: React Context + Tanstack Query
- **Build Tool**: Vite

### Backend Integration Points
- Authentication service ready for Spring Security integration
- API client configured for RESTful endpoints
- Mock data system for development (can be disabled)

## Key Development Patterns

### Component Organization
```
src/components/
├── tables/                 # Financial table components
│   ├── financial-statements/
│   ├── insurance-results/
│   ├── provincial-stats/
│   ├── reinsurance/
│   └── commissions/
├── visualizations/         # Chart and graph components
├── filters/               # Data filter components
├── ui/                    # Reusable UI components (Shadcn)
└── Auth/                  # Authentication components
```

### Data Flow Pattern
1. User selects filters (year, insurer, section, sheet)
2. Filter state managed in Dashboard component
3. Data fetched via Tanstack Query hooks
4. Components render based on selected filters and fetched data

### Table Component Pattern
All financial tables follow a consistent pattern:
- Use `FinancialTable` base component or custom table structure
- Data codes in format: `[SheetCode][RowCode][ColumnCode]`
- Hover states show data codes for debugging
- Responsive design with horizontal scrolling

## Critical Integration Points

### 1. Authentication Flow
- Located in: `src/services/auth-service.ts`
- Mock mode controlled by: `VITE_USE_MOCK_AUTH` environment variable
- Spring Security endpoints expected (see `src/docs/API_INTEGRATION.md`)

### 2. Data Fetching
- API client: `src/integrations/database/client.ts`
- Base URL configured via: `VITE_API_BASE_URL`
- All requests include retry logic and error handling

### 3. Financial Data Structure
- Sheet codes map to specific financial reports
- Row/column codes create unique data identifiers
- Data mapping defined in: `src/constants/sectionSheets.ts`

## Development Workflow

### Local Development
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
```

### Testing
```bash
npm test
```

## Configuration Files

### Environment Setup
- Development: Use mock authentication
- Production: Connect to Spring Boot backend
- See: `src/docs/DEPLOYMENT.md` for full configuration

### Key Configuration Files
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Styling configuration  
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## Backend Integration Checklist

### Required Spring Boot Endpoints
- [ ] Authentication endpoints (`/auth/*`)
- [ ] Financial data endpoints (`/api/financial-data/*`)
- [ ] Insurers list endpoint (`/api/insurers`)
- [ ] Years list endpoint (`/api/years`)

### Security Configuration
- [ ] CORS configuration for React frontend
- [ ] JWT token validation
- [ ] Role-based access control

### Data Structure
- [ ] Financial data stored with sheet/row/column codes
- [ ] User profiles with roles and company associations
- [ ] Insurer master data

## Deployment Strategy

### Frontend Deployment
- Build static files with `npm run build`
- Deploy to CDN or static hosting
- Configure environment variables for production

### Backend Integration
- Update API base URL in environment variables
- Disable mock authentication mode
- Test authentication flow end-to-end

## Monitoring and Maintenance

### Performance Monitoring
- Monitor bundle size (currently optimized with lazy loading)
- Track API response times
- Monitor authentication session handling

### Error Handling
- Frontend errors logged to console
- API errors handled gracefully with user feedback
- Authentication errors trigger appropriate redirects

## Next Steps for Development Team

1. **Setup Spring Boot Backend**
   - Implement authentication endpoints
   - Create financial data API endpoints
   - Setup database schema for financial data

2. **Integration Testing**
   - Test authentication flow
   - Verify data fetching and display
   - Test error handling scenarios

3. **Production Deployment**
   - Configure production environment variables
   - Setup CI/CD pipeline
   - Deploy and test end-to-end functionality

## Support and Documentation

- **API Integration**: `src/docs/API_INTEGRATION.md`
- **Deployment Guide**: `src/docs/DEPLOYMENT.md`
- **Component Documentation**: Individual README files in component directories
- **Type Definitions**: `src/types/` directory

## Contact Information

For questions about the frontend implementation or integration requirements, refer to:
- Component documentation in the codebase
- API integration guide
- TypeScript type definitions for expected data structures

The codebase is well-documented with TypeScript interfaces and JSDoc comments for all major components and utilities.
