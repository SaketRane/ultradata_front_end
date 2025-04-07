
import React, { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

interface FinancialTableProps {
  columns: ColumnDefinition[];
  rows: RowDefinition[];
  sheetCode: string;
  secondaryHeader?: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

/**
 * Reusable financial table component for displaying structured financial data.
 * Features:
 * - Consistent styling for different types of rows (headers, totals, etc.)
 * - Indentation based on row hierarchy
 * - Code-based data cells for integration with data sources
 * - Performance optimized with memoization
 */
const FinancialTable: React.FC<FinancialTableProps> = ({
  columns,
  rows,
  sheetCode,
  secondaryHeader,
  className = "",
  maxHeight = "70vh"
}) => {
  // Generate cell code for data identification
  const generateCellCode = (rowCode: string, colCode: string) => {
    if (!rowCode) return "";
    return `${sheetCode}${rowCode}${colCode}`;
  };

  // Memoize the table header to prevent unnecessary re-renders
  const tableHeader = useMemo(() => (
    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
      {secondaryHeader}
      <TableRow className="h-6">
        <TableHead className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
        {columns.map((col) => (
          <TableHead 
            key={col.id} 
            data-column-code={col.colCode}
            colSpan={col.colSpan}
            className="text-xs font-semibold text-center py-0 px-1 border-r last:border-r-0"
          >
            {col.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  ), [columns, secondaryHeader]);

  // Memoize the table body to prevent unnecessary re-renders
  const tableBody = useMemo(() => (
    <TableBody className="text-[10px]">
      {rows.map((row, index) => {
        // Determine background color for total rows
        const bgClass = row.isTotal ? "bg-gray-50" : "";
        
        // Determine font styling based on row type
        const fontClass = row.isSection 
          ? "font-semibold uppercase" 
          : row.isHeader 
            ? "font-medium italic" 
            : row.isFinalTotal 
              ? "font-bold uppercase" 
              : row.isTotal
                ? "font-medium"
                : "font-normal";
        
        // Calculate left padding based on indentation level
        const paddingClass = 
          row.indent === 0 ? "pl-2" : 
          row.indent === 1 ? "pl-6" : "pl-10";
        
        // Add dotted bottom border for most rows
        const borderClass = row.isHeader ? "" : "border-dotted border-b border-gray-300";
        
        return (
          <TableRow 
            key={`${row.rowCode || 'row'}-${index}`}
            className={`${bgClass} ${borderClass} h-5`} 
            data-row-code={row.rowCode}
          >
            <TableCell 
              className={`${paddingClass} ${fontClass} py-0 pr-2 border-r text-left`}
            >
              {row.name}
              {row.rowCode && (
                <span className="text-orange-500 ml-2 text-[9px]">{row.rowCode}</span>
              )}
            </TableCell>
            
            {columns.map((col) => {
              const dataCode = generateCellCode(row.rowCode, col.colCode);
              // Skip data cells for section headers and regular headers
              const isDisabled = !row.rowCode || row.isHeader || (col.id.includes('Vested') && row.hasVested === false);
              const cellClass = isDisabled ? "bg-gray-200" : "";
              
              return (
                <TableCell 
                  key={`${row.rowCode || index}-${col.colCode}`}
                  className={`text-center py-0 px-1 border-r last:border-r-0 group ${cellClass}`}
                  data-code={!isDisabled ? dataCode : ""}
                >
                  {!isDisabled && dataCode && (
                    <span className="invisible group-hover:visible text-green-600 text-[9px]">
                      {dataCode}
                    </span>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  ), [rows, columns, sheetCode]);

  return (
    <div className={`overflow-auto rounded-md border bg-white/80 backdrop-blur-sm ${className}`} style={{ maxHeight }}>
      <Table className="min-w-[600px] text-xs">
        {tableHeader}
        {tableBody}
      </Table>
    </div>
  );
};

export default React.memo(FinancialTable);
