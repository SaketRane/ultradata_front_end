
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
    ]
  },
  "Investments": {
    code: "INV",
    sheets: [
      { code: "4007", label: "Summary of Investments" },
      { code: "4080", label: "Other Loans and Invested Assets" },
    ]
  },
  "Premiums, Claims, & LAE": {
    code: "PCL",
    sheets: [
      { code: "6020", label: "Premiums and Claims" },
      { code: "6021", label: "Inc Claims (Undisc)" },
      { code: "6030", label: "Claims and Adjustment Expenses - Paid, Current Year and Unpaid, Current and Prior Year" },
    ]
  },
  "Provincial Stats": {
    code: "PROV",
    sheets: [
      { code: "6710", label: "Premiums Written" },
      { code: "6720", label: "Premiums Earned" },
      { code: "6730", label: "Claims Inc (incl Adj Exp)" },
      { code: "6731", label: "Claims Inc (incl Adj Exp Undisc)" },
    ]
  },
  "Commissions": {
    code: "CE",
    sheets: [
      { code: "8010", label: "Commissions" },
    ]
  },
  "Reinsurance": {
    code: "REIN",
    sheets: [
      { code: "7050", label: "Registered Reinsurance" },
      { code: "7060", label: "Unregistered Reinsurance (Canadian)" },
      { code: "7061", label: "Unregistered Reinsurance (Foreign)" },
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
