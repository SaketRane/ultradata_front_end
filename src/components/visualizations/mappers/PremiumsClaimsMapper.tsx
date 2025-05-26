
import React from "react";
import { 
  InsuranceServiceResultTable,
  ChangesInOnerousContractsTable 
} from "@/components/tables/insurance-results";

interface CategoryMapperProps {
  sheetCode: string;
}

const PremiumsClaimsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "6025":
      return <InsuranceServiceResultTable />;
    case "6080":
      return <ChangesInOnerousContractsTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default PremiumsClaimsMapper;
