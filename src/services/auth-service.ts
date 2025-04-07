
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { DEV_MODE } from "@/utils/auth-utils";

/**
 * Sign in with email and password
 */
export const signIn = async (email: string, password: string) => {
  if (DEV_MODE) {
    // Mock successful login in dev mode
    return { error: null, needsTwoFactor: false };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error, needsTwoFactor: false };
    }

    // Check if 2FA is required (this would need to be implemented in your database)
    // For now, it's a placeholder for future 2FA implementation
    const needsTwoFactor = false;

    return { error: null, needsTwoFactor };
  } catch (error: any) {
    return { error, needsTwoFactor: false };
  }
};

/**
 * Sign up with email and password
 */
export const signUp = async (email: string, password: string) => {
  if (DEV_MODE) {
    // Mock successful signup in dev mode
    return { error: null };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { error };
    }

    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  if (DEV_MODE) {
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
      console.error("Error signing out:", error.message);
      return { error };
    }
    return { error: null };
  } catch (error: any) {
    toast.error("Error signing out");
    console.error("Error signing out:", error.message);
    return { error };
  }
};

/**
 * Verify two-factor authentication (placeholder for future implementation)
 */
export const verifyTwoFactor = async (token: string) => {
  // This would need to be implemented with a real 2FA solution
  return { error: null };
};

/**
 * Reset password
 */
export const resetPassword = async (email: string) => {
  if (DEV_MODE) {
    // Mock successful password reset in dev mode
    toast.success("In development mode, password reset is simulated");
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      return { error };
    }

    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

/**
 * Update password
 */
export const updatePassword = async (password: string) => {
  if (DEV_MODE) {
    // Mock successful password update in dev mode
    toast.success("In development mode, password update is simulated");
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return { error };
    }

    return { error: null };
  } catch (error: any) {
    return { error };
  }
};
