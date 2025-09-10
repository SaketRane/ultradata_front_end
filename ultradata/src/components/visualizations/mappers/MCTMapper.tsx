
import React from "react";

interface MCTMapperProps {
  sheetCode: string;
}

const MCTMapper: React.FC<MCTMapperProps> = ({ sheetCode }) => {
  // Placeholder for future implementation
  return (
    <div className="p-4">
      <h3 className="font-medium text-sm mb-2">MCT/BAAT Data</h3>
      <p className="text-muted-foreground text-xs">
        MCT/BAAT data visualization for sheet code: {sheetCode} will be implemented in the future.
      </p>
    </div>
  );
};

export default MCTMapper;
