
# Developer Documentation

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Architecture Overview

The UltraData Financial Dashboard follows a component-based architecture built with React and TypeScript. The application is designed to be modular, maintainable, and extensible.

## Project Structure

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

## Key Components and Features

### Dashboard Flow

1. Users arrive at the Index page
2. They can navigate to the Dashboard via the dropdown
3. The Dashboard presents filter options (year, insurer, section, sheet)
4. Based on selected filters, appropriate visualizations are displayed

### Filter System

The filter system consists of several interconnected components:

- `YearSelector`: Year dropdown (2015-2022, with 2023-2024 coming soon)
- `InsurerSelector`: Insurance company selection
- `SectionSelector`: Category of financial data
- `SheetSelector`: Specific data sheet within a section

These are orchestrated by the `DataFilterSelector` component which maintains the state and dependencies between filters.

### Data Visualization

The visualization system follows a mapper pattern:
1. `DataVisualization` component receives section and sheet selections
2. `VisualizationMapper` loads the appropriate mapper component based on selection
3. Mapper components render the specific visualizations for each section/sheet

### Authentication

Authentication is handled through Supabase:
- Login/signup functionality through `LoginForm` and related components
- Session management via `AuthContext`
- Role-based access control via user profiles

For development purposes, a DEV_MODE flag is available that uses mock authentication.

## State Management

The application uses:
- React's Context API for authentication state
- React's useState and useCallback for component state
- Tanstack Query for data fetching and caching

## TypeScript Type System

The application uses TypeScript for type safety. Key type definitions include:

- `SheetOption`: Represents a selectable data sheet
- `SectionSheetMapping`: Maps sections to available sheets
- `DataFilterSelectorProps`: Props for the filter selector component
- Various component prop interfaces (e.g., `YearSelectorProps`, `SheetSelectorProps`)

## Styling Approach

- Tailwind CSS for utility-first styling
- Shadcn UI components for consistent UI elements
- Custom classes for specific styling needs

## Adding New Features

### Adding New Data Sections

1. Add the section to the `sectionSheetsMapping` in `src/constants/sectionSheets.ts`
2. Create a new mapper component in `src/components/visualizations/mappers`
3. Register the mapper in the `visualizationMappers` registry
4. Add title mappings in `src/utils/visualization-utils.ts`

### Adding New Visualizations

1. Create a new visualization component in the appropriate folder
2. Update the relevant mapper to include the new visualization
3. Add necessary data fetching logic using Tanstack Query

### Adding New Pages

1. Create a new page component in `/src/pages`
2. Add the route in `App.tsx`
3. Update navigation as needed

## Testing

To run tests:
```
npm test
```

## Build and Deployment

To build the project:
```
npm run build
```

The application is configured for deployment through CI/CD pipelines. Environment-specific configuration is handled through environment variables.

## Component Dependencies

Understanding the relationships between components is crucial for maintenance:

- `Dashboard` → `DataFilterSelector` → `YearSelector`, `InsurerSelector`, `SectionSelector`, `SheetSelector`
- `Dashboard` → `DataVisualization` → `VisualizationMapper` → Specific mappers
- Mappers → Various visualization components and tables

## Common Issues and Troubleshooting

### Authentication Issues

If experiencing authentication issues:
- Check Supabase configuration
- Verify that the correct roles and policies are set up
- In development, ensure DEV_MODE is properly configured

### Data Visualization Issues

If visualizations are not rendering:
- Check browser console for errors
- Verify the selection path (section → sheet) is valid
- Ensure data is available for the selected filters

### Styling Issues

For styling inconsistencies:
- Check component-specific styles
- Review Tailwind configuration
- Verify responsive design breakpoints

## Best Practices

- Keep components small and focused
- Use TypeScript interfaces for props
- Follow the established patterns for tables and visualizations
- Add meaningful comments for complex logic
- Use memoization for performance-critical components
- Write tests for critical functionality
