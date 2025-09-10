
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClaimColumnDefinition } from "./types";

interface TableHeaderProps {
  columns: ClaimColumnDefinition[];
}

/**
 * Table header component for UndiscountedClaimsTable
 */
const TableHeaderComponent: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
      <TableRow>
        <TableHead className="w-[250px] text-xs font-semibold text-left py-2" rowSpan={2}>
          Class of Insurance
        </TableHead>
        <TableHead 
          className="text-xs font-semibold text-center py-2 border-b border-l" 
          colSpan={columns.length}
        >
          Claims inc. (Undisc)
        </TableHead>
      </TableRow>
      <TableRow>
        {columns.map(column => (
          <TableHead 
            key={column.id}
            className="text-xs font-semibold text-center py-2"
            data-column-code={column.colCode}
          >
            {column.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default React.memo(TableHeaderComponent);
