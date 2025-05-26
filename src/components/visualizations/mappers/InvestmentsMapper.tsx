
import React from "react";

interface CategoryMapperProps {
  sheetCode: string;
}

const InvestmentsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    // All cases removed - will be implemented with new designs
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default InvestmentsMapper;
