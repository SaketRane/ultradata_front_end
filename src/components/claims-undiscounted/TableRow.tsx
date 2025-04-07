
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { InsuranceRow, ProvinceColumn } from "./types";
import { generateDataCellCode, getRowClasses } from "./utils";

interface TableRowProps {
  row: InsuranceRow;
  index: number;
  columns: ProvinceColumn[];
}

/**
 * Table row component for ClaimsUndiscountedTable
 */
const TableRowComponent: React.FC<TableRowProps> = ({ row, index, columns }) => {
  const { paddingClass, bgClass, fontClass, sizeClass } = getRowClasses(
    row.indent, 
    row.isTotal, 
    row.isSubtotal
  );
  
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
      
      {columns.map(column => {
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
      })}
    </TableRow>
  );
};

export default React.memo(TableRowComponent);
