
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const ComprehensiveIncomeTable: React.FC = () => {
  const rows: RowDefinition[] = [
    // Comprehensive Income (Loss) section
    { name: "Comprehensive Income (Loss)", rowCode: "", indent: 0, isSection: true, isHeader: true },
    { name: "Net Income (Loss)", rowCode: "01", indent: 1, isTotal: false },
    { name: "Other Comprehensive Income (Loss):", rowCode: "", indent: 1, isHeader: true },
    { name: "Items that may be reclassified subsequently to Net Income (Loss):", rowCode: "", indent: 2, isHeader: true },
    { name: "Fair Value through Other Comprehensive Income (FVOCI):", rowCode: "", indent: 3, isHeader: true },
    { name: "Change in Unrealized Gains and Losses:", rowCode: "", indent: 4, isHeader: true },
    { name: "- Loans", rowCode: "02", indent: 5, isTotal: false },
    { name: "- Bonds and Debentures", rowCode: "03", indent: 5, isTotal: false },
    { name: "Reclassification of (Gains) Losses to Net Income (Loss)", rowCode: "05", indent: 4, isTotal: false },
    { name: "Derivatives Designated as Cash Flow Hedges", rowCode: "", indent: 3, isHeader: true },
    { name: "Change in Unrealized Gains and Losses", rowCode: "06", indent: 4, isTotal: false },
    { name: "Reclassification of (Gains) Losses to Net Income (Loss)", rowCode: "07", indent: 4, isTotal: false },
    { name: "Foreign Currency Translation", rowCode: "", indent: 3, isHeader: true },
    { name: "Change in Unrealized Gains and Losses", rowCode: "08", indent: 4, isTotal: false },
    { name: "Reclassification of (Gains) Losses to Net Income (Loss)", rowCode: "13", indent: 4, isTotal: false },
    { name: "Impact of Hedging", rowCode: "09", indent: 4, isTotal: false },
    { name: "Share of Other Comprehensive Income (Loss) of Equity Accounted Investees (may be reclassified)", rowCode: "14", indent: 3, isTotal: false },
    { name: "Insurance Finance Income (Expenses) Reserve from Insurance Contracts", rowCode: "23", indent: 3, isTotal: false },
    { name: "Insurance Finance Income (Expenses) Reserve from Reinsurance Contract Held", rowCode: "24", indent: 3, isTotal: false },
    { name: "Other", rowCode: "18", indent: 3, isTotal: false },
    { name: "Subtotal of items that may be reclassified subsequently to Net Income (Loss)", rowCode: "19", indent: 2, isTotal: true },
    { name: "Items that will not be reclassified subsequently to Net Income (Loss):", rowCode: "", indent: 2, isHeader: true },
    { name: "Fair Value through Other Comprehensive Income (FVOCI):", rowCode: "", indent: 3, isHeader: true },
    { name: "Change in Unrealized Gains and Losses:", rowCode: "", indent: 4, isHeader: true },
    { name: "- Equities", rowCode: "25", indent: 5, isTotal: false },
    { name: "Revaluation Surplus", rowCode: "31", indent: 3, isTotal: false },
    { name: "Share of Other Comprehensive Income (Loss) of Equity Accounted Investees", rowCode: "11", indent: 3, isTotal: false },
    { name: "Remeasurements of Defined Benefit Pension Plans", rowCode: "34", indent: 3, isTotal: false },
    { name: "Other", rowCode: "12", indent: 3, isTotal: false },
    { name: "Subtotal of items that will not be reclassified subsequently to Net Income (Loss)", rowCode: "29", indent: 2, isTotal: true },
    { name: "Total Other Comprehensive Income (Loss)", rowCode: "21", indent: 1, isTotal: true },
    { name: "Total Comprehensive Income (Loss)", rowCode: "39", indent: 0, isTotal: true, isFinalTotal: true },
    { name: "Attributable to:", rowCode: "", indent: 0, isHeader: true },
    { name: "Participating Policyholders/Certificateholders", rowCode: "80", indent: 1, isTotal: false, disabled: true },
    { name: "Other Fund Account", rowCode: "82", indent: 1, isTotal: false, disabled: true },
    { name: "Residual Interest Policyholders", rowCode: "84", indent: 1, isTotal: false },
    { name: "Non-controlling Interests", rowCode: "60", indent: 1, isTotal: false },
    { name: "Equity Holders", rowCode: "62", indent: 1, isTotal: false },
    
    // Spacing
    { name: "", rowCode: "", indent: 0, isHeader: true },
    
    // Accumulated Other Comprehensive Income (Loss) section
    { name: "Accumulated Other Comprehensive Income (Loss)", rowCode: "", indent: 0, isSection: true, isHeader: true },
    { name: "Accumulated Gains (Losses), net of tax, on:", rowCode: "", indent: 1, isHeader: true },
    { name: "Items that may be reclassified subsequently to Net Income (Loss):", rowCode: "", indent: 2, isHeader: true },
    { name: "Fair Value through Other Comprehensive Income (FVOCI)", rowCode: "41", indent: 3, isTotal: false },
    { name: "Derivatives Designated as Cash Flow Hedges", rowCode: "45", indent: 3, isTotal: false },
    { name: "Foreign Currency Translation (net of hedging activities)", rowCode: "46", indent: 3, isTotal: false },
    { name: "Share of Other Comprehensive Income (Loss) of Equity Accounted Investees (may be reclassified)", rowCode: "52", indent: 3, isTotal: false },
    { name: "Insurance Finance Income (Expenses) Reserve from Insurance Contracts", rowCode: "63", indent: 3, isTotal: false },
    { name: "Insurance Finance Income (Expenses) Reserve from Reinsurance Contract Held", rowCode: "64", indent: 3, isTotal: false },
    { name: "Other", rowCode: "68", indent: 3, isTotal: false },
    { name: "Subtotal of items that may be reclassified subsequently to Net Income (Loss)", rowCode: "69", indent: 2, isTotal: true },
    { name: "Items that will not be reclassified subsequently to Net Income (Loss):", rowCode: "", indent: 2, isHeader: true },
    { name: "Fair Value through Other Comprehensive Income (FVOCI)", rowCode: "70", indent: 3, isTotal: false },
    { name: "Revaluation Surplus", rowCode: "71", indent: 3, isTotal: false },
    { name: "Share of Other Comprehensive Income (Loss) of Equity Accounted Investees", rowCode: "51", indent: 3, isTotal: false },
    { name: "Remeasurements of Defined Benefit Pension Plans", rowCode: "74", indent: 3, isTotal: false },
    { name: "Other", rowCode: "49", indent: 3, isTotal: false },
    { name: "Subtotal of items that will not be reclassified subsequently to Net Income (Loss)", rowCode: "79", indent: 2, isTotal: true },
    { name: "Balance at end of Period", rowCode: "59", indent: 1, isTotal: true, isFinalTotal: true },
    { name: "Attributable to:", rowCode: "", indent: 0, isHeader: true },
    { name: "Participating Policyholders/Certificateholders", rowCode: "90", indent: 1, isTotal: false, disabled: true },
    { name: "Other Fund Account", rowCode: "92", indent: 1, isTotal: false, disabled: true },
    { name: "Residual Interest Policyholders", rowCode: "94", indent: 1, isTotal: false },
    { name: "Non-controlling Interests", rowCode: "96", indent: 1, isTotal: false },
    { name: "Equity Holders", rowCode: "98", indent: 1, isTotal: false }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriodRestated", label: "Prior Period Restated", colCode: "03" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="2042"
    />
  );
};

export default React.memo(ComprehensiveIncomeTable);
