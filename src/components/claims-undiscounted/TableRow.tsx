
import React, { memo, useMemo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { InsuranceRowDefinition, ProvinceColumnDefinition } from "./types";
import { generateDataCellCode, getRowClasses } from "./utils";

interface TableRowProps {
  row: InsuranceRowDefinition;
  index: number;
  columns: ProvinceColumnDefinition[];
}

/**
 * Optimized table row component for ClaimsUndiscountedTable
 * Uses memoization for better performance with large datasets
 */
const TableRowComponent: React.FC<TableRowProps> = ({ row, index, columns }) => {
  // Memoize the CSS classes to prevent recalculation on each render
  const rowClasses = useMemo(() => 
    getRowClasses(row.indent, row.isTotal, row.isSubtotal)
  , [row.indent, row.isTotal, row.isSubtotal]);
  
  const { paddingClass, bgClass, fontClass, sizeClass } = rowClasses;
  
  // Memoize the cells to prevent unnecessary re-renders
  const cells = useMemo(() => 
    columns.map(column => {
      const dataCode = generateDataCellCode(row.rowCode, column.code);
      
      return (
        <TableCell 
          key={`${index}-${column.name}`} 
          className={`text-center py-1 px-4 ${sizeClass} ${fontClass}`}
          data-code={dataCode}
        >
          {dataCode && (
            <span className="text-green-600 opacity-0 hover:opacity-50 text-[7px]">
              {dataCode}
            </span>
          )}
        </TableCell>
      );
    })
  , [columns, row.rowCode, fontClass, sizeClass, index]);
  
  return (
    <TableRow 
      key={index} 
      className={bgClass} 
      data-row-code={row.rowCode}
    >
      <TableCell className={`${paddingClass} ${fontClass} py-1 px-4 ${sizeClass}`}>
        {row.name}
        {row.rowCode && (
          <span className="text-orange-500 ml-2 opacity-50 text-[8px]">
            {row.rowCode}
          </span>
        )}
      </TableCell>
      
      {cells}
    </TableRow>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(TableRowComponent);
