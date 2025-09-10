
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define province/territory codes
const provinceCodes = {
  "NL": "01",
  "PE": "02",
  "NS": "03", 
  "NB": "04",
  "QC": "05",
  "ON": "06",
  "MB": "07",
  "SK": "08",
  "AB": "09",
  "BC": "10",
  "YK": "11",
  "NW": "12",
  "NU": "14",
  "OUT": "18",
  "Total": "19"
};

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
  { name: "Total - direct", indent: 0, rowCode: "79", isSubtotal: false, isTotal: true },
  { name: "Reinsurance assumed", indent: 1, rowCode: "87", isSubtotal: false, isTotal: false },
  { name: "Reinsurance ceded", indent: 1, rowCode: "88", isSubtotal: false, isTotal: false },
  { name: "TOTAL - NET", indent: 0, rowCode: "89", isSubtotal: false, isTotal: true }
];

const ClaimsIncurredTable: React.FC = () => {
  // Function to generate data cell code - using 673 prefix for Claims Incurred
  const generateDataCode = (rowCode: string, provinceCode: string) => {
    if (!rowCode) return "";
    return `6730${rowCode}${provinceCode}`;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[1200px] text-xs dropdown-data">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead className="w-[250px] text-xs font-semibold text-left py-2 px-4">
              Class of Insurance
            </TableHead>
            {Object.entries(provinceCodes).map(([province, code]) => (
              <TableHead 
                key={province} 
                className="text-xs font-semibold text-center py-2 px-4"
                data-province-code={code}
              >
                {province}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
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
            const sizeClass = "";
            
            return (
              <TableRow key={index} className={bgClass} data-row-code={row.rowCode}>
                <TableCell className={`${paddingClass} ${fontClass} py-1 px-4 ${sizeClass}`}>
                  {row.name}
                </TableCell>
                
                {Object.entries(provinceCodes).map(([province, provinceCode]) => {
                  const dataCode = generateDataCode(row.rowCode, provinceCode);
                  return (
                    <TableCell 
                      key={`${index}-${province}`} 
                      className={`text-center py-1 px-4 ${sizeClass} ${fontClass}`}
                      data-code={dataCode}
                    >
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

export default ClaimsIncurredTable;
