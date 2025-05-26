import { RowDefinition, ColumnDefinition } from "@/types/financial";

export const sheet2016Rows: RowDefinition[] = [
  // BEGINNING OF PERIOD
  { name: "BEGINNING OF PERIOD", rowCode: "", indent: 0, isHeader: true },
  { name: "Opening balance reinsurance contract held assets", rowCode: "010", indent: 1, isTotal: false },
  { name: "Opening balance reinsurance contract held liabilities", rowCode: "020", indent: 1, isTotal: false },
  { name: "Net opening reinsurance contract held balances", rowCode: "099", indent: 0, isTotal: true },
  
  // CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI
  { name: "CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "", indent: 0, isHeader: true },
  { name: "Contractual service margin recognized for service received", rowCode: "110", indent: 2, isTotal: false },
  { name: "Change in risk adjustment for non-financial risk expired", rowCode: "120", indent: 2, isTotal: false },
  { name: "Experience adjustments", rowCode: "130", indent: 2, isTotal: false },
  { name: "Incurred policyholder tax expenses on underlying contract", rowCode: "140", indent: 2, isTotal: false },
  { name: "Current service provided in the period", rowCode: "199", indent: 1, isTotal: true },
  { name: "Contracts initially recognized in the period", rowCode: "210", indent: 2, isTotal: false },
  { name: "Changes in estimates that adjust the CSM", rowCode: "220", indent: 2, isTotal: false },
  { name: "Changes in estimates that relate to losses and reversal of losses on onerous underlying contracts", rowCode: "230", indent: 2, isTotal: false },
  { name: "Changes in recoveries of losses on onerous underlying contracts that adjust the CSM", rowCode: "240", indent: 2, isTotal: false },
  { name: "Future service yet to be provided", rowCode: "299", indent: 1, isTotal: true },
  { name: "Changes to assets for incurred claims", rowCode: "310", indent: 2, isTotal: false },
  { name: "Experience adjustments not related to incurred claims", rowCode: "320", indent: 2, isTotal: false },
  { name: "Past service provided in the Prior Periods", rowCode: "359", indent: 1, isTotal: true },
  { name: "Effect of changes in non-performance risk of reinsurers", rowCode: "365", indent: 1, isTotal: false },
  { name: "Net expenses from reinsurance contracts held", rowCode: "370", indent: 0, isTotal: false },
  { name: "Net finance (income) expenses from reinsurance contracts", rowCode: "410", indent: 0, isTotal: false },
  { name: "Effects of movements in exchange rates", rowCode: "430", indent: 0, isTotal: false },
  { name: "TOTAL CHANGES IN THE STATEMENT OF PROFIT OR LOSS AND OCI", rowCode: "499", indent: 0, isTotal: true },
  
  // CASH FLOWS
  { name: "CASH FLOWS", rowCode: "", indent: 0, isHeader: true },
  { name: "Premiums paid", rowCode: "510", indent: 1, isTotal: false },
  { name: "Amounts received", rowCode: "520", indent: 1, isTotal: false },
  { name: "Reinsurance acquisition cash flows", rowCode: "530", indent: 1, isTotal: false },
  { name: "TOTAL CASH FLOWS", rowCode: "599", indent: 0, isTotal: true },
  
  // OTHER CHANGES AND END OF PERIOD
  { name: "Other changes in the net carrying amount of the reinsurance contract held", rowCode: "610", indent: 0, isTotal: false },
  { name: "Net ending reinsurance contract held balances", rowCode: "629", indent: 0, isTotal: true },
  { name: "END OF PERIOD", rowCode: "", indent: 0, isHeader: true },
  { name: "Ending balance reinsurance contract held assets", rowCode: "659", indent: 1, isTotal: false },
  { name: "Ending balance reinsurance contract held liabilities", rowCode: "759", indent: 1, isTotal: false },
  { name: "Net ending reinsurance contract held balances", rowCode: "799", indent: 0, isFinalTotal: true }
];

export const sheet2016Columns: ColumnDefinition[] = [
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

export const sheet2016Header = [
  { id: "currentPeriod", label: "Current Period", colCode: "header1", colSpan: 6 },
  { id: "priorPeriod", label: "Prior Period Restated", colCode: "header2", colSpan: 6 }
];
