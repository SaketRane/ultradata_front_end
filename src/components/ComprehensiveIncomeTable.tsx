
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useCode from "@/hooks/use-code";

// Define comprehensive income table rows with their codes
const comprehensiveIncomeRows = [
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

// Define column data
const columns = [
  { id: "currentPeriod", label: "Current Period", colCode: "01" },
  { id: "priorPeriod", label: "Prior Period", colCode: "03" }
];

const ComprehensiveIncomeTable: React.FC = () => {
     const {value, handleGetCode} = useCode()
  const generateCellCode = (rowCode: string, colCode: string) => {
    if (!rowCode) return "";
    return `2042${rowCode}${colCode}`;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[800px] text-xs">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow className="h-6">
            <TableHead className="w-[450px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
            {columns.map((col) => (
              <TableHead 
                key={col.id} 
                data-column-code={col.colCode}
                className="text-xs font-semibold text-center py-0 px-1 border-r last:border-r-0"
              >
                {col.label}
                <span className="block text-orange-500 text-[10px]">{col.colCode}</span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {comprehensiveIncomeRows.map((row, index) => {
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
              row.indent === 1 ? "pl-6" : 
              row.indent === 2 ? "pl-10" : 
              row.indent === 3 ? "pl-14" :
              row.indent === 4 ? "pl-18" : "pl-22";
            
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
                </TableCell>
                
                {columns.map((col) => {
                  const dataCode = generateCellCode(row.rowCode, col.colCode);
                  // Skip data cells for section headers and regular headers
                  const isDisabled = !row.rowCode;
                  const cellClass = isDisabled ? "bg-gray-200" : "";
                  
                  return (
                    <TableCell 
                      onMouseEnter={handleGetCode(dataCode)} 
                      key={`${row.rowCode || index}-${col.colCode}`}
                      className={`text-center py-0 px-1 border-r last:border-r-0 group ${cellClass}`}
                      data-code={!isDisabled ? dataCode : ""}
                    >
                      {!isDisabled && dataCode && (
                        <span className="invisible group-hover:visible text-green-600 text-[10px]">
                          {value ? value : null}
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

export default ComprehensiveIncomeTable;
