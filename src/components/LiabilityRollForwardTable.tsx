
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

interface LiabilityRollForwardTableProps {
  sheetCode: string;
}

// Placeholder for the Liability Roll Forward tables
// This will be implemented with actual data structure when provided
const LiabilityRollForwardTable: React.FC<LiabilityRollForwardTableProps> = ({ sheetCode }) => {
  // Get title based on sheetCode
  const getTitle = () => {
    switch (sheetCode) {
      case "2012": return "Liability Roll Forward - xyz";
      case "2014": return "Liability Roll Forward - abc";
      case "2016": return "Liability Roll Forward - 123";
      case "2018": return "Liability Roll Forward - 456";
      default: return "Liability Roll Forward";
    }
  };

  // Temporary placeholder rows
  const rows: RowDefinition[] = [
    { name: `${getTitle()} - Placeholder`, rowCode: "01", indent: 0, isTotal: false }
  ];

  // Basic columns
  const columns: ColumnDefinition[] = [
    { id: "openingBalance", label: "Opening Balance", colCode: "01" },
    { id: "changes", label: "Changes", colCode: "02" },
    { id: "closingBalance", label: "Closing Balance", colCode: "03" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode={sheetCode}
    />
  );
};

export default React.memo(LiabilityRollForwardTable);
