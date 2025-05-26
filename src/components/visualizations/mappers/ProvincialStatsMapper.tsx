
import React from "react";
import InsuranceRevenueTable from "@/components/InsuranceRevenueTable";
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
    // Legacy mappings for pre-2023 years
    case "6710":
      return <div>Premiums Written Legacy Table - To be implemented</div>;
    case "6720":
      return <div>Premiums Earned Legacy Table - To be implemented</div>;
    case "6730":
      return <div>Claims Inc (incl Adj Exp) Legacy Table - To be implemented</div>;
    case "6731":
      return <div>Claims Inc (incl Adj Exp Undisc) Legacy Table - To be implemented</div>;
    default:
      return null;
  }
};

export default ProvincialStatsMapper;
