
import React from "react";
import PremiumsAndClaimsTable from "@/components/PremiumsAndClaimsTable";
import UndiscountedClaimsTable from "@/components/UndiscountedClaimsTable";
import ClaimsAndAdjustmentExpensesTable from "@/components/ClaimsAndAdjustmentExpensesTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const PremiumsClaimsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "6020":
      return <PremiumsAndClaimsTable />;
    case "6021":
      return <UndiscountedClaimsTable />;
    case "6030":
      return <ClaimsAndAdjustmentExpensesTable />;
    default:
      return null;
  }
};

export default PremiumsClaimsMapper;
