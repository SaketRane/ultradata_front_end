
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Logo from "@/components/Logo";
import LoginForm from "@/components/Auth/LoginForm";
import SuperAdminSetup from "@/components/Auth/SuperAdminSetup";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Development mode flag - remove in production
const DEV_MODE = true;

const Index: React.FC = () => {
  const { user, loading } = useAuth();
  const [isSuperadminRequired, setIsSuperadminRequired] = useState(false);
  const [isChecking, setIsChecking] = useState(!DEV_MODE);
  
  useEffect(() => {
    document.title = "UltraData | Sign In";
    
    // Skip superadmin check in dev mode
    if (DEV_MODE) return;
    
    // Check if a superadmin exists
    const checkSuperadmin = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("role", "superadmin")
          .limit(1);

        if (error) throw error;
        
        setIsSuperadminRequired(!(data && data.length > 0));
      } catch (error) {
        console.error("Error checking for superadmin:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkSuperadmin();
  }, []);

  // In dev mode, always redirect to dashboard
  if (DEV_MODE) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect to dashboard if already logged in
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <header className="container mx-auto py-8">
        <Logo size="lg" className="mx-auto md:mx-0" />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {isChecking ? (
            <div className="animate-pulse h-96 bg-white/80 rounded-lg"></div>
          ) : isSuperadminRequired ? (
            <SuperAdminSetup />
          ) : (
            <LoginForm />
          )}
        </div>
      </main>
      
      <footer className="container mx-auto py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
