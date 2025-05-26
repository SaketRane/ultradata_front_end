
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Statement of Profit or Loss Table component
 * Displays detailed breakdown of revenue, expenses, and profit/loss items
 */
const StatementOfProfitOrLossTable: React.FC = () => {
  // Define table rows with proper structure and indentation
  const rows: RowDefinition[] = useMemo(() => [
    { name: "Revenue from PAA Contracts", rowCode: "010", indent: 1, isTotal: false },
    { name: "Revenue from GMM Contracts (excluding VFA contracts)", rowCode: "020", indent: 1, isTotal: false },
    { name: "Revenue from VFA Contracts", rowCode: "030", indent: 1, isTotal: false },
    { name: "Total Insurance Revenue", rowCode: "099", indent: 0, isTotal: true },
    
    { name: "Insurance service expenses", rowCode: "110", indent: 0, isTotal: false },
    { name: "Net expenses from reinsurance contracts held", rowCode: "120", indent: 0, isTotal: false },
    { name: "INSURANCE SERVICE RESULT", rowCode: "199", indent: 0, isTotal: true },
    
    { name: "Interest revenue on financial assets not measured at FVTPL", rowCode: "220", indent: 1, isTotal: false },
    { name: "Net investment income excluding segregated funds", rowCode: "230", indent: 1, isTotal: false },
    { name: "Net investment income - segregated funds", rowCode: "240", indent: 1, isTotal: false },
    { name: "Provision for Credit Losses", rowCode: "250", indent: 1, isTotal: false },
    { name: "Investment Return", rowCode: "300", indent: 0, isTotal: true },
    
    { name: "Net finance income (expenses) from insurance contracts excluding segregated funds", rowCode: "310", indent: 1, isTotal: false },
    { name: "Net finance income (expenses) from segregated funds", rowCode: "315", indent: 1, isTotal: false },
    { name: "Net finance income (expenses) from reinsurance contracts held", rowCode: "320", indent: 1, isTotal: false },
    { name: "Movement in investment contract liabilities", rowCode: "330", indent: 1, isTotal: false },
    { name: "NET INVESTMENT RESULT", rowCode: "399", indent: 0, isTotal: true },
    
    { name: "Other Income", rowCode: "410", indent: 1, isTotal: false },
    { name: "Share of Net Income (Loss) of Equity Accounted Investees", rowCode: "415", indent: 1, isTotal: false },
    { name: "General and Operating Expenses", rowCode: "420", indent: 1, isTotal: false },
    { name: "OTHER INCOME AND EXPENSES", rowCode: "430", indent: 0, isTotal: true },
    
    { name: "PROFIT (LOSS) BEFORE TAXES", rowCode: "440", indent: 0, isTotal: true },
    
    { name: "Current Taxes", rowCode: "450", indent: 1, isTotal: false },
    { name: "Deferred Taxes", rowCode: "460", indent: 1, isTotal: false },
    { name: "Total Income Taxes", rowCode: "499", indent: 0, isTotal: true },
    
    { name: "PROFIT (LOSS) AFTER TAXES", rowCode: "510", indent: 0, isTotal: true },
    
    { name: "Discontinued Operations (net of Income Taxes of $______)", rowCode: "520", indent: 0, isTotal: false },
    
    { name: "NET INCOME (LOSS) FOR THE YEAR", rowCode: "999", indent: 0, isTotal: true, isFinalTotal: true },
    
    { name: "ATTRIBUTABLE TO:", rowCode: "", indent: 0, isHeader: true },
    { name: "Participating Policyholders/Certificateholders", rowCode: "610", indent: 1, isTotal: false },
    { name: "Other Fund Account", rowCode: "620", indent: 1, isTotal: false },
    { name: "Residual Interest Policyholders", rowCode: "630", indent: 1, isTotal: false },
    { name: "Non-controlling Interests", rowCode: "640", indent: 1, isTotal: false },
    { name: "Equity Holders", rowCode: "650", indent: 1, isTotal: false }
  ], []);

  // Define column data for current period, prior period, and total
  const columns: ColumnDefinition[] = useMemo(() => [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period Restated", colCode: "03" },
    { id: "total", label: "Total", colCode: "04" }
  ], []);

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="2022" 
      maxHeight="85vh"
    />
  );
};

export default React.memo(StatementOfProfitOrLossTable);
