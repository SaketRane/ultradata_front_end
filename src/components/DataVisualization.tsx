import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import PremiumsTable from "@/components/PremiumsTable";
import PremiumsEarnedTable from "@/components/PremiumsEarnedTable";
import ClaimsIncurredTable from "@/components/ClaimsIncurredTable";
import ClaimsUndiscountedTable from "@/components/ClaimsUndiscountedTable";
import PremiumsAndClaimsTable from "@/components/PremiumsAndClaimsTable";
import UndiscountedClaimsTable from "@/components/UndiscountedClaimsTable";
import ClaimsAndAdjustmentExpensesTable from "@/components/ClaimsAndAdjustmentExpensesTable";
import CommissionsTable from "@/components/CommissionsTable";
import AssetsTable from "@/components/AssetsTable";
import LiabilitiesEquityTable from "@/components/LiabilitiesEquityTable";
import StatementOfIncomeTable from "@/components/StatementOfIncomeTable";
import ComprehensiveIncomeTable from "@/components/ComprehensiveIncomeTable";
import StatementOfChangesInEquityTable from "@/components/StatementOfChangesInEquityTable";
import HeadOfficeAccountAndReservesTable from "@/components/HeadOfficeAccountAndReservesTable";
import SummaryOfInvestmentsTable from "@/components/SummaryOfInvestmentsTable";
import RegisteredReinsuranceTable from "@/components/RegisteredReinsuranceTable";

