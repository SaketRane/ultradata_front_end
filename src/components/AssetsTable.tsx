
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Assets Table component for displaying consolidated financial assets data
 * Updated for IFRS 17 reporting standards used in 2023-2025
 */
const AssetsTable: React.FC = () => {
  // Define assets table rows with their codes for IFRS 17 (2023-2025)
  const assetsTableRows: RowDefinition[] = useMemo(() => [
    { name: "ASSETS:", rowCode: "", indent: 0, isHeader: true, hasVested: false },
    { name: "Cash and Cash Equivalents", rowCode: "01", indent: 0, isTotal: false, hasVested: true },
    { name: "Accrued Investment Income", rowCode: "11", indent: 0, isTotal: false, hasVested: true },
    { name: "Current Tax Assets", rowCode: "52", indent: 0, isTotal: false, hasVested: false },
    { name: "Assets Held for Sale", rowCode: "50", indent: 0, isTotal: false, hasVested: true },
    { name: "Asset for Insurance Acquisition Cash Flows", rowCode: "18", indent: 0, isTotal: false, hasVested: false },
    { name: "Investments", rowCode: "14", indent: 0, isTotal: false, hasVested: true },
    { name: "Equity Accounted Investees", rowCode: "15", indent: 0, isTotal: false, hasVested: true },
    { name: "Financial Instrument Derivative Assets", rowCode: "16", indent: 0, isTotal: false, hasVested: true },
    { name: "Insurance Contract Assets", rowCode: "62", indent: 0, isTotal: false, hasVested: false },
    { name: "Reinsurance Contract Held Assets", rowCode: "64", indent: 0, isTotal: false, hasVested: false },
    { name: "Investment Properties", rowCode: "17", indent: 0, isTotal: false, hasVested: true },
    { name: "Property and Equipment", rowCode: "41", indent: 0, isTotal: false, hasVested: true },
    { name: "Intangible Assets", rowCode: "56", indent: 0, isTotal: false, hasVested: false },
    { name: "Goodwill", rowCode: "54", indent: 0, isTotal: false, hasVested: false },
    { name: "Defined Benefit Pension Plan", rowCode: "58", indent: 0, isTotal: false, hasVested: false },
    { name: "Segregated Funds Net Assets", rowCode: "60", indent: 0, isTotal: false, hasVested: false },
    { name: "Deferred Tax Assets", rowCode: "44", indent: 0, isTotal: false, hasVested: false },
    { name: "Other Assets", rowCode: "88", indent: 0, isTotal: false, hasVested: false },
    { name: "TOTAL ASSETS", rowCode: "89", indent: 0, isTotal: true, isFinalTotal: true, hasVested: true }
  ], []);

  // Define column data
  const columns: ColumnDefinition[] = useMemo(() => [
    { id: "currentTotal", label: "Total", colCode: "01" },
    { id: "currentVested", label: "Vested in Trust*", colCode: "02" },
    { id: "priorTotal", label: "Total", colCode: "03" },
    { id: "priorVested", label: "Vested in Trust*", colCode: "04" },
    { id: "openingTotal", label: "Total", colCode: "05" },
    { id: "openingVested", label: "Vested in Trust*", colCode: "06" }
  ], []);

  // Secondary header for the table
  const secondaryHeader = useMemo(() => (
    <TableRow className="h-6">
      <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
      <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Current Period
      </TableHead>
      <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Prior Period Restated
      </TableHead>
      <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2">
        Opening Prior Period Restated
      </TableHead>
    </TableRow>
  ), []);

  return (
    <FinancialTable 
      rows={assetsTableRows} 
      columns={columns} 
      sheetCode="2010" 
      secondaryHeader={secondaryHeader}
    />
  );
};

export default React.memo(AssetsTable);
