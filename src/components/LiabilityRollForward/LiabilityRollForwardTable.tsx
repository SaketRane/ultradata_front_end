
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { getSheetTitle, getSheetRows, getSheetColumns } from "./utils/sheetConfigUtils";
import { getCustomHeader } from "./utils/headerUtils";

interface LiabilityRollForwardTableProps {
  sheetCode: string;
}

const LiabilityRollForwardTable: React.FC<LiabilityRollForwardTableProps> = ({ sheetCode }) => {
  // Get configuration based on sheet code
  const title = useMemo(() => getSheetTitle(sheetCode), [sheetCode]);
  const rows = useMemo(() => getSheetRows(sheetCode), [sheetCode]);
  const columns = useMemo(() => getSheetColumns(sheetCode), [sheetCode]);
  const customHeader = useMemo(() => getCustomHeader(sheetCode), [sheetCode]);

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
