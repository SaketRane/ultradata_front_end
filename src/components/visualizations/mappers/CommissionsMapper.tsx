
import React from "react";
import { CommissionsTable, InsuranceServiceOperatingExpensesTable } from "@/components/tables/commissions";

interface CategoryMapperProps {
  sheetCode: string;
}

const CommissionsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "8015":
      return <CommissionsTable />;
    case "8025":
      return <InsuranceServiceOperatingExpensesTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default CommissionsMapper;
