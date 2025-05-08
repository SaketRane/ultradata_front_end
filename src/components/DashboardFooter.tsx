
import React from "react";

/**
 * Footer component for the dashboard
 * 
 * Displays copyright information and company details at the bottom of the dashboard.
 */
const DashboardFooter: React.FC = () => {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-2">
      <div className="container mx-auto px-1 text-center text-xs text-gray-500">
        <p>© {currentYear} UltraData. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
