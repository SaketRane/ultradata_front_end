
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useCode from "@/hooks/use-code";

// Define statement of income table rows with their codes
const statementOfIncomeRows = [
  { name: "UNDERWRITING OPERATIONS", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Premiums Written", rowCode: "", indent: 1, isHeader: true },
  { name: "Direct", rowCode: "01", indent: 2, isTotal: false },
  { name: "Reinsurance Assumed", rowCode: "02", indent: 2, isTotal: false },
  { name: "Reinsurance Ceded", rowCode: "03", indent: 2, isTotal: false },
  { name: "Net Premiums Written", rowCode: "04", indent: 1, isTotal: true },
  { name: "Decrease (increase) in Net Unearned Premiums", rowCode: "05", indent: 2, isTotal: false },
  { name: "Net Premiums Earned", rowCode: "06", indent: 1, isTotal: true },
  { name: "Service Charges", rowCode: "07", indent: 2, isTotal: false },
  { name: "Other", rowCode: "08", indent: 2, isTotal: false },
  { name: "Total Underwriting Revenue", rowCode: "09", indent: 1, isTotal: true },
  { name: "Gross Claims and Adjustment Expenses", rowCode: "62", indent: 2, isTotal: false },
  { name: "Reinsurers' share of claims and adjustment expenses", rowCode: "64", indent: 2, isTotal: false },
  { name: "Net Claims and Adjustment Expenses", rowCode: "10", indent: 1, isTotal: true },
  { name: "Acquisition Expenses", rowCode: "", indent: 2, isHeader: true },
  { name: "Gross Commissions", rowCode: "66", indent: 3, isTotal: false },
  { name: "Ceded Commissions", rowCode: "68", indent: 3, isTotal: false },
  { name: "Taxes", rowCode: "12", indent: 3, isTotal: false },
  { name: "Other", rowCode: "14", indent: 3, isTotal: false },
  { name: "General Expenses", rowCode: "16", indent: 2, isTotal: false },
  { name: "Total Claims and Expenses", rowCode: "19", indent: 1, isTotal: true },
  { name: "Premium Deficiency Adjustments", rowCode: "20", indent: 2, isTotal: false },
  { name: "Underwriting Income (Loss)", rowCode: "29", indent: 1, isTotal: true },
  { name: "INVESTMENT OPERATIONS", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Income", rowCode: "32", indent: 1, isTotal: false },
  { name: "Gains (Losses) from FVO or FVTPL", rowCode: "35", indent: 1, isTotal: false },
  { name: "Realized Gains (Losses)", rowCode: "33", indent: 1, isTotal: false },
  { name: "Expenses", rowCode: "34", indent: 1, isTotal: false },
  { name: "Net Investment Income", rowCode: "39", indent: 1, isTotal: true },
  { name: "OTHER REVENUE AND EXPENSES", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Income (Loss) from Ancillary Operations (net of Expenses of $'000 ...................)", rowCode: "40", indent: 1, isTotal: false, hasExpensesCol: true },
  { name: "Share of Net Income (Loss) of Subsidiaries, Associates & Joint Ventures", rowCode: "41", indent: 1, isTotal: false },
  { name: "Overlay approach adjustment for financial instruments (Reclass from P&L to OCI)", rowCode: "48", indent: 1, isTotal: false },
  { name: "Share of Net Income (Loss) of Pooled Funds using Equity Method", rowCode: "47", indent: 1, isTotal: false },
  { name: "Gains (Losses) from fluctuations in Foreign Exchange Rates", rowCode: "42", indent: 1, isTotal: false },
  { name: "Other Revenues", rowCode: "44", indent: 1, isTotal: false },
  { name: "Finance costs", rowCode: "45", indent: 1, isTotal: false },
  { name: "Other Expenses", rowCode: "46", indent: 1, isTotal: false },
  { name: "Net Income (Loss) before Income Taxes", rowCode: "49", indent: 1, isTotal: true },
  { name: "INCOME TAXES", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Current", rowCode: "50", indent: 1, isTotal: false },
  { name: "Deferred", rowCode: "51", indent: 1, isTotal: false },
  { name: "Total Income Taxes", rowCode: "59", indent: 1, isTotal: true },
  { name: "NET INCOME (LOSS) FOR THE YEAR", rowCode: "89", indent: 0, isTotal: true, isFinalTotal: true },
  { name: "ATTRIBUTABLE TO:", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Non-controlling Interests", rowCode: "80", indent: 1, isTotal: false },
  { name: "Equity Holders", rowCode: "82", indent: 1, isTotal: false }
];

// Define column data
const columns = [
  { id: "currentPeriod", label: "Current Period", colCode: "01" },
  { id: "priorPeriod", label: "Prior Period", colCode: "03" },
  { id: "expenses", label: "Expenses", colCode: "04" }
];

const StatementOfIncomeTable: React.FC = () => {

    const {value, handleGetCode} = useCode()

  const generateCellCode = (rowCode: string, colCode: string) => {
    if (!rowCode) return "";
    return `2030${rowCode}${colCode}`;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[800px] text-xs">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow className="h-6">
            <TableHead className="w-[400px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
            {columns.map((col) => (
              <TableHead 
                key={col.id} 
                data-column-code={col.colCode}
                className="text-xs font-semibold text-center py-0 px-1 border-r last:border-r-0"
              >
                {col.label}
                <span className="block text-orange-500 text-[9px]">{col.colCode}</span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {statementOfIncomeRows.map((row, index) => {
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
              row.indent === 2 ? "pl-10" : "pl-14";
            
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
                  const isDisabled = !row.rowCode || (col.id === "expenses" && !row.hasExpensesCol);
                  const cellClass = isDisabled ? "bg-gray-200" : "";
                  
                  return (
                    <TableCell 
                      onMouseEnter={handleGetCode(dataCode)}
                      key={`${row.rowCode || index}-${col.colCode}`}
                      className={`text-center py-0 px-1 border-r last:border-r-0 group ${cellClass}`}
                      data-code={!isDisabled ? dataCode : ""}
                    >
                      {!isDisabled && dataCode && (
                        <span className="invisible group-hover:visible text-green-600 text-[9px]">
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

export default StatementOfIncomeTable;
