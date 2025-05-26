
import React from "react";
import AssetsTable from "@/components/tables/financial-statements/AssetsTable";
import InsuranceLiabilitiesTable from "@/components/tables/financial-statements/InsuranceLiabilitiesTable";
import StatementOfChangesInEquityTable from "@/components/tables/financial-statements/StatementOfChangesInEquityTable";
import ComprehensiveIncomeTable from "@/components/tables/financial-statements/ComprehensiveIncomeTable";
import HeadOfficeAccountAndReservesTable from "@/components/tables/financial-statements/HeadOfficeAccountAndReservesTable";
import LiabilitiesAndEquityTable from "@/components/LiabilitiesAndEquityTable";
import StatementOfProfitOrLossTable from "@/components/StatementOfProfitOrLossTable";
import StatementOfResidualInterestTable from "@/components/StatementOfResidualInterestTable";
// Insurance Contracts
import ReinsuranceHeldTable from "@/components/tables/financial-statements/ReinsuranceHeldTable";
import InsuranceContractsHeldTable from "@/components/tables/financial-statements/InsuranceContractsHeldTable";
import InsuranceLiabilitiesByMeasurementTable from "@/components/tables/financial-statements/InsuranceLiabilitiesByMeasurementTable";

interface FinancialStatementsMapperProps {
  sheetCode: string;
}

/**
 * Maps sheet codes to their corresponding financial statement table components.
 */
const FinancialStatementsMapper: React.FC<FinancialStatementsMapperProps> = ({ sheetCode }) => {

  const renderTable = () => {
    switch (sheetCode) {
      case "2010":
        return <AssetsTable />;
      case "2011":
        return <LiabilitiesAndEquityTable />;
      case "2012":
        return <InsuranceLiabilitiesTable />;
      case "2014":
        return <InsuranceLiabilitiesByMeasurementTable />;
      case "2016":
        return <ReinsuranceHeldTable />;
      case "2018":
        return <InsuranceContractsHeldTable />;
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
        return null;
    }
  };

  return (
    <>
      {renderTable()}
    </>
  );
};

export default FinancialStatementsMapper;
