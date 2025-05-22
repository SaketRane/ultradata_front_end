
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

interface LiabilityRollForwardTableProps {
  sheetCode: string;
}

// Updated component for the Insurance Liabilities and Reinsurance Held tables
const LiabilityRollForwardTable: React.FC<LiabilityRollForwardTableProps> = ({ sheetCode }) => {
  // Get title based on sheetCode
  const getTitle = () => {
    switch (sheetCode) {
      case "2012": return "Insurance Liabilities by Measurement Component (Non-PAA)";
      case "2014": return "Insurance Liabilities: Coverage vs. Claims";
      case "2016": return "Reinsurance Held by Measurement Component (Non-PAA)";
      case "2018": return "Reinsurance Held: Coverage vs. Claims";
      default: return "Insurance Liabilities / Reinsurance";
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
