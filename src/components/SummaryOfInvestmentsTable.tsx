
import React from 'react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const SummaryOfInvestmentsTable = () => {
  const loading = false;

  // Define the row structure
  const rows = [
    // Header section
    { name: "Aggregate Holdings:", rowCode: "", indent: 0, isTotal: false },
    { name: "Short Term Investments (1 year or less)", rowCode: "01", indent: 1, isTotal: false },
    { name: "Bonds and Debentures (1 year or less)", rowCode: "06", indent: 1, isTotal: false },
    { name: "Bonds and Debentures > 1 year and ≤ 5 years", rowCode: "02", indent: 1, isTotal: false },
    { name: "Bonds and Debentures > 5 years", rowCode: "05", indent: 1, isTotal: false },
    { name: "Mortgage Loans", rowCode: "03", indent: 1, isTotal: false, subRows: [
      { name: "- ≤ 80% Loan to Value Ratio", rowCode: "03", indent: 2, isTotal: false },
      { name: "- Other", rowCode: "04", indent: 2, isTotal: false }
    ]},
    { name: "Preferred Shares", rowCode: "10", indent: 1, isTotal: false, subRows: [
      { name: "- Debt", rowCode: "10", indent: 2, isTotal: false },
      { name: "- Equity", rowCode: "11", indent: 2, isTotal: false }
    ]},
    { name: "Common Shares", rowCode: "15", indent: 1, isTotal: false },
    { name: "Investment Properties", rowCode: "20", indent: 1, isTotal: false },
    { name: "Other Loans and Invested Assets", rowCode: "30", indent: 1, isTotal: false },
    { name: "Pooled Funds - items not captured in above rows", rowCode: "32", indent: 1, isTotal: false },
    { name: "Deduct: Pooled Funds accounted using the Equity Method", rowCode: "34", indent: 1, isTotal: false },
    { name: "Total Investments", rowCode: "39", indent: 1, isTotal: true },
    { name: "Out of Canada", rowCode: "40", indent: 1, isTotal: false },
    { name: "Foreign Pay Securities", rowCode: "41", indent: 1, isTotal: false },
    // Individual Holdings section
    { name: "Individual Holdings:", rowCode: "", indent: 0, isTotal: false },
    { name: "Largest Exposure to an Entity or Connected Group", rowCode: "50", indent: 1, isTotal: false },
    { name: "2nd Largest Exposure to an Entity or Connected Group", rowCode: "51", indent: 2, isTotal: false },
    { name: "Largest Pooled Holding", rowCode: "60", indent: 1, isTotal: false },
    { name: "2nd Largest Pooled Holding", rowCode: "61", indent: 2, isTotal: false },
  ];

  // Define columns
  const columns = [
    { name: "Fair Value Through Profit or Loss (FVTPL)", code: "01" },
    { name: "Fair Value Through Other Comprehensive Income (FVOCI)", code: "03" },
    { name: "Hedges", code: "05" },
    { name: "FV Option/ Investment Properties Fair Value", code: "07" },
    { name: "Amortized Cost", code: "09" },
    { name: "Balance Sheet", code: "12" },
    { name: "Pooled Funds", code: "13" },
    { name: "Realized Gains(Losses)", code: "15" },
    { name: "Income", code: "16" },
    { name: "Gain/(Loss) from FV Option", code: "19" },
  ];

  const groupedColumns = [
    { name: "Fair Value", columns: columns.slice(0, 4) },
    ...columns.slice(4).map(col => ({ name: col.name, columns: [col] }))
  ];

  const renderSkeletonRows = () => {
    return Array(15).fill(0).map((_, index) => (
      <TableRow key={index}>
        <TableCell className="py-1">
          <Skeleton className="h-4 w-full" />
        </TableCell>
        {Array(10).fill(0).map((_, colIndex) => (
          <TableCell key={colIndex} className="py-1">
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const getCodeForCell = (rowCode: string, colCode: string) => {
    if (!rowCode || !colCode) return "";
    
    // Special case for Investment Properties row which doesn't have cells for first 3 columns
    if (rowCode === "20" && ["01", "03", "05"].includes(colCode)) {
      return "";
    }
    
    return `4007${rowCode}${colCode}`;
  };

  const renderRows = (rows: any[], parentDepth = 0) => {
    return rows.map((row, index) => {
      const indentClass = `pl-${row.indent * 4}`;
      const isBold = row.isTotal || row.indent === 0;
      const fontClass = isBold ? 'font-semibold' : 'font-normal';
      
      return (
        <React.Fragment key={index}>
          <TableRow className={`h-8 border-b text-xs ${row.isTotal ? 'bg-gray-50' : ''}`}>
            <TableCell 
              className={`${indentClass} whitespace-normal ${fontClass} py-1.5 pl-${(parentDepth + row.indent) * 4}`}
              data-testid={`row-${row.rowCode}`}
            >
              {row.name}
            </TableCell>
            
            {/* Row code column - visible */}
            {row.rowCode && (
              <TableCell className="text-xs text-orange-500 font-normal py-1.5 w-12">
                {row.rowCode}
              </TableCell>
            )}
            {!row.rowCode && <TableCell className="w-12"></TableCell>}
            
            {/* Data columns */}
            {columns.map((col, colIdx) => {
              const code = getCodeForCell(row.rowCode, col.code);
              // Special handling for Investment Properties row
              const shouldShowCell = !(row.rowCode === "20" && ["01", "03", "05"].includes(col.code));
              
              // Special handling for Out of Canada, Foreign Pay Securities which only have Balance Sheet and Pooled Funds columns
              const showForOutOfCanada = !(row.rowCode === "40" || row.rowCode === "41") || 
                                         (col.code === "12" || col.code === "13");
              
              // Special handling for Individual Holdings which only have Balance Sheet and Pooled Funds columns
              const showForIndividualHoldings = !(row.rowCode === "50" || row.rowCode === "51" || 
                                                 row.rowCode === "60" || row.rowCode === "61") ||
                                                (col.code === "12" || col.code === "13");
              
              if (!shouldShowCell || !showForOutOfCanada || !showForIndividualHoldings) {
                return <TableCell key={colIdx} className="text-xs py-1.5"></TableCell>;
              }
              
              return (
                <TableCell 
                  key={colIdx} 
                  className="text-xs py-1.5 text-right"
                  data-code={code}
                >
                  {/* Cell data would be displayed here */}
                  {code && <span className="opacity-0 hover:opacity-100 absolute text-[9px] text-green-600 bottom-0 right-0">{code}</span>}
                </TableCell>
              );
            })}
          </TableRow>
          
          {/* Render sub-rows if they exist */}
          {row.subRows && renderRows(row.subRows, parentDepth + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table className="compact-table w-full text-xs border-collapse">
        <TableHeader className="bg-white sticky top-0 z-10">
          {/* Main header - Fair Value grouping */}
          <TableRow className="border-b">
            <TableHead className="text-left bg-white whitespace-nowrap py-1 h-8">
              {/* Empty cell for row names */}
            </TableHead>
            <TableHead className="bg-white whitespace-nowrap text-xs py-1 w-12">
              {/* Empty cell for row codes */}
            </TableHead>
            
            {/* Group headers */}
            {groupedColumns.map((group, index) => (
              <TableHead
                key={index}
                colSpan={group.columns.length}
                className={`text-center bg-white whitespace-nowrap text-xs py-1 h-8 ${index === 0 ? 'text-sm font-medium' : ''}`}
              >
                {group.name}
              </TableHead>
            ))}
          </TableRow>
          
          {/* Sub-header for column names */}
          <TableRow className="border-b">
            <TableHead className="text-left bg-white whitespace-nowrap py-1 h-8">
              {/* Empty cell for row names */}
            </TableHead>
            <TableHead className="bg-white whitespace-nowrap text-xs py-1 w-12">
              {/* Empty cell for row codes */}
            </TableHead>
            
            {/* Column headers */}
            {columns.map((col, index) => (
              <TableHead
                key={index}
                className="text-center bg-white whitespace-normal text-xs py-1 h-8"
                data-column-code={col.code}
              >
                {col.name}
                <span className="hidden text-[9px] text-orange-500">{col.code}</span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {loading ? (
            renderSkeletonRows()
          ) : (
            renderRows(rows)
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SummaryOfInvestmentsTable;
