
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "./types";

// Development mock user - remove in production
export const DEV_MODE = true;

export const mockUser = DEV_MODE ? {
  id: "dev-user-id",
  email: "dev@example.com",
} : null;

export const mockProfile = DEV_MODE ? {
  id: "dev-user-id",
  email: "dev@example.com",
  role: "superadmin" as const,
  company_id: null
} : null;

// Fetch user profile from profiles table
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      return data as UserProfile;
    }
    return null;
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
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

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string) => {
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

// Reset password
export const resetPasswordWithEmail = async (email: string) => {
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

// Update password
export const updateUserPassword = async (password: string) => {
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

// Verify two-factor authentication (placeholder for future implementation)
export const verifyTwoFactorToken = async (token: string) => {
  // This would need to be implemented with a real 2FA solution
  return { error: null };
};
