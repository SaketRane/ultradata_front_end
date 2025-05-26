
import React from "react";
import { 
  RegisteredReinsuranceNetExpensesTable,
  UnregisteredReinsuranceNetExpensesTable,
  UnregisteredReinsuranceForeignTable 
} from "@/components/tables/reinsurance";
import UnregisteredReinsuranceTable from "@/components/UnregisteredReinsuranceTable";
import UnregisteredReinsuranceConsolidatedTable from "@/components/UnregisteredReinsuranceConsolidatedTable";

interface ReinsuranceMapperProps {
  sheetCode: string;
}

/**
 * Maps reinsurance sheet codes to their corresponding table components
 * Handles both registered and unregistered reinsurance data visualization
 */
const ReinsuranceMapper: React.FC<ReinsuranceMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case "7050":
      return <RegisteredReinsuranceNetExpensesTable />;
    case "7055":
      return <UnregisteredReinsuranceNetExpensesTable />;
    case "7060":
      return <UnregisteredReinsuranceTable />;
    case "7061":
      return <UnregisteredReinsuranceForeignTable />;
    case "7065":
      return <UnregisteredReinsuranceConsolidatedTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Reinsurance table implementation coming soon...</p>
        </div>
      );
  }
};

export default ReinsuranceMapper;
