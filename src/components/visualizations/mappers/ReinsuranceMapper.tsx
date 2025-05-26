
import React from "react";
import { RegisteredReinsuranceTable, UnregisteredReinsuranceTable } from "@/components/tables/reinsurance";

interface CategoryMapperProps {
  sheetCode: string;
}

const ReinsuranceMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "7050":
      return <RegisteredReinsuranceTable />;
    case "7060":
      return <UnregisteredReinsuranceTable />;
    // Legacy mapping for pre-2023 years
    case "7061":
      return <div>Unregistered Reinsurance Foreign Legacy Table - To be implemented</div>;
    default:
      return null;
  }
};

export default ReinsuranceMapper;
