
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define table rows with their codes
const summaryOfInvestmentsRows = [
  // Aggregate Holdings Section
  { name: "Aggregate Holdings:", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Short Term Investments (1 year or less)", rowCode: "01", indent: 1, isTotal: false },
  { name: "Bonds and Debentures (1 year or less)", rowCode: "06", indent: 1, isTotal: false },
  { name: "Bonds and Debentures > 1 year and ≤ 5 years", rowCode: "02", indent: 1, isTotal: false },
  { name: "Bonds and Debentures > 5 years", rowCode: "05", indent: 1, isTotal: false },
  { name: "Mortgage Loans", subRows: [
    { name: "- ≤ 80% Loan to Value Ratio", rowCode: "03", indent: 2, isTotal: false },
    { name: "- Other", rowCode: "04", indent: 2, isTotal: false }
  ], rowCode: "", indent: 1, isHeader: true },
  { name: "Preferred Shares", subRows: [
    { name: "- Debt", rowCode: "10", indent: 2, isTotal: false },
    { name: "- Equity", rowCode: "11", indent: 2, isTotal: false }
  ], rowCode: "", indent: 1, isHeader: true },
  { name: "Common Shares", rowCode: "15", indent: 1, isTotal: false },
  { name: "Investment Properties", rowCode: "20", indent: 1, isTotal: false },
  { name: "Other Loans and Invested Assets", rowCode: "30", indent: 1, isTotal: false },
  { name: "Pooled Funds - items not captured in above rows", rowCode: "32", indent: 1, isTotal: false },
  { name: "Deduct: Pooled Funds accounted using the Equity Method", rowCode: "34", indent: 1, isTotal: false },
  { name: "Total Investments", rowCode: "39", indent: 1, isTotal: true, isFinalTotal: true },
  
  // Additional Aggregate Information
  { name: "Out of Canada", rowCode: "40", indent: 1, isTotal: false },
  { name: "Foreign Pay Securities", rowCode: "41", indent: 1, isTotal: false },
  
  // Individual Holdings Section
  { name: "Individual Holdings:", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Largest Exposure to an Entity or Connected Group", rowCode: "50", indent: 1, isTotal: false },
  { name: "2nd Largest Exposure to an Entity or Connected Group", rowCode: "51", indent: 2, isTotal: false },
  { name: "Largest Pooled Holding", rowCode: "60", indent: 1, isTotal: false },
  { name: "2nd Largest Pooled Holding", rowCode: "61", indent: 2, isTotal: false }
];

// Define column data with header groupings
const columnGroups = [
  {
    title: "Fair Value",
    columns: [
      { id: "fvtpl", label: "Fair Value Through Profit or Loss (FVTPL)", colCode: "01" },
      { id: "fvoci", label: "Fair Value Through Other Comprehensive Income (FVOCI)", colCode: "03" },
      { id: "hedges", label: "Hedges", colCode: "05" },
      { id: "fvOption", label: "FV Option/ Investment Properties Fair Value", colCode: "07" }
    ]
  },
  {
    title: null,
    columns: [
      { id: "amortizedCost", label: "Amortized Cost", colCode: "09" },
      { id: "balanceSheet", label: "Balance Sheet", colCode: "12" },
      { id: "pooledFunds", label: "Pooled Funds", colCode: "13" },
      { id: "realizedGains", label: "Realized Gains(Losses)", colCode: "15" },
      { id: "income", label: "Income", colCode: "16" },
      { id: "gainFromFVOption", label: "Gain/(Loss) from FV Option", colCode: "19" }
    ]
  }
];

// Flatten columns for rendering
const flatColumns = columnGroups.flatMap(group => group.columns);

const SummaryOfInvestmentsTable: React.FC = () => {
  const generateCellCode = (rowCode: string, colCode: string) => {
    if (!rowCode) return "";
    return `4007${rowCode}${colCode}`;
  };

  // Function to render table headers
  const renderTableHeaders = () => {
    return (
      <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        {/* First row - column group headers */}
        <TableRow className="h-6 border-b">
          <TableHead className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
          {columnGroups.map((group, groupIndex) => (
            <TableHead 
              key={`group-${groupIndex}`}
              colSpan={group.columns.length}
              className={`text-xs font-semibold text-center py-0 px-1 ${group.title ? "bg-blue-50" : ""}`}
            >
              {group.title}
            </TableHead>
          ))}
        </TableRow>
        
        {/* Second row - column labels */}
        <TableRow className="h-6">
          <TableHead className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
          {flatColumns.map((col) => (
            <TableHead 
              key={col.id} 
              data-column-code={col.colCode}
              className="text-xs font-semibold text-center py-0 px-1 border-r last:border-r-0 whitespace-nowrap"
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
    );
  };

  // Function to render table rows
  const renderTableRows = () => {
    const rows: JSX.Element[] = [];

    summaryOfInvestmentsRows.forEach((row, rowIndex) => {
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
      const borderClass = row.isHeader && !row.subRows ? "" : "border-dotted border-b border-gray-300";
      
      // Add the row
      rows.push(
        <TableRow 
          key={`row-${rowIndex}`} 
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
          
          {flatColumns.map((col) => {
            const dataCode = generateCellCode(row.rowCode, col.colCode);
            
            // Skip certain cells for specific rows
            let isDisabled = !row.rowCode || row.isHeader;
            
            // Special case for Investment Properties - only show for columns 07, 09, 12, 13, 15, 16, 19
            if (row.rowCode === "20" && !["07", "09", "12", "13", "15", "16", "19"].includes(col.colCode)) {
              isDisabled = true;
            }
            
            const cellClass = isDisabled ? "bg-gray-200" : "";
            
            return (
              <TableCell 
                key={`${row.rowCode || rowIndex}-${col.colCode}`}
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

      // Add sub-rows if any
      if (row.subRows) {
        row.subRows.forEach((subRow, subRowIndex) => {
          const subBgClass = subRow.isTotal ? "bg-gray-50" : "";
          const subFontClass = subRow.isHeader ? "font-medium italic" : subRow.isTotal ? "font-medium" : "font-normal";
          const subPaddingClass = subRow.indent === 2 ? "pl-10" : "pl-6";
          
          rows.push(
            <TableRow 
              key={`row-${rowIndex}-sub-${subRowIndex}`} 
              className={`${subBgClass} border-dotted border-b border-gray-300 h-5`} 
              data-row-code={subRow.rowCode}
            >
              <TableCell 
                className={`${subPaddingClass} ${subFontClass} py-0 pr-2 border-r text-left`}
              >
                {subRow.name}
                {subRow.rowCode && (
                  <span className="text-orange-500 ml-2 text-[9px]">{subRow.rowCode}</span>
                )}
              </TableCell>
              
              {flatColumns.map((col) => {
                const dataCode = generateCellCode(subRow.rowCode, col.colCode);
                const isDisabled = !subRow.rowCode;
                const cellClass = isDisabled ? "bg-gray-200" : "";
                
                return (
                  <TableCell 
                    key={`${subRow.rowCode || `${rowIndex}-${subRowIndex}`}-${col.colCode}`}
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
        });
      }
    });

    return rows;
  };

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[1000px] text-xs">
        {renderTableHeaders()}
        <TableBody className="text-[10px]">
          {renderTableRows()}
        </TableBody>
      </Table>
    </div>
  );
};

export default SummaryOfInvestmentsTable;
