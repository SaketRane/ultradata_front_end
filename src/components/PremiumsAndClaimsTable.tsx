import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define column headers for the Premiums and Claims table
const columnHeaders = [
  { label: "Policies in force", code: "21" },
  { label: "Direct Claims", code: "23" },
  { label: "Direct", code: "1" },
  { label: "Reinsurance assumed", code: "2" },
  { label: "Reinsurance ceded", code: "3" },
  { label: "Net WP", code: "4" },
  { label: "Net UEP (BoY)", code: "5" },
  { label: "Net UEP (portf. acq/disp)", code: "25" },
  { label: "Net UEP (EoY)", code: "6" },
  { label: "Net EP", code: "7" },
  { label: "Direct", code: "8" },
  { label: "Reinsurance assumed", code: "9" },
  { label: "Reinsurance ceded", code: "10" },
  { label: "Net incurred", code: "11" },
  { label: "Claims ratio (%)", code: "12" }
];

// Define row data with codes
const tableRows = [
  // Property
  { name: "Property", indent: 0, rowCode: "", isSubtotal: false, isTotal: false },
  { name: "- Personal excluding Home and Product Warranty", indent: 1, rowCode: "03", isSubtotal: false, isTotal: false },
  { name: "- Home Warranty", indent: 2, rowCode: "04", isSubtotal: false, isTotal: false },
  { name: "- Product Warranty", indent: 2, rowCode: "05", isSubtotal: false, isTotal: false },
  { name: "Subtotal - Personal", indent: 1, rowCode: "06", isSubtotal: true, isTotal: false },
  { name: "- Commercial", indent: 1, rowCode: "07", isSubtotal: false, isTotal: false },
  { name: "Property - total", indent: 0, rowCode: "09", isSubtotal: false, isTotal: true },
  
  // Aircraft
  { name: "Aircraft", indent: 0, rowCode: "10", isSubtotal: false, isTotal: false },
  
  // Automobile
  { name: "Automobile:", indent: 0, rowCode: "", isSubtotal: false, isTotal: false },
  { name: "Private Passenger", indent: 1, rowCode: "", isSubtotal: false, isTotal: false },
  { name: "- Liability", indent: 2, rowCode: "11", isSubtotal: false, isTotal: false },
  { name: "- Personal Accident", indent: 2, rowCode: "12", isSubtotal: false, isTotal: false },
  { name: "- Other", indent: 2, rowCode: "13", isSubtotal: false, isTotal: false },
  { name: "Subtotal - Private Passenger", indent: 1, rowCode: "14", isSubtotal: true, isTotal: false },
  
  { name: "Other than Private Passenger", indent: 1, rowCode: "", isSubtotal: false, isTotal: false },
  { name: "- Liability", indent: 2, rowCode: "15", isSubtotal: false, isTotal: false },
  { name: "- Personal Accident", indent: 2, rowCode: "16", isSubtotal: false, isTotal: false },
  { name: "- Other", indent: 2, rowCode: "17", isSubtotal: false, isTotal: false },
  { name: "Subtotal - Other than Private Passenger", indent: 1, rowCode: "18", isSubtotal: true, isTotal: false },
  
  { name: "Facility Assoc. Residual Market", indent: 1, rowCode: "", isSubtotal: false, isTotal: false },
  { name: "- Liability", indent: 2, rowCode: "22", isSubtotal: false, isTotal: false },
  { name: "- Personal Accident", indent: 2, rowCode: "23", isSubtotal: false, isTotal: false },
  { name: "- Other", indent: 2, rowCode: "24", isSubtotal: false, isTotal: false },
  { name: "Subtotal - Facility Assoc. Residual Market", indent: 1, rowCode: "25", isSubtotal: true, isTotal: false },
  
  { name: "Automobile - Subtotal", indent: 1, rowCode: "", isSubtotal: false, isTotal: false },
  { name: "- Liability", indent: 2, rowCode: "19", isSubtotal: false, isTotal: false },
  { name: "- Personal Accident", indent: 2, rowCode: "20", isSubtotal: false, isTotal: false },
  { name: "- Other", indent: 2, rowCode: "21", isSubtotal: false, isTotal: false },
  { name: "Automobile - total", indent: 0, rowCode: "29", isSubtotal: false, isTotal: true },
  
  // Boiler and Machinery
  { name: "Boiler and Machinery excluding Equipment Warranty", indent: 0, rowCode: "32", isSubtotal: false, isTotal: false },
  { name: "- Equipment Warranty", indent: 1, rowCode: "33", isSubtotal: false, isTotal: false },
  
  // Credit and others
  { name: "Credit", indent: 0, rowCode: "34", isSubtotal: false, isTotal: false },
  { name: "Credit Protection", indent: 0, rowCode: "35", isSubtotal: false, isTotal: false },
  { name: "Fidelity", indent: 0, rowCode: "36", isSubtotal: false, isTotal: false },
  { name: "Hail", indent: 0, rowCode: "38", isSubtotal: false, isTotal: false },
  { name: "Legal Expense", indent: 0, rowCode: "40", isSubtotal: false, isTotal: false },
  
  // Liability
  { name: "Liability:", indent: 0, rowCode: "", isSubtotal: false, isTotal: false },
  { name: "- Comprehensive General Liability (with products)", indent: 1, rowCode: "50", isSubtotal: false, isTotal: false },
  { name: "- Comprehensive General Liability (without products)", indent: 1, rowCode: "51", isSubtotal: false, isTotal: false },
  { name: "- Cyber Liability", indent: 1, rowCode: "52", isSubtotal: false, isTotal: false },
  { name: "- Directors and Officers Liability", indent: 1, rowCode: "53", isSubtotal: false, isTotal: false },
  { name: "- Excess Liability", indent: 1, rowCode: "54", isSubtotal: false, isTotal: false },
  { name: "- Professional Liability", indent: 1, rowCode: "55", isSubtotal: false, isTotal: false },
  { name: "- Umbrella Liability", indent: 1, rowCode: "56", isSubtotal: false, isTotal: false },
  { name: "- Pollution Liability", indent: 1, rowCode: "57", isSubtotal: false, isTotal: false },
  { name: "- All other", indent: 1, rowCode: "58", isSubtotal: false, isTotal: false },
  { name: "Liability - total", indent: 0, rowCode: "59", isSubtotal: false, isTotal: true },
  
  // Mortgage and others
  { name: "Mortgage", indent: 0, rowCode: "62", isSubtotal: false, isTotal: false },
  { name: "Other Approved Products", indent: 0, rowCode: "63", isSubtotal: false, isTotal: false },
  
  // Surety
  { name: "Surety:", indent: 0, rowCode: "", isSubtotal: false, isTotal: false },
  { name: "- Contract Surety", indent: 1, rowCode: "60", isSubtotal: false, isTotal: false },
  { name: "- All Other Surety", indent: 1, rowCode: "61", isSubtotal: false, isTotal: false },
  { name: "Surety - total", indent: 0, rowCode: "64", isSubtotal: false, isTotal: true },
  
  // Remaining categories
  { name: "Title", indent: 0, rowCode: "66", isSubtotal: false, isTotal: false },
  { name: "Marine", indent: 0, rowCode: "68", isSubtotal: false, isTotal: false },
  { name: "Accident and Sickness", indent: 0, rowCode: "70", isSubtotal: false, isTotal: false },
  
  // Totals
  { name: "TOTAL", indent: 0, rowCode: "89", isSubtotal: false, isTotal: true }
];