interface DataVisualizationProps {
  section: string;
  sheet: string;
  availableSheets: Array<{code: string, label: string}>;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  section,
  sheet,
  availableSheets
}) => {
  const shouldShowPremiumsTable = () => {
    return section === "Provincial Stats" && 
           sheet === availableSheets.find(s => s.code === "6710")?.label;
  };

  const shouldShowPremiumsEarnedTable = () => {
    return section === "Provincial Stats" && 
           sheet === availableSheets.find(s => s.code === "6720")?.label;
  };

  const shouldShowClaimsIncurredTable = () => {
    return section === "Provincial Stats" && 
           sheet === availableSheets.find(s => s.code === "6730")?.label;
  };

  const shouldShowClaimsUndiscountedTable = () => {
    return section === "Provincial Stats" && 
           sheet === availableSheets.find(s => s.code === "6731")?.label;
  };

  const shouldShowPremiumsAndClaimsTable = () => {
    return section === "Premiums, Claims, & LAE" && 
           sheet === availableSheets.find(s => s.code === "6020")?.label;
  };

  const shouldShowUndiscountedClaimsTable = () => {
    return section === "Premiums, Claims, & LAE" && 
           sheet === availableSheets.find(s => s.code === "6021")?.label &&
           availableSheets.findIndex(s => s.label === sheet) === 1;
  };

  const shouldShowClaimsAndAdjustmentExpensesTable = () => {
    return section === "Premiums, Claims, & LAE" && 
           sheet === availableSheets.find(s => s.code === "6030")?.label;
  };

  const shouldShowCommissionsTable = () => {
    return section === "Commissions" && 
           sheet === availableSheets.find(s => s.code === "8010")?.label;
  };

  const shouldShowAssetsTable = () => {
    return section === "Financial Statements" && 
           sheet === availableSheets.find(s => s.code === "2010")?.label;
  };

  const shouldShowLiabilitiesEquityTable = () => {
    return section === "Financial Statements" && 
           sheet === availableSheets.find(s => s.code === "2020")?.label;
  };

  const shouldShowStatementOfIncomeTable = () => {
    return section === "Financial Statements" && 
           sheet === availableSheets.find(s => s.code === "2030")?.label;
  };

  const shouldShowComprehensiveIncomeTable = () => {
    return section === "Financial Statements" && 
           sheet === availableSheets.find(s => s.code === "2042")?.label;
  };

  const shouldShowStatementOfChangesInEquityTable = () => {
    return section === "Financial Statements" && 
           sheet === availableSheets.find(s => s.code === "2054")?.label;
  };

  const shouldShowHeadOfficeAccountAndReservesTable = () => {
    return section === "Financial Statements" && 
           sheet === availableSheets.find(s => s.code === "2045")?.label;
  };

  const shouldShowSummaryOfInvestmentsTable = () => {
    return section === "Investments" && 
           sheet === availableSheets.find(s => s.code === "4007")?.label;
  };

  const shouldShowRegisteredReinsuranceTable = () => {
    return section === "Reinsurance" && 
           sheet === availableSheets.find(s => s.code === "7050")?.label;
  };

  if (
    !shouldShowPremiumsTable() &&
    !shouldShowPremiumsEarnedTable() &&
    !shouldShowClaimsIncurredTable() &&
    !shouldShowClaimsUndiscountedTable() &&
    !shouldShowPremiumsAndClaimsTable() &&
    !shouldShowUndiscountedClaimsTable() &&
    !shouldShowClaimsAndAdjustmentExpensesTable() &&
    !shouldShowCommissionsTable() &&
    !shouldShowAssetsTable() &&
    !shouldShowLiabilitiesEquityTable() &&
    !shouldShowStatementOfIncomeTable() &&
    !shouldShowComprehensiveIncomeTable() &&
    !shouldShowStatementOfChangesInEquityTable() &&
    !shouldShowHeadOfficeAccountAndReservesTable() &&
    !shouldShowSummaryOfInvestmentsTable() &&
    !shouldShowRegisteredReinsuranceTable()
  ) {
    return null;
  }

  let title = "";
  if (shouldShowPremiumsTable()) {
    title = "Premiums Written by Province";
  } else if (shouldShowPremiumsEarnedTable()) {
    title = "Premiums Earned by Province";
  } else if (shouldShowClaimsIncurredTable()) {
    title = "Claims Inc (incl Adj Exp) by Province";
  } else if (shouldShowClaimsUndiscountedTable()) {
    title = "Claims Inc (incl Adj Exp Undisc) by Province";
  } else if (shouldShowPremiumsAndClaimsTable()) {
    title = "Premiums and Claims";
  } else if (shouldShowUndiscountedClaimsTable()) {
    title = "Undiscounted Claims Incurred";
  } else if (shouldShowClaimsAndAdjustmentExpensesTable()) {
    title = "Claims and Adjustment Expenses - Paid, Current Year and Unpaid, Current and Prior Year";
  } else if (shouldShowCommissionsTable()) {
    title = "Commissions";
  } else if (shouldShowAssetsTable()) {
    title = "Assets";
  } else if (shouldShowLiabilitiesEquityTable()) {
    title = "Liabilities, Equity, Head Office Account, Reserves & AOCI";
  } else if (shouldShowStatementOfIncomeTable()) {
    title = "Statement of Income";
  } else if (shouldShowComprehensiveIncomeTable()) {
    title = "Comprehensive Income(Loss) & Accumulated Other Comprehensive Income(Loss)";
  } else if (shouldShowStatementOfChangesInEquityTable()) {
    title = "Statement of Changes in Equity";
  } else if (shouldShowHeadOfficeAccountAndReservesTable()) {
    title = "Head Office Account & Reserves";
  } else if (shouldShowSummaryOfInvestmentsTable()) {
    title = "Summary of Investments";
  } else if (shouldShowRegisteredReinsuranceTable()) {
    title = "Registered Reinsurance";
  }

  return (
    <section className="mb-4 w-full mx-auto">
      <Card className="shadow-lg glass w-full">
        <CardContent className="p-3">
          <h2 className="text-lg font-semibold mb-3">{title}</h2>
          
          {shouldShowSummaryOfInvestmentsTable() && <SummaryOfInvestmentsTable />}
          {shouldShowRegisteredReinsuranceTable() && <RegisteredReinsuranceTable />}
        </CardContent>
      </Card>
    </section>
  );
};

export default DataVisualization;
