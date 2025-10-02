
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const ComprehensiveIncomeTable: React.FC = () => {
  const rows: RowDefinition[] = [
    // Comprehensive Income (Loss) section
    { name: "Comprehensive Income (Loss)", rowCode: "", indent: 0, isSection: true, isHeader: true },
    { name: "Net Income", rowCode: "01", indent: 1, isTotal: false },
    { name: "Other Comprehensive Income (Loss):", rowCode: "", indent: 1, isHeader: true },
    { name: "Items that may be reclassified subsequently to Net Income:", rowCode: "", indent: 2, isHeader: true },
    { name: "FVOCI:", rowCode: "", indent: 3, isHeader: true },
    { name: "Change in Unrealized Gains and Losses:", rowCode: "", indent: 4, isHeader: true },
    { name: "- Loans", rowCode: "02", indent: 5, isTotal: false },
    { name: "- Bonds and Debentures", rowCode: "03", indent: 5, isTotal: false },
    { name: "- Equities (IAS 39)", rowCode: "04", indent: 5, isTotal: false },
    { name: "Reclassification of (Gains) Losses to Net Income", rowCode: "05", indent: 4, isTotal: false },
    { name: "Overlay approach", rowCode: "", indent: 3, isHeader: true },
    { name: "Change in Unrealized Gains and Losses related to overlay approach for financial instruments", rowCode: "", indent: 4, isHeader: true },
    { name: "Unrealized Gains and Losses", rowCode: "15", indent: 5, isTotal: false },
    { name: "Reclassification of (Gains) Losses from Net Income", rowCode: "16", indent: 5, isTotal: false },
    { name: "Derivatives Designated as Cash Flow Hedges", rowCode: "", indent: 3, isHeader: true },
    { name: "Change in Unrealized Gains and Losses", rowCode: "06", indent: 4, isTotal: false },
    { name: "Reclassification of (Gains) Losses to Net Income", rowCode: "07", indent: 4, isTotal: false },
    { name: "Foreign Currency Translation", rowCode: "", indent: 3, isHeader: true },
    { name: "Change in Unrealized Gains and Losses", rowCode: "08", indent: 4, isTotal: false },
    { name: "Impact of Hedging", rowCode: "09", indent: 4, isTotal: false },
    { name: "Share of Other Comprehensive Income of Subsidiaries, Associates & Joint Ventures", rowCode: "14", indent: 3, isTotal: false },
    { name: "Other", rowCode: "18", indent: 3, isTotal: false },
    { name: "Subtotal of items that may be reclassified subsequently to Net Income", rowCode: "19", indent: 2, isTotal: true },
    { name: "Items that will not be reclassified subsequently to Net Income:", rowCode: "", indent: 2, isHeader: true },
    { name: "FVOCI:", rowCode: "", indent: 3, isHeader: true },
    { name: "Change in Unrealized Gains and Losses:", rowCode: "", indent: 4, isHeader: true },
    { name: "- Equities (IFRS 9)", rowCode: "25", indent: 5, isTotal: false },
    { name: "Revaluation Surplus", rowCode: "31", indent: 3, isTotal: false },
    { name: "Share of Other Comprehensive Income of Subsidiaries, Associates & Joint Ventures", rowCode: "11", indent: 3, isTotal: false },
    { name: "Remeasurements of Defined Benefit Plans", rowCode: "34", indent: 3, isTotal: false },
    { name: "Other", rowCode: "12", indent: 3, isTotal: false },
    { name: "Subtotal of items that will not be reclassified subsequently to Net Income", rowCode: "29", indent: 2, isTotal: true },
    { name: "Total Other Comprehensive Income (Loss)", rowCode: "21", indent: 1, isTotal: true },
    { name: "Total Comprehensive Income (Loss)", rowCode: "39", indent: 0, isTotal: true, isFinalTotal: true },
    { name: "Attributable to:", rowCode: "", indent: 0, isHeader: true },
    { name: "Non-controlling Interests", rowCode: "60", indent: 1, isTotal: false },
    { name: "Equity Holders", rowCode: "62", indent: 1, isTotal: false },
    
    // Accumulated Other Comprehensive Income (Loss) section
    { name: "Accumulated Other Comprehensive Income (Loss)", rowCode: "", indent: 0, isSection: true, isHeader: true },
    { name: "Accumulated Gains (Losses) on:", rowCode: "", indent: 1, isHeader: true },
    { name: "Items that may be reclassified subsequently to Net Income:", rowCode: "", indent: 2, isHeader: true },
    { name: "FVOCI:", rowCode: "", indent: 3, isHeader: true },
    { name: "- Loans", rowCode: "42", indent: 4, isTotal: false },
    { name: "- Bonds and Debentures", rowCode: "43", indent: 4, isTotal: false },
    { name: "- Equities (IAS 39)", rowCode: "44", indent: 4, isTotal: false },
    { name: "Overlay Approach", rowCode: "55", indent: 3, isTotal: false },
    { name: "Derivatives Designated as Cash Flow Hedges", rowCode: "45", indent: 3, isTotal: false },
    { name: "Foreign Currency (net of hedging activities)", rowCode: "46", indent: 3, isTotal: false },
    { name: "Share of Other Comprehensive Income of Subsidiaries, Associates & Joint Ventures", rowCode: "52", indent: 3, isTotal: false },
    { name: "Other", rowCode: "68", indent: 3, isTotal: false },
    { name: "Subtotal of items that may be reclassified subsequently to Net Income", rowCode: "69", indent: 2, isTotal: true },
    { name: "Items that will not be reclassified subsequently to Net Income:", rowCode: "", indent: 2, isHeader: true },
    { name: "FVOCI:", rowCode: "", indent: 3, isHeader: true },
    { name: "- Equities (IFRS 9)", rowCode: "65", indent: 4, isTotal: false },
    { name: "Revaluation Surplus", rowCode: "71", indent: 3, isTotal: false },
    { name: "Share of OCI of Subsidiaries, Associates & Joint Ventures", rowCode: "51", indent: 3, isTotal: false },
    { name: "Remeasurements of Defined Benefit Plans", rowCode: "74", indent: 3, isTotal: false },
    { name: "Other", rowCode: "49", indent: 3, isTotal: false },
    { name: "Subtotal of items that will not be reclassified subsequently to Net Income", rowCode: "79", indent: 2, isTotal: true },
    { name: "Balance at end of Year", rowCode: "59", indent: 1, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "03" }
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
