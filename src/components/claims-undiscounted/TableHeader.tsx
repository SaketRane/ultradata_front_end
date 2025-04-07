
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProvinceColumn } from "./types";

interface TableHeaderProps {
  columns: ProvinceColumn[];
}

/**
 * Table header component for ClaimsUndiscountedTable
 */
const TableHeaderComponent: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
      <TableRow>
        <TableHead className="w-[250px] text-xs font-semibold text-left py-2 px-4">
          Class of Insurance
        </TableHead>
        {columns.map(column => (
          <TableHead 
            key={column.name} 
            className="text-xs font-semibold text-center py-2 px-4"
            data-province-code={column.code}
          >
            {column.name}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default React.memo(TableHeaderComponent);
