/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const CommissionsTable: React.FC<any> = ({code = '8015'}) => {
  const rows: RowDefinition[] = [
    { name: "Property - total", rowCode: "010", indent: 0, isTotal: false },
    { name: "Automobile - total", rowCode: "020", indent: 0, isTotal: false },
    { name: "Liability", rowCode: "030", indent: 0, isTotal: false },
    { name: "Marine", rowCode: "040", indent: 0, isTotal: false },
    { name: "Other", rowCode: "050", indent: 0, isTotal: false },
    { name: "TOTAL", rowCode: "199", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "03" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode={code}
    />
  );
};

export default React.memo(CommissionsTable);
