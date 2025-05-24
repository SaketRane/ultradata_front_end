
import { RowDefinition, ColumnDefinition } from "@/types/financial";
import { sheet2012Title, sheet2012Rows, sheet2012Columns } from "../configs/sheet2012Config";
import { sheet2014Title, sheet2014Rows, sheet2014Columns } from "../configs/sheet2014Config";
import { sheet2016Title, sheet2016Rows, sheet2016Columns } from "../configs/sheet2016Config";
import { sheet2018Title, sheet2018Rows, sheet2018Columns } from "../configs/sheet2018Config";

export const getSheetTitle = (sheetCode: string): string => {
  switch (sheetCode) {
    case "2012": return sheet2012Title;
    case "2014": return sheet2014Title;
    case "2016": return sheet2016Title;
    case "2018": return sheet2018Title;
    default: return "Insurance Liabilities / Reinsurance";
  }
};

export const getSheetRows = (sheetCode: string): RowDefinition[] => {
  switch (sheetCode) {
    case "2012": return sheet2012Rows;
    case "2014": return sheet2014Rows;
    case "2016": return sheet2016Rows;
    case "2018": return sheet2018Rows;
    default: return [
      { name: `${getSheetTitle(sheetCode)} - Placeholder`, rowCode: "01", indent: 0, isTotal: false }
    ];
  }
};

export const getSheetColumns = (sheetCode: string): ColumnDefinition[] => {
  switch (sheetCode) {
    case "2012": return sheet2012Columns;
    case "2014": return sheet2014Columns;
    case "2016": return sheet2016Columns;
    case "2018": return sheet2018Columns;
    default: return [
      { id: "openingBalance", label: "Opening Balance", colCode: "01" },
      { id: "changes", label: "Changes", colCode: "02" },
      { id: "closingBalance", label: "Closing Balance", colCode: "03" }
    ];
  }
};
