
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const SummaryOfInvestmentsTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "BONDS", rowCode: "", indent: 0, isHeader: true },
    { name: "Government of Canada", rowCode: "01", indent: 1, isTotal: false },
    { name: "Provincial", rowCode: "02", indent: 1, isTotal: false },
    { name: "Municipal", rowCode: "03", indent: 1, isTotal: false },
    { name: "Corporate and other", rowCode: "04", indent: 1, isTotal: false },
    { name: "Total bonds", rowCode: "05", indent: 0, isTotal: true },
    { name: "STOCKS", rowCode: "", indent: 0, isHeader: true },
    { name: "Preferred stocks", rowCode: "06", indent: 1, isTotal: false },
    { name: "Common stocks", rowCode: "07", indent: 1, isTotal: false },
    { name: "Total stocks", rowCode: "08", indent: 0, isTotal: true },
    { name: "MORTGAGES", rowCode: "09", indent: 0, isTotal: false },
    { name: "REAL ESTATE", rowCode: "10", indent: 0, isTotal: false },
    { name: "POLICY LOANS", rowCode: "11", indent: 0, isTotal: false },
    { name: "OTHER INVESTMENTS", rowCode: "12", indent: 0, isTotal: false },
    { name: "TOTAL INVESTMENTS", rowCode: "13", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "carryingValue", label: "Carrying Value", colCode: "01" },
    { id: "fairValue", label: "Fair Value", colCode: "02" },
    { id: "priorCarryingValue", label: "Prior Carrying Value", colCode: "03" },
    { id: "priorFairValue", label: "Prior Fair Value", colCode: "04" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="4008"
    />
  );
};

export default React.memo(SummaryOfInvestmentsTable);
