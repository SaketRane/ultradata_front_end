
# Financial Statements Tables

This module contains all financial statement table components following IFRS 17 accounting standards for insurance contracts.

## Architecture

All tables follow a consistent pattern:
- Use the `FinancialTable` base component for consistency
- Define rows with `RowDefinition[]` structure
- Define columns with `ColumnDefinition[]` structure
- Use proper indentation and styling for hierarchy
- Support data codes for backend integration

## Available Tables

### Core Financial Statements
- **AssetsTable** (Sheet 2010) - Statement of Financial Position - Assets
- **InsuranceLiabilitiesTable** (Sheet 2012) - Insurance Liabilities by Measurement Component (Non-PAA)
- **StatementOfChangesInEquityTable** (Sheet 2054) - Statement of Changes in Equity
- **ComprehensiveIncomeTable** (Sheet 2042) - Statement of Comprehensive Income
- **HeadOfficeAccountAndReservesTable** (Sheet 2045) - Head Office Account & Reserves

### Insurance Contracts (IFRS 17)
- **ReinsuranceHeldTable** (Sheet 2016) - Reinsurance Held by Measurement Component (Non-PAA)
- **InsuranceContractsHeldTable** (Sheet 2018) - Insurance Contracts Held
- **InsuranceLiabilitiesByMeasurementTable** (Sheet 2014) - Insurance Liabilities by Measurement Component

## Data Integration

Each table cell generates a unique code in the format: `[SheetCode][RowCode][ColumnCode]`
Example: `201001001` = Sheet 2010, Row 01, Column 01

## Performance Optimizations

- All components use `React.memo()` for memoization
- Tables support virtualization-ready structure
- Lazy loading through the mapper component
- Optimized re-rendering with `useMemo` and `useCallback`

## Usage

```tsx
import { AssetsTable } from '@/components/tables/financial-statements';

function MyComponent() {
  return <AssetsTable />;
}
```

## Development Guidelines

1. Keep table components focused and single-purpose
2. Use consistent naming conventions
3. Follow the established row/column definition patterns
4. Add proper TypeScript interfaces
5. Include comprehensive data codes for all cells
