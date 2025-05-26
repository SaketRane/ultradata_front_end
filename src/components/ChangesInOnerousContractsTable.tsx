
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const ChangesInOnerousContractsTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "OPENING BALANCE", rowCode: "01", indent: 0, isTotal: true },
    { name: "NEW ONEROUS CONTRACTS RECOGNISED", rowCode: "", indent: 0, isHeader: true },
    { name: "Initial recognition of onerous contracts", rowCode: "02", indent: 1, isTotal: false },
    { name: "Changes in estimates that increase onerous contracts", rowCode: "03", indent: 1, isTotal: false },
    { name: "Subtotal - New onerous contracts", rowCode: "04", indent: 0, isTotal: true },
    { name: "REVERSALS OF ONEROUS CONTRACTS", rowCode: "", indent: 0, isHeader: true },
    { name: "Changes in estimates that decrease onerous contracts", rowCode: "05", indent: 1, isTotal: false },
    { name: "Contracts no longer onerous", rowCode: "06", indent: 1, isTotal: false },
    { name: "Subtotal - Reversals", rowCode: "07", indent: 0, isTotal: true },
    { name: "INTEREST ACCRETION", rowCode: "08", indent: 0, isTotal: false },
    { name: "CLOSING BALANCE", rowCode: "09", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "02" }
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
