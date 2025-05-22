
export const sectionSheetsMapping = {
  "Financial Statements": {
    code: "FS",
    sheets: [
      { code: "2010", label: "Assets" },
      { code: "2020", label: "Liabilities, Equity, Head Office Account, Reserves & AOCI" },
      { code: "2030", label: "Statement of Income" },
      { code: "2042", label: "Comprehensive Income(Loss) & Accumulated Other Comprehensive Income(Loss)" },
      { code: "2054", label: "Statement of Changes in Equity" },
      { code: "2045", label: "Head Office Account & Reserves" },
      // New sheets for 2023-2025
      { code: "2011", label: "Liabilities and Equity" },
      { code: "2012", label: "Liability Roll Forward - xyz" },
      { code: "2014", label: "Liability Roll Forward - abc" },
      { code: "2016", label: "Liability Roll Forward - 123" },
      { code: "2018", label: "Liability Roll Forward - 456" },
      { code: "2022", label: "Statement of Profit or Loss" },
      { code: "2041", label: "Statement of Residual Interest - Policyholders' Equity & Liabilities" },
    ]
  },
  "Investments": {
    code: "INV",
    sheets: [
      { code: "4007", label: "Summary of Investments" },
      // New sheet for 2023-2025
      { code: "4008", label: "Summary of Investments" },
    ]
  },
  "Premiums, Claims, & LAE": {
    code: "PCL",
    sheets: [
      { code: "6020", label: "Premiums and Claims" },
      { code: "6021", label: "Inc Claims (Undisc)" },
      { code: "6030", label: "Claims and Adjustment Expenses - Paid, Current Year and Unpaid, Current and Prior Year" },
      // New sheets for 2023-2025
      { code: "6025", label: "Insurance Service Result" },
      { code: "6080", label: "Changes in Onerous Contracts for the Current Period" },
    ]
  },
  "Provincial Stats": {
    code: "PROV",
    sheets: [
      { code: "6710", label: "Premiums Written" },
      { code: "6720", label: "Premiums Earned" },
      { code: "6730", label: "Claims Inc (incl Adj Exp)" },
      { code: "6731", label: "Claims Inc (incl Adj Exp Undisc)" },
      // New sheets for 2023-2025
      { code: "6740", label: "Insurance Revenue" },
      { code: "6750", label: "Insurance Service Expenses" },
      { code: "6760", label: "Net Expenses from Reinsurance Contracts Held" },
      { code: "6770", label: "Insurance Service Result" },
    ]
  },
  "Commissions": {
    code: "CE",
    sheets: [
      { code: "8010", label: "Commissions" },
      // New sheets for 2023-2025
      { code: "8015", label: "Commissions" },
      { code: "8025", label: "Insurance Service and Other Operating Expenses" },
    ]
  },
  "Reinsurance": {
    code: "REIN",
    sheets: [
      { code: "7050", label: "Registered Reinsurance" },
      { code: "7060", label: "Unregistered Reinsurance (Canadian)" },
      { code: "7061", label: "Unregistered Reinsurance (Foreign)" },
      // For 2023-2025 the Unregistered Reinsurance is consolidated
      { code: "7060", label: "Unregistered Reinsurance" },
    ]
  },
  "MCT/BAAT": {
    code: "MCT",
    sheets: [
      { code: "3061", label: "Minimum Capital Test/Branch Adequacy of Assets Test" },
      { code: "3062", label: "Minimum Capital Test: Capital Available" },
      { code: "3092", label: "Branch Adequacy of Assets Test: Net Assets Available" },
      { code: "3064", label: "Insurance Risk: Capital/Margin Required for Unpaid Claims and Premium Liabilities" },
      { code: "3066", label: "Market Risk Capital/Margin Requirements" },
      { code: "3071", label: "Credit Risk: Capital Required for Balance Sheet Assets" },
      { code: "3081", label: "Credit Risk: Margins Required for Balance Sheet Assets" },
      { code: "3073", label: "Credit Risk: Capital/Margin Required for Balance Sheet/Vested Assets based on External Credit Ratings" },
      { code: "3074", label: "Credit Risk: Capital Required for Balance Sheet Assets based on External Credit Ratings (Québec**)" },
      { code: "3075", label: "Credit Risk: Capital/Margin Required for Off-Balance Sheet Exposures" },
      { code: "3077", label: "Credit Risk: Capital/Margin Required for Collateral held for Unregistered Reinsurance Exposures and Self-Insured Retention" },
      { code: "3079", label: "Operational Risk: Capital/Margin Required" },
    ]
  }
};
