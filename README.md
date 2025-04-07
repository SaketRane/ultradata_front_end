
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

## Deployment

The application is configured for deployment through CI/CD pipelines. Environment-specific configuration is handled through environment variables.
