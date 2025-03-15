
import React, { useEffect } from "react";
import Logo from "@/components/Logo";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";

const ResetPassword: React.FC = () => {
  useEffect(() => {
    document.title = "UltraData | Reset Password";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <header className="container mx-auto py-8">
        <Logo size="lg" className="mx-auto md:mx-0" />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <ResetPasswordForm />
        </div>
      </main>
      
      <footer className="container mx-auto py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ResetPassword;
