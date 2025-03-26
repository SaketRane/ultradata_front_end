
import React from "react";
import AssetsTable from "@/components/AssetsTable";
import LiabilitiesEquityTable from "@/components/LiabilitiesEquityTable";
import StatementOfIncomeTable from "@/components/StatementOfIncomeTable";
import ComprehensiveIncomeTable from "@/components/ComprehensiveIncomeTable";
import StatementOfChangesInEquityTable from "@/components/StatementOfChangesInEquityTable";
import HeadOfficeAccountAndReservesTable from "@/components/HeadOfficeAccountAndReservesTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const FinancialStatementsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "2010":
      return <AssetsTable />;
    case "2020":
      return <LiabilitiesEquityTable />;
    case "2030":
      return <StatementOfIncomeTable />;
    case "2042":
      return <ComprehensiveIncomeTable />;
    case "2054":
      return <StatementOfChangesInEquityTable />;
    case "2045":
      return <HeadOfficeAccountAndReservesTable />;
    default:
      return null;
  }
};

export default FinancialStatementsMapper;
