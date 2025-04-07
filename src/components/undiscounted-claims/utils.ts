
/**
 * Utility functions for the UndiscountedClaimsTable component
 */
import { getRowClasses as getBaseRowClasses } from "@/utils/table-utils";

/**
 * Generate a data cell code for undiscounted claims data
 * Uses 6021 prefix for Undiscounted Claims
 * 
 * @param rowCode The row code
 * @param claimCode The claim type code
 * @returns The formatted data cell code or empty string if rowCode is empty
 */
export const generateDataCellCode = (rowCode: string, claimCode: string): string => {
  if (!rowCode) return "";
  return `6021${rowCode}${claimCode}`;
};

/**
 * Get CSS classes for table rows based on row properties
 * This function wraps the shared utility but customizes it for this specific table
 */
export const getRowClasses = (indent: number, isTotal: boolean, isSubtotal: boolean) => {
  const baseClasses = getBaseRowClasses(indent, isTotal, isSubtotal);
  
  // Custom padding for this specific table
  const paddingClass = indent === 0 
    ? "" 
    : indent === 1 
      ? "pl-8" 
      : "pl-16";
  
  return {
    ...baseClasses,
    paddingClass
  };
};
