
/**
 * This file defines the expected data structures for the Spring Boot API.
 * It helps document the contract between the frontend and backend.
 */

/**
 * Login request payload
 */
export interface LoginRequest {
  username: string; // Spring Security typically uses 'username'
  password: string;
}

/**
 * Login response
 */
export interface LoginResponse {
  token?: string; // If using JWT
  success: boolean;
  requiresTwoFactor?: boolean;
}

/**
 * Registration request payload
 */
export interface RegistrationRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password update request
 */
export interface PasswordUpdateRequest {
  password: string;
  token?: string; // For password reset flow
}

/**
 * Two-factor authentication verification request
 */
export interface TwoFactorVerificationRequest {
  token: string;
  sessionId?: string;
}

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

