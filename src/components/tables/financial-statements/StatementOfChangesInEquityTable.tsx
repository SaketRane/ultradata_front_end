
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Statement of Changes in Equity Table component for displaying financial statements data
 */
const StatementOfChangesInEquityTable: React.FC = () => {
  // Define table rows with their codes
  const tableRows: RowDefinition[] = useMemo(() => [
    { name: "Balance at Beginning of Prior Year", rowCode: "01", indent: 0, isTotal: true },
    { name: "Total Comprehensive Income for the year", rowCode: "09", indent: 1, isTotal: false },
    { name: "Issue of Share Capital", rowCode: "02", indent: 1, isTotal: false },
    { name: "Transfer from/to Retained Earnings", rowCode: "15", indent: 1, isTotal: false },
    { name: "Decrease/increase in Reserves", rowCode: "13", indent: 1, isTotal: false },
    { name: "Dividends", rowCode: "", indent: 1, isHeader: true },
    { name: "Preferred", rowCode: "17", indent: 2, isTotal: false },
    { name: "Common", rowCode: "18", indent: 2, isTotal: false },
    { name: "Other", rowCode: "16", indent: 1, isTotal: false },
    { name: "Balance at End of Prior Year", rowCode: "19", indent: 0, isTotal: true },
    { name: "Changes in Equity for Current Year", rowCode: "", indent: 0, isSection: true, isHeader: true },
    { name: "Total Comprehensive Income for the year", rowCode: "29", indent: 1, isTotal: false },
    { name: "Issue of Share Capital", rowCode: "22", indent: 1, isTotal: false },
    { name: "Transfer from/to Retained Earnings", rowCode: "35", indent: 1, isTotal: false },
    { name: "Decrease/increase in Reserves", rowCode: "33", indent: 1, isTotal: false },
    { name: "Dividends", rowCode: "", indent: 1, isHeader: true },
    { name: "Preferred", rowCode: "37", indent: 2, isTotal: false },
    { name: "Common", rowCode: "38", indent: 2, isTotal: false },
    { name: "Other", rowCode: "36", indent: 1, isTotal: false },
    { name: "Balance at End of Current Year", rowCode: "39", indent: 0, isTotal: true, isFinalTotal: true }
  ], []);

  // Define column data
  const columns: ColumnDefinition[] = useMemo(() => [
    { id: "shareCapital", label: "Share Capital", colCode: "01" },
    { id: "otherCapital", label: "Other Capital", colCode: "13" },
    { id: "contributedSurplus", label: "Contributed Surplus", colCode: "21" },
    { id: "retainedEarnings", label: "Retained Earnings", colCode: "03" },
    { id: "reserves", label: "Reserves", colCode: "23" },
    { id: "fvociFinancialAssets", label: "FVOCI Financial Assets", colCode: "07", isAOCI: true },
    { id: "cashFlowHedges", label: "Cash Flow Hedges", colCode: "09", isAOCI: true },
    { id: "translationForeignOps", label: "Translation of Foreign Operations", colCode: "05", isAOCI: true },
    { id: "revaluationSurplus", label: "Revaluation Surplus", colCode: "11", isAOCI: true },
    { id: "shareOfOCI", label: "Share of OCI of Associates & Joint Ventures", colCode: "25", isAOCI: true },
    { id: "remeasurementsBenefitPlans", label: "Remeasurements of Defined Benefit Plans", colCode: "27", isAOCI: true },
    { id: "otherAOCI", label: "Other AOCI", colCode: "31", isAOCI: true },
    { id: "totalEquity", label: "Total Policyholders/ Shareholder's Equity", colCode: "15" },
    { id: "nonControllingInterests", label: "Non-controlling Interests", colCode: "17" },
    { id: "totalEquityWithNCI", label: "Total Equity", colCode: "19" }
  ], []);

  // Count how many columns are before AOCI and total AOCI columns
  const aociStartIndex = columns.findIndex(col => col.isAOCI);

  const aociColumnsCount = columns.filter(col => col.isAOCI).length;

  // Create secondary header for AOCI grouping
  const secondaryHeader = (
    <TableRow className="h-6">
      <TableHead className="w-[260px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
      <TableHead colSpan={aociStartIndex} className="text-xs font-semibold text-center py-0 px-1"></TableHead>
      <TableHead colSpan={aociColumnsCount} className="text-xs font-semibold text-center py-0 px-1 border-r bg-blue-50/60">
        Accumulated Other Comprehensive Income (Loss)
      </TableHead>
      <TableHead colSpan={columns.length - aociStartIndex - aociColumnsCount} className="text-xs font-semibold text-center py-0 px-1"></TableHead>
    </TableRow>
  );

  return (
    <FinancialTable 
      rows={tableRows} 
      columns={columns} 
      sheetCode="2054"
      secondaryHeader={secondaryHeader}
    />
  );
};

export default React.memo(StatementOfChangesInEquityTable);
