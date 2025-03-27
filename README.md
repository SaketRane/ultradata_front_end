
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
  - `/src/components/filters`: Filter selection components
- `/src/contexts`: React context providers for global state
- `/src/pages`: Top-level page components
- `/src/utils`: Utility functions and helpers
- `/src/hooks`: Custom React hooks
- `/src/types`: TypeScript type definitions
- `/src/constants`: Constant values and configurations
- `/src/integrations`: External service integrations (Supabase)

## Code Patterns

### Component Structure

Components follow a consistent pattern:
- Clear TypeScript interfaces for props
- Memoization for performance optimization
- Separation of concerns for better maintainability

### Data Flow

The application uses a unidirectional data flow:
1. User selects filters in the DataFilterSelector
2. Selection state is managed in the Dashboard component
3. Selected data is passed to the DataVisualization component
4. The VisualizationMapper routes to the correct visualization

### Financial Tables

Financial tables use a common FinancialTable component with:
- Consistent styling and behavior
- Type-safe row and column definitions
- Code-based data referencing

## Development Practices

- Use React.memo for components that don't need frequent re-renders
- Leverage useCallback and useMemo for performance optimization
- Follow TypeScript best practices for type safety
- Keep components small and focused on a single responsibility
- Use environment variables for configuration

## Extending the Application

### Adding New Visualizations

1. Create a new mapper component in `/src/components/visualizations/mappers/`
2. Add the component to the visualizationMappers registry in VisualizationMapper.tsx
3. Update the sectionSheetsMapping in `/src/constants/sectionSheets.ts`

### Adding New Table Types

1. Define row and column definitions following the RowDefinition and ColumnDefinition interfaces
2. Create a new table component extending the FinancialTable
3. Add the component to the appropriate mapper

