
/**
 * Shared utility functions for table components
 */

import { type RowDefinition } from "@/types/financial";

/**
 * Generate a cell code for data identification
 * 
 * @param sheetCode The sheet code prefix
 * @param rowCode The row code
 * @param colCode The column code
 * @returns Formatted cell code or empty string if rowCode is empty
 */
export const generateCellCode = (sheetCode: string, rowCode: string, colCode: string): string => {
  if (!rowCode) return "";
  return `${sheetCode}${rowCode}${colCode}`;
};

/**
 * Get CSS classes for table rows based on row properties
 * 
 * @param indent The indentation level
 * @param isTotal Whether the row is a total row
 * @param isSubtotal Whether the row is a subtotal row
 * @param isFinalTotal Whether the row is a final total row
 * @param isHeader Whether the row is a header
 * @returns Object with CSS classes for different styling aspects
 */
export const getRowClasses = (
  indent: number, 
  isTotal: boolean = false, 
  isSubtotal: boolean = false,
  isFinalTotal: boolean = false,
  isHeader: boolean = false
) => {
  // Calculate left padding based on indentation level
  const paddingClass = 
    indent === 0 ? "pl-2" : 
    indent === 1 ? "pl-6" : 
    indent === 2 ? "pl-10" : "pl-14";
  
  // Determine background color for row
  const bgClass = isFinalTotal 
    ? "bg-gray-100" 
    : isTotal 
      ? "bg-gray-50" 
      : "";
      
  // Determine text weight
  const fontClass = isHeader 
    ? "font-semibold italic" 
    : isFinalTotal 
      ? "font-bold" 
      : isTotal || isSubtotal
        ? "font-medium" 
        : indent === 0 
          ? "font-medium" 
          : "font-normal";
          
  // Determine font size
  const sizeClass = indent > 0 && !isSubtotal && !isTotal ? "text-[9px]" : "";

  // Add border style
  const borderClass = isHeader ? "" : "border-dotted border-b border-gray-300";

  return {
    paddingClass,
    bgClass,
    fontClass,
    sizeClass,
    borderClass
  };
};

/**
 * Memoization helper for expensive operations
 * 
 * @param fn Function to memoize
 * @returns Memoized function
 */
export function memoize<T>(fn: (...args: any[]) => T): (...args: any[]) => T {
  const cache = new Map();
  
  return (...args: any[]): T => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
