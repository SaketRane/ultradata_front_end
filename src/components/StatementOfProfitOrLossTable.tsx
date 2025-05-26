
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const StatementOfProfitOrLossTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "INSURANCE REVENUE", rowCode: "01", indent: 0, isTotal: true },
    { name: "INSURANCE SERVICE EXPENSES", rowCode: "02", indent: 0, isTotal: false },
    { name: "Claims and other directly attributable expenses", rowCode: "03", indent: 1, isTotal: false },
    { name: "Amortisation of insurance acquisition cash flows", rowCode: "04", indent: 1, isTotal: false },
    { name: "Changes that relate to past service - adjustments to the liability for incurred claims", rowCode: "05", indent: 1, isTotal: false },
    { name: "Changes that relate to past service - adjustments to the liability for remaining coverage", rowCode: "06", indent: 1, isTotal: false },
    { name: "Total insurance service expenses", rowCode: "07", indent: 0, isTotal: true },
    { name: "INSURANCE SERVICE RESULT", rowCode: "08", indent: 0, isTotal: true },
    { name: "NET EXPENSES FROM REINSURANCE CONTRACTS HELD", rowCode: "09", indent: 0, isTotal: false },
    { name: "NET INSURANCE RESULT", rowCode: "10", indent: 0, isTotal: true },
    { name: "INVESTMENT RESULT", rowCode: "11", indent: 0, isTotal: false },
    { name: "NET FINANCIAL RESULT", rowCode: "12", indent: 0, isTotal: true },
    { name: "OTHER OPERATING EXPENSES", rowCode: "13", indent: 0, isTotal: false },
    { name: "PROFIT (LOSS) BEFORE TAX", rowCode: "14", indent: 0, isTotal: true },
    { name: "INCOME TAX EXPENSE", rowCode: "15", indent: 0, isTotal: false },
    { name: "NET INCOME (LOSS)", rowCode: "16", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "02" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="2022"
    />
  );
};

export default React.memo(StatementOfProfitOrLossTable);
