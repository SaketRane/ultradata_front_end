
# Financial Statements Module - Developer Handoff

## Overview
This module contains 8 financial statement table components following IFRS 17 standards. All components are production-ready and optimized for performance.

## Component Structure

### Base Architecture
- **FinancialTable**: Reusable base component (`src/components/ui/financial-table.tsx`)
- **Consistent Props**: All tables use `RowDefinition[]` and `ColumnDefinition[]`
- **Memoization**: All components use `React.memo()` for performance
- **Data Codes**: Unique identifiers for backend integration

### Table Components

1. **AssetsTable** (Sheet 2010)
   - Simple 2-column layout (Current/Prior Period)
   - Standard financial hierarchy with totals

2. **InsuranceLiabilitiesTable** (Sheet 2012) 
   - Complex multi-column layout with secondary headers
   - IFRS 17 measurement components (CSM, Risk Adjustment, etc.)

3. **InsuranceLiabilitiesByMeasurementTable** (Sheet 2014)
   - Similar to 2012 but different groupings
   - Liability coverage and claims separation

4. **ReinsuranceHeldTable** (Sheet 2016)
   - 6+6 column structure (Current/Prior periods)
   - CSM breakdown by measurement approach

5. **InsuranceContractsHeldTable** (Sheet 2018)
   - Assets for coverage and claims
   - Loss-recovery component tracking

6. **StatementOfChangesInEquityTable** (Sheet 2054)
   - Wide table with 19 columns
   - AOCI (Accumulated Other Comprehensive Income) grouping
   - Complex equity component tracking

7. **ComprehensiveIncomeTable** (Sheet 2042)
   - Income statement format
   - Insurance service results

8. **HeadOfficeAccountAndReservesTable** (Sheet 2045)
   - Simple 2-column layout
   - Head office and reserves tracking

## Backend Integration

### Data Code Format
Each table cell has a unique identifier: `[SheetCode][RowCode][ColumnCode]`

Examples:
- `201001001` = Assets Table, Row 01, Column 01
- `201209902` = Insurance Liabilities, Row 099, Column 02

### API Integration Points
- Filter by year, insurer, section, sheet code
- Data fetching through `src/integrations/database/client.ts`
- Error handling and loading states implemented

## Performance Optimizations

### Implemented
- ✅ React.memo() on all components
- ✅ useMemo for row/column definitions
- ✅ useCallback for event handlers
- ✅ Lazy loading through VisualizationMapper
- ✅ Code splitting with React.Suspense

### Future Enhancements
- [ ] Virtual scrolling for large datasets
- [ ] Progressive loading for heavy tables
- [ ] Data caching strategies

## Quality Assurance

### Code Quality
- ✅ TypeScript strict mode compliance
- ✅ Consistent naming conventions
- ✅ Comprehensive interface definitions
- ✅ Proper error boundaries

### Accessibility
- ✅ Semantic table structure
- ✅ Screen reader friendly
- ✅ Keyboard navigation support
- ✅ ARIA labels where needed

## Deployment Checklist

- [x] All components compile without errors
- [x] TypeScript types are properly defined
- [x] Performance optimizations implemented
- [x] Documentation is complete
- [x] Code follows project conventions
- [x] Error handling is comprehensive

## Maintenance Notes

1. **Adding New Tables**: Follow the established pattern in existing tables
2. **Modifying Headers**: Update secondary headers in respective components
3. **Data Code Changes**: Ensure backend alignment for code format changes
4. **Performance**: Monitor table rendering performance with large datasets

## Contact & Support
- Component documentation: Individual README files
- Type definitions: `src/types/financial.ts`
- Base table component: `src/components/ui/financial-table.tsx`
