
import React, { useEffect } from "react";
import { PageLayout } from "@/components/Layout/PageLayout";

// Header component for the index page
const IndexHeader: React.FC = () => (
  <header className="container mx-auto py-8">
    <div className="text-3xl font-bold text-center">Welcome!</div>
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
    <div className="w-full max-w-md text-center text-lg">
      Login & signup are currently disabled. Use the dropdowns on /dashboard to build your application.
    </div>
  </main>
);

/**
 * Index page component serving as the entry point of the application
 */
const Index: React.FC = () => {
  useEffect(() => {
    document.title = "UltraData | App";
  }, []);

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
