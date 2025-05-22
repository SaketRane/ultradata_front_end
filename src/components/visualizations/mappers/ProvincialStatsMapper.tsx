import React from "react";
import PremiumsTable from "@/components/PremiumsTable";
import PremiumsEarnedTable from "@/components/PremiumsEarnedTable";
import ClaimsIncurredTable from "@/components/ClaimsIncurredTable";
import ClaimsUndiscountedTable from "@/components/ClaimsUndiscountedTable";
import InsuranceRevenueTable from "@/components/InsuranceRevenueTable";
import InsuranceServiceExpensesTable from "@/components/InsuranceServiceExpensesTable";
import NetExpensesReinsuranceTable from "@/components/NetExpensesReinsuranceTable";
import InsuranceServiceResultProvincialTable from "@/components/InsuranceServiceResultProvincialTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const ProvincialStatsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "6710":
      return <PremiumsTable />;
    case "6720":
      return <PremiumsEarnedTable />;
    case "6730":
      return <ClaimsIncurredTable />;
    case "6731":
      return <ClaimsUndiscountedTable />;
    case "6740":
      return <InsuranceRevenueTable />;
    case "6750":
      return <InsuranceServiceExpensesTable />;
    case "6760":
      return <NetExpensesReinsuranceTable />;
    case "6770":
      return <InsuranceServiceResultProvincialTable />;
    default:
      return null;
  }
};

export default ProvincialStatsMapper;
