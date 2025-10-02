
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

interface RegisteredReinsuranceNetExpensesTableProps {
  year?: string;
}

/**
 * Net Expenses from Reinsurance Contracts Held Table component for Registered Reinsurance (7050)
 * Displays reinsurance contract expenses, asset balances, and receivables
 */
const RegisteredReinsuranceNetExpensesTable: React.FC<RegisteredReinsuranceNetExpensesTableProps> = ({ year }) => {
  // Define table rows based on year
  const rows: RowDefinition[] = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023+: New structure with same rows but different columns
      return [
        { name: "Total Associated and Non-qualifying subsidiary", rowCode: "09", indent: 0, isTotal: false },
        { name: "Total Non-associated and Non-subsidiary", rowCode: "19", indent: 0, isTotal: false },
        { name: "TOTAL BUSINESS", rowCode: "29", indent: 0, isTotal: true, isFinalTotal: true }
      ];
    } else {
      // For 2015-2022: Updated structure with proper row definitions
      return [
        { name: "Total Associated and Non-qualifying subsidiary", rowCode: "09", indent: 0, isTotal: false, isBold: false },
        { name: "Total Non-associated and Non-subsidiary", rowCode: "19", indent: 0, isTotal: false, isBold: false },
        { name: "TOTAL BUSINESS", rowCode: "29", indent: 0, isTotal: true, isFinalTotal: true, isBold: true }
      ];
    }
  }, [year]);

  // Define column data based on year
  const columns: ColumnDefinition[] = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023+: New columns structure
      return [
        { id: "allocationPremiums", label: "Allocation of Reinsurance Premiums", colCode: "50" },
        { id: "amountsRecoverable", label: "Amounts Recoverable from Reinsurers for Incurred Claims", colCode: "52" },
        { id: "nonPerformanceRisk", label: "Effect of changes in non-performance risk of reinsurers", colCode: "54" },
        { id: "total", label: "Total", colCode: "59" },
        { id: "assetsRemaining", label: "Assets for Remaining Coverage", colCode: "62" },
        { id: "assetsUnderPAA", label: "Under PAA", colCode: "72" },
        { id: "assetsNotUnderPAA", label: "Not under PAA", colCode: "74" },
        { id: "balancesTotal", label: "Reinsurance Contract Held Balances Total", colCode: "79" },
        { id: "reinsReceivable", label: "Reinsurance Receivable", colCode: "24" },
        { id: "reinsPayable", label: "Reinsurance Payable", colCode: "26" },
        { id: "netReceivable", label: "Net Receivable", colCode: "28" }
      ];
    } else {
      // For 2015-2022: Updated columns structure
      return [
        { id: "reinsPremiumsCeded", label: "Reinsurance Premiums Ceded", colCode: "18" },
        { id: "unearnedPremiumsCeded", label: "Unearned Premiums ceded to assuming insurer", colCode: "20" },
        { id: "outstandingLosses", label: "Outstanding losses recoverable from assuming insurer", colCode: "22" },
        { id: "reinsReceivable", label: "Reinsurance Receivable", colCode: "24" },
        { id: "reinsPayable", label: "Reinsurance Payable", colCode: "26" },
        { id: "netReceivable", label: "Net Receivable", colCode: "28" },
        { id: "agingReinsAsset", label: "Aging of Reinsurance Asset", colCode: "30" }
      ];
    }
  }, [year]);

  // Secondary header for the table showing column groupings
  const secondaryHeader = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023+: New secondary header structure
      return (
        <TableRow className="h-6">
          <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
          <TableHead colSpan={4} className="text-xs font-semibold text-center py-0 px-2 border-r">
            Net Expenses from Reinsurance Contracts Held
          </TableHead>
          <TableHead className="text-xs font-semibold text-center py-0 px-2 border-r"></TableHead>
          <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
            Assets for Incurred Claims
          </TableHead>
          <TableHead className="text-xs font-semibold text-center py-0 px-2 border-r"></TableHead>
          <TableHead colSpan={3} className="text-xs font-semibold text-center py-0 px-2">
            Receivables
          </TableHead>
        </TableRow>
      );
    } else {
      // For 2015-2022: Only show secondary header for Receivables group
      return (
        <TableRow className="h-6">
          <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
          <TableHead className="text-xs font-semibold text-center py-0 px-2 border-r"></TableHead>
          <TableHead className="text-xs font-semibold text-center py-0 px-2 border-r"></TableHead>
          <TableHead className="text-xs font-semibold text-center py-0 px-2 border-r"></TableHead>
          <TableHead colSpan={4} className="text-xs font-semibold text-center py-0 px-2">
            Receivables
          </TableHead>
        </TableRow>
      );
    }
  }, [year]);

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="7050" 
      secondaryHeader={secondaryHeader}
      maxHeight="85vh"
    />
  );
};

export default React.memo(RegisteredReinsuranceNetExpensesTable);
