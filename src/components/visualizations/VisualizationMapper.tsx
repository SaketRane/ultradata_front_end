
import React, { lazy, Suspense, useMemo } from "react";
import { Loader2 } from "lucide-react";

// Lazy load mappers for better performance and code splitting
const ProvincialStatsMapper = lazy(() => import("./mappers/ProvincialStatsMapper"));
const InsuranceResultsMapper = lazy(() => import("./mappers/PremiumsClaimsMapper"));
const CommissionsMapper = lazy(() => import("./mappers/CommissionsMapper"));
const FinancialStatementsMapper = lazy(() => import("./mappers/FinancialStatementsMapper"));
const InvestmentsMapper = lazy(() => import("./mappers/InvestmentsMapper"));
const ReinsuranceMapper = lazy(() => import("./mappers/ReinsuranceMapper"));
const MCTMapper = lazy(() => import("./mappers/MCTMapper"));

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
  "Insurance Results & Onerous Contracts": InsuranceResultsMapper,
  "Premiums, Claims, & LAE": InsuranceResultsMapper, // Legacy name for 2022 and earlier
  "Commissions & Expenses": CommissionsMapper,
  "Commissions": CommissionsMapper, // Legacy name for 2022 and earlier
  "Financial Statements": FinancialStatementsMapper,
  "Investments": InvestmentsMapper,
  "Reinsurance": ReinsuranceMapper,
  "MCT/BAAT": MCTMapper
};

/**
 * A fallback component to display when visualization is loading
 */
const LoadingFallback = () => (
  <div className="flex justify-center items-center p-4 h-40">
    <Loader2 className="animate-spin h-8 w-8 text-primary" />
  </div>
);

/**
 * Maps sections to their corresponding visualization components.
 * Uses a registry pattern for better scalability and lazy loading for performance.
 */
const VisualizationMapper: React.FC<VisualizationMapperProps> = ({
  section,
  sheet,
  sheetCode
}) => {
  // Memoize the mapper component selection
  const MapperComponent = useMemo(() => {
    return visualizationMappers[section] || null;
  }, [section]);
  
  // Return early if no mapper is found
  if (!MapperComponent) {
    console.debug(`No mapper component found for section: ${section}`);
    return null;
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MapperComponent sheetCode={sheetCode} />
    </Suspense>
  );
};

export default React.memo(VisualizationMapper);
