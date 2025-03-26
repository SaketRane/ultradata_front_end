
import React from "react";
import PremiumsTable from "@/components/PremiumsTable";
import PremiumsEarnedTable from "@/components/PremiumsEarnedTable";
import ClaimsIncurredTable from "@/components/ClaimsIncurredTable";
import ClaimsUndiscountedTable from "@/components/ClaimsUndiscountedTable";

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
    default:
      return null;
  }
};

export default ProvincialStatsMapper;
