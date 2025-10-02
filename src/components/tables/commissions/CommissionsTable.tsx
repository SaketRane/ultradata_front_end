/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";
import FinancialTable from "@/components/ui/financial-table";

interface CommissionsTableProps {
  year?: string;
}

const CommissionsTable: React.FC<CommissionsTableProps> = ({ year }) => {
  // Define table rows based on year
  const rows: RowDefinition[] = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023+: New simplified structure
      return [
        { name: "Property - total", rowCode: "010", indent: 0, isTotal: false },
        { name: "Automobile - total", rowCode: "020", indent: 0, isTotal: false },
        { name: "Liability", rowCode: "030", indent: 0, isTotal: false },
        { name: "Marine", rowCode: "040", indent: 0, isTotal: false },
        { name: "Other", rowCode: "050", indent: 0, isTotal: false },
        { name: "TOTAL", rowCode: "199", indent: 0, isTotal: true, isFinalTotal: true }
      ];
    } else {
      // For 2015-2022: Original complex structure
      return [
        { name: "Property - total", rowCode: "09", indent: 0, isTotal: false },
        { name: "Automobile - total", rowCode: "29", indent: 0, isTotal: false },
        { name: "Liability", rowCode: "59", indent: 0, isTotal: false },
        { name: "Marine", rowCode: "68", indent: 0, isTotal: false },
        { name: "Other", rowCode: "75", indent: 0, isTotal: false },
        { name: "TOTAL", rowCode: "79", indent: 0, isTotal: true, isFinalTotal: true }
      ];
    }
  }, [year]);

  // Define column data based on year
  const columns: ColumnDefinition[] = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023+: New simplified columns
      return [
        { id: "currentPeriod", label: "Current Period", colCode: "01" },
        { id: "priorPeriod", label: "Prior Period", colCode: "03" }
      ];
    } else {
      // For 2015-2022: Original complex columns
      return [
        { id: "deferredCommBoY", label: "Deferred Comm. (BoY)", colCode: "02" },
        { id: "unearnedCommBoY", label: "Unearned Comm (BoY)", colCode: "03" },
        { id: "directCommWP", label: "Direct Comm (WP)", colCode: "04" },
        { id: "reinsuranceAssumedCommWP", label: "Reinsurance assumed Comm (WP)", colCode: "05" },
        { id: "reinsuranceCededCommWP", label: "Reinsurance ceded Comm (WP)", colCode: "06" },
        { id: "net", label: "Net", colCode: "07" },
        { id: "deferredCommEoY", label: "Deferred Comm (EoY)", colCode: "08" },
        { id: "unearnedCommEoY", label: "Unearned Comm (EoY)", colCode: "09" },
        { id: "netCommissions", label: "Net Commissions", colCode: "10" }
      ];
    }
  }, [year]);

  // For 2023+: Use FinancialTable, for 2015-2022: Use original complex structure
  const isIFRS17Year = year && parseInt(year) >= 2023;
  
  if (isIFRS17Year) {
    return (
      <FinancialTable 
        rows={rows} 
        columns={columns} 
        sheetCode="8010"
        maxHeight="85vh"
      />
    );
  }

  // Original complex structure for 2015-2022
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
  return (
    <div className="space-y-4">
      {/* Main Table */}
      <div className="overflow-auto max-h-[50vh] rounded-md border bg-white/80 backdrop-blur-sm">
        <Table className="min-w-[1200px] text-sm">
          <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            <TableRow className="h-8">
              <TableHead className="w-[250px] text-sm font-semibold text-left py-2 px-3 border-r">
                Class of Insurance
              </TableHead>
              <TableHead className="text-sm font-semibold text-center py-2 px-2 border-r">
                Deferred Comm. (BoY)
              </TableHead>
              <TableHead className="text-sm font-semibold text-center py-2 px-2 border-r">
                Unearned Comm (BoY)
              </TableHead>
              <TableHead className="text-sm font-semibold text-center py-2 px-2 border-r">
                Direct Comm (WP)
              </TableHead>
              <TableHead className="text-sm font-semibold text-center py-2 px-2 border-r">
                Reinsurance assumed Comm (WP)
              </TableHead>
              <TableHead className="text-sm font-semibold text-center py-2 px-2 border-r">
                Reinsurance ceded Comm (WP)
              </TableHead>
              <TableHead className="text-sm font-semibold text-center py-2 px-2 border-r">
                Net
              </TableHead>
              <TableHead className="text-sm font-semibold text-center py-2 px-2 border-r">
                Deferred Comm (EoY)
              </TableHead>
              <TableHead className="text-sm font-semibold text-center py-2 px-2 border-r">
                Unearned Comm (EoY)
              </TableHead>
              <TableHead className="text-sm font-semibold text-center py-2 px-2">
                Net Commissions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm">
            {mainTableRows.map((row, index) => {
              // Determine background color for row
              const bgClass = row.isTotal ? "bg-gray-50" : "";
              const fontClass = row.isTotal ? "font-semibold" : "font-normal";
              
              return (
                <TableRow key={index} className={`${bgClass} h-6`}>
                  <TableCell className={`${fontClass} py-2 px-3 border-r`}>
                    {row.name}
                  </TableCell>
                  
                  {Object.values(mainTableColumnCodes).map((columnCode) => {
                    return (
                      <TableCell 
                        key={`${row.rowCode}-${columnCode}`}
                        className="text-center py-2 px-2 border-r last:border-r-0"
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

      {/* Summary Table */}
      <div className="mt-4 overflow-y-auto max-h-[300px] rounded-md border bg-white/80 backdrop-blur-sm">
        <Table className="w-full text-xs">
          <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            <TableRow className="h-6">
              <TableHead className="w-[400px] text-xs font-semibold text-left py-1 px-2 border-r">
                Summary of Commissions
              </TableHead>
              <TableHead className="text-xs font-semibold text-center py-1 px-2">
                Net Commissions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {summaryTableRows.map((row, index) => {
              // Calculate left padding based on indentation level
              const paddingClass = row.indent === 1 ? "pl-4" : "";
              
              // Determine text weight and style
              const fontClass = row.isHeader ? "font-medium italic" : "font-normal";
              
              return (
                <TableRow key={index} className="h-5">
                  <TableCell className={`${paddingClass} ${fontClass} py-1 px-2 border-r`}>
                    {row.name}
                  </TableCell>
                  
                  <TableCell className="text-center py-1 px-2">
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

export default React.memo(CommissionsTable);
