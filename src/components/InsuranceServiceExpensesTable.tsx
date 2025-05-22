
import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { PROVINCE_COLUMNS } from "./claims-undiscounted/constants";
import TableHeader from "./claims-undiscounted/TableHeader";
import TableRowComponent from "./claims-undiscounted/TableRow";
import { InsuranceRow } from "./claims-undiscounted/types";

// Placeholder for the Insurance Service Expenses table
// This will use similar structure as other provincial tables
const InsuranceServiceExpensesTable: React.FC = () => {
  // Temporary placeholder rows
  const tableRows: InsuranceRow[] = [
    { name: "Insurance Service Expenses - Placeholder", rowCode: "01", indent: 0, isSubtotal: false, isTotal: false }
  ];

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-full text-xs dropdown-data">
        <TableHeader columns={PROVINCE_COLUMNS} />
        <TableBody className="text-[10px]">
          {tableRows.map((row, index) => (
            <TableRowComponent 
              key={`${row.rowCode || 'row'}-${index}`}
              row={row}
              index={index}
              columns={PROVINCE_COLUMNS}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(InsuranceServiceExpensesTable);
