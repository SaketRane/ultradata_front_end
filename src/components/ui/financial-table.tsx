
import React, { useMemo, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";
import { generateCellCode, getRowClasses } from "@/utils/table-utils";

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
 * - Performance optimized with memoization and virtualization preparation
 */
const FinancialTable: React.FC<FinancialTableProps> = ({
  columns,
  rows,
  sheetCode,
  secondaryHeader,
  className = "",
  maxHeight = "calc(100vh - 280px)"
}) => {
  // Memoize the cell code generator function to improve performance
  const getCellCode = useCallback((rowCode: string, colCode: string) => {
    return generateCellCode(sheetCode, rowCode, colCode);
  }, [sheetCode]);

  // Memoize the table header to prevent unnecessary re-renders
  const tableHeader = useMemo(() => (
    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
      {secondaryHeader}
      <TableRow className="h-12">
        <TableHead className="w-[300px] text-sm font-semibold text-left py-2 px-3 border-r bg-gray-50/80"></TableHead>
        {columns.map((col) => (
          <TableHead 
            key={col.id} 
            data-column-code={col.colCode}
            colSpan={col.colSpan}
            className="text-sm font-semibold text-center py-2 px-2 border-r last:border-r-0 bg-gray-50/80 min-w-[120px]"
          >
            <div className="break-words leading-tight">
              {col.label}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  ), [columns, secondaryHeader]);

  // Render a single row - extracted for better performance
  const renderRow = useCallback((row: RowDefinition, index: number) => {
    const { 
      bgClass, 
      fontClass, 
      paddingClass, 
      borderClass 
    } = getRowClasses(
      row.indent, 
      !!row.isTotal, 
      false, 
      !!row.isFinalTotal, 
      !!row.isHeader
    );
    
    return (
      <TableRow 
        key={`${row.rowCode || 'row'}-${index}`}
        className={`${bgClass} ${borderClass} h-10`} 
        data-row-code={row.rowCode}
      >
        <TableCell 
          className={`${paddingClass} ${fontClass} py-2 pr-3 border-r text-left text-sm`}
        >
          {row.name}
          {row.rowCode && (
            <span className="text-orange-500 ml-2 text-xs font-mono">{row.rowCode}</span>
          )}
        </TableCell>
        
        {columns.map((col) => {
          const dataCode = getCellCode(row.rowCode, col.colCode);
          // Skip data cells for section headers and regular headers
          const isDisabled = !row.rowCode || row.isHeader || (col.id.includes('Vested') && row.hasVested === false);
          const cellClass = isDisabled ? "bg-gray-200" : "";
          
          return (
            <TableCell 
              key={`${row.rowCode || index}-${col.colCode}`}
              className={`text-center py-2 px-2 border-r last:border-r-0 group min-w-[120px] text-sm ${cellClass}`}
              data-code={!isDisabled ? dataCode : ""}
            >
              {!isDisabled && dataCode && (
                <span className="invisible group-hover:visible text-green-600 text-xs font-mono">
                  {dataCode}
                </span>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }, [columns, getCellCode]);

  // Memoize the table body rows to prevent unnecessary re-renders
  const tableRows = useMemo(() => 
    rows.map((row, index) => renderRow(row, index))
  , [rows, renderRow]);

  return (
    <div className={`overflow-auto rounded-lg border bg-white/90 backdrop-blur-sm shadow-sm w-full ${className}`} style={{ maxHeight }}>
      <Table className="w-full text-sm">
        {tableHeader}
        <TableBody className="text-sm">
          {tableRows}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(FinancialTable);
