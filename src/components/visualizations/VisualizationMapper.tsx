
import React, { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

// Lazy load mappers for better performance and code splitting
const ProvincialStatsMapper = lazy(() => import("./mappers/ProvincialStatsMapper"));
const PremiumsClaimsMapper = lazy(() => import("./mappers/PremiumsClaimsMapper"));
const CommissionsMapper = lazy(() => import("./mappers/CommissionsMapper"));
const FinancialStatementsMapper = lazy(() => import("./mappers/FinancialStatementsMapper"));
const InvestmentsMapper = lazy(() => import("./mappers/InvestmentsMapper"));
const ReinsuranceMapper = lazy(() => import("./mappers/ReinsuranceMapper"));

interface VisualizationMapperProps {
  section: string;
  sheet: string;
  sheetCode: string;
}

/**
 * Registry of visualization mappers for each section.
 * Using a registry pattern makes it easy to add new mappers in the future.
 */
const visualizationMappers: Record<string, React.ComponentType<{sheetCode: string}>> = {
  "Provincial Stats": ProvincialStatsMapper,
  "Premiums, Claims, & LAE": PremiumsClaimsMapper,
  "Commissions": CommissionsMapper,
  "Financial Statements": FinancialStatementsMapper,
  "Investments": InvestmentsMapper,
  "Reinsurance": ReinsuranceMapper
};

/**
 * Maps sections to their corresponding visualization components.
 * Uses a registry pattern for better scalability and lazy loading for performance.
 */
const VisualizationMapper: React.FC<VisualizationMapperProps> = ({
  section,
  sheet,
  sheetCode
}) => {
  // Use the registry pattern instead of if/else for better scalability
  const MapperComponent = visualizationMappers[section];
  
  if (!MapperComponent) {
    console.debug(`No mapper component found for section: ${section}`);
    return null;
  }
  
  return (
    <Suspense fallback={<div className="flex justify-center p-4"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>}>
      <MapperComponent sheetCode={sheetCode} />
    </Suspense>
  );
};

export default React.memo(VisualizationMapper);
