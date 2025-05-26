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
  specialCells?: Record<string, string>; // Map of rowCode+colCode to custom cell code
}

/**
 * Reusable financial table component for displaying structured financial data.
 * Features:
 * - Consistent styling for different types of rows (headers, totals, etc.)
 * - Indentation based on row hierarchy
 * - Code-based data cells for integration with data sources
 * - Performance optimized with memoization and virtualization preparation
 * - Support for special cell codes that don't follow the standard pattern
 */
const FinancialTable: React.FC<FinancialTableProps> = ({
  columns,
  rows,
  sheetCode,
  secondaryHeader,
  className = "",
  maxHeight = "70vh",
  specialCells = {}
}) => {
  // Memoize the cell code generator function to improve performance
  const getCellCode = useCallback((rowCode: string, colCode: string) => {
    const specialKey = rowCode + colCode;
    if (specialCells[specialKey]) {
      return specialCells[specialKey];
    }
    return generateCellCode(sheetCode, rowCode, colCode);
  }, [sheetCode, specialCells]);

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
          const dataCode = getCellCode(row.rowCode, col.colCode);
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
  }, [columns, getCellCode]);

  // Memoize the table body rows to prevent unnecessary re-renders
  const tableRows = useMemo(() => 
    rows.map((row, index) => renderRow(row, index))
  , [rows, renderRow]);

  return (
    <div className={`overflow-auto rounded-md border bg-white/80 backdrop-blur-sm ${className}`} style={{ maxHeight }}>
      <Table className="min-w-[600px] text-xs">
        {tableHeader}
        <TableBody className="text-[10px]">
          {tableRows}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(FinancialTable);
