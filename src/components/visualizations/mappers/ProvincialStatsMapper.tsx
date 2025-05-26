
import React from "react";
import { 
  InsuranceRevenueTable, 
  InsuranceServiceExpensesByProvinceTable,
  NetExpensesReinsuranceTable,
  InsuranceServiceResultProvincialTable
} from "@/components/tables/provincial-stats";

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
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default ProvincialStatsMapper;
