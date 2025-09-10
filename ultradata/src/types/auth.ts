
/**
 * Possible user roles in the application
 */
export type UserRole = "admin" | "user";

/**
 * Custom User type that replaces the Supabase User type
 */
export type User = {
  id: string;
  email: string;
};

/**
 * User profile data structure
 */
export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  company_id: string | null;
}

/**
 * Authentication context interface for the application
 */
export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    needsTwoFactor: boolean;
  }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  verifyTwoFactor: (token: string) => Promise<{ error: any | null }>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  updatePassword: (password: string) => Promise<{ error: any | null }>;
  isAdmin: boolean;
}
