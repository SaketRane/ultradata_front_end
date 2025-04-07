
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth";

// Development mode configuration
// This is explicitly separated from production code for clarity
export const DEV_MODE = process.env.NODE_ENV === 'development' && import.meta.env.VITE_USE_MOCK_AUTH === 'true';

// Development mock user and profile (only used in DEV_MODE)
export const mockUser = DEV_MODE ? {
  id: "dev-user-id",
  email: "dev@example.com",
} : null;

export const mockProfile = DEV_MODE ? {
  id: "dev-user-id",
  email: "dev@example.com",
  role: "admin" as const,
  company_id: null
} : null;

/**
 * Fetch user profile from profiles table
 * This is used in both dev and production modes
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (DEV_MODE) {
    console.log("Dev mode: returning mock profile");
    return mockProfile;
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error.message);
      throw error;
    }

    return data as UserProfile;
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
};
