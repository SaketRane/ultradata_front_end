
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Net Expenses from Reinsurance Contracts Held Table component for Unregistered Reinsurance (7060)
 * Displays reinsurance contract expenses, asset balances, and reinsurance collateral
 */
const UnregisteredReinsuranceNetExpensesTable: React.FC = () => {
  // Define table rows with proper structure and indentation
  const rows: RowDefinition[] = useMemo(() => [
    { name: "Total Associated and Non-qualifying subsidiary", rowCode: "09", indent: 0, isTotal: false },
    { name: "Total Non-associated and Non-subsidiary", rowCode: "19", indent: 0, isTotal: false },
    { name: "TOTAL BUSINESS", rowCode: "29", indent: 0, isTotal: true, isFinalTotal: true }
  ], []);

  // Define column data for the table
  const columns: ColumnDefinition[] = useMemo(() => [
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
    { id: "netReceivable", label: "Net Receivable", colCode: "28" },
    { id: "nonOwnedRSA", label: "Non-owned deposits - RSA", colCode: "32" },
    { id: "otherAcceptable", label: "Other acceptable non-owned deposits", colCode: "34" },
    { id: "collateralFunds", label: "Reinsurance Collateral - Funds Held", colCode: "36" },
    { id: "lettersCredit", label: "Letters of Credit", colCode: "38" },
    { id: "collateralTotal", label: "Total", colCode: "39" }
  ], []);

  // Secondary header for the table showing column groupings
  const secondaryHeader = useMemo(() => (
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
      <TableHead colSpan={3} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Receivables
      </TableHead>
      <TableHead colSpan={5} className="text-xs font-semibold text-center py-0 px-2">
        Reinsurance Collateral
      </TableHead>
    </TableRow>
  ), []);

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="7060" 
      secondaryHeader={secondaryHeader}
      maxHeight="85vh"
    />
  );
};

export default React.memo(UnregisteredReinsuranceNetExpensesTable);
