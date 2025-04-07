
/**
 * Maps for section titles based on sheet codes
 * This approach makes it easier to add new visualizations
 */
const PROVINCIAL_STATS_TITLES: Record<string, string> = {
  "6710": "Premiums Written by Province",
  "6720": "Premiums Earned by Province",
  "6730": "Claims Inc (incl Adj Exp) by Province",
  "6731": "Claims Inc (incl Adj Exp Undisc) by Province"
};

const PREMIUMS_CLAIMS_TITLES: Record<string, string> = {
  "6020": "Premiums and Claims",
  "6021": "Undiscounted Claims Incurred",
  "6030": "Claims and Adjustment Expenses - Paid, Current Year and Unpaid, Current and Prior Year"
};

const FINANCIAL_STATEMENTS_TITLES: Record<string, string> = {
  "2010": "Assets",
  "2020": "Liabilities, Equity, Head Office Account, Reserves & AOCI",
  "2030": "Statement of Income",
  "2042": "Comprehensive Income(Loss) & Accumulated Other Comprehensive Income(Loss)",
  "2054": "Statement of Changes in Equity",
  "2045": "Head Office Account & Reserves"
};

const REINSURANCE_TITLES: Record<string, string> = {
  "7050": "Registered Reinsurance",
  "7060": "Unregistered Reinsurance (Canadian)",
  "7061": "Unregistered Reinsurance (Foreign)"
};

/**
 * Get the display title for a visualization based on section and sheet code
 * Using a map-based approach for better maintainability
 */
export const getVisualizationTitle = (section: string, sheetCode: string): string => {
  // First check section-specific title maps
  if (section === "Provincial Stats" && sheetCode in PROVINCIAL_STATS_TITLES) {
    return PROVINCIAL_STATS_TITLES[sheetCode];
  }

  if (section === "Premiums, Claims, & LAE" && sheetCode in PREMIUMS_CLAIMS_TITLES) {
    return PREMIUMS_CLAIMS_TITLES[sheetCode];
  }

  if (section === "Commissions" && sheetCode === "8010") {
    return "Commissions";
  }

  if (section === "Financial Statements" && sheetCode in FINANCIAL_STATEMENTS_TITLES) {
    return FINANCIAL_STATEMENTS_TITLES[sheetCode];
  }

  if (section === "Investments" && sheetCode === "4007") {
    return "Summary of Investments";
  }

  if (section === "Reinsurance" && sheetCode in REINSURANCE_TITLES) {
    return REINSURANCE_TITLES[sheetCode];
  }

  // If no match is found, return empty string
  console.debug(`No title found for section: ${section}, sheetCode: ${sheetCode}`);
  return "";
};

/**
 * Find sheet code from sheet label and available sheets
 */
export const getSheetCode = (
  sheet: string, 
  availableSheets: Array<{code: string, label: string}>
): string => {
  const selectedSheet = availableSheets.find(s => s.label === sheet);
  return selectedSheet?.code || "";
};
