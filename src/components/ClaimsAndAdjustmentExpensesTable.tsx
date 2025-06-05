
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import useCode from "@/hooks/use-code";

// Define column codes
const columnCodes = [
  { label: "Direct", code: "01" },
  { label: "Reinsurance assumed", code: "02" },
  { label: "Reinsurance ceded", code: "03" },
  { label: "Net (01+02-03)", code: "04" },
  { label: "Direct", code: "05" },
  { label: "Reinsurance assumed", code: "06" },
  { label: "Reinsurance ceded", code: "07" },
  { label: "Net", code: "08" },
  { label: "Net provision at prior year end", code: "09" },
  { label: "Net provision for portfolio acquisition/ disposition at transaction date", code: "11" },
  { label: "Net amount paid during the year for claims of prior years", code: "10" },
  { label: "Investment income on unpaid claims of prior years", code: "13" },
  { label: "Net provision for claims of prior years", code: "15" },
  { label: "Margin or (Deficiency) (09+11-10+13-15)", code: "19" }
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
  { name: "TOTAL", indent: 0, rowCode: "89", isSubtotal: false, isTotal: true },
  
  // Out of Canada Liabilities (as shown in the image)
  { name: "Out of Canada Liabilities", indent: 0, rowCode: "80", isSubtotal: false, isTotal: false }
];

const ClaimsAndAdjustmentExpensesTable: React.FC = () => {
   const {value, handleGetCode} = useCode()

  // Function to generate data cell code - using 6030 prefix for Claims and Adjustment Expenses
  const generateDataCode = (rowCode: string, columnCode: string) => {
    if (!rowCode) return "";
    return `6030${rowCode}${columnCode}`;
  };


  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[1200px] text-xs dropdown-data">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead className="w-[250px] text-xs font-semibold text-left py-2 px-4 border-r border-b">
              Class of Insurance
            </TableHead>
            <TableHead colSpan={4} className="text-xs font-semibold text-center py-2 px-4 border-r border-b">
              Claims and adjustment expenses paid - current year
            </TableHead>
            <TableHead colSpan={4} className="text-xs font-semibold text-center py-2 px-4 border-r border-b">
              Provision for unpaid claims (including unreported) and adjustment expenses - current year
            </TableHead>
            <TableHead colSpan={6} className="text-xs font-semibold text-center py-2 px-4 border-b">
              Margin or deficiency for unpaid claims at prior year
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-[250px] text-xs font-semibold text-left py-2 px-4 border-r border-b">
              &nbsp;
            </TableHead>
            {/* Claims and adjustment expenses paid - current year */}
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="01">
              Direct
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="02">
              Reinsurance assumed
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="03">
              Reinsurance ceded
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="04">
              Net (01+02-03)
            </TableHead>
            
            {/* Provision for unpaid claims */}
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="05">
              Direct
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="06">
              Reinsurance assumed
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="07">
              Reinsurance ceded
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="08">
              Net
            </TableHead>
            
            {/* Margin or deficiency */}
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="09">
              Net provision at prior year end
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="11">
              Net provision for portfolio acquisition/ disposition
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="10">
              Net amount paid during the year for claims of prior years
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="13">
              Investment income on unpaid claims of prior years
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-r border-b" data-column-code="15">
              Net provision for claims of prior years
            </TableHead>
            <TableHead className="text-[9px] font-semibold text-center py-1 px-2 border-b" data-column-code="19">
              Margin or (Deficiency) (09+11-10+13-15)
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
                ? "bg-gray-50/50" 
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
                
                {columnCodes.map((col) => {
                  const dataCode = generateDataCode(row.rowCode, col.code);
                  return (
                    <TableCell
                      onMouseEnter={handleGetCode(dataCode)} 
                      key={`${index}-${col.code}`} 
                      className={`text-center py-1 px-1 ${sizeClass} ${fontClass} border-r`}
                      data-code={dataCode}
                    >
                      <span className="text-green-600 opacity-0 hover:opacity-50 text-[7px]">{value ? value : 'Not exist'}</span>
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

export default ClaimsAndAdjustmentExpensesTable;
