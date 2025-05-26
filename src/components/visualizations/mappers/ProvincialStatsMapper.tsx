
import React from "react";
import { InsuranceRevenueTable } from "@/components/tables/provincial-stats";
import InsuranceServiceExpensesTable from "@/components/InsuranceServiceExpensesTable";
import NetExpensesReinsuranceTable from "@/components/NetExpensesReinsuranceTable";
import InsuranceServiceResultProvincialTable from "@/components/InsuranceServiceResultProvincialTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const ProvincialStatsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "6740":
      return <InsuranceRevenueTable />;
    case "6750":
      return <InsuranceServiceExpensesTable />;
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
