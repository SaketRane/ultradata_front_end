
import React from "react";
import { CommissionsTable } from "@/components/tables/commissions";

interface CategoryMapperProps {
  sheetCode: string;
}

const CommissionsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "8015":
      return <CommissionsTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default CommissionsMapper;
