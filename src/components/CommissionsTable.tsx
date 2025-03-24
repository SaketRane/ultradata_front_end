
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define row data with codes for main table
const mainTableRows = [
  { name: "Property - total", rowCode: "09", isTotal: false },
  { name: "Automobile - total", rowCode: "29", isTotal: false },
  { name: "Liability", rowCode: "59", isTotal: false },
  { name: "Marine", rowCode: "68", isTotal: false },
  { name: "Other", rowCode: "75", isTotal: false },
  { name: "TOTAL", rowCode: "79", isTotal: true }
];

// Define column codes for main table
const mainTableColumnCodes = {
  "deferredCommBoY": "02",
  "unearnedCommBoY": "03",
  "directCommWP": "04",
  "reinsuranceAssumedCommWP": "05",
  "reinsuranceCededCommWP": "06",
  "net": "07",
  "deferredCommEoY": "08",
  "unearnedCommEoY": "09",
  "netCommissions": "10"
};

// Define row data with codes for summary table
const summaryTableRows = [
  { name: "Gross:", rowCode: "", isHeader: true, indent: 0 },
  { name: "Commission Expense", rowCode: "30", isHeader: false, indent: 1 },
  { name: "Contingent Commissions", rowCode: "33", isHeader: false, indent: 1 },
  { name: "Other Non-Deferrable Commissions", rowCode: "35", isHeader: false, indent: 1 },
  { name: "Total Gross", rowCode: "39", isHeader: false, indent: 0 },
  { name: "Ceded:", rowCode: "", isHeader: true, indent: 0 },
  { name: "Commission Income", rowCode: "40", isHeader: false, indent: 1 },
  { name: "Contingent Commissions", rowCode: "43", isHeader: false, indent: 1 },
  { name: "Other Non-Deferrable Commissions", rowCode: "45", isHeader: false, indent: 1 },
  { name: "Total Ceded", rowCode: "49", isHeader: false, indent: 0 },
  { name: "TOTAL NET COMMISSIONS", rowCode: "89", isHeader: false, indent: 0 }
];

const CommissionsTable: React.FC = () => {
  // Function to generate data cell code for main table
  const generateMainTableDataCode = (rowCode: string, columnCode: string) => {
    if (!rowCode) return "";
    return `8010${rowCode}${columnCode}`;
  };

  // Function to generate data cell code for summary table
  const generateSummaryTableDataCode = (rowCode: string) => {
    if (!rowCode) return "";
    return `8010${rowCode}10`;
  };

  return (
    <div className="space-y-8">
      {/* Main Table */}
      <div className="overflow-auto max-h-[50vh] rounded-md border bg-white/80 backdrop-blur-sm">
        <Table className="min-w-[1200px] text-xs dropdown-data">
          <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            <TableRow>
              <TableHead className="w-[250px] text-xs font-semibold text-left py-2 px-4" rowSpan={2}>
                Class of Insurance
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code={mainTableColumnCodes.deferredCommBoY}>
                Deferred Comm. (BoY)
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code={mainTableColumnCodes.unearnedCommBoY}>
                Unearned Comm (BoY)
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code={mainTableColumnCodes.directCommWP}>
                Direct Comm (WP)
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code={mainTableColumnCodes.reinsuranceAssumedCommWP}>
                Reinsurance assumed Comm (WP)
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code={mainTableColumnCodes.reinsuranceCededCommWP}>
                Reinsurance ceded Comm (WP)
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code={mainTableColumnCodes.net}>
                Net
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code={mainTableColumnCodes.deferredCommEoY}>
                Deferred Comm (EoY)
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code={mainTableColumnCodes.unearnedCommEoY}>
                Unearned Comm (EoY)
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code={mainTableColumnCodes.netCommissions}>
                Net Commissions
              </TableHead>
            </TableRow>
            <TableRow>
              {Object.values(mainTableColumnCodes).map((code) => (
                <TableHead key={code} className="text-[10px] font-medium text-center py-1 px-4 text-orange-500">
                  {code}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-[10px]">
            {mainTableRows.map((row, index) => {
              // Determine background color for row
              const bgClass = row.isTotal ? "bg-gray-50" : "";
              
              return (
                <TableRow key={index} className={bgClass} data-row-code={row.rowCode}>
                  <TableCell className="font-medium py-1 px-4">
                    {row.name}
                    {row.rowCode && <span className="text-orange-500 ml-2 opacity-80 text-[9px]">{row.rowCode}</span>}
                  </TableCell>
                  
                  {Object.values(mainTableColumnCodes).map((columnCode) => {
                    const dataCode = generateMainTableDataCode(row.rowCode, columnCode);
                    return (
                      <TableCell 
                        key={`${row.rowCode}-${columnCode}`} 
                        className="text-center py-1 px-4"
                        data-code={dataCode}
                      >
                        <span className="text-green-600 opacity-50 hover:opacity-100 text-[9px]">
                          {dataCode}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Summary Table */}
      <div className="mt-8 overflow-auto rounded-md border bg-white/80 backdrop-blur-sm">
        <Table className="min-w-[600px] text-xs dropdown-data">
          <TableHeader className="bg-white/95 backdrop-blur-sm z-10">
            <TableRow>
              <TableHead className="w-[250px] text-xs font-semibold text-left py-2 px-4">
                Summary of Commissions
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-2 px-4">
                Net Commissions
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="text-[10px] font-medium text-center py-1 px-4 text-orange-500">
                10
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[10px]">
            {summaryTableRows.map((row, index) => {
              // Calculate left padding based on indentation level
              const paddingClass = row.indent === 1 ? "pl-8" : "";
              
              // Determine text weight and style
              const fontClass = row.isHeader ? "font-medium italic" : "font-normal";
              
              return (
                <TableRow key={index} data-row-code={row.rowCode}>
                  <TableCell className={`${paddingClass} ${fontClass} py-1 px-4`}>
                    {row.name}
                    {row.rowCode && <span className="text-orange-500 ml-2 opacity-80 text-[9px]">{row.rowCode}</span>}
                  </TableCell>
                  
                  <TableCell 
                    className="text-center py-1 px-4"
                    data-code={generateSummaryTableDataCode(row.rowCode)}
                  >
                    {row.rowCode && (
                      <span className="text-green-600 opacity-50 hover:opacity-100 text-[9px]">
                        {generateSummaryTableDataCode(row.rowCode)}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CommissionsTable;
