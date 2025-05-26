
/**
 * Utility functions for the ClaimsUndiscountedTable component
 */
import { getRowClasses as getBaseRowClasses } from "@/utils/table-utils";

/**
 * Generate a data cell code for claims undiscounted data
 * Uses 6731 prefix for Claims Undiscounted
 * 
 * @param rowCode The row code
 * @param provinceCode The province code
 * @returns The formatted data cell code or empty string if rowCode is empty
 */
export const generateDataCellCode = (rowCode: string, provinceCode: string): string => {
  if (!rowCode) return "";
  return `6731${rowCode}${provinceCode}`;
};

/**
 * Get CSS classes for table rows based on row properties
 * This function wraps the shared utility but customizes it for this specific table
 */
export const getRowClasses = (indent: number, isTotal: boolean, isSubtotal: boolean) => {
  const baseClasses = getBaseRowClasses(indent, isTotal, isSubtotal);
  
  // Override padding for this specific table
  const paddingClass = indent === 0 
    ? "" 
    : indent === 1 
      ? "pl-8" 
      : "pl-16";
  
  return {
    ...baseClasses,
    paddingClass,
    borderClass: "", // Override borderClass for this component
    sizeClass: "text-xs" // Add sizeClass for consistency
  };
};
