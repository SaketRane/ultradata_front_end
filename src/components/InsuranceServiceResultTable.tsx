
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const InsuranceServiceResultTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "INSURANCE REVENUE", rowCode: "01", indent: 0, isTotal: true },
    { name: "INSURANCE SERVICE EXPENSES", rowCode: "", indent: 0, isHeader: true },
    { name: "Incurred claims and other incurred directly attributable expenses", rowCode: "02", indent: 1, isTotal: false },
    { name: "Amortisation of insurance acquisition cash flows", rowCode: "03", indent: 1, isTotal: false },
    { name: "Changes that relate to past service", rowCode: "04", indent: 1, isTotal: false },
    { name: "Other insurance service expenses", rowCode: "05", indent: 1, isTotal: false },
    { name: "Total insurance service expenses", rowCode: "06", indent: 0, isTotal: true },
    { name: "INSURANCE SERVICE RESULT", rowCode: "07", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "02" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="6025"
    />
  );
};

export default React.memo(InsuranceServiceResultTable);
