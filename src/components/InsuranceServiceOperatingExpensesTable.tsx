
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const InsuranceServiceOperatingExpensesTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "INSURANCE SERVICE EXPENSES", rowCode: "", indent: 0, isHeader: true },
    { name: "Salaries and employee benefits", rowCode: "01", indent: 1, isTotal: false },
    { name: "Other underwriting expenses", rowCode: "02", indent: 1, isTotal: false },
    { name: "Premium taxes, licenses and fees", rowCode: "03", indent: 1, isTotal: false },
    { name: "Total insurance service expenses", rowCode: "04", indent: 0, isTotal: true },
    { name: "OTHER OPERATING EXPENSES", rowCode: "", indent: 0, isHeader: true },
    { name: "General expenses", rowCode: "05", indent: 1, isTotal: false },
    { name: "Investment expenses", rowCode: "06", indent: 1, isTotal: false },
    { name: "Total other operating expenses", rowCode: "07", indent: 0, isTotal: true },
    { name: "TOTAL EXPENSES", rowCode: "08", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "02" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="8025"
    />
  );
};

export default React.memo(InsuranceServiceOperatingExpensesTable);
