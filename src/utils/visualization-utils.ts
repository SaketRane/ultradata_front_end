
/**
 * Get the display title for a visualization based on section and sheet code
 */
export const getVisualizationTitle = (section: string, sheetCode: string): string => {
  // Provincial Stats
  if (section === "Provincial Stats") {
    switch (sheetCode) {
      case "6710": return "Premiums Written by Province";
      case "6720": return "Premiums Earned by Province";
      case "6730": return "Claims Inc (incl Adj Exp) by Province";
      case "6731": return "Claims Inc (incl Adj Exp Undisc) by Province";
    }
  }

  // Premiums, Claims, & LAE
  if (section === "Premiums, Claims, & LAE") {
    switch (sheetCode) {
      case "6020": return "Premiums and Claims";
      case "6021": return "Undiscounted Claims Incurred";
      case "6030": return "Claims and Adjustment Expenses - Paid, Current Year and Unpaid, Current and Prior Year";
    }
  }

  // Commissions
  if (section === "Commissions" && sheetCode === "8010") {
    return "Commissions";
  }

  // Financial Statements
  if (section === "Financial Statements") {
    switch (sheetCode) {
      case "2010": return "Assets";
      case "2020": return "Liabilities, Equity, Head Office Account, Reserves & AOCI";
      case "2030": return "Statement of Income";
      case "2042": return "Comprehensive Income(Loss) & Accumulated Other Comprehensive Income(Loss)";
      case "2054": return "Statement of Changes in Equity";
      case "2045": return "Head Office Account & Reserves";
    }
  }

  // Investments
  if (section === "Investments" && sheetCode === "4007") {
    return "Summary of Investments";
  }

  // Reinsurance
  if (section === "Reinsurance") {
    switch (sheetCode) {
      case "7050": return "Registered Reinsurance";
      case "7060": return "Unregistered Reinsurance (Canadian)";
      case "7061": return "Unregistered Reinsurance (Foreign)";
    }
  }

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
