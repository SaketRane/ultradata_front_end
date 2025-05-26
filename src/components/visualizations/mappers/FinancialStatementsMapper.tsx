
import React from "react";
import { 
  AssetsTable,
  StatementOfChangesInEquityTable,
  ComprehensiveIncomeTable,
  HeadOfficeAccountAndReservesTable,
  ReinsuranceHeldTable,
  InsuranceContractsHeldTable,
  InsuranceLiabilitiesTable
} from "@/components/tables/financial-statements";

interface FinancialStatementsMapperProps {
  sheetCode: string;
}

/**
 * Maps financial statement sheet codes to their corresponding table components
 * Handles assets, liabilities, equity, and comprehensive income statements
 */
const FinancialStatementsMapper: React.FC<FinancialStatementsMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "2010":
      return <AssetsTable />;
    case "2011":
      return <InsuranceLiabilitiesTable />;
    case "2012":
      return <StatementOfChangesInEquityTable />;
    case "2014":
      return <ComprehensiveIncomeTable />;
    case "2016":
      return <ReinsuranceHeldTable />;
    case "2018":
      return <InsuranceContractsHeldTable />;
    case "2022":
      return <HeadOfficeAccountAndReservesTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Financial statement table implementation coming soon...</p>
        </div>
      );
  }
};

export default FinancialStatementsMapper;
