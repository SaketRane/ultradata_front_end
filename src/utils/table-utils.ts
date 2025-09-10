
import { type RowDefinition } from "@/types/financial";

/**
 * Simple memoization utility for performance optimization
 */
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

/**
 * Extract insurer code from insurer name
 * Example: "Intact Insurance Company (A480)_D" -> "A480"
 */
export const extractInsurerCode = (insurerName: string): string => {
  if (!insurerName) return "";
  const match = insurerName.match(/\(([A-Z0-9]+)\)/);
  return match ? match[1] : "";
};

/**
 * Generate a cell code for data identification
 * Format: [InsurerCode][SheetCode][RowCode][ColumnCode]
 */
export const generateCellCode = (sheetCode: string, rowCode: string, colCode: string, insurerCode?: string): string => {
  if (!rowCode) return "";
  if (insurerCode) {
    return `${insurerCode}${sheetCode}${rowCode}${colCode}`;
  }
  return `${sheetCode}${rowCode}${colCode}`;
};

/**
 * Get CSS classes for table rows based on row properties
 */
export const getRowClasses = (
  indent: number, 
  isTotal: boolean = false, 
  isSubtotal: boolean = false,
  isFinalTotal: boolean = false,
  isHeader: boolean = false
) => {
  const paddingClass = 
    indent === 0 ? "pl-2" : 
    indent === 1 ? "pl-6" : 
    indent === 2 ? "pl-10" : "pl-14";
  
  const bgClass = isFinalTotal 
    ? "bg-gray-100" 
    : isTotal 
      ? "bg-gray-50" 
      : "";
      
  const fontClass = isHeader 
    ? "font-semibold italic" 
    : isFinalTotal 
      ? "font-bold" 
      : isTotal || isSubtotal
        ? "font-medium" 
        : indent === 0 
          ? "font-medium" 
          : "font-normal";

  const borderClass = isHeader ? "" : "border-dotted border-b border-gray-300";
  
  const sizeClass = "";

  return {
    paddingClass,
    bgClass,
    fontClass,
    borderClass,
    sizeClass
  };
};
