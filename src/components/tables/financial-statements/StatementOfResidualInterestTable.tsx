
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const StatementOfResidualInterestTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "Statement of Residual Interest - Policyholders'", rowCode: "", indent: 0, isSection: true, isHeader: true },
    { name: "", rowCode: "", indent: 0, isHeader: true }, // Empty row for spacing
    { name: "Opening Balance of Prior Year as previously reported", rowCode: "010", indent: 0, isTotal: false },
    { name: "Restated balance of Prior Year", rowCode: "020", indent: 0, isTotal: false },
    { name: "Adjustments", rowCode: "030", indent: 0, isTotal: false },
    { name: "(Specify)", rowCode: "040", indent: 0, isTotal: false },
    { name: "Share of Net Income (Loss)", rowCode: "050", indent: 0, isTotal: false },
    { name: "Transfers from (to) Non-Par Account", rowCode: "060", indent: 0, isTotal: false },
    { name: "End of Year", rowCode: "099", indent: 0, isTotal: true },
    { name: "", rowCode: "", indent: 0, isHeader: true }, // Empty row for spacing
    { name: "", rowCode: "", indent: 0, isHeader: true }, // Empty row for spacing
    { name: "", rowCode: "", indent: 0, isHeader: true }, // Empty row for spacing
    { name: "Statement of Residual Interest - Liabilities", rowCode: "", indent: 0, isSection: true, isHeader: true },
    { name: "", rowCode: "", indent: 0, isHeader: true }, // Empty row for spacing
    { name: "Opening Balance of Prior Year as previously reported", rowCode: "110", indent: 0, isTotal: false },
    { name: "Restated balance of Prior Year", rowCode: "120", indent: 0, isTotal: false },
    { name: "Adjustments", rowCode: "130", indent: 0, isTotal: false },
    { name: "(Specify)", rowCode: "140", indent: 0, isTotal: false },
    { name: "Share of Net Income (Loss)", rowCode: "150", indent: 0, isTotal: false },
    { name: "Transfers from (to) Non-Par Account", rowCode: "160", indent: 0, isTotal: false },
    { name: "End of Year", rowCode: "199", indent: 0, isTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriodRestated", label: "Prior Period Restated", colCode: "03" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="2041"
    />
  );
};

export default React.memo(StatementOfResidualInterestTable);
