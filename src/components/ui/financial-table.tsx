/* eslint-disable react-hooks/exhaustive-deps */

import React, { useMemo, useCallback, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";
import { generateCellCode, getRowClasses } from "@/utils/table-utils";
import axios from "axios";
import useCode from "@/hooks/use-code";

interface FinancialTableProps {
  columns: ColumnDefinition[];
  rows: RowDefinition[];
  sheetCode: string;
  secondaryHeader?: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

/**
 * Optimized financial table component for displaying structured financial data.
 * Features consistent styling, hierarchical rows, and performance optimizations.
 */
const FinancialTable: React.FC<FinancialTableProps> = ({
  columns,
  rows,
  sheetCode,
  secondaryHeader,
  className = "",
  maxHeight = "70vh"
}) => {
  const { value, handleGetCode } = useCode();

  const getCellCode = useCallback((rowCode: string, colCode: string) => {
    if (sheetCode === "2022" && colCode === "04") {
      return rowCode === "520" ? "202252004" : "";
    }
    return generateCellCode(sheetCode, rowCode, colCode);
  }, [sheetCode]);

  const getColumnWidth = useMemo(() => {
    const numColumns = columns.length;
    if (numColumns <= 2) return "w-96";
    if (numColumns <= 4) return "w-72";
    if (numColumns <= 6) return "w-60";
    return "w-48";
  }, [columns.length]);


  const tableHeader = useMemo(() => (
    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
      {secondaryHeader}
      <TableRow className="h-6">
        <TableHead className="w-[500px] text-xs font-semibold text-left py-0 px-3 border-r min-w-[400px]"></TableHead>
        {columns.map((col) => (
          <TableHead 
            key={col.id} 
            data-column-code={col.colCode}
            colSpan={col.colSpan}
            className={`text-xs font-semibold text-center py-0 px-2 border-r last:border-r-0 ${getColumnWidth} min-w-[150px]`}
          >
            {col.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  ), [columns, secondaryHeader, getColumnWidth]);

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
          className={`${paddingClass} ${fontClass} py-0 pr-3 border-r text-left min-w-[400px]`}
        >
          {row.name}
          {row.rowCode && (
            <span className="text-orange-500 ml-2 text-[9px]">{row.rowCode}</span>
          )}
        </TableCell>
        
        {columns.map((col) => {
          const dataCode = getCellCode(row.rowCode, col.colCode);
          const isDisabled = !row.rowCode || row.isHeader || (col.id.includes('Vested') && row.hasVested === false);
          const cellClass = isDisabled ? "bg-gray-200" : "";
          
          return (
            <TableCell 
             onMouseEnter={handleGetCode(dataCode)}
              key={`${row.rowCode || index}-${col.colCode}`}
              className={`text-center py-0 px-2 border-r last:border-r-0 group ${cellClass} ${getColumnWidth} min-w-[150px]`}
              data-code={!isDisabled ? dataCode : ""}
            >
              {!isDisabled && dataCode && (
                <span className="invisible group-hover:visible text-green-600 text-[9px]">
                  {value ? value : 'Not exist'}
                </span>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }, [columns, getCellCode, getColumnWidth, value]);

  const tableRows = useMemo(() => 
    rows.map((row, index) => renderRow(row, index))
  , [rows, renderRow]);

  return (
    <div className={`overflow-auto rounded-md border bg-white/80 backdrop-blur-sm ${className}`} style={{ maxHeight }}>
      <Table className="min-w-[1200px] text-xs table-fixed">
        {tableHeader}
        <TableBody className="text-[10px]">
          {tableRows}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(FinancialTable);
