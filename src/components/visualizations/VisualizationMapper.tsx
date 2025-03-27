
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

// Create a mapper registry for better scalability
const visualizationMappers: Record<string, React.FC<{sheetCode: string}>| undefined> = {
  "Provincial Stats": ProvincialStatsMapper,
  "Premiums, Claims, & LAE": PremiumsClaimsMapper,
  "Commissions": CommissionsMapper,
  "Financial Statements": FinancialStatementsMapper,
  "Investments": InvestmentsMapper,
  "Reinsurance": ReinsuranceMapper
};

const VisualizationMapper: React.FC<VisualizationMapperProps> = ({
  section,
  sheet,
  sheetCode
}) => {
  // Use the registry pattern instead of if/else
  const MapperComponent = visualizationMappers[section];
  
  if (!MapperComponent) {
    return null;
  }
  
  return <MapperComponent sheetCode={sheetCode} />;
};

export default React.memo(VisualizationMapper);
