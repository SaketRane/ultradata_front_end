
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Insurance Liabilities by Measurement Component (Non-PAA) Table component
 * Displays detailed breakdown of insurance contract balances by measurement components
 */
const InsuranceLiabilitiesTable: React.FC = () => {
  // Define table rows with proper structure and indentation
  const rows: RowDefinition[] = useMemo(() => [
    { name: "BEGINNING OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Opening balance insurance contract assets", rowCode: "010", indent: 1, isTotal: false },
    { name: "Opening balance insurance contract liabilities", rowCode: "020", indent: 1, isTotal: false },
    { name: "Net opening insurance contract balances", rowCode: "099", indent: 1, isTotal: true },
    
    { name: "CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "", indent: 0, isHeader: true },
    { name: "Contractual service margin recognized for service provided", rowCode: "110", indent: 2, isTotal: false },
    { name: "Change in risk adjustment for non-financial risk expired", rowCode: "120", indent: 2, isTotal: false },
    { name: "Experience adjustments", rowCode: "130", indent: 2, isTotal: false },
    { name: "Revenue recognized for incurred policyholder tax expenses", rowCode: "140", indent: 2, isTotal: false },
    { name: "Current service provided in the period", rowCode: "199", indent: 1, isTotal: true },
    
    { name: "Contracts initially recognized in the period", rowCode: "210", indent: 2, isTotal: false },
    { name: "Changes in estimates that adjust the CSM", rowCode: "230", indent: 2, isTotal: false },
    { name: "Changes in estimates that result in losses and reversal of losses on onerous contracts", rowCode: "240", indent: 2, isTotal: false },
    { name: "Future service yet to be provided", rowCode: "299", indent: 1, isTotal: true },
    
    { name: "Adjustments to liabilities for incurred claims", rowCode: "310", indent: 2, isTotal: false },
    { name: "Experience adjustments not related to incurred claims", rowCode: "320", indent: 2, isTotal: false },
    { name: "Past service provided in the Prior Periods", rowCode: "359", indent: 1, isTotal: true },
    
    { name: "Insurance service result", rowCode: "399", indent: 1, isTotal: true },
    { name: "Net finance (income) expenses from insurance contracts", rowCode: "410", indent: 1, isTotal: false },
    { name: "Effects of movements in exchange rates", rowCode: "420", indent: 1, isTotal: false },
    { name: "TOTAL CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "499", indent: 0, isTotal: true },
    
    { name: "CASH FLOWS", rowCode: "", indent: 0, isHeader: true },
    { name: "Premiums received for insurance contracts", rowCode: "510", indent: 1, isTotal: false },
    { name: "Claims, benefits and other expenses paid", rowCode: "520", indent: 1, isTotal: false },
    { name: "Insurance acquisition cash flows", rowCode: "530", indent: 1, isTotal: false },
    { name: "TOTAL CASH FLOWS", rowCode: "599", indent: 0, isTotal: true },
    
    { name: "Other changes in the net carrying amount of the insurance contract liabilities", rowCode: "610", indent: 0, isTotal: false },
    { name: "Net ending insurance contract balances", rowCode: "629", indent: 0, isTotal: true },
    
    { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
    { name: "Ending balance insurance contract assets", rowCode: "659", indent: 1, isTotal: false },
    { name: "Ending balance insurance contract liabilities", rowCode: "759", indent: 1, isTotal: false },
    { name: "Net ending insurance contract balances", rowCode: "799", indent: 1, isTotal: true, isFinalTotal: true }
  ], []);

  // Define column data for both current and prior periods
  const columns: ColumnDefinition[] = useMemo(() => [
    { id: "currentExpectedPV", label: "Expected Present Value of Future Cash Flows", colCode: "02" },
    { id: "currentRiskAdj", label: "Risk Adjustment", colCode: "06" },
    { id: "currentCSMModified", label: "CSM - Modified Retro", colCode: "10" },
    { id: "currentCSMFair", label: "CSM - Fair Value", colCode: "14" },
    { id: "currentCSMOther", label: "CSM - Other", colCode: "18" },
    { id: "currentTotal", label: "TOTAL", colCode: "29" },
    { id: "priorExpectedPV", label: "Expected Present Value of Future Cash Flows", colCode: "32" },
    { id: "priorRiskAdj", label: "Risk Adjustment", colCode: "36" },
    { id: "priorCSMModified", label: "CSM - Modified Retro", colCode: "40" },
    { id: "priorCSMFair", label: "CSM - Fair Value", colCode: "40" },
    { id: "priorCSMOther", label: "CSM - Other", colCode: "48" },
    { id: "priorTotal", label: "TOTAL", colCode: "59" }
  ], []);

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
      sheetCode="2012" 
      secondaryHeader={secondaryHeader}
      maxHeight="85vh"
    />
  );
};

export default React.memo(InsuranceLiabilitiesTable);
