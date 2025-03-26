
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define investment table rows with their codes and indentation levels
const investmentTableRows = [
  // Aggregate Holdings section
  { name: "Aggregate Holdings:", rowCode: "", indent: 0, isHeader: true, isBold: true },
  { name: "Short Term Investments (1 year or less)", rowCode: "01", indent: 1, isTotal: false },
  { name: "Bonds and Debentures (1 year or less)", rowCode: "06", indent: 1, isTotal: false },
  { name: "Bonds and Debentures > 1 year and ≤ 5 years", rowCode: "02", indent: 1, isTotal: false },
  { name: "Bonds and Debentures > 5 years", rowCode: "05", indent: 1, isTotal: false },
  { name: "Mortgage Loans", rowCode: "", indent: 1, isHeader: true },
  { name: "- ≤ 80% Loan to Value Ratio", rowCode: "03", indent: 2, isTotal: false },
  { name: "- Other", rowCode: "04", indent: 2, isTotal: false },
  { name: "Preferred Shares", rowCode: "", indent: 1, isHeader: true },
  { name: "- Debt", rowCode: "10", indent: 2, isTotal: false },
  { name: "- Equity", rowCode: "11", indent: 2, isTotal: false },
  { name: "Common Shares", rowCode: "15", indent: 1, isTotal: false },
  { name: "Investment Properties", rowCode: "20", indent: 1, isTotal: false, hasLimitedColumns: true },
  { name: "Other Loans and Invested Assets", rowCode: "30", indent: 1, isTotal: false },
  { name: "Pooled Funds - items not captured in above rows", rowCode: "32", indent: 1, isTotal: false },
  { name: "Deduct: Pooled Funds accounted using the Equity Method", rowCode: "34", indent: 1, isTotal: false },
  { name: "Total Investments", rowCode: "39", indent: 1, isTotal: true, isBold: true },
  
  // Additional information section
  { name: "Out of Canada", rowCode: "40", indent: 1, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
  { name: "Foreign Pay Securities", rowCode: "41", indent: 1, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
  
  // Individual Holdings section
  { name: "Individual Holdings:", rowCode: "", indent: 0, isHeader: true, isBold: true },
  { name: "Largest Exposure to an Entity or Connected Group", rowCode: "50", indent: 1, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
  { name: "2nd Largest Exposure to an Entity or Connected Group", rowCode: "51", indent: 2, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
  { name: "Largest Pooled Holding", rowCode: "60", indent: 1, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
  { name: "2nd Largest Pooled Holding", rowCode: "61", indent: 2, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true }
];

// Define main columns structure
const mainColumns = [
  { 
    name: "Fair Value", 
    subColumns: [
      { name: "Fair Value Through Profit or Loss (FVTPL)", code: "01" },
      { name: "Fair Value Through Other Comprehensive Income (FVOCI)", code: "03" },
      { name: "Hedges", code: "05" },
      { name: "FV Option/ Investment Properties Fair Value", code: "07" }
    ]
  },
  { name: "Amortized Cost", code: "09" },
  { name: "Balance Sheet", code: "12" },
  { name: "Pooled Funds", code: "13" },
  { name: "Realized Gains(Losses)", code: "15" },
  { name: "Income", code: "16" },
  { name: "Gain/(Loss) from FV Option", code: "19" }
];

const SummaryOfInvestmentsTable: React.FC = () => {
  // Function to generate data cell code
  const generateDataCode = (rowCode: string, columnCode: string) => {
    if (!rowCode) return "";
    return `4007${rowCode}${columnCode}`;
  };

  // Function to check if a row should have a specific column
  const shouldShowColumn = (row: typeof investmentTableRows[0], columnCode: string) => {
    // Investment Properties only has specific columns
    if (row.rowCode === "20" && !["07", "09", "12", "13", "15", "16", "19"].includes(columnCode)) {
      return false;
    }
    
    // Balance sheet only rows (specific rows that only show balance sheet and pooled funds columns)
    if (row.balanceSheetOnly && !["12", "13"].includes(columnCode)) {
      return false;
    }
    
    return true;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[1200px] text-xs">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead className="w-[300px] text-xs font-semibold text-left py-2 px-4 border-r" rowSpan={2}></TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 border-r" colSpan={4}>
              Fair Value
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 border-r" rowSpan={2} data-column-code="09">
              Amortized Cost
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 border-r" rowSpan={2} data-column-code="12">
              Balance Sheet
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 border-r" rowSpan={2} data-column-code="13">
              Pooled Funds
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 border-r" rowSpan={2} data-column-code="15">
              Realized Gains(Losses)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 border-r" rowSpan={2} data-column-code="16">
              Income
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2" rowSpan={2} data-column-code="19">
              Gain/(Loss) from FV Option
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-xs font-semibold text-center py-2" data-column-code="01">
              Fair Value Through Profit or Loss (FVTPL)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2" data-column-code="03">
              Fair Value Through Other Comprehensive Income (FVOCI)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2" data-column-code="05">
              Hedges
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 border-r" data-column-code="07">
              FV Option/ Investment Properties Fair Value
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {investmentTableRows.map((row, index) => {
            // Calculate left padding based on indentation level
            const paddingClass = row.indent === 0 
              ? "pl-2" 
              : row.indent === 1 
                ? "pl-6" 
                : "pl-10";
            
            // Determine background color for row
            const bgClass = row.isTotal ? "bg-gray-50" : "";
            
            // Determine text weight
            const fontClass = row.isBold || row.isTotal 
              ? "font-medium" 
              : row.isHeader
                ? "font-medium italic"
                : "font-normal";
            
            // Add border for visual separation
            const borderClass = row.isHeader ? "" : "border-dotted border-b border-gray-300";
            
            return (
              <TableRow 
                key={index} 
                className={`${bgClass} ${borderClass} h-5`} 
                data-row-code={row.rowCode}
              >
                <TableCell 
                  className={`${paddingClass} ${fontClass} py-0 px-2 border-r text-left`}
                >
                  {row.name}
                  {row.rowCode && (
                    <span className="text-orange-500 ml-2 text-[9px]">{row.rowCode}</span>
                  )}
                </TableCell>
                
                {/* Generate columns for each data point */}
                {[...mainColumns[0].subColumns, ...mainColumns.slice(1)].map((column) => {
                  const columnCode = "code" in column ? column.code : column.subColumns[0].code;
                  const dataCode = generateDataCode(row.rowCode, columnCode);
                  const showColumn = shouldShowColumn(row, columnCode);
                  const cellClass = !showColumn ? "bg-gray-200" : "";
                  
                  // Add border for the last fair value column
                  const borderRightClass = columnCode === "07" ? "border-r" : "";
                  
                  return (
                    <TableCell 
                      key={`${row.rowCode || index}-${columnCode}`}
                      className={`text-center py-0 px-1 ${borderRightClass} group ${cellClass}`}
                      data-code={showColumn ? dataCode : ""}
                    >
                      {showColumn && row.rowCode && dataCode && (
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

export default SummaryOfInvestmentsTable;
