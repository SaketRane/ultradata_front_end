
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Logo from "@/components/Logo";
import LoginForm from "@/components/Auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { PageLayout } from "@/components/Layout/PageLayout";

// Header component for the index page
const IndexHeader: React.FC = () => (
  <header className="container mx-auto py-8">
    <Logo size="lg" className="mx-auto md:mx-0" />
  </header>
);

// Footer component for the index page
const IndexFooter: React.FC = () => (
  <footer className="container mx-auto py-6 text-center text-sm text-gray-500">
    <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
  </footer>
);

// Main content component for the index page
const IndexContent: React.FC = () => (
  <main className="flex-1 flex items-center justify-center p-6">
    <div className="w-full max-w-md">
      <LoginForm />
    </div>
  </main>
);

/**
 * Index page component serving as the entry point of the application
 */
const Index: React.FC = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    document.title = "UltraData | Sign In";
  }, []);

  // Redirect to dashboard if already logged in
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageLayout
      header={<IndexHeader />}
      content={<IndexContent />}
      footer={<IndexFooter />}
      bgClass="bg-gradient-to-br from-blue-50 to-indigo-50"
    />
  );
};

export default Index;
