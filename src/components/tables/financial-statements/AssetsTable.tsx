
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";
import { TableRow, TableHead } from "@/components/ui/table";

interface AssetsTableProps {
  year?: string;
}

const AssetsTable: React.FC<AssetsTableProps> = ({ year }) => {
  // Define assets table rows based on year
  const rows: RowDefinition[] = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023+: Hierarchical structure like the image
      return [
        { name: "CASH AND SHORT-TERM INVESTMENTS", rowCode: "", indent: 0, isHeader: true, hasVested: false },
        { name: "Cash", rowCode: "01", indent: 1, isTotal: false, hasVested: true },
        { name: "Short-term investments", rowCode: "02", indent: 1, isTotal: false, hasVested: true },
        { name: "Total cash and short-term investments", rowCode: "03", indent: 0, isTotal: true, hasVested: true },
        { name: "BONDS", rowCode: "", indent: 0, isHeader: true, hasVested: false },
        { name: "Government", rowCode: "04", indent: 1, isTotal: false, hasVested: true },
        { name: "Corporate", rowCode: "05", indent: 1, isTotal: false, hasVested: true },
        { name: "Total bonds", rowCode: "06", indent: 0, isTotal: true, hasVested: true },
        { name: "STOCKS", rowCode: "", indent: 0, isHeader: true, hasVested: false },
        { name: "Preferred", rowCode: "07", indent: 1, isTotal: false, hasVested: true },
        { name: "Common", rowCode: "08", indent: 1, isTotal: false, hasVested: true },
        { name: "Total stocks", rowCode: "09", indent: 0, isTotal: true, hasVested: true },
        { name: "OTHER INVESTMENTS", rowCode: "", indent: 0, isHeader: true, hasVested: false },
        { name: "Mortgage loans", rowCode: "10", indent: 1, isTotal: false, hasVested: true },
        { name: "Real estate", rowCode: "11", indent: 1, isTotal: false, hasVested: true },
        { name: "Policy loans", rowCode: "12", indent: 1, isTotal: false, hasVested: true },
        { name: "Other", rowCode: "13", indent: 1, isTotal: false, hasVested: true },
        { name: "Total other investments", rowCode: "14", indent: 0, isTotal: true, hasVested: true },
        { name: "TOTAL INVESTMENTS", rowCode: "15", indent: 0, isTotal: true, hasVested: true },
        { name: "OTHER ASSETS", rowCode: "", indent: 0, isHeader: true, hasVested: false },
        { name: "Accounts receivable", rowCode: "16", indent: 1, isTotal: false, hasVested: false },
        { name: "Reinsurance recoverable", rowCode: "17", indent: 1, isTotal: false, hasVested: false },
        { name: "Deferred policy acquisition costs", rowCode: "18", indent: 1, isTotal: false, hasVested: false },
        { name: "Other", rowCode: "19", indent: 1, isTotal: false, hasVested: false },
        { name: "Total other assets", rowCode: "20", indent: 0, isTotal: true, hasVested: false },
        { name: "TOTAL ASSETS", rowCode: "21", indent: 0, isTotal: true, isFinalTotal: true, hasVested: true }
      ];
    } else {
      // For 2015-2022: Original IFRS 17 structure
      return [
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
      ];
    }
  }, [year]);

  // Define column data based on year
  const columns: ColumnDefinition[] = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023-2024: Simple structure without "Vested in Trust*" columns
      return [
        { id: "currentPeriod", label: "Current Period", colCode: "01" },
        { id: "priorPeriod", label: "Prior Period", colCode: "03" }
      ];
    } else {
      // For 2015-2022: Structure without "Opening Prior Period Restated" columns (always blank)
      return [
        { id: "currentTotal", label: "Total", colCode: "01" },
        { id: "currentVested", label: "Vested in Trust*", colCode: "02" },
        { id: "priorTotal", label: "Total", colCode: "03" },
        { id: "priorVested", label: "Vested in Trust*", colCode: "04" }
      ];
    }
  }, [year]);

  // Secondary header for the table based on year
  const secondaryHeader = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023-2024: No secondary header needed (simple structure)
      return null;
    } else {
      // For 2015-2022: Secondary header without "Opening Prior Period Restated" columns
      return (
        <TableRow className="h-6">
          <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
          <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
            Current Period
          </TableHead>
          <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2">
            Prior Period
          </TableHead>
        </TableRow>
      );
    }
  }, [year]);

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="2010"
      secondaryHeader={secondaryHeader}
    />
  );
};

export default React.memo(AssetsTable);
