
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { InsuranceRowDefinition, ClaimColumnDefinition } from "./types";
import { generateDataCellCode, getRowClasses } from "./utils";

interface TableRowProps {
  row: InsuranceRowDefinition;
  index: number;
  columns: ClaimColumnDefinition[];
}

/**
 * Table row component for UndiscountedClaimsTable
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
      <TableCell className={`${paddingClass} ${fontClass} py-1 px-2 ${sizeClass}`}>
        {row.name}
        {row.rowCode && (
          <span className="text-orange-500 ml-2 opacity-50 text-[8px]">
            {row.rowCode}
          </span>
        )}
      </TableCell>
      
      {columns.map(column => {
        const dataCode = generateDataCellCode(row.rowCode, column.colCode);
        
        return (
          <TableCell
            key={`${row.rowCode || index}-${column.colCode}`}
            className={`text-center py-1 px-2 ${sizeClass} ${fontClass}`}
            data-code={dataCode}
          >
            {row.rowCode && dataCode && (
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
