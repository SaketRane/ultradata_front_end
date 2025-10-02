
import React from "react";
import { CommissionsTable, InsuranceServiceOperatingExpensesTable } from "@/components/tables/commissions";

interface CategoryMapperProps {
  sheetCode: string;
  year?: string;
}

const CommissionsMapper: React.FC<CategoryMapperProps> = ({ sheetCode, year }) => {
  switch (sheetCode) {
    case "8015":
      return <CommissionsTable year={year} />;
    case "8010":
      return <CommissionsTable year={year} />;
    case "8025":
      return <InsuranceServiceOperatingExpensesTable year={year} />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default CommissionsMapper;
