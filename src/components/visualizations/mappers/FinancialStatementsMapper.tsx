
import React, { Suspense } from "react";
import {
  AssetsTable,
  InsuranceLiabilitiesTable,
  StatementOfChangesInEquityTable,
  ComprehensiveIncomeTable,
  HeadOfficeAccountAndReservesTable,
  ReinsuranceHeldTable,
  InsuranceContractsHeldTable,
  InsuranceLiabilitiesByMeasurementTable
} from "@/components/tables/financial-statements";
import LiabilitiesAndEquityTable from "@/components/LiabilitiesAndEquityTable";
import StatementOfProfitOrLossTable from "@/components/StatementOfProfitOrLossTable";
import StatementOfResidualInterestTable from "@/components/StatementOfResidualInterestTable";
import { Loader2 } from "lucide-react";
import LiabilitiesEquityTable from "@/components/LiabilitiesEquityTable";
import StatementOfIncomeTable from "@/components/StatementOfIncomeTable";

interface FinancialStatementsMapperProps {
  sheetCode: string;
}

const FinancialStatementsMapper: React.FC<FinancialStatementsMapperProps> = ({ sheetCode }) => {
  const LoadingFallback = () => (
    <div className="flex justify-center items-center p-8">
      <Loader2 className="animate-spin h-6 w-6 text-primary" />
    </div>
  );

  const renderTable = () => {
    switch (sheetCode) {
      case "2010": return <AssetsTable />;
      case "2011": return <LiabilitiesAndEquityTable />;
      case "2012": return <InsuranceLiabilitiesTable />;
      case "2014": return <InsuranceLiabilitiesByMeasurementTable />;
      case "2016": return <ReinsuranceHeldTable />;
      case "2018": return <InsuranceContractsHeldTable />;
      case "2020": return <LiabilitiesEquityTable />;
      case "2022": return <StatementOfProfitOrLossTable />;
      case "2030": return <StatementOfIncomeTable />;
      case "2041": return <StatementOfResidualInterestTable />;
      case "2042": return <ComprehensiveIncomeTable />;
      case "2045": return <HeadOfficeAccountAndReservesTable />;
      case "2054": return <StatementOfChangesInEquityTable />;
      default:
        console.warn(`Unknown sheet code: ${sheetCode}`);
        return (
          <div className="text-center p-8 text-gray-500">
            No visualization available for sheet code: {sheetCode}
          </div>
        );
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {renderTable()}
    </Suspense>
  );
};

export default React.memo(FinancialStatementsMapper);
