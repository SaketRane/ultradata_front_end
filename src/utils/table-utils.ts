
import { type RowDefinition } from "@/types/financial";

/**
 * Generate a cell code for data identification
 */
export const generateCellCode = (sheetCode: string, rowCode: string, colCode: string): string => {
  if (!rowCode) return "";
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

  return {
    paddingClass,
    bgClass,
    fontClass,
    borderClass
  };
};
