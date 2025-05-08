
import React from "react";

const DashboardFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t py-4 text-sm text-center text-gray-500">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Terms</a>
          <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
