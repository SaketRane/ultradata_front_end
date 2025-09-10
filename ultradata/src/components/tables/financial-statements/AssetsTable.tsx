
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const AssetsTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "CASH AND SHORT-TERM INVESTMENTS", rowCode: "", indent: 0, isHeader: true },
    { name: "Cash", rowCode: "01", indent: 1, isTotal: false },
    { name: "Short-term investments", rowCode: "02", indent: 1, isTotal: false },
    { name: "Total cash and short-term investments", rowCode: "03", indent: 0, isTotal: true },
    { name: "BONDS", rowCode: "", indent: 0, isHeader: true },
    { name: "Government", rowCode: "04", indent: 1, isTotal: false },
    { name: "Corporate", rowCode: "05", indent: 1, isTotal: false },
    { name: "Total bonds", rowCode: "06", indent: 0, isTotal: true },
    { name: "STOCKS", rowCode: "", indent: 0, isHeader: true },
    { name: "Preferred", rowCode: "07", indent: 1, isTotal: false },
    { name: "Common", rowCode: "08", indent: 1, isTotal: false },
    { name: "Total stocks", rowCode: "09", indent: 0, isTotal: true },
    { name: "OTHER INVESTMENTS", rowCode: "", indent: 0, isHeader: true },
    { name: "Mortgage loans", rowCode: "10", indent: 1, isTotal: false },
    { name: "Real estate", rowCode: "11", indent: 1, isTotal: false },
    { name: "Policy loans", rowCode: "12", indent: 1, isTotal: false },
    { name: "Other", rowCode: "13", indent: 1, isTotal: false },
    { name: "Total other investments", rowCode: "14", indent: 0, isTotal: true },
    { name: "TOTAL INVESTMENTS", rowCode: "15", indent: 0, isTotal: true },
    { name: "OTHER ASSETS", rowCode: "", indent: 0, isHeader: true },
    { name: "Accounts receivable", rowCode: "16", indent: 1, isTotal: false },
    { name: "Reinsurance recoverable", rowCode: "17", indent: 1, isTotal: false },
    { name: "Deferred policy acquisition costs", rowCode: "18", indent: 1, isTotal: false },
    { name: "Other", rowCode: "19", indent: 1, isTotal: false },
    { name: "Total other assets", rowCode: "20", indent: 0, isTotal: true },
    { name: "TOTAL ASSETS", rowCode: "21", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "02" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="2010"
    />
  );
};

export default React.memo(AssetsTable);
