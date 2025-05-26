
import React from "react";
import CommissionsNewTable from "@/components/CommissionsNewTable";
import InsuranceServiceOperatingExpensesTable from "@/components/InsuranceServiceOperatingExpensesTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const CommissionsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "8015":
      return <CommissionsNewTable />;
    case "8025":
      return <InsuranceServiceOperatingExpensesTable />;
    // Legacy mapping for pre-2023 years
    case "8010":
      return <div>Commissions Legacy Table - To be implemented</div>;
    default:
      return null;
  }
};

export default CommissionsMapper;
