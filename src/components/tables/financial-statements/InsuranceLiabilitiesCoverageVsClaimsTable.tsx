
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Insurance Liabilities: Coverage vs. Claims Table component for displaying financial statements data
 */
const InsuranceLiabilitiesCoverageVsClaimsTable: React.FC = () => {
  // Define table rows with their codes for IFRS 17 format
  const tableRows: RowDefinition[] = useMemo(() => [
    { name: "BEGINNING OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Opening balance insurance contract assets", rowCode: "010", indent: 1 },
    { name: "Opening balance insurance contract liabilities", rowCode: "020", indent: 1 },
    { name: "Net opening insurance contract balances", rowCode: "099", indent: 0, isTotal: true },
    
    { name: "CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "", indent: 0, isHeader: true },
    { name: "Modified Retrospective", rowCode: "110", indent: 2 },
    { name: "Fair value", rowCode: "120", indent: 2 },
    { name: "Other", rowCode: "130", indent: 2 },
    { name: "Insurance Revenue", rowCode: "199", indent: 1, isTotal: true },
    { name: "Incurred claims and other insurance service expenses", rowCode: "210", indent: 2 },
    { name: "Amortization of insurance acquisition cash flows", rowCode: "220", indent: 2 },
    { name: "Losses and reversal of losses on onerous contracts", rowCode: "230", indent: 2 },
    { name: "Adjustments to liabilities for incurred claims", rowCode: "240", indent: 2 },
    { name: "Insurance Service Expenses", rowCode: "299", indent: 1, isTotal: true },
    { name: "Investment components", rowCode: "310", indent: 1 },
    { name: "Insurance service result", rowCode: "399", indent: 0, isTotal: true },
    { name: "Net finance (income) expenses from insurance contracts", rowCode: "410", indent: 0 },
    { name: "Effect of movements in exchange rates", rowCode: "430", indent: 0 },
    { name: "TOTAL CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "499", indent: 0, isTotal: true },
    
    { name: "CASH FLOWS", rowCode: "", indent: 0, isHeader: true },
    { name: "Premiums received for insurance contracts", rowCode: "510", indent: 1 },
    { name: "Claims, benefits and other expenses paid", rowCode: "520", indent: 1 },
    { name: "Insurance acquisition cash flows", rowCode: "530", indent: 1 },
    { name: "TOTAL CASH FLOWS", rowCode: "599", indent: 0, isTotal: true },
    { name: "Other changes in the net carrying amount of the insurance contract", rowCode: "610", indent: 0 },
    { name: "Net ending insurance contract balances", rowCode: "629", indent: 0, isTotal: true },
    
    { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Ending balance Insurance contract assets", rowCode: "659", indent: 1 },
    { name: "Ending balance Insurance contract liabilities", rowCode: "759", indent: 1 },
    { name: "Net ending insurance contract balances", rowCode: "799", indent: 0, isTotal: true, isFinalTotal: true }
  ], []);

  // Define column data with the complex header structure
  const columns: ColumnDefinition[] = useMemo(() => [
    // Current Period - Liabilities for remaining coverage
    { id: "currentExcludingLoss", label: "Excluding Loss Component", colCode: "02" },
    { id: "currentLossComponent", label: "Loss Component", colCode: "06" },
    { id: "currentRemainingTotal", label: "Total", colCode: "10" },
    
    // Current Period - Liabilities for incurred claims not under PAA
    { id: "currentExpectedPV", label: "Expected PV of Future Cash Flows", colCode: "12" },
    { id: "currentRiskAdjustment", label: "Risk Adjustment", colCode: "16" },
    
    // Current Period - Liabilities for incurred claims under PAA (no sub-columns)
    { id: "currentUnderPAA", label: "", colCode: "19" },
    
    // Current Period - TOTAL (no sub-columns)
    { id: "currentTotal", label: "", colCode: "22" },
    
    // Prior Period Restated - Liabilities for remaining coverage
    { id: "priorExcludingLoss", label: "Excluding Loss Component", colCode: "26" },
    { id: "priorLossComponent", label: "Loss Component", colCode: "30" },
    { id: "priorRemainingTotal", label: "Total", colCode: "32" },
    
    // Prior Period Restated - Liabilities for incurred claims not under PAA
    { id: "priorExpectedPV", label: "Expected PV of Future Cash Flows", colCode: "36" },
    { id: "priorRiskAdjustment", label: "Risk Adjustment", colCode: "39" }
  ], []);

  // Create the complex multi-level header structure
  const multiLevelHeader = (
    <>
      <TableRow className="h-6">
        <TableHead className="w-[400px] text-xs font-semibold text-left py-0 px-2 border-r" rowSpan={3}></TableHead>
        <TableHead colSpan={7} className="text-xs font-semibold text-center py-0 px-1 border-r bg-blue-50/60">
          Current Period
        </TableHead>
        <TableHead colSpan={5} className="text-xs font-semibold text-center py-0 px-1 bg-green-50/60">
          Prior Period Restated
        </TableHead>
      </TableRow>
      <TableRow className="h-6">
        <TableHead colSpan={3} className="text-xs font-semibold text-center py-0 px-1 border-r bg-blue-50/40">
          Liabilities for remaining coverage
        </TableHead>
        <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-1 border-r bg-blue-50/40">
          Liabilities for incurred claims not under PAA
        </TableHead>
        <TableHead className="text-xs font-semibold text-center py-0 px-1 border-r bg-blue-50/40">
          Liabilities for incurred claims under PAA
        </TableHead>
        <TableHead className="text-xs font-semibold text-center py-0 px-1 border-r bg-blue-50/40">
          TOTAL
        </TableHead>
        <TableHead colSpan={3} className="text-xs font-semibold text-center py-0 px-1 border-r bg-green-50/40">
          Liabilities for remaining coverage
        </TableHead>
        <TableHead colSpan={2} className="text-xs font-semibold text-center py-0 px-1 bg-green-50/40">
          Liabilities for incurred claims not under PAA
        </TableHead>
      </TableRow>
      <TableRow className="h-6">
        {columns.map((col) => (
          <TableHead 
            key={col.id}
            data-column-code={col.colCode}
            className="text-xs font-semibold text-center py-0 px-1 border-r last:border-r-0"
          >
            {col.label}
          </TableHead>
        ))}
      </TableRow>
    </>
  );

  return (
    <FinancialTable 
      rows={tableRows} 
      columns={columns} 
      sheetCode="2014"
      secondaryHeader={multiLevelHeader}
    />
  );
};

export default React.memo(InsuranceLiabilitiesCoverageVsClaimsTable);
