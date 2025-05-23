import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

/**
 * Component for displaying Insurance Liabilities: Coverage vs. Claims data
 * Code: 2014
 */
const InsuranceLiabilitiesCoverageClaimsTable: React.FC = () => {
  // Sheet code for data identification
  const sheetCode = "2014";

  // Define the complex secondary header structure
  const secondaryHeader = (
    <>
      <tr className="h-6 border-b">
        <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
        <th colSpan={5} className="text-xs font-semibold text-center py-0 px-1 border-r">Current Period</th>
        <th colSpan={5} className="text-xs font-semibold text-center py-0 px-1">Prior Period Restated</th>
      </tr>
      <tr className="h-6 border-b">
        <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
        <th colSpan={2} className="text-xs font-semibold text-center py-0 px-1 border-r">Liabilities for remaining coverage</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Liabilities for incurred claims not under PAA</th>
        <th colSpan={2} className="text-xs font-semibold text-center py-0 px-1 border-r">Liabilities for incurred claims under PAA</th>
        <th colSpan={2} className="text-xs font-semibold text-center py-0 px-1 border-r">Liabilities for remaining coverage</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Liabilities for incurred claims not under PAA</th>
        <th colSpan={2} className="text-xs font-semibold text-center py-0 px-1">Liabilities for incurred claims under PAA</th>
      </tr>
      <tr className="h-6">
        <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Excluding Loss Component</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Loss Component</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Expected Present Value of Future Cash Flows</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Risk Adjustment</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">TOTAL</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Excluding Loss Component</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Loss Component</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Expected Present Value of Future Cash Flows</th>
        <th className="text-xs font-semibold text-center py-0 px-1">Risk Adjustment</th>
        <th className="text-xs font-semibold text-center py-0 px-1">TOTAL</th>
      </tr>
    </>
  );

  // Define the columns
  const columns: ColumnDefinition[] = [
    { id: "excludingLossComponentCurrent", label: "02", colCode: "02" },
    { id: "lossComponentCurrent", label: "06", colCode: "06" },
    { id: "nonPaaCurrent", label: "10", colCode: "10" },
    { id: "expectedPvCashFlowsCurrent", label: "12", colCode: "12" },
    { id: "riskAdjustmentCurrent", label: "16", colCode: "16" },
    { id: "totalCurrent", label: "19", colCode: "19" },
    { id: "excludingLossComponentPrior", label: "22", colCode: "22" },
    { id: "lossComponentPrior", label: "26", colCode: "26" },
    { id: "nonPaaPrior", label: "30", colCode: "30" },
    { id: "expectedPvCashFlowsPrior", label: "32", colCode: "32" },
    { id: "riskAdjustmentPrior", label: "36", colCode: "36" },
    { id: "totalPrior", label: "39", colCode: "39" },
  ];

  // Define all rows including headers, indented items, and totals
  const rows: RowDefinition[] = [
    // BEGINNING OF PERIOD header
    { name: "BEGINNING OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Opening balance insurance contract assets", rowCode: "010", indent: 1, isTotal: false },
    { name: "Opening balance insurance contract liabilities", rowCode: "020", indent: 1, isTotal: false },
    { name: "Net opening insurance contract balances", rowCode: "099", indent: 1, isTotal: true },
    
    // CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI
    { name: "CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "", indent: 0, isHeader: true },
    { name: "Modified Retrospective", rowCode: "110", indent: 3, isTotal: false },
    { name: "Fair value", rowCode: "120", indent: 3, isTotal: false },
    { name: "Other", rowCode: "130", indent: 3, isTotal: false },
    { name: "Insurance Revenue", rowCode: "199", indent: 2, isTotal: true },
    { name: "Incurred claims and other insurance service expenses", rowCode: "210", indent: 3, isTotal: false },
    { name: "Amortization of insurance acquisition cash flows", rowCode: "220", indent: 3, isTotal: false },
    { name: "Losses and reversal of losses on onerous contracts", rowCode: "230", indent: 3, isTotal: false },
    { name: "Adjustments to liabilities for incurred claims", rowCode: "240", indent: 3, isTotal: false },
    { name: "Insurance Service Expenses", rowCode: "299", indent: 2, isTotal: true },
    { name: "Investment components", rowCode: "310", indent: 2, isTotal: false },
    { name: "Insurance service result", rowCode: "399", indent: 1, isTotal: true },
    { name: "Net finance (income) expenses from insurance contracts", rowCode: "410", indent: 1, isTotal: false },
    { name: "Effect of movements in exchange rates", rowCode: "430", indent: 1, isTotal: false },
    { name: "TOTAL CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "499", indent: 0, isTotal: true },
    
    // CASH FLOWS
    { name: "CASH FLOWS", rowCode: "", indent: 0, isHeader: true },
    { name: "Premiums received for insurance contracts", rowCode: "510", indent: 1, isTotal: false },
    { name: "Claims, benefits and other expenses paid", rowCode: "520", indent: 1, isTotal: false },
    { name: "Insurance acquisition cash flows", rowCode: "530", indent: 1, isTotal: false },
    { name: "TOTAL CASH FLOWS", rowCode: "599", indent: 0, isTotal: true },
    
    // Other changes and Net ending balances
    { name: "Other changes in the net carrying amount of the insurance contract", rowCode: "610", indent: 0, isTotal: false },
    { name: "Net ending insurance contract balances", rowCode: "629", indent: 0, isTotal: true },
    
    // END OF PERIOD
    { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Ending balance Insurance contract assets", rowCode: "659", indent: 1, isTotal: false },
    { name: "Ending balance Insurance contract liabilities", rowCode: "759", indent: 1, isTotal: false },
    { name: "Net ending insurance contract balances", rowCode: "799", indent: 1, isTotal: true, isFinalTotal: true },
  ];

  return (
    <FinancialTable
      rows={rows}
      columns={columns}
      sheetCode={sheetCode}
      secondaryHeader={secondaryHeader}
      className="mt-4"
    />
  );
};

export default React.memo(InsuranceLiabilitiesCoverageClaimsTable);
