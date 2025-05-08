
import React from "react";

/**
 * Footer component for the dashboard
 * 
 * Displays copyright information and company details at the bottom of the dashboard.
 * Uses a subtle border and responsive padding for better display across devices.
 * 
 * @returns {JSX.Element} A React footer component
 */
const DashboardFooter: React.FC = () => {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-3 md:py-4">
      <div className="container mx-auto px-4 md:px-6 text-center text-sm text-gray-600">
        <p>© {currentYear} UltraData. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
