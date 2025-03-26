
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define table rows with their codes
const headOfficeAccountAndReservesRows = [
  // HEAD OFFICE ACCOUNT Section
  { name: "HEAD OFFICE ACCOUNT (Foreign Insurers)", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Balance at beginning of year", rowCode: "01", indent: 0, isTotal: true },
  { name: "Prior period adjustments:", rowCode: "02", indent: 1, isTotal: false },
  { name: "(Specify)", rowCode: "04", indent: 2, isTotal: false },
  { name: "Adjusted balance at beginning of year", rowCode: "09", indent: 0, isTotal: true },
  { name: "Net income (loss) for the year", rowCode: "10", indent: 1, isTotal: false },
  { name: "Transfers from (to) Head Office", rowCode: "", indent: 1, isHeader: true },
  { name: "Advances (Returns)", rowCode: "20", indent: 2, isTotal: false },
  { name: "Expenses", rowCode: "21", indent: 2, isTotal: false },
  { name: "Premiums/Claims", rowCode: "22", indent: 2, isTotal: false },
  { name: "Other", rowCode: "23", indent: 2, isTotal: false },
  { name: "Subtotal", rowCode: "11", indent: 2, isTotal: true },
  { name: "Decrease (increase) in Reserves", rowCode: "12", indent: 1, isTotal: false },
  { name: "Net increase (decrease) in Head Office Account", rowCode: "15", indent: 1, isTotal: true },
  { name: "Balance at end of year", rowCode: "89", indent: 0, isTotal: true, isFinalTotal: true },
  // RESERVES Section
  { name: "RESERVES", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Earthquake Reserves", rowCode: "", indent: 0, isHeader: true },
  { name: "Reserve Complement", rowCode: "90", indent: 1, isTotal: false },
  { name: "Premium Reserve", rowCode: "91", indent: 1, isTotal: false },
  { name: "Mortgage Reserve", rowCode: "95", indent: 0, isTotal: false },
  { name: "Nuclear Reserve", rowCode: "96", indent: 0, isTotal: false },
  { name: "General and Contingency Reserves", rowCode: "98", indent: 0, isTotal: false },
  { name: "Total Reserves", rowCode: "99", indent: 0, isTotal: true, isFinalTotal: true }
];

// Define column data
const columns = [
  { id: "currentPeriod", label: "Current Period", colCode: "01" },
  { id: "priorPeriod", label: "Prior Period", colCode: "02" }
];

const HeadOfficeAccountAndReservesTable: React.FC = () => {
  const generateCellCode = (rowCode: string, colCode: string) => {
    if (!rowCode) return "";
    return `2045${rowCode}${colCode}`;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[600px] text-xs">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow className="h-6">
            <TableHead className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
            {columns.map((col) => (
              <TableHead 
                key={col.id} 
                data-column-code={col.colCode}
                className="text-xs font-semibold text-center py-0 px-1 border-r last:border-r-0"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {headOfficeAccountAndReservesRows.map((row, index) => {
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
                  const cellClass = isDisabled ? "bg-gray-200" : "";
                  
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

export default HeadOfficeAccountAndReservesTable;
