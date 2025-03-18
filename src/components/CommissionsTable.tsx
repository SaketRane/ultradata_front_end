
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
      isTotal: false,
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
      isTotal: false,
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
      isTotal: false,
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
      isTotal: false,
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
      isTotal: false,
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

  // Column headers
  const columnHeaders = [
    { title: "Class of Insurance", code: "" },
    { title: "Deferred Comm. (BoY)", code: "02" },
    { title: "Unearned Comm (BoY)", code: "03" },
    { title: "Direct Comm (WP)", code: "04" },
    { title: "Reinsurance assumed Comm (WP)", code: "05" },
    { title: "Reinsurance ceded Comm (WP)", code: "06" },
    { title: "Net", code: "07" },
    { title: "Deferred Comm (EoY)", code: "08" },
    { title: "Unearned Comm (EoY)", code: "09" },
    { title: "Net Commissions", code: "10" },
  ];

  return (
    <div className="overflow-auto max-h-[70vh]">
      {/* Main Commissions Table */}
      <div className="border border-gray-300">
        <Table className="border-collapse min-w-[1200px] text-xs">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow className="border-b border-gray-300">
              {columnHeaders.map((header, index) => (
                <TableHead 
                  key={index} 
                  className={`
                    font-semibold text-center p-2 border-x border-gray-300
                    ${index === 0 ? 'text-left min-w-[200px]' : ''}
                  `}
                >
                  {header.title}
                </TableHead>
              ))}
            </TableRow>
            <TableRow className="border-b border-gray-300">
              {columnHeaders.map((header, index) => (
                <TableHead 
                  key={`code-${index}`} 
                  className={`
                    text-center py-1 px-4 text-orange-500 border-x border-gray-300
                    ${!header.code ? 'invisible' : ''}
                  `}
                  data-column-code={header.code}
                >
                  {header.code}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissionsData.map((row, index) => {
              const isLastRow = index === commissionsData.length - 1;
              
              return (
                <TableRow 
                  key={index} 
                  className={`
                    ${row.isTotal ? 'font-bold' : ''}
                    ${isLastRow ? '' : 'border-b border-gray-300'}
                  `} 
                  data-row-code={row.code}
                >
                  <TableCell className="py-1 px-4 border-x border-gray-300 text-left">
                    <div className="flex justify-between items-center">
                      <span>{row.name}</span>
                      <span className="text-orange-500 text-[10px]">{row.code}</span>
                    </div>
                  </TableCell>
                  
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell 
                      key={cellIndex} 
                      className="text-center py-1 px-4 border-x border-gray-300"
                      data-code={cell.code}
                    >
                      <span className="text-green-600 text-[10px]">{cell.code}</span>
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Gap between tables */}
      <div className="h-12"></div>

      {/* Summary Tables - Styled like the image */}
      <div className="grid grid-cols-1 text-xs">
        <div className="grid grid-cols-2 border-collapse">
          <div className="col-start-2 col-span-1">
            <div className="grid grid-cols-2 border border-gray-300">
              {/* Summary of Commissions Header */}
              <div className="border-b border-gray-300 font-semibold text-center p-2">
                Summary of Commissions
              </div>
              
              {/* Net Commissions Header */}
              <div className="border-b border-l border-gray-300 font-semibold text-center p-2">
                Net Commissions
              </div>
              
              {/* Net Commission Column Header */}
              <div className="border-b border-gray-300 invisible"></div>
              <div className="border-b border-l border-gray-300 text-center p-2 text-orange-500">
                10
              </div>
              
              {/* Summary Table Rows */}
              <div className="border-r border-gray-300">
                {summaryData.map((row, index) => {
                  // Skip rendering the value cell here - will be done in the next column
                  if (!row.label) return null;
                  
                  // Different styling for different row types
                  const isHeader = row.indent === 0 && !row.isTotal;
                  const isTotal = row.isTotal || row.isSubtotal;
                  const borderBottom = index < summaryData.length - 1 ? 'border-b border-gray-300' : '';
                  const borderStyle = row.indent === 1 ? 'border-dotted' : 'border-solid';
                  
                  return (
                    <div
                      key={`label-${index}`}
                      className={`
                        p-2 ${borderBottom} ${row.isTotal ? 'font-bold' : row.isSubtotal ? 'font-semibold' : ''} 
                        border-b-${borderStyle}
                      `}
                    >
                      <div className="flex justify-between">
                        <span className={row.indent === 1 ? 'pl-6' : ''}>
                          {row.label}
                        </span>
                        {row.rowCode && (
                          <span className="text-orange-500">{row.rowCode}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Net Commission Values */}
              <div className="border-l border-gray-300">
                {summaryData.map((row, index) => {
                  if (!row.code) return (
                    <div 
                      key={`empty-${index}`} 
                      className={`p-2 ${index < summaryData.length - 1 ? 'border-b border-gray-300' : ''}`}
                    ></div>
                  );
                  
                  const borderStyle = row.indent === 1 ? 'border-dotted' : 'border-solid';
                  
                  return (
                    <div
                      key={`value-${index}`}
                      className={`
                        text-center p-2 
                        ${index < summaryData.length - 1 ? 'border-b border-gray-300' : ''} 
                        border-b-${borderStyle}
                        ${row.isTotal ? 'font-bold' : row.isSubtotal ? 'font-semibold' : ''}
                      `}
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
    </div>
  );
};

export default CommissionsTable;
