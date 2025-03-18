import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CommissionsTable = () => {
  // Main table data
  const commissionsData = [
    {
      code: "09",
      name: "Property - total",
      indent: 0,
      isTotal: true,
      cells: [
        { code: "80100902", value: "0" },
        { code: "80100903", value: "0" },
        { code: "80100904", value: "0" },
        { code: "80100905", value: "0" },
        { code: "80100906", value: "0" },
        { code: "80100907", value: "0" },
        { code: "80100908", value: "0" },
        { code: "80100909", value: "0" },
        { code: "80100910", value: "0" },
      ],
    },
    {
      code: "29",
      name: "Automobile - total",
      indent: 0,
      isTotal: true,
      cells: [
        { code: "80102902", value: "0" },
        { code: "80102903", value: "0" },
        { code: "80102904", value: "0" },
        { code: "80102905", value: "0" },
        { code: "80102906", value: "0" },
        { code: "80102907", value: "0" },
        { code: "80102908", value: "0" },
        { code: "80102909", value: "0" },
        { code: "80102910", value: "0" },
      ],
    },
    {
      code: "59",
      name: "Liability",
      indent: 0,
      isTotal: true,
      cells: [
        { code: "80105902", value: "0" },
        { code: "80105903", value: "0" },
        { code: "80105904", value: "0" },
        { code: "80105905", value: "0" },
        { code: "80105906", value: "0" },
        { code: "80105907", value: "0" },
        { code: "80105908", value: "0" },
        { code: "80105909", value: "0" },
        { code: "80105910", value: "0" },
      ],
    },
    {
      code: "68",
      name: "Marine",
      indent: 0,
      isTotal: true,
      cells: [
        { code: "80106802", value: "0" },
        { code: "80106803", value: "0" },
        { code: "80106804", value: "0" },
        { code: "80106805", value: "0" },
        { code: "80106806", value: "0" },
        { code: "80106807", value: "0" },
        { code: "80106808", value: "0" },
        { code: "80106809", value: "0" },
        { code: "80106810", value: "0" },
      ],
    },
    {
      code: "75",
      name: "Other",
      indent: 0,
      isTotal: true,
      cells: [
        { code: "80107502", value: "0" },
        { code: "80107503", value: "0" },
        { code: "80107504", value: "0" },
        { code: "80107505", value: "0" },
        { code: "80107506", value: "0" },
        { code: "80107507", value: "0" },
        { code: "80107508", value: "0" },
        { code: "80107509", value: "0" },
        { code: "80107510", value: "0" },
      ],
    },
    {
      code: "79",
      name: "TOTAL",
      indent: 0,
      isTotal: true,
      cells: [
        { code: "80107902", value: "0" },
        { code: "80107903", value: "0" },
        { code: "80107904", value: "0" },
        { code: "80107905", value: "0" },
        { code: "80107906", value: "0" },
        { code: "80107907", value: "0" },
        { code: "80107908", value: "0" },
        { code: "80107909", value: "0" },
        { code: "80107910", value: "0" },
      ],
    },
  ];

  // Summary table data
  const summaryData = [
    { label: "Gross:", code: "", value: "", rowCode: "", indent: 0, isSubtotal: false, isTotal: false },
    { label: "Commission Expense", code: "80103010", value: "0", rowCode: "30", indent: 1, isSubtotal: false, isTotal: false },
    { label: "Contingent Commissions", code: "80103310", value: "0", rowCode: "33", indent: 1, isSubtotal: false, isTotal: false },
    { label: "Other Non-Deferrable Commissions", code: "80103510", value: "0", rowCode: "35", indent: 1, isSubtotal: false, isTotal: false },
    { label: "Total Gross", code: "80103910", value: "0", rowCode: "39", indent: 1, isSubtotal: true, isTotal: false },
    { label: "Ceded:", code: "", value: "", rowCode: "", indent: 0, isSubtotal: false, isTotal: false },
    { label: "Commission Income", code: "80104010", value: "0", rowCode: "40", indent: 1, isSubtotal: false, isTotal: false },
    { label: "Contingent Commissions", code: "80104310", value: "0", rowCode: "43", indent: 1, isSubtotal: false, isTotal: false },
    { label: "Other Non-Deferrable Commissions", code: "80104510", value: "0", rowCode: "45", indent: 1, isSubtotal: false, isTotal: false },
    { label: "Total Ceded", code: "80104910", value: "0", rowCode: "49", indent: 1, isSubtotal: true, isTotal: false },
    { label: "TOTAL NET COMMISSIONS", code: "80108910", value: "0", rowCode: "89", indent: 0, isSubtotal: false, isTotal: true },
  ];

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      {/* Main Commissions Table */}
      <Table className="min-w-[1200px] text-xs dropdown-data">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead className="w-[250px] text-xs font-semibold text-left py-2 px-4" rowSpan={2}>
              Class of Insurance
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code="02">
              Deferred Comm.<br/>(BoY)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code="03">
              Unearned Comm<br/>(BoY)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code="04">
              Direct Comm<br/>(WP)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code="05">
              Reinsurance assumed<br/>Comm (WP)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code="06">
              Reinsurance ceded<br/>Comm (WP)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code="07">
              Net
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code="08">
              Deferred Comm<br/>(EoY)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code="09">
              Unearned Comm<br/>(EoY)
            </TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4" data-column-code="10">
              Net Commissions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {commissionsData.map((row, index) => {
            // Determine background color for row
            const bgClass = row.isTotal ? "bg-gray-50" : "";
                
            // Determine text weight
            const fontClass = row.isTotal ? "font-medium" : "";
            
            return (
              <TableRow key={index} className={bgClass} data-row-code={row.code}>
                <TableCell className={`${fontClass} py-1 px-4`}>
                  {row.name}
                  {row.code && <span className="text-orange-500 ml-2 opacity-50 text-[8px]">{row.code}</span>}
                </TableCell>
                
                {row.cells.map((cell, cellIndex) => (
                  <TableCell 
                    key={cellIndex} 
                    className={`text-center py-1 px-4 ${fontClass}`}
                    data-code={cell.code}
                  >
                    {cell.code && <span className="text-green-600 opacity-0 hover:opacity-50 text-[7px]">{cell.code}</span>}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Summary Tables - Redesigned with borders and better styling */}
      <div className="grid grid-cols-1 mt-8 text-xs border border-gray-300 mx-4 mb-4">
        <div className="grid grid-cols-2 w-full border-collapse">
          {/* Summary of Commissions */}
          <div className="border-r border-gray-300">
            <div className="bg-white font-semibold text-center py-2 px-4 border-b border-gray-300">
              Summary of Commissions
            </div>
            
            <div className="divide-y divide-gray-300">
              {summaryData.map((row, index) => {
                // Determine styling based on row type
                const isHeader = row.indent === 0 && !row.isTotal;
                const isIndented = row.indent === 1;
                const isTotal = row.isTotal || row.isSubtotal;
                
                // Different styling for different row types
                const cellClasses = `
                  ${isIndented ? 'pl-8 border-b border-dotted border-gray-300' : 'pl-4'} 
                  ${isTotal ? 'font-medium' : ''}
                  ${row.isTotal ? 'font-bold' : ''}
                  py-1 pr-4 flex justify-between items-center
                `;
                
                return (
                  <div 
                    key={index} 
                    className={`${isTotal && !row.isSubtotal ? 'border-t border-gray-300 bg-gray-50' : ''}`}
                  >
                    <div className={cellClasses}>
                      <span>{row.label}</span>
                      {row.rowCode && (
                        <span className="text-orange-500 ml-2">{row.rowCode}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Net Commissions */}
          <div>
            <div className="bg-white font-semibold text-center py-2 px-4 border-b border-gray-300">
              Net Commissions
            </div>
            <div className="text-center py-1 px-4 border-b border-gray-300 text-orange-500 font-semibold">
              10
            </div>
            
            <div className="divide-y divide-gray-300">
              {summaryData.filter(row => row.code).map((row, index) => {
                // Styling for different row types
                const isTotal = row.isTotal || row.isSubtotal;
                
                return (
                  <div 
                    key={index} 
                    className={`${isTotal && !row.isSubtotal ? 'bg-gray-50' : ''} text-center py-1 px-4`}
                  >
                    <span className="text-green-600">{row.code}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionsTable;
