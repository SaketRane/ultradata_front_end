
/**
 * Enhanced utility functions for visualizations with performance optimizations
 */

import { memoize } from "@/utils/table-utils";

/**
 * Maps for section titles based on sheet codes
 * Using object literals for faster lookups
 */
const SECTION_TITLE_MAPS: Record<string, Record<string, string>> = {
  "Provincial Stats": {
    "6710": "Premiums Written by Province",
    "6720": "Premiums Earned by Province",
    "6730": "Claims Inc (incl Adj Exp) by Province",
    "6731": "Claims Inc (incl Adj Exp Undisc) by Province",
    // New sheets for 2023-2025
    "6740": "Insurance Revenue by Province",
    "6750": "Insurance Service Expenses by Province",
    "6760": "Net Expenses from Reinsurance Contracts Held by Province",
    "6770": "Insurance Service Result by Province"
  },
  "Premiums, Claims, & LAE": {
    "6020": "Premiums and Claims",
    "6021": "Undiscounted Claims Incurred",
    "6030": "Claims and Adjustment Expenses - Paid, Current Year and Unpaid, Current and Prior Year",
    // New sheets for 2023-2025 (also available in "Insurance Results & Onerous Contracts")
    "6025": "Insurance Service Result",
    "6080": "Changes in Onerous Contracts for the Current Period"
  },
  "Insurance Results & Onerous Contracts": {
    "6025": "Insurance Service Result",
    "6080": "Changes in Onerous Contracts for the Current Period"
  },
  "Commissions": {
    "8010": "Commissions",
    // New sheets for 2023-2025 (also available in "Commissions & Expenses")
    "8015": "Commissions",
    "8025": "Insurance Service and Other Operating Expenses"
  },
  "Commissions & Expenses": {
    "8015": "Commissions",
    "8025": "Insurance Service and Other Operating Expenses"
  },
  "Financial Statements": {
    "2010": "Assets",
    "2020": "Liabilities, Equity, Head Office Account, Reserves & AOCI",
    "2030": "Statement of Income",
    "2042": "Comprehensive Income(Loss) & Accumulated Other Comprehensive Income(Loss)",
    "2054": "Statement of Changes in Equity",
    "2045": "Head Office Account & Reserves",
    // New sheets for 2023-2025
    "2011": "Liabilities and Equity",
    "2012": "Insurance Liabilities by Measurement Component (Non-PAA)",
    "2014": "Insurance Liabilities: Coverage vs. Claims",
    "2016": "Reinsurance Held by Measurement Component (Non-PAA)",
    "2018": "Reinsurance Held: Coverage vs. Claims",
    "2022": "Statement of Profit or Loss",
    "2041": "Statement of Residual Interest - Policyholders' Equity & Liabilities"
  },
  "Investments": {
    "4007": "Summary of Investments",
    // New sheets for 2023-2025
    "4008": "Summary of Investments"
  },
  "Reinsurance": {
    "7050": "Registered Reinsurance",
    "7060": "Unregistered Reinsurance",
    "7061": "Unregistered Reinsurance (Foreign)"
  },
  "MCT/BAAT": {
    "3061": "Minimum Capital Test/Branch Adequacy of Assets Test",
    "3062": "Minimum Capital Test: Capital Available",
    "3092": "Branch Adequacy of Assets Test: Net Assets Available",
    "3064": "Insurance Risk: Capital/Margin Required for Unpaid Claims and Premium Liabilities",
    "3066": "Market Risk Capital/Margin Requirements",
    "3071": "Credit Risk: Capital Required for Balance Sheet Assets",
    "3081": "Credit Risk: Margins Required for Balance Sheet Assets",
    "3073": "Credit Risk: Capital/Margin Required for Balance Sheet/Vested Assets based on External Credit Ratings",
    "3074": "Credit Risk: Capital Required for Balance Sheet Assets based on External Credit Ratings (Québec**)",
    "3075": "Credit Risk: Capital/Margin Required for Off-Balance Sheet Exposures",
    "3077": "Credit Risk: Capital/Margin Required for Collateral held for Unregistered Reinsurance Exposures and Self-Insured Retention",
    "3079": "Operational Risk: Capital/Margin Required"
  }
};

/**
 * Get the display title for a visualization based on section and sheet code
 * Using a map-based approach for better maintainability and performance
 * 
 * @param section The section name
 * @param sheetCode The sheet code
 * @returns The visualization title or empty string if not found
 */
export const getVisualizationTitle = (section: string, sheetCode: string): string => {
  // Check if the section exists in our map
  if (SECTION_TITLE_MAPS[section] && SECTION_TITLE_MAPS[section][sheetCode]) {
    return SECTION_TITLE_MAPS[section][sheetCode];
  }

  // If no match is found, return empty string
  console.debug(`No title found for section: ${section}, sheetCode: ${sheetCode}`);
  return "";
};

/**
 * Find sheet code from sheet label and available sheets
 * Memoized for better performance when called repeatedly
 * 
 * @param sheet The sheet label
 * @param availableSheets Array of available sheets with code and label
 * @returns The sheet code or empty string if not found
 */
export const getSheetCode = memoize((
  sheet: string, 
  availableSheets: Array<{code: string, label: string}>
): string => {
  const selectedSheet = availableSheets.find(s => s.label === sheet);
  return selectedSheet?.code || "";
});

/**
 * Format a numeric value for display in visualizations
 * 
 * @param value The numeric value to format
 * @param format The format type (currency, percent, etc)
 * @returns Formatted value as string
 */
export const formatValue = (value: number | null, format: 'currency' | 'percent' | 'number' = 'number'): string => {
  if (value === null) return '-';
  
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-CA', { 
        style: 'currency', 
        currency: 'CAD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
      
    case 'percent':
      return new Intl.NumberFormat('en-CA', { 
        style: 'percent', 
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }).format(value / 100);
      
    case 'number':
    default:
      return new Intl.NumberFormat('en-CA').format(value);
  }
};
