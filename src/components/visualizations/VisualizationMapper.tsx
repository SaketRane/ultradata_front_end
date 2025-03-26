
import React from "react";
import ProvincialStatsMapper from "./mappers/ProvincialStatsMapper";
import PremiumsClaimsMapper from "./mappers/PremiumsClaimsMapper";
import CommissionsMapper from "./mappers/CommissionsMapper";
import FinancialStatementsMapper from "./mappers/FinancialStatementsMapper";
import InvestmentsMapper from "./mappers/InvestmentsMapper";
import ReinsuranceMapper from "./mappers/ReinsuranceMapper";

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
    return <ProvincialStatsMapper sheetCode={sheetCode} />;
  }

  // Premiums, Claims, & LAE visualizations
  if (section === "Premiums, Claims, & LAE") {
    return <PremiumsClaimsMapper sheetCode={sheetCode} />;
  }

  // Commissions visualizations
  if (section === "Commissions") {
    return <CommissionsMapper sheetCode={sheetCode} />;
  }

  // Financial Statements visualizations
  if (section === "Financial Statements") {
    return <FinancialStatementsMapper sheetCode={sheetCode} />;
  }

  // Investments visualizations
  if (section === "Investments") {
    return <InvestmentsMapper sheetCode={sheetCode} />;
  }

  // Reinsurance visualizations
  if (section === "Reinsurance") {
    return <ReinsuranceMapper sheetCode={sheetCode} />;
  }

  return null;
};

export default VisualizationMapper;
