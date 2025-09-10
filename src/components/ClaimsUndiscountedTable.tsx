
import React, { useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TABLE_ROWS, PROVINCE_COLUMNS } from "./claims-undiscounted/constants";
import TableHeader from "./claims-undiscounted/TableHeader";
import TableRow from "./claims-undiscounted/TableRow";

/**
 * ClaimsUndiscountedTable displays provincial claims data in a structured table format
 * with columns for different provinces and rows for insurance categories
 */
const ClaimsUndiscountedTable: React.FC = () => {
  // Memoize the table rows to prevent unnecessary re-renders
  const tableRows = useMemo(() => (
    TABLE_ROWS.map((row, index) => (
      <TableRow 
        key={`${row.rowCode || 'row'}-${index}`}
        row={row}
        index={index}
        columns={PROVINCE_COLUMNS}
      />
    ))
  ), []);

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[1200px] text-xs dropdown-data">
        <TableHeader columns={PROVINCE_COLUMNS} />
        <TableBody className="text-xs">
          {tableRows}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(ClaimsUndiscountedTable);
