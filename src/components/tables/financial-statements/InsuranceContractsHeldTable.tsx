
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Insurance Contracts Held Table component (Sheet 2018)
 * Displays detailed breakdown of reinsurance contract held balances by measurement components
 */
const InsuranceContractsHeldTable: React.FC = () => {
  // Define table rows with proper structure and indentation
  const rows: RowDefinition[] = useMemo(() => [
    { name: "BEGINNING OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Opening balance reinsurance contract held assets", rowCode: "010", indent: 1, isTotal: false },
    { name: "Opening balance reinsurance contract held liabilities", rowCode: "020", indent: 1, isTotal: false },
    { name: "Net opening reinsurance contract held balances", rowCode: "099", indent: 1, isTotal: true },
    
    { name: "CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "", indent: 0, isHeader: true },
    { name: "Modified Retrospective", rowCode: "105", indent: 2, isTotal: false },
    { name: "Fair value", rowCode: "110", indent: 2, isTotal: false },
    { name: "Other", rowCode: "115", indent: 2, isTotal: false },
    { name: "Allocation of reinsurance premiums paid", rowCode: "119", indent: 1, isTotal: false },
    { name: "Incurred claims recovered and other reinsurance service expenses", rowCode: "130", indent: 2, isTotal: false },
    { name: "Amortization of reinsurance acquisition cash flows", rowCode: "135", indent: 2, isTotal: false },
    { name: "Recovery of losses and reversal on recovery of losses", rowCode: "140", indent: 2, isTotal: false },
    { name: "Adjustments to assets for incurred claims", rowCode: "145", indent: 2, isTotal: false },
    { name: "Amounts recoverable from reinsurers", rowCode: "149", indent: 1, isTotal: false },
    { name: "Investment components", rowCode: "120", indent: 1, isTotal: false },
    { name: "Effect of changes in non-performance risk of reinsurers", rowCode: "160", indent: 1, isTotal: false },
    { name: "Net expenses from reinsurance contracts held", rowCode: "199", indent: 1, isTotal: true },
    { name: "Net finance (income) expenses from reinsurance contracts held", rowCode: "210", indent: 1, isTotal: false },
    { name: "Effects of movements in exchange rates", rowCode: "230", indent: 1, isTotal: false },
    { name: "TOTAL CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "299", indent: 0, isTotal: true },
    
    { name: "CASH FLOWS", rowCode: "", indent: 0, isHeader: true },
    { name: "Premiums paid", rowCode: "310", indent: 1, isTotal: false },
    { name: "Amounts received", rowCode: "320", indent: 1, isTotal: false },
    { name: "Reinsurance acquisition cash flows", rowCode: "330", indent: 1, isTotal: false },
    { name: "TOTAL CASH FLOWS", rowCode: "399", indent: 0, isTotal: true },
    
    { name: "Other changes in the net carrying amount of the reinsurance contract held", rowCode: "410", indent: 0, isTotal: false },
    { name: "Net ending reinsurance contract held balances", rowCode: "429", indent: 0, isTotal: true },
    
    { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Ending balance reinsurance contract held assets", rowCode: "459", indent: 1, isTotal: false },
    { name: "Ending balance reinsurance contract held liabilities", rowCode: "559", indent: 1, isTotal: false },
    { name: "Net ending reinsurance contract held balances", rowCode: "599", indent: 1, isTotal: true, isFinalTotal: true }
  ], []);

  // Define column data based on the structure provided
  const columns: ColumnDefinition[] = useMemo(() => [
    { id: "currentExcludingLoss", label: "Excluding Loss-Recovery Component", colCode: "02" },
    { id: "currentLossRecovery", label: "Loss-Recovery Component", colCode: "03" },
    { id: "currentTotal", label: "Total", colCode: "10" },
    { id: "currentExpectedPV", label: "Expected Present Value of Future Cash Flows", colCode: "12" },
    { id: "currentRiskAdj", label: "Risk Adjustment", colCode: "16" },
    { id: "currentTotalAll", label: "TOTAL", colCode: "19" },
    { id: "priorExcludingLoss", label: "Excluding Loss-Recovery Component", colCode: "22" },
    { id: "priorLossRecovery", label: "Loss-Recovery Component", colCode: "23" },
    { id: "priorTotal", label: "Total", colCode: "30" },
    { id: "priorExpectedPV", label: "Expected Present Value of Future Cash Flows", colCode: "32" },
    { id: "priorRiskAdj", label: "Risk Adjustment", colCode: "36" },
    { id: "priorTotalAll", label: "TOTAL", colCode: "39" }
  ], []);

  // Secondary header for the table showing period divisions and sub-groupings
  const secondaryHeader = useMemo(() => (
    <>
      <TableRow className="h-6">
        <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
        <TableHead colSpan={6} className="text-xs font-semibold text-center py-0 px-2 border-r">
          Current Period
        </TableHead>
        <TableHead colSpan={6} className="text-xs font-semibold text-center py-0 px-2">
          Prior Period Restated
        </TableHead>
      </TableRow>
      <TableRow className="h-6">
        <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
        <TableHead colSpan={3} className="text-xs font-semibold text-center py-0 px-2 border-r">
          Assets for remaining coverage
        </TableHead>
        <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
          Assets for incurred claims not under PAA
        </TableHead>
        <TableHead className="text-xs font-semibold text-center py-0 px-2 border-r">
          Assets for incurred claims under PAA
        </TableHead>
        <TableHead colSpan={3} className="text-xs font-semibold text-center py-0 px-2 border-r">
          Assets for remaining coverage
        </TableHead>
        <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
          Assets for incurred claims not under PAA
        </TableHead>
        <TableHead className="text-xs font-semibold text-center py-0 px-2">
          Assets for incurred claims under PAA
        </TableHead>
      </TableRow>
    </>
  ), []);

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="2018" 
      secondaryHeader={secondaryHeader}
      maxHeight="85vh"
    />
  );
};

export default React.memo(InsuranceContractsHeldTable);
