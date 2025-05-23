
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

/**
 * Component for displaying Insurance Liabilities by Measurement Component (Non-PAA)
 * Sheet code: 2012
 */
const InsuranceLiabilitiesByMeasurementComponentTable: React.FC = () => {
  // Define column structure
  const columns: ColumnDefinition[] = [
    // Current Period columns
    { id: "currentPeriodExpectedPV", label: "Expected Present Value of Future Cash Flows", colCode: "02" },
    { id: "currentPeriodRiskAdjustment", label: "Risk Adjustment", colCode: "06" },
    { id: "currentPeriodCSMModifiedRetro", label: "Modified Retro", colCode: "10" },
    { id: "currentPeriodCSMFairValue", label: "Fair Value", colCode: "14" },
    { id: "currentPeriodCSMOther", label: "Other", colCode: "18" },
    { id: "currentPeriodTotal", label: "TOTAL", colCode: "29" },
    // Prior Period Restated columns
    { id: "priorPeriodExpectedPV", label: "Expected Present Value of Future Cash Flows", colCode: "32" },
    { id: "priorPeriodRiskAdjustment", label: "Risk Adjustment", colCode: "36" },
    { id: "priorPeriodCSMModifiedRetro", label: "Modified Retro", colCode: "40" },
    { id: "priorPeriodCSMFairValue", label: "Fair Value", colCode: "40" }, // Note: Same code as previous column
    { id: "priorPeriodCSMOther", label: "Other", colCode: "48" },
    { id: "priorPeriodTotal", label: "TOTAL", colCode: "59" }
  ];

  // Define row structure with codes, indentation, and styling
  const rows: RowDefinition[] = [
    // BEGINNING OF PERIOD
    { name: "BEGINNING OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Opening balance insurance contract assets", rowCode: "010", indent: 1, isTotal: false },
    { name: "Opening balance insurance contract liabilities", rowCode: "020", indent: 1, isTotal: false },
    { name: "Net opening insurance contract balances", rowCode: "099", indent: 1, isTotal: true },
    
    // CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI
    { name: "CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "", indent: 0, isHeader: true },
    { name: "Contractual service margin recognized for service provided", rowCode: "110", indent: 3, isTotal: false },
    { name: "Change in risk adjustment for non-financial risk expired", rowCode: "120", indent: 3, isTotal: false },
    { name: "Experience adjustments", rowCode: "130", indent: 3, isTotal: false },
    { name: "Revenue recognized for incurred policyholder tax expenses", rowCode: "140", indent: 3, isTotal: false },
    { name: "Current service provided in the period", rowCode: "199", indent: 2, isTotal: true },
    { name: "Contracts initially recognized in the period", rowCode: "210", indent: 3, isTotal: false },
    { name: "Changes in estimates that adjust the CSM", rowCode: "230", indent: 3, isTotal: false },
    { name: "Changes in estimates that result in losses and reversal of losses on onerous contracts", rowCode: "240", indent: 3, isTotal: false },
    { name: "Future service yet to be provided", rowCode: "299", indent: 2, isTotal: true },
    { name: "Adjustments to liabilities for incurred claims", rowCode: "310", indent: 3, isTotal: false },
    { name: "Experience adjustments not related to incurred claims", rowCode: "320", indent: 3, isTotal: false },
    { name: "Past service provided in the Prior Periods", rowCode: "359", indent: 2, isTotal: true },
    { name: "Insurance service result", rowCode: "399", indent: 1, isTotal: true },
    { name: "Net finance (income) expenses from insurance contracts", rowCode: "410", indent: 1, isTotal: false },
    { name: "Effects of movements in exchange rates", rowCode: "420", indent: 1, isTotal: false },
    { name: "TOTAL CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "499", indent: 0, isTotal: true },
    
    // CASH FLOWS
    { name: "CASH FLOWS", rowCode: "", indent: 0, isHeader: true },
    { name: "Premiums received for insurance contracts", rowCode: "510", indent: 1, isTotal: false },
    { name: "Claims, benefits and other expenses paid", rowCode: "520", indent: 1, isTotal: false },
    { name: "Insurance acquisition cash flows", rowCode: "530", indent: 1, isTotal: false },
    { name: "TOTAL CASH FLOWS", rowCode: "599", indent: 0, isTotal: true },
    { name: "Other changes in the net carrying amount of the insurance contract liabilities", rowCode: "610", indent: 0, isTotal: false },
    { name: "Net ending insurance contract balances", rowCode: "629", indent: 0, isTotal: true },
    
    // END OF PERIOD
    { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Ending balance insurance contract assets", rowCode: "659", indent: 1, isTotal: false },
    { name: "Ending balance insurance contract liabilities", rowCode: "759", indent: 1, isTotal: false },
    { name: "Net ending insurance contract balances", rowCode: "799", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  // Secondary header for grouping columns
  const secondaryHeader = (
    <tr className="border-b">
      <th className="w-[350px] text-xs font-semibold text-left py-2 px-2 border-r"></th>
      <th colSpan={6} className="text-center text-xs font-semibold py-2 border-r">Current Period</th>
      <th colSpan={6} className="text-center text-xs font-semibold py-2">Prior Period Restated</th>
    </tr>
  );

  // Third level header for contractual service margin columns
  const tertiaryHeader = (
    <tr className="border-b">
      <th className="w-[350px] text-xs font-semibold text-left py-1 px-2 border-r"></th>
      <th className="text-center text-xs py-1 border-r"></th>
      <th className="text-center text-xs py-1 border-r"></th>
      <th colSpan={3} className="text-center text-xs font-semibold py-1 border-r">Contractual Service Margin (CSM)</th>
      <th className="text-center text-xs py-1 border-r"></th>
      <th className="text-center text-xs py-1 border-r"></th>
      <th className="text-center text-xs py-1 border-r"></th>
      <th colSpan={3} className="text-center text-xs font-semibold py-1 border-r">Contractual Service Margin (CSM)</th>
      <th className="text-center text-xs py-1"></th>
    </tr>
  );

  return (
    <FinancialTable
      rows={rows}
      columns={columns}
      sheetCode="2012"
      secondaryHeader={
        <>
          {secondaryHeader}
          {tertiaryHeader}
        </>
      }
    />
  );
};

export default React.memo(InsuranceLiabilitiesByMeasurementComponentTable);
