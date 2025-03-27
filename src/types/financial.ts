
/**
 * Type definitions for financial data structures
 */

// Row definition for financial tables
export interface RowDefinition {
  name: string;
  rowCode: string;
  indent: number;
  isTotal?: boolean;
  isFinalTotal?: boolean;
  isHeader?: boolean;
  isSection?: boolean;
  hasVested?: boolean;
  disabled?: boolean;
}

// Column definition for financial tables
export interface ColumnDefinition {
  id: string;
  label: string;
  colCode: string;
  colSpan?: number;
}

// Data point interface for financial data
export interface DataPoint {
  code: string;
  value: number | null;
  year: number;
  period: string;
}

// Sheet metadata
export interface SheetMetadata {
  code: string;
  label: string;
  section: string;
}
