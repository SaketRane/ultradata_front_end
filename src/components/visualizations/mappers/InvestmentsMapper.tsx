
import React from "react";
import SummaryOfInvestmentsTable from "@/components/SummaryOfInvestmentsTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const InvestmentsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  if (sheetCode === "4007") {
    return <SummaryOfInvestmentsTable />;
  }
  return null;
};

export default InvestmentsMapper;
