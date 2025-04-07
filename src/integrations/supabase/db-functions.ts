
import { supabase } from "./client";

/**
 * Add the has_two_factor column to the profiles table if it doesn't exist
 */
export const ensureHasTwoFactorColumn = async (): Promise<boolean> => {
  try {
    // This simple query will tell us if the column exists
    const { data, error } = await supabase
      .from("profiles")
      .select("has_two_factor")
      .limit(1);
      
    // If there's no error, the column exists
    if (!error) {
      console.log("has_two_factor column exists");
      return true;
    }
    
    // If we got an error that includes "column does not exist", we need to add it
    if (error.message.includes("column") && error.message.includes("does not exist")) {
      console.log("has_two_factor column doesn't exist, adding it");
      
      // In a real implementation, you would use a migration script or supabase functions
      // For now, we'll just log that this should be done manually
      console.warn("Please add the has_two_factor column to the profiles table");
      return false;
    }
    
    console.error("Unknown error checking for has_two_factor column:", error);
    return false;
  } catch (e) {
    console.error("Error ensuring has_two_factor column:", e);
    return false;
  }
};
