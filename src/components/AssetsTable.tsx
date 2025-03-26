
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define assets table rows with their codes
const assetsTableRows = [
  { name: "Cash and Cash Equivalents", rowCode: "01", indent: 0, isTotal: false, hasVested: true },
  { name: "Investment Income due and accrued", rowCode: "02", indent: 0, isTotal: false, hasVested: true },
  { name: "Assets held for sale", rowCode: "50", indent: 0, isTotal: false, hasVested: true },
  { name: "Investments:", rowCode: "", indent: 0, isHeader: true, hasVested: false },
  { name: "Short Term Investments", rowCode: "04", indent: 1, isTotal: false, hasVested: true },
  { name: "Bonds and Debentures", rowCode: "05", indent: 1, isTotal: false, hasVested: true },
  { name: "Mortgage Loans", rowCode: "06", indent: 1, isTotal: false, hasVested: true },
  { name: "Preferred Shares", rowCode: "07", indent: 1, isTotal: false, hasVested: true },
  { name: "Common Shares", rowCode: "08", indent: 1, isTotal: false, hasVested: true },
  { name: "Investment Properties", rowCode: "09", indent: 1, isTotal: false, hasVested: true },
  { name: "Other Loans and Invested Assets", rowCode: "10", indent: 1, isTotal: false, hasVested: true },
  { name: "Total Investments (lines 04 to 10)", rowCode: "19", indent: 0, isTotal: true, hasVested: true },
  { name: "Receivables:", rowCode: "", indent: 0, isHeader: true, hasVested: false },
  { name: "Unaffiliated Agents and Brokers", rowCode: "20", indent: 1, isTotal: false, hasVested: false },
  { name: "Policyholders", rowCode: "21", indent: 1, isTotal: false, hasVested: false },
  { name: "Instalment Premiums", rowCode: "22", indent: 1, isTotal: false, hasVested: false },
  { name: "Other Insurers", rowCode: "23", indent: 1, isTotal: false, hasVested: false },
  { name: "Facility Association and the \"P.R.R.\"", rowCode: "24", indent: 1, isTotal: false, hasVested: false },
  { name: "Subsidiaries, Associates & Joint Ventures", rowCode: "25", indent: 1, isTotal: false, hasVested: false },
  { name: "Other Receivables", rowCode: "27", indent: 1, isTotal: false, hasVested: false },
  { name: "Recoverable from Reinsurers:", rowCode: "", indent: 0, isHeader: true, hasVested: false },
  { name: "Unearned Premiums", rowCode: "30", indent: 1, isTotal: false, hasVested: false },
  { name: "Unpaid Claims and Adjustment Expenses", rowCode: "31", indent: 1, isTotal: false, hasVested: false },
  { name: "Other Recoverables on Unpaid Claims", rowCode: "37", indent: 0, isTotal: false, hasVested: false },
  { name: "Investments Accounted for Using the Equity Method:", rowCode: "", indent: 0, isHeader: true, hasVested: false },
  { name: "Interests in Subsidiaries, Associates & Joint Ventures", rowCode: "40", indent: 1, isTotal: false, hasVested: false },
  { name: "Pooled Funds", rowCode: "45", indent: 1, isTotal: false, hasVested: true },
  { name: "Property and Equipment", rowCode: "41", indent: 0, isTotal: false, hasVested: true },
  { name: "Deferred Policy Acquisition Expenses", rowCode: "43", indent: 0, isTotal: false, hasVested: false },
  { name: "Current Tax Assets", rowCode: "52", indent: 0, isTotal: false, hasVested: false },
  { name: "Deferred Tax Assets", rowCode: "44", indent: 0, isTotal: false, hasVested: false },
  { name: "Goodwill", rowCode: "54", indent: 0, isTotal: false, hasVested: false },
  { name: "Intangible Assets", rowCode: "56", indent: 0, isTotal: false, hasVested: false },
  { name: "Defined Benefit Pension Plan", rowCode: "58", indent: 0, isTotal: false, hasVested: false },
  { name: "Other Assets", rowCode: "88", indent: 0, isTotal: false, hasVested: false },
  { name: "TOTAL ASSETS", rowCode: "89", indent: 0, isTotal: true, isFinalTotal: true, hasVested: true }
];

// Define column data
const columns = [
  { id: "currentTotal", label: "Total", colCode: "01" },
  { id: "currentVested", label: "Vested in Trust*", colCode: "02" },
  { id: "priorTotal", label: "Total", colCode: "03" },
  { id: "priorVested", label: "Vested in Trust*", colCode: "04" },
  { id: "openingTotal", label: "Total", colCode: "05" },
  { id: "openingVested", label: "Vested in Trust*", colCode: "06" }
];

const AssetsTable: React.FC = () => {
  const generateCellCode = (rowCode: string, colCode: string) => {
    if (!rowCode) return "";
    return `2010${rowCode}${colCode}`;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[800px] text-xs">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow className="h-6">
            <TableHead className="w-[250px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
            <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
              Current Period
            </TableHead>
            <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
              Prior Period
            </TableHead>
            <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2">
              Opening Prior Period Restated
            </TableHead>
          </TableRow>
          <TableRow className="h-6">
            <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
            {columns.map((col) => (
              <TableHead 
                key={col.id} 
                className="text-xs font-semibold text-center py-0 px-1 border-r last:border-r-0"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {assetsTableRows.map((row, index) => {
            // Determine background color for total rows
            const bgClass = row.isTotal ? "bg-gray-50" : "";
            const fontClass = row.isHeader 
              ? "font-medium italic" 
              : row.isFinalTotal 
                ? "font-bold uppercase" 
                : "font-normal";
            
            // Calculate left padding based on indentation level
            const paddingClass = row.indent === 1 ? "pl-6" : "pl-2";
            
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
                
                {columns.map((col, colIndex) => {
                  const dataCode = generateCellCode(row.rowCode, col.colCode);
                  // For cells that shouldn't have vested values
                  const isDisabled = col.id.includes('Vested') && !row.hasVested;
                  const cellClass = isDisabled ? "bg-gray-200" : "";
                  
                  return (
                    <TableCell 
                      key={`${row.rowCode}-${col.colCode}`}
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

export default AssetsTable;
