
import React from "react";

const DashboardFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-2">
      <div className="container mx-auto px-1 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
