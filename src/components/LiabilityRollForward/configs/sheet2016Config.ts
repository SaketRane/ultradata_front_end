
import { RowDefinition, ColumnDefinition } from "@/types/financial";

export const sheet2016Title = "Reinsurance Held by Measurement Component (Non-PAA)";

export const sheet2016Rows: RowDefinition[] = [
  { name: "Present value of future cash flows", rowCode: "01", indent: 0, isTotal: false },
  { name: "Risk adjustment for non-financial risk", rowCode: "02", indent: 0, isTotal: false },
  { name: "Contractual service margin", rowCode: "03", indent: 0, isTotal: false },
  { name: "Total reinsurance contract assets/(liabilities)", rowCode: "04", indent: 0, isTotal: true }
];

export const sheet2016Columns: ColumnDefinition[] = [
  { id: "openingBalance", label: "Opening Balance", colCode: "01" },
  { id: "changes", label: "Changes", colCode: "02" },
  { id: "closingBalance", label: "Closing Balance", colCode: "03" },
  { id: "insurance", label: "Insurance Service", colCode: "04" },
  { id: "investment", label: "Investment", colCode: "05" },
  { id: "fx", label: "FX & Other", colCode: "06" }
];
