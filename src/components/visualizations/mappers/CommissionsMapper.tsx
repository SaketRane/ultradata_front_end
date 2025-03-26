
import React from "react";
import CommissionsTable from "@/components/CommissionsTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const CommissionsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  if (sheetCode === "8010") {
    return <CommissionsTable />;
  }
  return null;
};

export default CommissionsMapper;
