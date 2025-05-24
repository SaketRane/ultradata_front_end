import { RowDefinition, ColumnDefinition } from "@/types/financial";

export const sheet2014Title = "Insurance Liabilities: Coverage vs. Claims";

export const sheet2014Rows: RowDefinition[] = [
  // BEGINNING OF PERIOD
  { name: "BEGINNING OF PERIOD", rowCode: "", indent: 0, isHeader: true },
  { name: "Opening balance insurance contract assets", rowCode: "010", indent: 1, isTotal: false },
  { name: "Opening balance insurance contract liabilities", rowCode: "020", indent: 1, isTotal: false },
  { name: "Net opening insurance contract balances", rowCode: "099", indent: 0, isTotal: true },
  
  // CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI
  { name: "CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "", indent: 0, isHeader: true },
  { name: "Modified Retrospective", rowCode: "110", indent: 2, isTotal: false },
  { name: "Fair value", rowCode: "120", indent: 2, isTotal: false },
  { name: "Other", rowCode: "130", indent: 2, isTotal: false },
  { name: "Insurance Revenue", rowCode: "199", indent: 1, isTotal: true },
  { name: "Incurred claims and other insurance service expenses", rowCode: "210", indent: 2, isTotal: false },
  { name: "Amortization of insurance acquisition cash flows", rowCode: "220", indent: 2, isTotal: false },
  { name: "Losses and reversal of losses on onerous contracts", rowCode: "230", indent: 2, isTotal: false },
  { name: "Adjustments to liabilities for incurred claims", rowCode: "240", indent: 2, isTotal: false },
  { name: "Insurance Service Expenses", rowCode: "299", indent: 1, isTotal: true },
  { name: "Investment components", rowCode: "310", indent: 1, isTotal: false },
  { name: "Insurance service result", rowCode: "399", indent: 0, isTotal: true },
  { name: "Net finance (income) expenses from insurance contracts", rowCode: "410", indent: 0, isTotal: false },
  { name: "Effect of movements in exchange rates", rowCode: "430", indent: 0, isTotal: false },
  { name: "TOTAL CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "499", indent: 0, isTotal: true },
  
  // CASH FLOWS
  { name: "CASH FLOWS", rowCode: "", indent: 0, isHeader: true },
  { name: "Premiums received for insurance contracts", rowCode: "510", indent: 1, isTotal: false },
  { name: "Claims, benefits and other expenses paid", rowCode: "520", indent: 1, isTotal: false },
  { name: "Insurance acquisition cash flows", rowCode: "530", indent: 1, isTotal: false },
  { name: "TOTAL CASH FLOWS", rowCode: "599", indent: 0, isTotal: true },
  
  // OTHER CHANGES AND END OF PERIOD
  { name: "Other changes in the net carrying amount of the insurance contract", rowCode: "610", indent: 0, isTotal: false },
  { name: "Net ending insurance contract balances", rowCode: "629", indent: 0, isTotal: true },
  { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
  { name: "Ending balance Insurance contract assets", rowCode: "659", indent: 1, isTotal: false },
  { name: "Ending balance Insurance contract liabilities", rowCode: "759", indent: 1, isTotal: false },
  { name: "Net ending insurance contract balances", rowCode: "799", indent: 0, isFinalTotal: true }
];

export const sheet2014Columns: ColumnDefinition[] = [
  { id: "col02", label: "", colCode: "02" },
  { id: "col06", label: "", colCode: "06" },
  { id: "col10", label: "", colCode: "10" },
  { id: "col12", label: "", colCode: "12" },
  { id: "col16", label: "", colCode: "16" },
  { id: "col19", label: "", colCode: "19" },
  { id: "col22", label: "", colCode: "22" },
  { id: "col26", label: "", colCode: "26" },
  { id: "col30", label: "", colCode: "30" },
  { id: "col32", label: "", colCode: "32" },
  { id: "col36", label: "", colCode: "36" },
  { id: "col39", label: "", colCode: "39" }
];
