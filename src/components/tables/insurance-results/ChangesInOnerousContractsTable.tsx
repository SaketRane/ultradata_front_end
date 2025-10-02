import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const ChangesInOnerousContractsTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "Total", rowCode: "299", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { 
      id: "lossesReversalIssued", 
      label: "Losses and Reversal of Losses (Insurance and Reinsurance Contracts Issued)", 
      colCode: "05" 
    },
    { 
      id: "lossRecoveryReversalHeld", 
      label: "Loss-Recovery and Reversal of Loss-Recovery (Reinsurance Contracts Held)", 
      colCode: "10" 
    },
    { 
      id: "onerousContractsLossesNet", 
      label: "Onerous Contracts Losses (Net)", 
      colCode: "15" 
    }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="6080"
    />
  );
};

export default React.memo(ChangesInOnerousContractsTable);
