
/**
 * Types for the UndiscountedClaimsTable component
 */

export interface InsuranceRowDefinition {
  name: string;
  indent: number;
  rowCode: string;
  isSubtotal: boolean;
  isTotal: boolean;
}

export interface ClaimColumnDefinition {
  id: string;
  label: string;
  colCode: string;
}
