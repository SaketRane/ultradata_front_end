
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
  maxHeight = "70vh"
}) => {
  // Memoize the cell code generator function to improve performance
  const getCellCode = useCallback((rowCode: string, colCode: string) => {
    // Special case for sheet 2022: only row 520 should have a code in column 04
    if (sheetCode === "2022" && colCode === "04") {
      if (rowCode === "520") {
        return "202252004"; // Special code for Discontinued Operations in Total column
      }
      return ""; // No code for other rows in Total column
    }
    return generateCellCode(sheetCode, rowCode, colCode);
  }, [sheetCode]);

  // Calculate dynamic column width based on number of columns
  const getColumnWidth = useMemo(() => {
    const numColumns = columns.length;
    if (numColumns <= 2) return "w-80"; // Wider for fewer columns
    if (numColumns <= 4) return "w-60"; // Medium width
    if (numColumns <= 6) return "w-48"; // Standard width
    return "w-40"; // Narrower for many columns
  }, [columns.length]);

  // Memoize the table header to prevent unnecessary re-renders
  const tableHeader = useMemo(() => (
    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
      {secondaryHeader}
      <TableRow className="h-6">
        <TableHead className="w-[400px] text-xs font-semibold text-left py-0 px-3 border-r min-w-[300px]"></TableHead>
        {columns.map((col) => (
          <TableHead 
            key={col.id} 
            data-column-code={col.colCode}
            colSpan={col.colSpan}
            className={`text-xs font-semibold text-center py-0 px-2 border-r last:border-r-0 ${getColumnWidth} min-w-[120px]`}
          >
            {col.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  ), [columns, secondaryHeader, getColumnWidth]);

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
          className={`${paddingClass} ${fontClass} py-0 pr-3 border-r text-left min-w-[300px]`}
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
              className={`text-center py-0 px-2 border-r last:border-r-0 group ${cellClass} ${getColumnWidth} min-w-[120px]`}
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
  }, [columns, getCellCode, getColumnWidth]);

  // Memoize the table body rows to prevent unnecessary re-renders
  const tableRows = useMemo(() => 
    rows.map((row, index) => renderRow(row, index))
  , [rows, renderRow]);

  return (
    <div className={`overflow-auto rounded-md border bg-white/80 backdrop-blur-sm w-full ${className}`} style={{ maxHeight }}>
      <Table className="w-full min-w-[800px] text-xs table-fixed">
        {tableHeader}
        <TableBody className="text-[10px]">
          {tableRows}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(FinancialTable);
