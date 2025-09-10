
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
          className={`text-center py-1 px-4 ${fontClass}`}
          data-code={dataCode}
        >
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
      </TableCell>
      
      {cells}
    </TableRow>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(TableRowComponent);
