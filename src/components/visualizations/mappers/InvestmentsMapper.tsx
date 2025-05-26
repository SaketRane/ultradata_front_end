
import React from "react";
import SummaryOfInvestmentsTable from "@/components/SummaryOfInvestmentsTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const InvestmentsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "4008":
      return <SummaryOfInvestmentsTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default InvestmentsMapper;
