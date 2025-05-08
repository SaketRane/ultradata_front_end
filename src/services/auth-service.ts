
import { toast } from "sonner";
import { DEV_MODE } from "@/utils/auth-utils";
import { apiClient } from "@/integrations/database/client";
import { User, UserProfile } from "@/types/auth";

/**
 * Sign in with email and password
 * This implementation will work with Spring Security
 */
export const signIn = async (email: string, password: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful login");
    return { error: null, needsTwoFactor: false };
  }

  try {
    // This would call the Spring Boot login endpoint
    await apiClient.post<{ token: string }>('/auth/login', {
      username: email, // Spring Security often uses 'username' instead of 'email'
      password
    });
    
    console.log("Login successful, fetching user data");
    
    // After login, fetch the user profile
    // This mimics how Spring Security typically works with separate endpoints
    const userData = await apiClient.get<User>('/auth/user');
    
    return { error: null, needsTwoFactor: false, user: userData };
  } catch (err: any) {
    console.error("Login error:", err);
    
    // Check for 2FA challenge
    if (err.message?.includes("2FA required")) {
      return { error: null, needsTwoFactor: true };
    }
    
    toast.error(err.message || "Authentication failed");
    return { error: { message: err.message || "Authentication failed" }, needsTwoFactor: false };
  }
};

/**
 * Sign up with email and password
 * This implementation will work with Spring Security
 */
export const signUp = async (email: string, password: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful signup");
    return { error: null };
  }

  try {
    await apiClient.post('/auth/register', {
      email,
      password
    });
    
    toast.success("Registration successful. Please log in.");
    return { error: null };
  } catch (err: any) {
    console.error("Registration error:", err);
    toast.error(err.message || "Registration failed");
    return { error: { message: err.message || "Registration failed" } };
  }
};

/**
 * Sign out the current user
 * This implementation will work with Spring Security
 */
export const signOut = async () => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful sign out");
    return { error: null };
  }

  try {
    await apiClient.post('/auth/logout', {});
    return { error: null };
  } catch (err: any) {
    console.error("Logout error:", err);
    toast.error(err.message || "Logout failed");
    return { error: { message: err.message || "Logout failed" } };
  }
};

/**
 * Verify two-factor authentication
 * This implementation will work with Spring Security
 * @param token The two-factor authentication token
 */
export const verifyTwoFactor = async (token: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful 2FA verification");
    return { error: null };
  }

  try {
    await apiClient.post('/auth/verify-2fa', { token });
    return { error: null };
  } catch (err: any) {
    console.error("2FA verification error:", err);
    toast.error(err.message || "2FA verification failed");
    return { error: { message: err.message || "2FA verification failed" } };
  }
};

/**
 * Reset password
 * This implementation will work with Spring Security
 * @param email The email address to send the password reset link to
 */
export const resetPassword = async (email: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful password reset");
    toast.success("In development mode, password reset is simulated");
    return { error: null };
  }

  try {
    await apiClient.post('/auth/reset-password', { email });
    toast.success("Password reset email sent. Please check your inbox.");
    return { error: null };
  } catch (err: any) {
    console.error("Password reset error:", err);
    toast.error(err.message || "Password reset failed");
    return { error: { message: err.message || "Password reset failed" } };
  }
};

/**
 * Update password
 * This implementation will work with Spring Security
 * @param password The new password
 */
export const updatePassword = async (password: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful password update");
    toast.success("In development mode, password update is simulated");
    return { error: null };
  }

  try {
    await apiClient.post('/auth/update-password', { password });
    toast.success("Password updated successfully");
    return { error: null };
  } catch (err: any) {
    console.error("Password update error:", err);
    toast.error(err.message || "Password update failed");
    return { error: { message: err.message || "Password update failed" } };
  }
};

/**
 * Fetch user profile
 * This implementation will work with Spring Security
 */
export const fetchCurrentUserProfile = async (): Promise<UserProfile | null> => {
  if (DEV_MODE) {
    console.log("Dev mode: returning mock profile");
    return {
      id: "dev-user-id",
      email: "dev@example.com",
      role: "admin",
      company_id: null
    };
  }

  try {
    return await apiClient.get<UserProfile>('/auth/profile');
  } catch (err: any) {
    console.error("Error fetching profile:", err);
    return null;
  }
};

