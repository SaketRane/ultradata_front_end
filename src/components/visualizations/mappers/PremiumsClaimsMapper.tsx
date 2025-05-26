
import React from "react";
import InsuranceServiceResultTable from "@/components/InsuranceServiceResultTable";
import ChangesInOnerousContractsTable from "@/components/ChangesInOnerousContractsTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const PremiumsClaimsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "6025":
      return <InsuranceServiceResultTable />;
    case "6080":
      return <ChangesInOnerousContractsTable />;
    // Legacy mappings for pre-2023 years
    case "6020":
      return <div>Premiums and Claims Legacy Table - To be implemented</div>;
    case "6021":
      return <div>Inc Claims (Undisc) Legacy Table - To be implemented</div>;
    case "6030":
      return <div>Claims and Adjustment Expenses Legacy Table - To be implemented</div>;
    default:
      return null;
  }
};

export default PremiumsClaimsMapper;
