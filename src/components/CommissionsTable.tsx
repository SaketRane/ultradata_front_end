
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
    { label: "Gross:", code: "", value: "" },
    { label: "Commission Expense", code: "80103010", value: "0", rowCode: "30" },
    { label: "Contingent Commissions", code: "80103310", value: "0", rowCode: "33" },
    { label: "Other Non-Deferrable Commissions", code: "80103510", value: "0", rowCode: "35" },
    { label: "Total Gross", code: "80103910", value: "0", rowCode: "39" },
    { label: "Ceded:", code: "", value: "" },
    { label: "Commission Income", code: "80104010", value: "0", rowCode: "40" },
    { label: "Contingent Commissions", code: "80104310", value: "0", rowCode: "43" },
    { label: "Other Non-Deferrable Commissions", code: "80104510", value: "0", rowCode: "45" },
    { label: "Total Ceded", code: "80104910", value: "0", rowCode: "49" },
    { label: "TOTAL NET COMMISSIONS", code: "80108910", value: "0", rowCode: "89" },
  ];

  return (
    <div className="overflow-x-auto">
      {/* Main Commissions Table */}
      <Table className="w-full border-collapse text-xs compact-table">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead rowSpan={2} className="border text-center font-medium align-middle">Class of Insurance</TableHead>
            <TableHead rowSpan={2} className="border text-center font-medium align-middle w-24">
              Deferred Comm.<br/>(BoY)
            </TableHead>
            <TableHead rowSpan={2} className="border text-center font-medium align-middle w-24">
              Unearned Comm<br/>(BoY)
            </TableHead>
            <TableHead rowSpan={2} className="border text-center font-medium align-middle w-24">
              Direct Comm<br/>(WP)
            </TableHead>
            <TableHead rowSpan={2} className="border text-center font-medium align-middle w-24">
              Reinsurance assumed<br/>Comm (WP)
            </TableHead>
            <TableHead rowSpan={2} className="border text-center font-medium align-middle w-24">
              Reinsurance ceded<br/>Comm (WP)
            </TableHead>
            <TableHead rowSpan={2} className="border text-center font-medium align-middle w-24">Net</TableHead>
            <TableHead rowSpan={2} className="border text-center font-medium align-middle w-24">
              Deferred Comm<br/>(EoY)
            </TableHead>
            <TableHead rowSpan={2} className="border text-center font-medium align-middle w-24">
              Unearned Comm<br/>(EoY)
            </TableHead>
            <TableHead rowSpan={2} className="border text-center font-medium align-middle w-24">Net Commissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-muted/30">
            <TableCell className="border text-center"></TableCell>
            <TableCell className="border text-center text-amber-500 font-medium">02</TableCell>
            <TableCell className="border text-center text-amber-500 font-medium">03</TableCell>
            <TableCell className="border text-center text-amber-500 font-medium">04</TableCell>
            <TableCell className="border text-center text-amber-500 font-medium">05</TableCell>
            <TableCell className="border text-center text-amber-500 font-medium">06</TableCell>
            <TableCell className="border text-center text-amber-500 font-medium">07</TableCell>
            <TableCell className="border text-center text-amber-500 font-medium">08</TableCell>
            <TableCell className="border text-center text-amber-500 font-medium">09</TableCell>
            <TableCell className="border text-center text-amber-500 font-medium">10</TableCell>
          </TableRow>
          {commissionsData.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-muted/10"}>
              <TableCell className="border p-1 relative flex flex-row items-center">
                <span className={`absolute left-0 top-0 bottom-0 w-1 ${row.name === "TOTAL" ? "bg-green-500" : "bg-blue-500"}`}></span>
                <span className="text-[9px] ml-2 font-medium text-gray-500">{row.code}</span>
                <span className="ml-2 truncate">{row.name}</span>
              </TableCell>
              {row.cells.map((cell, cellIndex) => (
                <TableCell 
                  key={cellIndex} 
                  className="border text-right p-1"
                  data-code={cell.code}
                >
                  <div className="flex flex-col">
                    <span className="text-[7px] text-gray-400">{cell.code}</span>
                    <span className="text-[9px]">{cell.value}</span>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Summary Tables */}
      <div className="grid grid-cols-2 mt-8 text-xs">
        {/* Left empty space */}
        <div></div>
        
        {/* Right side with two tables */}
        <div className="grid grid-cols-2">
          {/* Summary of Commissions */}
          <Table className="w-full border-collapse compact-table">
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2} className="border text-center font-medium">
                  Summary of Commissions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryData.map((row, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-muted/10"}>
                  <TableCell 
                    className={`border p-1 ${row.label === "Gross:" || row.label === "Ceded:" 
                      ? "font-medium bg-muted/20" 
                      : row.label === "Total Gross" || row.label === "Total Ceded" || row.label === "TOTAL NET COMMISSIONS"
                        ? "font-medium"
                        : "pl-4"}`}
                  >
                    {row.rowCode && (
                      <span className="text-[9px] mr-2 text-amber-500 font-medium">{row.rowCode}</span>
                    )}
                    {row.label}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Net Commissions */}
          <Table className="w-full border-collapse compact-table">
            <TableHeader>
              <TableRow>
                <TableHead className="border text-center font-medium">
                  Net Commissions
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="border text-center text-amber-500 font-medium">
                  10
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryData.filter(row => row.code).map((row, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-muted/10"}>
                  <TableCell 
                    className="border text-right p-1"
                    data-code={row.code}
                  >
                    <div className="flex flex-col">
                      <span className="text-[7px] text-gray-400">{row.code}</span>
                      <span className="text-[9px]">{row.value}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CommissionsTable;
