
import { RowDefinition, ColumnDefinition } from "@/types/financial";

export const sheet2018Title = "Reinsurance Held: Coverage vs. Claims";

export const sheet2018Rows: RowDefinition[] = [
  { name: "Asset for remaining coverage", rowCode: "01", indent: 0, isTotal: false },
  { name: "Asset for incurred claims", rowCode: "02", indent: 0, isTotal: false },
  { name: "Total reinsurance contract assets/(liabilities)", rowCode: "03", indent: 0, isTotal: true }
];

export const sheet2018Columns: ColumnDefinition[] = [
  { id: "openingBalance", label: "Opening Balance", colCode: "01" },
  { id: "changes", label: "Changes", colCode: "02" },
  { id: "closingBalance", label: "Closing Balance", colCode: "03" }
];