const PremiumsAndClaimsTable: React.FC = () => {
  // Function to generate data cell code
  const generateDataCode = (rowCode: string, columnCode: string) => {
    if (!rowCode) return "";
    return `6020${rowCode}${columnCode}`;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[1500px] text-xs dropdown-data">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead className="w-[250px] text-xs font-semibold text-left py-2 px-4" rowSpan={2}>
              Class of Insurance
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2" rowSpan={2}>
              Policies in force
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2" rowSpan={2}>
              Direct Claims
            </TableHead>
            <TableHead colSpan={4} className="text-xs font-semibold text-center py-2 border-l">
              Premiums written less return premiums
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2" rowSpan={2}>
              Net UEP (BoY)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2" rowSpan={2}>
              Net UEP (portf. acq/disp)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2" rowSpan={2}>
              Net UEP (EoY)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2" rowSpan={2}>
              Net EP
            </TableHead>
            <TableHead colSpan={4} className="text-xs font-semibold text-center py-2 border-l">
              Claims incurred including adjustment expenses
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 border-l" rowSpan={2}>
              Claims ratio (%)
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-xs font-semibold text-center py-1">
              Direct
              <div className="text-orange-500 text-[8px] opacity-50">1</div>
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-1">
              Reinsurance assumed
              <div className="text-orange-500 text-[8px] opacity-50">2</div>
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-1">
              Reinsurance ceded
              <div className="text-orange-500 text-[8px] opacity-50">3</div>
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-1">
              Net WP
              <div className="text-orange-500 text-[8px] opacity-50">4</div>
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-1">
              Direct
              <div className="text-orange-500 text-[8px] opacity-50">8</div>
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-1">
              Reinsurance assumed
              <div className="text-orange-500 text-[8px] opacity-50">9</div>
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-1">
              Reinsurance ceded
              <div className="text-orange-500 text-[8px] opacity-50">10</div>
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-1">
              Net incurred
              <div className="text-orange-500 text-[8px] opacity-50">11</div>
            </TableHead>
          </TableRow>
          <TableRow className="text-[9px] bg-gray-50">
            <TableHead className="text-left py-1 px-4">
              &nbsp;
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              21
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              23
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              1
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              2
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              3
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              4
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              5
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              25
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              6
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              7
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              8
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              9
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              10
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              11
            </TableHead>
            <TableHead className="text-center py-1 px-1 font-normal">
              12
            </TableHead>
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
                <TableCell className={`${paddingClass} ${fontClass} py-1 px-4 ${sizeClass}`}>
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
                      {dataCode && <span className="text-green-600 opacity-0 hover:opacity-50 text-[7px]">{dataCode}</span>}
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

export default PremiumsAndClaimsTable;
