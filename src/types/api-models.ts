
/**
 * This file defines the expected data structures for the Spring Boot API.
 * It helps document the contract between the frontend and backend.
 */

/**
 * Error response from the API
 */
export interface ApiErrorResponse {
  status: number;
  message: string;
  timestamp: string;
  path: string;
  errors?: Record<string, string[]>;
}

/**
 * Financial data request parameters
 */
export interface FinancialDataRequest {
  year: string;
  insurerId?: string;
  section?: string;
  sheetCode?: string;
}

/**
 * Sample structure for row data from the backend
 */
export interface ApiRowData {
  id: string;
  name: string;
  code: string;
  indent: number;
  isTotal?: boolean;
  isHeader?: boolean;
  values: Record<string, number | null>;
}

/**
 * Sample structure for sheet metadata from the backend
 */
export interface ApiSheetMetadata {
  code: string;
  name: string;
  description?: string;
  columns: Array<{
    id: string;
    name: string;
    code: string;
  }>;
  section: string;
}

