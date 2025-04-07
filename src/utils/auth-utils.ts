
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth";

// Development mode configuration
export const DEV_MODE = true; // Set to false to use real authentication

// Development mock user and profile
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

/**
 * Fetch user profile from profiles table
 */
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
