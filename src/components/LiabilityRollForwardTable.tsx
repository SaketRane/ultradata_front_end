
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

interface LiabilityRollForwardTableProps {
  sheetCode: string;
}

/**
 * Component for displaying insurance liability roll forwards
 * Handles multiple sheet codes:
 * - 2014: Insurance Liabilities: Coverage vs. Claims
 * - 2016: Reinsurance Held by Measurement Component (Non-PAA)
 * - 2018: Reinsurance Held: Coverage vs. Claims
 */
const LiabilityRollForwardTable: React.FC<LiabilityRollForwardTableProps> = ({ sheetCode }) => {
  // Define column structure - same for all liability roll forward sheets
  const columns: ColumnDefinition[] = [
    // Current Period columns
    { id: "cpLiabRemCoverExcLoss", label: "Excluding Loss Component", colCode: "02" },
    { id: "cpLiabRemCoverLossComp", label: "Loss Component", colCode: "06" },
    { id: "cpLiabIncurredClaimsNotPAA", label: "Liabilities for incurred claims not under PAA", colCode: "10" },
    { id: "cpLiabIncurredClaimsPAA1", label: "Expected Present Value of Future Cash Flows", colCode: "12" },
    { id: "cpLiabIncurredClaimsPAA2", label: "Risk Adjustment", colCode: "16" },
    { id: "cpTotal", label: "TOTAL", colCode: "19" },
    
    // Prior Period Restated columns
    { id: "ppLiabRemCoverExcLoss", label: "Excluding Loss Component", colCode: "22" },
    { id: "ppLiabRemCoverLossComp", label: "Loss Component", colCode: "26" },
    { id: "ppLiabIncurredClaimsNotPAA", label: "Liabilities for incurred claims not under PAA", colCode: "30" },
    { id: "ppLiabIncurredClaimsPAA1", label: "Expected Present Value of Future Cash Flows", colCode: "32" },
    { id: "ppLiabIncurredClaimsPAA2", label: "Risk Adjustment", colCode: "36" },
    { id: "ppTotal", label: "TOTAL", colCode: "39" }
  ];

  // Define row structure with codes and indentation
  const rows: RowDefinition[] = [
    // BEGINNING OF PERIOD
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
    { name: "Other changes in the net carrying amount of the insurance contract", rowCode: "610", indent: 0, isTotal: false },
    { name: "Net ending insurance contract balances", rowCode: "629", indent: 0, isTotal: true },
    
    // END OF PERIOD
    { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Ending balance Insurance contract assets", rowCode: "659", indent: 1, isTotal: false },
    { name: "Ending balance Insurance contract liabilities", rowCode: "759", indent: 1, isTotal: false },
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

  // Tertiary headers for detailed column grouping
  const tertiaryHeader = (
    <tr className="border-b">
      <th className="w-[350px] text-xs font-semibold text-left py-1 px-2 border-r"></th>
      <th colSpan={2} className="text-center text-xs font-semibold py-1 border-r">Liabilities for remaining coverage</th>
      <th className="text-center text-xs font-semibold py-1 border-r">Liabilities for incurred claims not under PAA</th>
      <th colSpan={2} className="text-center text-xs font-semibold py-1 border-r">Liabilities for incurred claims under PAA</th>
      <th className="text-center text-xs font-semibold py-1 border-r">TOTAL</th>
      <th colSpan={2} className="text-center text-xs font-semibold py-1 border-r">Liabilities for remaining coverage</th>
      <th className="text-center text-xs font-semibold py-1 border-r">Liabilities for incurred claims not under PAA</th>
      <th colSpan={2} className="text-center text-xs font-semibold py-1 border-r">Liabilities for incurred claims under PAA</th>
      <th className="text-center text-xs font-semibold py-1">TOTAL</th>
    </tr>
  );

  return (
    <FinancialTable
      rows={rows}
      columns={columns}
      sheetCode={sheetCode}
      secondaryHeader={
        <>
          {secondaryHeader}
          {tertiaryHeader}
        </>
      }
    />
  );
};

export default React.memo(LiabilityRollForwardTable);
