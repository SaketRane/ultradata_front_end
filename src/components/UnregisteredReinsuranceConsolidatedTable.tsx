
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

// Placeholder for the consolidated Unregistered Reinsurance table (2023-2025)
// This will be implemented with actual data structure when provided
const UnregisteredReinsuranceConsolidatedTable: React.FC = () => {
  // Temporary placeholder rows
  const rows: RowDefinition[] = [
    { name: "Unregistered Reinsurance (Consolidated) - Placeholder", rowCode: "01", indent: 0, isTotal: false }
  ];

  // Basic columns
  const columns: ColumnDefinition[] = [
    { id: "amount", label: "Amount", colCode: "01" },
    { id: "collateral", label: "Collateral", colCode: "02" },
    { id: "net", label: "Net", colCode: "03" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="7060"
    />
  );
};

export default React.memo(UnregisteredReinsuranceConsolidatedTable);
