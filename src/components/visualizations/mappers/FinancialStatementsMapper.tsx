
import React from "react";
import AssetsTable from "@/components/AssetsTable";
import LiabilitiesAndEquityTable from "@/components/LiabilitiesAndEquityTable";
import InsuranceLiabilitiesTable from "@/components/tables/financial-statements/InsuranceLiabilitiesTable";
import ReinsuranceHeldTable from "@/components/tables/financial-statements/ReinsuranceHeldTable";
import ComprehensiveIncomeTable from "@/components/tables/financial-statements/ComprehensiveIncomeTable";
import HeadOfficeAccountAndReservesTable from "@/components/tables/financial-statements/HeadOfficeAccountAndReservesTable";
import StatementOfChangesInEquityTable from "@/components/tables/financial-statements/StatementOfChangesInEquityTable";
import StatementOfProfitOrLossTable from "@/components/StatementOfProfitOrLossTable";
import StatementOfResidualInterestTable from "@/components/StatementOfResidualInterestTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const FinancialStatementsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "2010":
      return <AssetsTable />;
    case "2011":
      return <LiabilitiesAndEquityTable />;
    case "2012":
      return <InsuranceLiabilitiesTable />;
    case "2016":
      return <ReinsuranceHeldTable />;
    case "2022":
      return <StatementOfProfitOrLossTable />;
    case "2041":
      return <StatementOfResidualInterestTable />;
    case "2042":
      return <ComprehensiveIncomeTable />;
    case "2045":
      return <HeadOfficeAccountAndReservesTable />;
    case "2054":
      return <StatementOfChangesInEquityTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default FinancialStatementsMapper;
