
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

// Placeholder for the Changes in Onerous Contracts table
// This will be implemented with actual data structure when provided
const ChangesInOnerousContractsTable: React.FC = () => {
  // Temporary placeholder rows
  const rows: RowDefinition[] = [
    { name: "Changes in Onerous Contracts for the Current Period - Placeholder", rowCode: "01", indent: 0, isTotal: false }
  ];

  // Basic columns
  const columns: ColumnDefinition[] = [
    { id: "direct", label: "Direct", colCode: "01" },
    { id: "assumed", label: "Assumed", colCode: "02" },
    { id: "ceded", label: "Ceded", colCode: "03" },
    { id: "net", label: "Net", colCode: "04" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="6080"
    />
  );
};

export default React.memo(ChangesInOnerousContractsTable);
