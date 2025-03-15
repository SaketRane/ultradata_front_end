
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define row data with codes
const tableRows = [
  { name: "Performance Analysis", indent: 0, rowCode: "", isSubtotal: false, isTotal: false },
  { name: "Underwriting Income (Loss)", indent: 1, rowCode: "90", isSubtotal: false, isTotal: false },
  { name: "Impact of Change in Claims Net Discount Rate", indent: 2, rowCode: "91", isSubtotal: false, isTotal: false },
  { name: "Impact of Unrealized Foreign Exchange Gains/Losses", indent: 2, rowCode: "92", isSubtotal: false, isTotal: false },
  { name: "Underwriting Income (Loss) Before Changes", indent: 1, rowCode: "93", isSubtotal: false, isTotal: false },
];

// Define column headers
const columnHeaders = [
  { label: "Current Year", code: "01" },
  { label: "Prior Year", code: "03" },
];

const DiscountedAmountsForexTable: React.FC = () => {
  // Function to generate data cell code
  const generateDataCode = (rowCode: string, columnCode: string) => {
    if (!rowCode) return "";
    return `6021${rowCode}${columnCode}`;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[800px] text-xs dropdown-data">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead className="w-[350px] text-xs font-semibold text-left py-2 px-4 border-r" rowSpan={2}>
              Performance Analysis
            </TableHead>
            {columnHeaders.map((column) => (
              <TableHead 
                key={column.code} 
                className="text-xs font-semibold text-center py-2" 
                data-column-code={column.code}
              >
                {column.label}
                <div className="text-orange-500 text-[10px] font-normal mt-1">{column.code}</div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {tableRows.map((row, index) => {
            // Calculate left padding based on indentation level
            const paddingClass = row.indent === 0 
              ? "" 
              : row.indent === 1 
                ? "pl-8" 
                : "pl-16";
            
            // Determine background color for row
            const bgClass = row.isTotal 
              ? "bg-gray-50" 
              : row.isSubtotal 
                ? "" 
                : "";
                
            // Determine text weight
            const fontClass = row.isTotal || row.isSubtotal
              ? "font-medium" 
              : row.indent === 0 
                ? "font-medium" 
                : "";
                
            // Determine font size
            const sizeClass = row.indent > 0 && !row.isSubtotal ? "text-[9px]" : "";
            
            return (
              <TableRow key={index} className={bgClass} data-row-code={row.rowCode}>
                <TableCell className={`${paddingClass} ${fontClass} py-1 px-4 ${sizeClass} border-r`}>
                  {row.name}
                  {row.rowCode && <span className="text-orange-500 ml-2 opacity-50 text-[8px]">{row.rowCode}</span>}
                </TableCell>
                
                {/* Generate cells for each column */}
                {columnHeaders.map((column) => {
                  const dataCode = generateDataCode(row.rowCode, column.code);
                  
                  return (
                    <TableCell 
                      key={`${index}-${column.code}`} 
                      className={`text-center py-1 px-2 ${sizeClass} ${fontClass}`}
                      data-code={dataCode}
                    >
                      {dataCode && <span className="text-green-600 text-[10px]">{dataCode}</span>}
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

export default DiscountedAmountsForexTable;
