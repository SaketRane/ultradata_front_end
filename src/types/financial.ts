
/**
 * Type definitions for financial data structures
 */

// Base row interface for financial tables
export interface BaseRowDefinition {
  name: string;
  rowCode: string;
  indent: number;
}

// Row definition for financial tables
export interface RowDefinition extends BaseRowDefinition {
  isTotal?: boolean;
  isFinalTotal?: boolean;
  isHeader?: boolean;
  isSection?: boolean;
  hasVested?: boolean;
  disabled?: boolean;
}

// Insurance row definition for provincial claims tables
export interface InsuranceRowDefinition extends BaseRowDefinition {
  isSubtotal: boolean;
  isTotal: boolean;
}

// Column definition for financial tables
export interface ColumnDefinition {
  id: string;
  label: string;
  colCode: string;
  colSpan?: number;
  isAOCI?: boolean;
}

// Column definition for claim tables
export interface ClaimColumnDefinition {
  id: string;
  label: string;
  colCode: string;
}

// Column definition for provincial tables
export interface ProvinceColumnDefinition {
  name: string;
  code: string;
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

// Visualization data structure
export interface VisualizationData {
  title: string;
  data: DataPoint[];
  labels?: string[];
  series?: string[];
}
