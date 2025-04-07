
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { DEV_MODE } from "@/utils/auth-utils";

/**
 * Sign in with email and password
 */
export const signIn = async (email: string, password: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful login");
    return { error: null, needsTwoFactor: false };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error.message);
      return { error, needsTwoFactor: false };
    }

    // Check if 2FA is required (placeholder for future implementation)
    const needsTwoFactor = false;

    return { error: null, needsTwoFactor };
  } catch (error: any) {
    console.error("Sign in error:", error.message);
    return { error, needsTwoFactor: false };
  }
};

/**
 * Sign up with email and password
 */
export const signUp = async (email: string, password: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful signup");
    return { error: null };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Sign up error:", error.message);
      return { error };
    }

    return { error: null };
  } catch (error: any) {
    console.error("Sign up error:", error.message);
    return { error };
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful sign out");
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error.message);
      toast.error("Error signing out");
      return { error };
    }
    return { error: null };
  } catch (error: any) {
    console.error("Sign out error:", error.message);
    toast.error("Error signing out");
    return { error };
  }
};

/**
 * Verify two-factor authentication
 * @param token The two-factor authentication token
 */
export const verifyTwoFactor = async (token: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful 2FA verification");
    return { error: null };
  }

  // This would need to be implemented with a real 2FA solution
  // Placeholder for future implementation
  console.log("Verifying 2FA token:", token);
  return { error: null };
};

/**
 * Reset password
 * @param email The email address to send the password reset link to
 */
export const resetPassword = async (email: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful password reset");
    toast.success("In development mode, password reset is simulated");
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error("Password reset error:", error.message);
      return { error };
    }

    return { error: null };
  } catch (error: any) {
    console.error("Password reset error:", error.message);
    return { error };
  }
};

/**
 * Update password
 * @param password The new password
 */
export const updatePassword = async (password: string) => {
  if (DEV_MODE) {
    console.log("Dev mode: mock successful password update");
    toast.success("In development mode, password update is simulated");
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error("Password update error:", error.message);
      return { error };
    }

    return { error: null };
  } catch (error: any) {
    console.error("Password update error:", error.message);
    return { error };
  }
};
