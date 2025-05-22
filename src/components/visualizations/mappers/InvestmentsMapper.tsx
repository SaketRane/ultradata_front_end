
import React from "react";
import SummaryOfInvestmentsTable from "@/components/SummaryOfInvestmentsTable";
// We'll need to handle both 4007 and 4008 with the same component for now

interface CategoryMapperProps {
  sheetCode: string;
}

const InvestmentsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  // Handle both the old and new sheet codes with the same component
  if (sheetCode === "4007" || sheetCode === "4008") {
    return <SummaryOfInvestmentsTable />;
  }
  return null;
};

export default InvestmentsMapper;
