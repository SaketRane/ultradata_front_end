
import React from "react";
import { ReinsuranceHeldNetExpensesTable } from "@/components/tables/reinsurance";

interface CategoryMapperProps {
  sheetCode: string;
}

const ReinsuranceMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "7050":
      return <ReinsuranceHeldNetExpensesTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default ReinsuranceMapper;
