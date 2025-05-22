
import React from "react";
import RegisteredReinsuranceTable from "@/components/RegisteredReinsuranceTable";
import UnregisteredReinsuranceTable from "@/components/UnregisteredReinsuranceTable";
import UnregisteredReinsuranceForeignTable from "@/components/UnregisteredReinsuranceForeignTable";
// Import placeholder for new unified unregistered reinsurance component
import UnregisteredReinsuranceConsolidatedTable from "@/components/UnregisteredReinsuranceConsolidatedTable";

interface CategoryMapperProps {
  sheetCode: string;
}

const ReinsuranceMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    // Common sheet for both periods
    case "7050":
      return <RegisteredReinsuranceTable />;
    
    // Old sheets (2015-2022)
    case "7061":
      return <UnregisteredReinsuranceForeignTable />;
    
    // Sheet handling for both periods - for 2015-2022 it shows Canadian, for 2023-2025 it shows consolidated
    case "7060":
      // This needs to be determined based on the selected year
      // Since we don't have year context here yet, we'll provide both components
      // and implement the year-based logic when we have the actual data
      return <UnregisteredReinsuranceConsolidatedTable />;
    default:
      return null;
  }
};

export default ReinsuranceMapper;
