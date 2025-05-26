
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

// Import configurations for different sheets
import { sheet2012Rows, sheet2012Columns, sheet2012Header } from "./liability-roll-forward/configs/sheet2012Config";
import { sheet2014Rows, sheet2014Columns, sheet2014Header } from "./liability-roll-forward/configs/sheet2014Config";
import { sheet2016Rows, sheet2016Columns, sheet2016Header } from "./liability-roll-forward/configs/sheet2016Config";
import { sheet2018Rows, sheet2018Columns } from "./liability-roll-forward/configs/sheet2018Config";

// Import header components
import Sheet2012Header from "./liability-roll-forward/headers/Sheet2012Header";
import Sheet2014Header from "./liability-roll-forward/headers/Sheet2014Header";
import Sheet2016Header from "./liability-roll-forward/headers/Sheet2016Header";

interface LiabilityRollForwardTableProps {
  sheetCode: string;
}

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
      case "2012":
        return sheet2012Rows;
      case "2014":
        return sheet2014Rows;
      case "2016":
        return sheet2016Rows;
      case "2018":
        return sheet2018Rows;
      default:
        return [{ name: `${getTitle()} - Placeholder`, rowCode: "01", indent: 0, isTotal: false }];
    }
  }, [sheetCode]);

  // Generate columns based on sheet code
  const columns = useMemo((): ColumnDefinition[] => {
    switch (sheetCode) {
      case "2012":
        return sheet2012Columns;
      case "2014":
        return sheet2014Columns;
      case "2016":
        return sheet2016Columns;
      case "2018":
        return sheet2018Columns;
      default:
        return [
          { id: "openingBalance", label: "Opening Balance", colCode: "01" },
          { id: "changes", label: "Changes", colCode: "02" },
          { id: "closingBalance", label: "Closing Balance", colCode: "03" }
        ];
    }
  }, [sheetCode]);

  // Custom header for multi-level headers
  const customHeader = useMemo(() => {
    switch (sheetCode) {
      case "2012":
        return <Sheet2012Header />;
      case "2014":
        return <Sheet2014Header />;
      case "2016":
        return <Sheet2016Header />;
      default:
        return null;
    }
  }, [sheetCode]);

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode={sheetCode}
      secondaryHeader={customHeader}
    />
  );
};

export default React.memo(LiabilityRollForwardTable);
