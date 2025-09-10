
/**
 * Types for the ClaimsUndiscountedTable component
 */

// Re-export the types from the financial types with explicit names
import { 
  InsuranceRowDefinition as InsuranceRow, 
  ProvinceColumnDefinition as ProvinceColumn 
} from "@/types/financial";

export type { InsuranceRow, ProvinceColumn };

// Also export with the names used in the component for backward compatibility
export type InsuranceRowDefinition = InsuranceRow;
export type ProvinceColumnDefinition = ProvinceColumn;
