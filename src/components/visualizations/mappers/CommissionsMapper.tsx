import React from "react";
import CommissionsTable from "@/components/CommissionsTable";
import CommissionsNewTable from "@/components/CommissionsNewTable";
import InsuranceServiceOperatingExpensesTable from "@/components/InsuranceServiceOperatingExpensesTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const CommissionsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "8010":
      return <CommissionsTable />;
    case "8015":
      return <CommissionsNewTable />;
    case "8025":
      return <InsuranceServiceOperatingExpensesTable />;
    default:
      return null;
  }
};

export default CommissionsMapper;
