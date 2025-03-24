
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

  // Only render the component if one of the conditions is true
  if (
    !shouldShowPremiumsTable() &&
    !shouldShowPremiumsEarnedTable() &&
    !shouldShowClaimsIncurredTable() &&
    !shouldShowClaimsUndiscountedTable() &&
    !shouldShowPremiumsAndClaimsTable() &&
    !shouldShowUndiscountedClaimsTable() &&
    !shouldShowClaimsAndAdjustmentExpensesTable() &&
    !shouldShowCommissionsTable()
  ) {
    return null;
  }

  // Determine the title based on which table is shown
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
  }

  return (
    <section className="mb-4 w-full mx-auto">
      <Card className="shadow-lg glass w-full">
        <CardContent className="p-3">
          <h2 className="text-lg font-semibold mb-3">{title}</h2>
          
          {shouldShowPremiumsTable() && <PremiumsTable />}
          {shouldShowPremiumsEarnedTable() && <PremiumsEarnedTable />}
          {shouldShowClaimsIncurredTable() && <ClaimsIncurredTable />}
          {shouldShowClaimsUndiscountedTable() && <ClaimsUndiscountedTable />}
          {shouldShowPremiumsAndClaimsTable() && <PremiumsAndClaimsTable />}
          {shouldShowUndiscountedClaimsTable() && <UndiscountedClaimsTable />}
          {shouldShowClaimsAndAdjustmentExpensesTable() && <ClaimsAndAdjustmentExpensesTable />}
          {shouldShowCommissionsTable() && <CommissionsTable />}
        </CardContent>
      </Card>
    </section>
  );
};

export default DataVisualization;
