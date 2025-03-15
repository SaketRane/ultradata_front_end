
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  console.log("Create superadmin function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    // Log environment variable status (not the values for security)
    console.log("Environment check:", {
      supabaseUrl: supabaseUrl ? "exists" : "missing",
      supabaseServiceKey: supabaseServiceKey ? "exists" : "missing"
    });
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return new Response(
        JSON.stringify({ error: "Server configuration error. Missing required environment variables." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Only proceed if this is a POST request
    if (req.method !== "POST") {
      console.error("Method not allowed:", req.method);
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    let requestData;
    try {
      requestData = await req.json();
      console.log("Received request data:", { email: requestData.email ? "provided" : "missing" });
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { email, password } = requestData;

    if (!email || !password) {
      console.error("Missing required fields:", { 
        email: email ? "provided" : "missing", 
        password: password ? "provided" : "missing" 
      });
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if a superadmin already exists
    console.log("Checking for existing superadmins");
    let existingSuperadmins;
    try {
      const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("role", "superadmin")
        .limit(1);
        
      if (error) {
        console.error("Error checking for existing superadmins:", error);
        throw error;
      }
      
      existingSuperadmins = data;
      console.log(`Found ${data ? data.length : 0} existing superadmins`);
    } catch (error) {
      console.error("Error checking for existing superadmins:", error);
      return new Response(
        JSON.stringify({ error: "Failed to check for existing superadmins: " + error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (existingSuperadmins && existingSuperadmins.length > 0) {
      console.log("A superadmin already exists, returning error");
      return new Response(
        JSON.stringify({ error: "A superadmin already exists" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create the user account
    console.log("Creating user account");
    let userData;
    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      
      if (error) {
        console.error("Error creating user:", error);
        throw error;
      }
      
      userData = data;
      console.log("User created:", { userId: userData.user?.id });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create user: " + error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!userData.user) {
      console.error("User data is undefined after creation");
      return new Response(
        JSON.stringify({ error: "Failed to create user: User data is undefined" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Set the user role to superadmin
    console.log("Setting user role to superadmin");
    try {
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ role: "superadmin" })
        .eq("id", userData.user.id);

      if (error) {
        console.error("Error setting superadmin role:", error);
        throw error;
      }
      
      console.log("Superadmin role set successfully");
    } catch (error) {
      console.error("Error setting superadmin role:", error);
      return new Response(
        JSON.stringify({ error: "User created but failed to set superadmin role: " + error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return success response
    console.log("Superadmin created successfully");
    return new Response(
      JSON.stringify({ 
        message: "Superadmin created successfully", 
        user: { id: userData.user.id, email: userData.user.email } 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred: " + error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
