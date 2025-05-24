import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

interface LiabilityRollForwardTableProps {
  sheetCode: string;
}

// Enhanced component for the Insurance Liabilities and Reinsurance Held tables with more structured data
const LiabilityRollForwardTable: React.FC<LiabilityRollForwardTableProps> = ({ sheetCode }) => {
  // Get title based on sheetCode
  const getTitle = () => {
    switch (sheetCode) {
      case "2012": return "Insurance Liabilities by Measurement Component (Non-PAA)";
      case "2014": return "Insurance Liabilities: Coverage vs. Claims";
      case "2016": return "Reinsurance Held by Measurement Component (Non-PAA)";
      case "2018": return "Reinsurance Held: Coverage vs. Claims";
      default: return "Insurance Liabilities / Reinsurance";
    }
  };

  // Generate rows based on sheet code
  const rows = useMemo((): RowDefinition[] => {
    switch (sheetCode) {
      case "2012": // Insurance Liabilities by Measurement Component
        return [
          // BEGINNING OF PERIOD
          { name: "BEGINNING OF PERIOD", rowCode: "", indent: 0, isHeader: true },
          { name: "Opening balance insurance contract assets", rowCode: "010", indent: 1, isTotal: false },
          { name: "Opening balance insurance contract liabilities", rowCode: "020", indent: 1, isTotal: false },
          { name: "Net opening insurance contract balances", rowCode: "099", indent: 0, isTotal: true },
          
          // CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI
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
          { name: "Insurance service result", rowCode: "399", indent: 0, isTotal: true },
          { name: "Net finance (income) expenses from insurance contracts", rowCode: "410", indent: 0, isTotal: false },
          { name: "Effects of movements in exchange rates", rowCode: "420", indent: 0, isTotal: false },
          { name: "TOTAL CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "499", indent: 0, isTotal: true },
          
          // CASH FLOWS
          { name: "CASH FLOWS", rowCode: "", indent: 0, isHeader: true },
          { name: "Premiums received for insurance contracts", rowCode: "510", indent: 1, isTotal: false },
          { name: "Claims, benefits and other expenses paid", rowCode: "520", indent: 1, isTotal: false },
          { name: "Insurance acquisition cash flows", rowCode: "530", indent: 1, isTotal: false },
          { name: "TOTAL CASH FLOWS", rowCode: "599", indent: 0, isTotal: true },
          
          // OTHER CHANGES AND END OF PERIOD
          { name: "Other changes in the net carrying amount of the insurance contract liabilities", rowCode: "610", indent: 0, isTotal: false },
          { name: "Net ending insurance contract balances", rowCode: "629", indent: 0, isTotal: true },
          { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
          { name: "Ending balance insurance contract assets", rowCode: "659", indent: 1, isTotal: false },
          { name: "Ending balance insurance contract liabilities", rowCode: "759", indent: 1, isTotal: false },
          { name: "Net ending insurance contract balances", rowCode: "799", indent: 0, isFinalTotal: true }
        ];
      
      case "2014": // Insurance Liabilities: Coverage vs. Claims
        return [
          { name: "Liability for remaining coverage", rowCode: "01", indent: 0, isTotal: false },
          { name: "Liability for incurred claims", rowCode: "02", indent: 0, isTotal: false },
          { name: "Total insurance liabilities", rowCode: "03", indent: 0, isTotal: true }
        ];
      
      case "2016": // Reinsurance Held by Measurement Component
        return [
          { name: "Present value of future cash flows", rowCode: "01", indent: 0, isTotal: false },
          { name: "Risk adjustment for non-financial risk", rowCode: "02", indent: 0, isTotal: false },
          { name: "Contractual service margin", rowCode: "03", indent: 0, isTotal: false },
          { name: "Total reinsurance contract assets/(liabilities)", rowCode: "04", indent: 0, isTotal: true }
        ];
      
      case "2018": // Reinsurance Held: Coverage vs. Claims
        return [
          { name: "Asset for remaining coverage", rowCode: "01", indent: 0, isTotal: false },
          { name: "Asset for incurred claims", rowCode: "02", indent: 0, isTotal: false },
          { name: "Total reinsurance contract assets/(liabilities)", rowCode: "03", indent: 0, isTotal: true }
        ];
        
      default:
        return [
          { name: `${getTitle()} - Placeholder`, rowCode: "01", indent: 0, isTotal: false }
        ];
    }
  }, [sheetCode]);

  // Generate columns based on sheet code
  const columns = useMemo((): ColumnDefinition[] => {
    if (sheetCode === "2012") {
      return [
        { id: "currentPeriod", label: "Current Period", colCode: "header1", colSpan: 6 },
        { id: "priorPeriod", label: "Prior Period Restated", colCode: "header2", colSpan: 6 }
      ];
    }
    
    // For other sheet codes, use base columns
    const baseColumns: ColumnDefinition[] = [
      { id: "openingBalance", label: "Opening Balance", colCode: "01" },
      { id: "changes", label: "Changes", colCode: "02" },
      { id: "closingBalance", label: "Closing Balance", colCode: "03" }
    ];
    
    // Add detail columns for measurement component tables
    if (sheetCode === "2016") {
      return [
        ...baseColumns,
        { id: "insurance", label: "Insurance Service", colCode: "04" },
        { id: "investment", label: "Investment", colCode: "05" },
        { id: "fx", label: "FX & Other", colCode: "06" }
      ];
    }
    
    return baseColumns;
  }, [sheetCode]);

  // Secondary header for 2012 sheet code
  const secondaryHeader = useMemo(() => {
    if (sheetCode === "2012") {
      return (
        <tr className="h-6">
          <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="02">Expected Present Value of Future Cash Flows</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="06">Risk Adjustment</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={3}>Contractual Service Margin (CSM)</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="29">TOTAL</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="32">Expected Present Value of Future Cash Flows</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="36">Risk Adjustment</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={3}>Contractual Service Margin (CSM)</th>
          <th className="text-xs font-semibold text-center py-0 px-1" data-column-code="59">TOTAL</th>
        </tr>
      );
    }
    return null;
  }, [sheetCode]);

  // Third header for 2012 sheet code
  const thirdHeader = useMemo(() => {
    if (sheetCode === "2012") {
      return (
        <tr className="h-6">
          <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="10">Modified Retro</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="14">Fair Value</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="18">Other</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="40">Modified Retro</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="44">Fair Value</th>
          <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="48">Other</th>
          <th className="text-xs font-semibold text-center py-0 px-1"></th>
        </tr>
      );
    }
    return null;
  }, [sheetCode]);

  // Custom columns for 2012
  const customColumns = useMemo(() => {
    if (sheetCode === "2012") {
      return [
        { id: "col02", label: "", colCode: "02" },
        { id: "col06", label: "", colCode: "06" },
        { id: "col10", label: "", colCode: "10" },
        { id: "col14", label: "", colCode: "14" },
        { id: "col18", label: "", colCode: "18" },
        { id: "col29", label: "", colCode: "29" },
        { id: "col32", label: "", colCode: "32" },
        { id: "col36", label: "", colCode: "36" },
        { id: "col40", label: "", colCode: "40" },
        { id: "col44", label: "", colCode: "44" },
        { id: "col48", label: "", colCode: "48" },
        { id: "col59", label: "", colCode: "59" }
      ];
    }
    return columns;
  }, [sheetCode, columns]);

  // Custom header for 2012
  const customHeader = useMemo(() => {
    if (sheetCode === "2012") {
      return (
        <>
          {secondaryHeader}
          {thirdHeader}
        </>
      );
    }
    return null;
  }, [sheetCode, secondaryHeader, thirdHeader]);

  return (
    <FinancialTable 
      rows={rows} 
      columns={customColumns} 
      sheetCode={sheetCode}
      secondaryHeader={customHeader}
    />
  );
};

export default React.memo(LiabilityRollForwardTable);
