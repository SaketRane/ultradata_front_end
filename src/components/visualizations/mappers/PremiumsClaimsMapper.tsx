import React from "react";
import PremiumsAndClaimsTable from "@/components/PremiumsAndClaimsTable";
import UndiscountedClaimsTable from "@/components/UndiscountedClaimsTable";
import ClaimsAndAdjustmentExpensesTable from "@/components/ClaimsAndAdjustmentExpensesTable";
import InsuranceServiceResultTable from "@/components/InsuranceServiceResultTable";
import ChangesInOnerousContractsTable from "@/components/ChangesInOnerousContractsTable";

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
    case "6025":
      return <InsuranceServiceResultTable />;
    case "6080":
      return <ChangesInOnerousContractsTable />;
    default:
      return null;
  }
};

export default PremiumsClaimsMapper;
