
import React from "react";
import { 
  InsuranceRevenueTable, 
  InsuranceServiceExpensesByProvinceTable,
  NetExpensesReinsuranceTable,
  InsuranceServiceResultProvincialTable
} from "@/components/tables/provincial-stats";
import PremiumsEarnedTable from "@/components/PremiumsEarnedTable";
import ClaimsIncurredTable from "@/components/ClaimsIncurredTable";
import ClaimsUndiscountedTable from "@/components/ClaimsUndiscountedTable";
import PremiumsTable from "@/components/PremiumsTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const ProvincialStatsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "6740":
      return <InsuranceRevenueTable />;
    case "6750":
      return <InsuranceServiceExpensesByProvinceTable />;
    case "6760":
      return <NetExpensesReinsuranceTable />;
    case "6770":
      return <InsuranceServiceResultProvincialTable />;
    case "6710":
      return <PremiumsTable />;
    case "6730":
      return <ClaimsIncurredTable />;
    case "6731":
      return <ClaimsUndiscountedTable />;
    case "6720":
      return <PremiumsEarnedTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default ProvincialStatsMapper;
