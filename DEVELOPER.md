
# Developer Documentation

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Architecture Overview

The UltraData Financial Dashboard follows a component-based architecture built with React and TypeScript. The application is designed to be modular, maintainable, and extensible.

## Key Concepts

### Financial Tables

The application uses a common `FinancialTable` component for displaying financial data. This component handles:

- Styling based on row type (header, total, etc.)
- Row indentation for hierarchical data
- Dynamic cell code generation for data binding

To add a new financial table:

1. Create a new component in `src/components/tables`
2. Define row and column structures following the `RowDefinition` and `ColumnDefinition` interfaces
3. Use the `FinancialTable` component to render the data
4. Register the table in the appropriate mapper component

### Visualization System

The application uses a mapper pattern for visualizations:

1. `DataVisualization` component receives section and sheet selections
2. `VisualizationMapper` uses lazy loading to load the appropriate mapper component
3. Mapper components render the specific visualizations for each section

To add a new visualization:

1. Create a new mapper component in `src/components/visualizations/mappers`
2. Add the component to the `visualizationMappers` registry in `VisualizationMapper.tsx`
3. Update the section/sheet mappings in `src/constants/sectionSheets.ts`
4. Add title mappings in `src/utils/visualization-utils.ts`

## Performance Optimization

The application uses several techniques to optimize performance:

- **Memoization**: Components use `React.memo()` to prevent unnecessary re-renders
- **Lazy Loading**: Visualization mappers are loaded lazily with code splitting
- **Virtualization**: Tables use optimized rendering for large datasets

## Type System

The application uses TypeScript for type safety. Key type definitions:

- `RowDefinition`: Defines the structure of table rows
- `ColumnDefinition`: Defines the structure of table columns
- `DataPoint`: Represents a single data point with code, value, and metadata

## Extension Points

### Adding New Sections

1. Add the section to the `sectionSheetsMapping` in `src/constants/sectionSheets.ts`
2. Create a new mapper component in `src/components/visualizations/mappers`
3. Register the mapper in the `visualizationMappers` registry
4. Add title mappings in `src/utils/visualization-utils.ts`

### Adding New Sheet Types

1. Add the sheet to the appropriate section in `sectionSheetsMapping`
2. Add title mappings in `src/utils/visualization-utils.ts`
3. Create visualization components as needed

## Best Practices

- Keep components small and focused
- Use TypeScript for all new code
- Follow the established patterns for tables and visualizations
- Add meaningful comments for complex logic
- Use memoization for performance-critical components
- Write tests for critical functionality
