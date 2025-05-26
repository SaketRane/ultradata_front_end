
import React from "react";
import AssetsTable from "@/components/AssetsTable";
import LiabilitiesEquityTable from "@/components/LiabilitiesEquityTable";
import StatementOfIncomeTable from "@/components/StatementOfIncomeTable";
import ComprehensiveIncomeTable from "@/components/ComprehensiveIncomeTable";
import StatementOfChangesInEquityTable from "@/components/StatementOfChangesInEquityTable";
import HeadOfficeAccountAndReservesTable from "@/components/HeadOfficeAccountAndReservesTable";
import LiabilitiesAndEquityTable from "@/components/LiabilitiesAndEquityTable";
import LiabilityRollForwardTable from "@/components/LiabilityRollForwardTable";
import StatementOfProfitOrLossTable from "@/components/StatementOfProfitOrLossTable";
import StatementOfResidualInterestTable from "@/components/StatementOfResidualInterestTable";
import InsuranceLiabilitiesTable from "@/components/tables/financial-statements/InsuranceLiabilitiesTable";

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
    case "2011":
      return <LiabilitiesAndEquityTable />;
    case "2012":
      return <InsuranceLiabilitiesTable />;
    case "2014":
    case "2016":
    case "2018":
      return <LiabilityRollForwardTable sheetCode={sheetCode} />;
    case "2022":
      return <StatementOfProfitOrLossTable />;
    case "2041":
      return <StatementOfResidualInterestTable />;
    default:
      return null;
  }
};

export default FinancialStatementsMapper;
