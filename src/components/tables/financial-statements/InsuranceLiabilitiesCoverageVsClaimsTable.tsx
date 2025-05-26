
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Insurance Liabilities: Coverage vs. Claims Table component
 * Displays detailed breakdown of insurance liabilities by coverage and claims components
 */
const InsuranceLiabilitiesCoverageVsClaimsTable: React.FC = () => {
  // Define table rows with proper structure and indentation
  const rows: RowDefinition[] = useMemo(() => [
    { name: "BEGINNING OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Opening balance insurance contract assets", rowCode: "010", indent: 1, isTotal: false },
    { name: "Opening balance insurance contract liabilities", rowCode: "020", indent: 1, isTotal: false },
    { name: "Net opening insurance contract balances", rowCode: "099", indent: 1, isTotal: true },
    
    { name: "CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "", indent: 0, isHeader: true },
    { name: "Modified Retrospective", rowCode: "110", indent: 2, isTotal: false },
    { name: "Fair value", rowCode: "120", indent: 2, isTotal: false },
    { name: "Other", rowCode: "130", indent: 2, isTotal: false },
    { name: "Insurance Revenue", rowCode: "199", indent: 1, isTotal: true },
    
    { name: "Incurred claims and other insurance service expenses", rowCode: "210", indent: 2, isTotal: false },
    { name: "Amortization of insurance acquisition cash flows", rowCode: "220", indent: 2, isTotal: false },
    { name: "Losses and reversal of losses on onerous contracts", rowCode: "230", indent: 2, isTotal: false },
    { name: "Adjustments to liabilities for incurred claims", rowCode: "240", indent: 2, isTotal: false },
    { name: "Insurance Service Expenses", rowCode: "299", indent: 1, isTotal: true },
    
    { name: "Investment components", rowCode: "310", indent: 1, isTotal: false },
    { name: "Insurance service result", rowCode: "399", indent: 1, isTotal: true },
    { name: "Net finance (income) expenses from insurance contracts", rowCode: "410", indent: 1, isTotal: false },
    { name: "Effect of movements in exchange rates", rowCode: "430", indent: 1, isTotal: false },
    { name: "TOTAL CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "499", indent: 0, isTotal: true },
    
    { name: "CASH FLOWS", rowCode: "", indent: 0, isHeader: true },
    { name: "Premiums received for insurance contracts", rowCode: "510", indent: 1, isTotal: false },
    { name: "Claims, benefits and other expenses paid", rowCode: "520", indent: 1, isTotal: false },
    { name: "Insurance acquisition cash flows", rowCode: "530", indent: 1, isTotal: false },
    { name: "TOTAL CASH FLOWS", rowCode: "599", indent: 0, isTotal: true },
    
    { name: "Other changes in the net carrying amount of the insurance contract", rowCode: "610", indent: 0, isTotal: false },
    { name: "Net ending insurance contract balances", rowCode: "629", indent: 0, isTotal: true },
    
    { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Ending balance Insurance contract assets", rowCode: "659", indent: 1, isTotal: false },
    { name: "Ending balance Insurance contract liabilities", rowCode: "759", indent: 1, isTotal: false },
    { name: "Net ending insurance contract balances", rowCode: "799", indent: 1, isTotal: true, isFinalTotal: true }
  ], []);

  // Define column data for both current and prior periods
  const columns: ColumnDefinition[] = useMemo(() => [
    { id: "currentExcludingLoss", label: "Excluding Loss Component", colCode: "02" },
    { id: "currentLossComponent", label: "Loss Component", colCode: "06" },
    { id: "currentIncurredNotPAA", label: "Expected PV of Future Cash Flows", colCode: "10" },
    { id: "currentRiskAdjNotPAA", label: "Risk Adjustment", colCode: "12" },
    { id: "currentIncurredPAA", label: "", colCode: "16" },
    { id: "currentTotal", label: "TOTAL", colCode: "19" },
    { id: "priorExcludingLoss", label: "Excluding Loss Component", colCode: "22" },
    { id: "priorLossComponent", label: "Loss Component", colCode: "26" },
    { id: "priorIncurredNotPAA", label: "Expected PV of Future Cash Flows", colCode: "30" },
    { id: "priorRiskAdjNotPAA", label: "Risk Adjustment", colCode: "32" },
    { id: "priorIncurredPAA", label: "", colCode: "36" },
    { id: "priorTotal", label: "TOTAL", colCode: "39" }
  ], []);

  // Tertiary header for the table showing liability type divisions
  const tertiaryHeader = useMemo(() => (
    <TableRow className="h-6">
      <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
      <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Liabilities for remaining coverage
      </TableHead>
      <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Liabilities for incurred claims not under PAA
      </TableHead>
      <TableHead colSpan={1} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Liabilities for incurred claims under PAA
      </TableHead>
      <TableHead colSpan={1} className="text-xs font-semibold text-center py-0 px-2 border-r">
      </TableHead>
      <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Liabilities for remaining coverage
      </TableHead>
      <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Liabilities for incurred claims not under PAA
      </TableHead>
      <TableHead colSpan={1} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Liabilities for incurred claims under PAA
      </TableHead>
      <TableHead colSpan={1} className="text-xs font-semibold text-center py-0 px-2">
      </TableHead>
    </TableRow>
  ), []);

  // Secondary header for the table showing period divisions
  const secondaryHeader = useMemo(() => (
    <TableRow className="h-6">
      <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
      <TableHead colSpan={6} className="text-xs font-semibold text-center py-0 px-2 border-r">
        Current Period
      </TableHead>
      <TableHead colSpan={6} className="text-xs font-semibold text-center py-0 px-2">
        Prior Period Restated
      </TableHead>
    </TableRow>
  ), []);

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="2014" 
      secondaryHeader={
        <>
          {secondaryHeader}
          {tertiaryHeader}
        </>
      }
      maxHeight="85vh"
    />
  );
};

export default React.memo(InsuranceLiabilitiesCoverageVsClaimsTable);
