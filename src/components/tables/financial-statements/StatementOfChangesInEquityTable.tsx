
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Statement of Changes in Equity Table component for displaying financial statements data
 */
const StatementOfChangesInEquityTable: React.FC = () => {
  // Define table rows with their codes for IFRS 17 format
  const tableRows: RowDefinition[] = useMemo(() => [
    { name: "Opening Balance of Prior Year as previously reported", rowCode: "01", indent: 0, isTotal: true },
    { name: "Restated balance of Prior Year", rowCode: "05", indent: 0, isTotal: true },
    { name: "Changes in Equity for Prior Period", rowCode: "", indent: 0, isHeader: true, isSection: true },
    { name: "Total Comprehensive Income for the year (restated)", rowCode: "09", indent: 1 },
    { name: "Issue of Share Capital", rowCode: "02", indent: 1 },
    { name: "Transfers from/to Retained Earnings", rowCode: "15", indent: 1 },
    { name: "Decrease/increase in Reserves", rowCode: "13", indent: 1 },
    { name: "Dividends", rowCode: "", indent: 1, isHeader: true },
    { name: "Preferred", rowCode: "17", indent: 2 },
    { name: "Common", rowCode: "18", indent: 2 },
    { name: "Other", rowCode: "16", indent: 1 },
    { name: "Restated Balance at End of Prior Year", rowCode: "19", indent: 0, isTotal: true },
    { name: "Opening Balance of Current Year", rowCode: "21", indent: 0, isTotal: true },
    { name: "Changes in Equity for Current Period", rowCode: "", indent: 0, isHeader: true, isSection: true },
    { name: "Total Comprehensive Income for the period", rowCode: "29", indent: 1 },
    { name: "Issue of Share Capital", rowCode: "22", indent: 1 },
    { name: "Transfers from/to Retained Earnings", rowCode: "35", indent: 1 },
    { name: "Decrease/increase in Reserves", rowCode: "33", indent: 1 },
    { name: "Dividends", rowCode: "", indent: 1, isHeader: true },
    { name: "Preferred", rowCode: "37", indent: 2 },
    { name: "Common", rowCode: "38", indent: 2 },
    { name: "Other", rowCode: "36", indent: 1 },
    { name: "Balance at End of Current Period", rowCode: "39", indent: 0, isTotal: true, isFinalTotal: true },
    { name: "", rowCode: "", indent: 0, isHeader: true }, // Empty row for spacing
    { name: "Memo items:", rowCode: "", indent: 0, isHeader: true, isSection: true },
    { name: "Impact of initial application of IFRS 17", rowCode: "60", indent: 1 },
    { name: "Impact of initial application of IFRS 9", rowCode: "62", indent: 1 }
  ], []);

  // Define column data with all the equity components
  const columns: ColumnDefinition[] = useMemo(() => [
    { id: "shareCapital", label: "Share Capital", colCode: "01" },
    { id: "otherCapital", label: "Other Capital", colCode: "13" },
    { id: "contributedSurplus", label: "Contributed Surplus", colCode: "21" },
    { id: "retainedEarnings", label: "Retained Earnings", colCode: "03" },
    { id: "nuclearReserves", label: "Nuclear and Other Reserves", colCode: "23" },
    { id: "fvociFinancialAssets", label: "FVOCI Financial Assets", colCode: "07" },
    { id: "cashFlowHedges", label: "Cash Flow Hedges", colCode: "09" },
    { id: "foreignCurrencyTranslation", label: "Foreign Currency Translation", colCode: "05" },
    { id: "revaluationSurplus", label: "Revaluation Surplus", colCode: "11" },
    { id: "shareOfOCI", label: "Share of OCI of Equity Accounted Investees", colCode: "25" },
    { id: "remeasurementsBenefitPlans", label: "Remeasurements of Defined Benefit Pension Plans", colCode: "27" },
    { id: "insuranceFinanceReserveInsurance", label: "Insurance Finance Reserve from Insurance Contracts", colCode: "28" },
    { id: "insuranceFinanceReserveReinsurance", label: "Insurance Finance Reserve from Reinsurance Contract Held", colCode: "30" },
    { id: "otherAOCI", label: "Other AOCI", colCode: "31" },
    { id: "totalAOCI", label: "Total AOCI", colCode: "39" },
    { id: "totalShareholdersEquity", label: "Total Shareholders' Equity", colCode: "49" },
    { id: "totalPolicyholdersEquity", label: "Total Policyholders' Equity", colCode: "59" },
    { id: "nonControllingInterests", label: "Non-controlling Interests", colCode: "17" },
    { id: "totalEquity", label: "Total Equity", colCode: "19" }
  ], []);

  // Count how many columns are before AOCI
  const aociStartIndex = columns.findIndex(col => col.id === "fvociFinancialAssets");
  // Count how many AOCI columns (from FVOCI Financial Assets to Other AOCI)
  const aociColumnsCount = columns.findIndex(col => col.id === "totalAOCI") - aociStartIndex;

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
