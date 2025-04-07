
/**
 * Utility functions for the UndiscountedClaimsTable component
 */

/**
 * Generate a data cell code based on row code and column code
 * 
 * @param rowCode The row code
 * @param columnCode The column code
 * @returns The formatted data cell code or empty string if rowCode is empty
 */
export const generateDataCellCode = (rowCode: string, columnCode: string): string => {
  if (!rowCode) return "";
  return `6021${rowCode}${columnCode}`;
};

/**
 * Get CSS classes for table rows based on row properties
 * 
 * @param indent The indentation level
 * @param isTotal Whether the row is a total row
 * @param isSubtotal Whether the row is a subtotal row
 * @returns Object with CSS classes for different styling aspects
 */
export const getRowClasses = (indent: number, isTotal: boolean, isSubtotal: boolean) => {
  // Calculate left padding based on indentation level
  const paddingClass = indent === 0 
    ? "" 
    : indent === 1 
      ? "pl-8" 
      : "pl-16";
  
  // Determine background color for row
  const bgClass = isTotal 
    ? "bg-gray-50" 
    : "";
      
  // Determine text weight
  const fontClass = isTotal || isSubtotal
    ? "font-medium" 
    : indent === 0 
      ? "font-medium" 
      : "";
      
  // Determine font size
  const sizeClass = indent > 0 && !isSubtotal ? "text-[9px]" : "";

  return {
    paddingClass,
    bgClass,
    fontClass,
    sizeClass
  };
};
