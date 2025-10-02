/* eslint-disable react-hooks/exhaustive-deps */

import React, { useMemo, useCallback, useState, useLayoutEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type RowDefinition, type ColumnDefinition } from '@/types/financial';
import { generateCellCode, getRowClasses } from '@/utils/table-utils';
import axios from 'axios';
import useCode from '@/hooks/use-code';

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
  className = '',
  maxHeight = '74vh',
}) => {
  console.log('FinancialTable rendering with:', { 
    columns: columns.length, 
    rows: rows.length, 
    sheetCode, 
    hasSecondaryHeader: !!secondaryHeader 
  });
  
  const { values, parseCode, handleGetCode, handleBatchCode } = useCode();

  const getCellCode = useCallback(
    (rowCode: string, colCode: string) => {
      if (sheetCode === '2022' && colCode === '04') {
        return rowCode === '520' ? '202252004' : '';
      }
      return generateCellCode(sheetCode, rowCode, colCode);
    },
    [sheetCode],
  );

  const getColumnWidth = useMemo(() => {
    const numColumns = columns.length;
    if (numColumns <= 2) return 'w-96';
    if (numColumns <= 4) return 'w-72';
    if (numColumns <= 6) return 'w-60';
    return 'w-48';
  }, [columns.length]);

  const tableHeader = useMemo(
    () => (
      <thead 
        className="bg-white shadow-sm [&_tr]:border-b" 
        style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 30
        }}
      >
        {secondaryHeader}
        <tr className="h-6 bg-white border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
               <th 
                 className="w-[250px] text-xs font-semibold text-left py-0 px-2 border-r bg-white h-10 align-middle font-medium text-muted-foreground"
                 style={{
                   position: 'sticky',
                   left: 0,
                   zIndex: 40
                 }}
               ></th>
          {columns.map((col) => (
            <th
              key={col.id}
              data-column-code={col.colCode}
              colSpan={col.colSpan}
              className={`text-xs font-semibold text-center py-0 px-1 border-r last:border-r-0 bg-white h-10 align-middle font-medium text-muted-foreground ${getColumnWidth}`}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
    ),
    [columns, secondaryHeader, getColumnWidth],
  );

  useLayoutEffect(() => {
    const arrayOfCellCode = [];
    rows.forEach((row) => {
      columns.forEach((col) => {
        arrayOfCellCode.push(getCellCode(row.rowCode, col.colCode));
      });
    });
    handleBatchCode(arrayOfCellCode);
  }, [rows, columns, handleBatchCode, getCellCode]);

  const renderRow = useCallback(
    (row: RowDefinition, index: number) => {
      const { bgClass, fontClass, paddingClass, borderClass } = getRowClasses(
        row.indent,
        !!row.isTotal,
        false,
        !!row.isFinalTotal,
        !!row.isHeader,
      );

      return (
        <tr
          key={`${row.rowCode || 'row'}-${index}`}
          className={`${bgClass} ${borderClass} h-6 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted`}
          data-row-code={row.rowCode}
        >
               <td
                 className={`w-[250px] ${paddingClass} ${fontClass} py-0 pr-3 border-r text-left text-xs bg-white p-2 align-middle hover:bg-gray-50/30 ${row.isTotal ? 'text-center font-semibold uppercase' : ''}`}
                 style={{
                   position: 'sticky',
                   left: 0,
                   zIndex: 10
                 }}
               >
            {row.name}
          </td>

          {columns.map((col) => {
            const dataCode = getCellCode(row.rowCode, col.colCode);
            const isDisabled =
              !row.rowCode ||
              row.isHeader ||
              (col.id.includes('Vested') && row.hasVested === false);
            const cellClass = isDisabled ? 'bg-gray-200' : '';

            const parsedCode = parseCode(dataCode);

            return (
              <td
                key={`${row.rowCode || index}-${col.colCode}`}
                className={`text-center py-0 px-2 border-r last:border-r-0 group ${cellClass} ${getColumnWidth} text-sm p-2 align-middle hover:bg-gray-50/30`}
                data-code={!isDisabled ? dataCode : ''}
              >
                {values ? values[parsedCode] : null}
              </td>
            );
          })}
        </tr>
      );
    },
    [columns, getCellCode, getColumnWidth, values],
  );

  const tableRows = useMemo(
    () => rows.map((row, index) => renderRow(row, index)),
    [rows, renderRow],
  );

  return (
    <div
      className={`overflow-y-auto overflow-x-auto rounded-md border bg-white/80 backdrop-blur-sm ${className}`}
      style={{ 
        height: 'calc(100vh - 210px)',
        minHeight: '300px',
        position: 'relative'
      }}
    >
      <table className="w-full text-sm caption-bottom" style={{ position: 'relative' }}>
        {tableHeader}
        <tbody className="text-sm [&_tr:last-child]:border-0">{tableRows}</tbody>
      </table>
    </div>
  );
};

export default React.memo(FinancialTable);
