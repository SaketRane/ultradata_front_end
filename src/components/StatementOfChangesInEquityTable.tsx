
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define table rows with their codes
const equityChangesRows = [
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
  { name: "Balance at End of Current Year", rowCode: "39", indent: 0, isTotal: true, isFinalTotal: true },
];

// Define column data
const columns = [
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
];

const StatementOfChangesInEquityTable: React.FC = () => {
  const generateCellCode = (rowCode: string, colCode: string) => {
    if (!rowCode) return "";
    return `2054${rowCode}${colCode}`;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[800px] text-xs">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow className="h-6">
            <TableHead className="w-[260px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
            <TableHead colSpan={12} className="text-xs font-semibold text-center py-0 px-1 border-r">
              Accumulated Other Comprehensive Income (Loss)
            </TableHead>
            <TableHead colSpan={3} className="text-xs font-semibold text-center py-0 px-1"></TableHead>
          </TableRow>
          <TableRow className="h-6">
            <TableHead className="w-[260px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
            {columns.map((col) => (
              <TableHead
                key={col.id}
                data-column-code={col.colCode}
                className={`text-xs font-semibold text-center py-0 px-1 border-r last:border-r-0 ${
                  col.isAOCI ? "bg-blue-50/60" : ""
                }`}
                style={{ 
                  minWidth: "80px",
                  maxWidth: col.id === "shareOfOCI" || col.id === "remeasurementsBenefitPlans" ? "120px" : "100px"
                }}
              >
                {col.label}
                <span className="block text-orange-500 text-[9px]">{col.colCode}</span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {equityChangesRows.map((row, index) => {
            // Determine background color for total rows
            const bgClass = row.isTotal ? "bg-gray-50" : "";
            
            // Determine font styling
            const fontClass = row.isSection 
              ? "font-semibold uppercase" 
              : row.isHeader 
                ? "font-medium italic" 
                : row.isFinalTotal 
                  ? "font-bold uppercase" 
                  : row.isTotal
                    ? "font-medium"
                    : "font-normal";
            
            // Calculate left padding based on indentation level
            const paddingClass = 
              row.indent === 0 ? "pl-2" : 
              row.indent === 1 ? "pl-6" : "pl-10";
            
            // Add dotted bottom border for most rows
            const borderClass = row.isHeader ? "" : "border-dotted border-b border-gray-300";
            
            return (
              <TableRow 
                key={index} 
                className={`${bgClass} ${borderClass} h-5`} 
                data-row-code={row.rowCode}
              >
                <TableCell 
                  className={`${paddingClass} ${fontClass} py-0 pr-2 border-r text-left`}
                >
                  {row.name}
                  {row.rowCode && (
                    <span className="text-orange-500 ml-2 text-[9px]">{row.rowCode}</span>
                  )}
                </TableCell>
                
                {columns.map((col) => {
                  const dataCode = generateCellCode(row.rowCode, col.colCode);
                  // Skip data cells for section headers and regular headers
                  const isDisabled = !row.rowCode || row.isHeader;
                  const cellClass = isDisabled 
                    ? "bg-gray-200" 
                    : col.isAOCI 
                      ? "bg-blue-50/30" 
                      : "";
                  
                  return (
                    <TableCell 
                      key={`${row.rowCode || index}-${col.colCode}`}
                      className={`text-center py-0 px-1 border-r last:border-r-0 group ${cellClass}`}
                      data-code={!isDisabled ? dataCode : ""}
                    >
                      {!isDisabled && dataCode && (
                        <span className="invisible group-hover:visible text-green-600 text-[9px]">
                          {dataCode}
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatementOfChangesInEquityTable;
