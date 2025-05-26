
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { type RowDefinition, type ColumnDefinition } from "@/types/financial";

/**
 * Head Office Account & Reserves Table component for displaying financial statements data
 */
const HeadOfficeAccountAndReservesTable: React.FC = () => {
  // Define table rows with their codes for IFRS 17 format
  const tableRows: RowDefinition[] = useMemo(() => [
    { name: "HEAD OFFICE ACCOUNT (Foreign Insurers)", rowCode: "", indent: 0, isHeader: true },
    { name: "Balance at beginning of year", rowCode: "01", indent: 0 },
    { name: "Prior period adjustments:", rowCode: "02", indent: 1 },
    { name: "(Specify)", rowCode: "04", indent: 1 },
    { name: "Adjusted balance at beginning of year", rowCode: "09", indent: 0 },
    { name: "Net income (loss) for the year", rowCode: "10", indent: 1 },
    { name: "Transfers from (to) Head Office", rowCode: "", indent: 1, isHeader: true },
    { name: "Advances (Returns)", rowCode: "20", indent: 2 },
    { name: "Expenses", rowCode: "21", indent: 2 },
    { name: "Premiums/Claims", rowCode: "22", indent: 2 },
    { name: "Other", rowCode: "23", indent: 2 },
    { name: "Subtotal", rowCode: "11", indent: 2, isTotal: true },
    { name: "Decrease (increase) in Reserves", rowCode: "12", indent: 1 },
    { name: "Net increase (decrease) in Head Office Account", rowCode: "15", indent: 1 },
    { name: "Balance at end of year", rowCode: "89", indent: 0, isTotal: true, isFinalTotal: true },
    
    { name: "RESERVES", rowCode: "", indent: 0, isHeader: true, isSection: true },
    { name: "Earthquake Reserves", rowCode: "", indent: 0, isHeader: true },
    { name: "Reserve Complement", rowCode: "90", indent: 1 },
    { name: "Premium Reserve", rowCode: "91", indent: 1 },
    { name: "Mortgage Reserve", rowCode: "95", indent: 0 },
    { name: "Nuclear Reserve", rowCode: "96", indent: 0 },
    { name: "General and Contingency Reserves", rowCode: "98", indent: 0 },
    { name: "Total Reserves", rowCode: "99", indent: 0, isTotal: true, isFinalTotal: true }
  ], []);

  // Define column data
  const columns: ColumnDefinition[] = useMemo(() => [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "02" }
  ], []);

  return (
    <FinancialTable 
      rows={tableRows} 
      columns={columns} 
      sheetCode="2045" 
    />
  );
};

export default React.memo(HeadOfficeAccountAndReservesTable);
