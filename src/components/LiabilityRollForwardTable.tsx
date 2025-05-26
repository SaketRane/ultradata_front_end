
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
          { name: "Present value of future cash flows", rowCode: "01", indent: 0, isTotal: false },
          { name: "Risk adjustment for non-financial risk", rowCode: "02", indent: 0, isTotal: false },
          { name: "Contractual service margin", rowCode: "03", indent: 0, isTotal: false },
          { name: "Total insurance liabilities", rowCode: "04", indent: 0, isTotal: true }
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
    // Base columns for all types
    const baseColumns: ColumnDefinition[] = [
      { id: "openingBalance", label: "Opening Balance", colCode: "01" },
      { id: "changes", label: "Changes", colCode: "02" },
      { id: "closingBalance", label: "Closing Balance", colCode: "03" }
    ];
    
    // Add detail columns for measurement component tables
    if (sheetCode === "2012" || sheetCode === "2016") {
      return [
        ...baseColumns,
        { id: "insurance", label: "Insurance Service", colCode: "04" },
        { id: "investment", label: "Investment", colCode: "05" },
        { id: "fx", label: "FX & Other", colCode: "06" }
      ];
    }
    
    return baseColumns;
  }, [sheetCode]);

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode={sheetCode}
    />
  );
};

export default React.memo(LiabilityRollForwardTable);
