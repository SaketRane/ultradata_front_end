
import React, { lazy, Suspense, useMemo } from "react";
import { Loader2 } from "lucide-react";

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

const visualizationMappers: Record<string, React.ComponentType<{sheetCode: string}>> = {
  "Provincial Stats": ProvincialStatsMapper,
  "Insurance Results & Onerous Contracts": InsuranceResultsMapper,
  "Premiums, Claims, & LAE": InsuranceResultsMapper,
  "Commissions & Expenses": CommissionsMapper,
  "Commissions": CommissionsMapper,
  "Financial Statements": FinancialStatementsMapper,
  "Investments": InvestmentsMapper,
  "Reinsurance": ReinsuranceMapper,
  "MCT/BAAT": MCTMapper
};

const LoadingFallback = () => (
  <div className="flex justify-center items-center p-4 h-40">
    <Loader2 className="animate-spin h-8 w-8 text-primary" />
  </div>
);

const VisualizationMapper: React.FC<VisualizationMapperProps> = ({
  section,
  sheetCode
}) => {
  const MapperComponent = useMemo(() => {
    return visualizationMappers[section] || null;
  }, [section]);
  
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
