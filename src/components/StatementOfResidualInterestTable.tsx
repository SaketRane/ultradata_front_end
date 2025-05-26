
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const StatementOfResidualInterestTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "POLICYHOLDERS' EQUITY AND LIABILITIES", rowCode: "", indent: 0, isSection: true, isHeader: true },
    { name: "Insurance Contract Liabilities", rowCode: "01", indent: 0, isTotal: false },
    { name: "Investment Contract Liabilities", rowCode: "02", indent: 0, isTotal: false },
    { name: "Accounts Payable and Accrued Liabilities", rowCode: "03", indent: 0, isTotal: false },
    { name: "Other Liabilities", rowCode: "04", indent: 0, isTotal: false },
    { name: "Total Policyholders' Liabilities", rowCode: "05", indent: 0, isTotal: true },
    { name: "POLICYHOLDERS' EQUITY", rowCode: "", indent: 0, isSection: true, isHeader: true },
    { name: "Participating Account Surplus", rowCode: "06", indent: 0, isTotal: false },
    { name: "Non-Participating Account Surplus", rowCode: "07", indent: 0, isTotal: false },
    { name: "Adjustable Product Account Surplus", rowCode: "08", indent: 0, isTotal: false },
    { name: "Other Account Surplus", rowCode: "09", indent: 0, isTotal: false },
    { name: "Total Policyholders' Equity", rowCode: "10", indent: 0, isTotal: true },
    { name: "TOTAL POLICYHOLDERS' EQUITY AND LIABILITIES", rowCode: "11", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "02" }
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
