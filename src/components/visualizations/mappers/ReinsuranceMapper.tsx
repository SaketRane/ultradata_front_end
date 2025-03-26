
import React from "react";
import RegisteredReinsuranceTable from "@/components/RegisteredReinsuranceTable";
import UnregisteredReinsuranceTable from "@/components/UnregisteredReinsuranceTable";
import UnregisteredReinsuranceForeignTable from "@/components/UnregisteredReinsuranceForeignTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const ReinsuranceMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "7050":
      return <RegisteredReinsuranceTable />;
    case "7060":
      return <UnregisteredReinsuranceTable />;
    case "7061":
      return <UnregisteredReinsuranceForeignTable />;
    default:
      return null;
  }
};

export default ReinsuranceMapper;
