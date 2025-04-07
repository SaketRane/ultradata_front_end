
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Logo from "@/components/Logo";
import SignUpForm from "@/components/Auth/SignUpForm";
import { useAuth } from "@/contexts/AuthContext";

const SignUp: React.FC = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    document.title = "UltraData | Sign Up";
  }, []);

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
          <SignUpForm />
        </div>
      </main>
      
      <footer className="container mx-auto py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignUp;
