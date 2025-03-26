
import React from "react";
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
import UnregisteredReinsuranceTable from "@/components/UnregisteredReinsuranceTable";
import UnregisteredReinsuranceForeignTable from "@/components/UnregisteredReinsuranceForeignTable";

interface VisualizationMapperProps {
  section: string;
  sheet: string;
  sheetCode: string;
}

const VisualizationMapper: React.FC<VisualizationMapperProps> = ({
  section,
  sheet,
  sheetCode
}) => {
  // Provincial Stats visualizations
  if (section === "Provincial Stats") {
    switch (sheetCode) {
      case "6710":
        return <PremiumsTable />;
      case "6720":
        return <PremiumsEarnedTable />;
      case "6730":
        return <ClaimsIncurredTable />;
      case "6731":
        return <ClaimsUndiscountedTable />;
      default:
        return null;
    }
  }

  // Premiums, Claims, & LAE visualizations
  if (section === "Premiums, Claims, & LAE") {
    switch (sheetCode) {
      case "6020":
        return <PremiumsAndClaimsTable />;
      case "6021":
        return <UndiscountedClaimsTable />;
      case "6030":
        return <ClaimsAndAdjustmentExpensesTable />;
      default:
        return null;
    }
  }

  // Commissions visualizations
  if (section === "Commissions" && sheetCode === "8010") {
    return <CommissionsTable />;
  }

  // Financial Statements visualizations
  if (section === "Financial Statements") {
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
  }

  // Investments visualizations
  if (section === "Investments" && sheetCode === "4007") {
    return <SummaryOfInvestmentsTable />;
  }

  // Reinsurance visualizations
  if (section === "Reinsurance") {
    switch (sheetCode) {
      case "7050":
        return <RegisteredReinsuranceTable />;
      case "7060":
        return <UnregisteredReinsuranceTable />;
      case "7061":
        return <UnregisteredReinsuranceForeignTable />;
      default:
        return null;
    }
  }

  return null;
};

export default VisualizationMapper;
