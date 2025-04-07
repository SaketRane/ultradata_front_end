
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

// Define table rows with their codes
const headOfficeAccountAndReservesRows: RowDefinition[] = [
  // HEAD OFFICE ACCOUNT Section
  { name: "HEAD OFFICE ACCOUNT (Foreign Insurers)", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Balance at beginning of year", rowCode: "01", indent: 0, isTotal: true },
  { name: "Prior period adjustments:", rowCode: "02", indent: 1, isTotal: false },
  { name: "(Specify)", rowCode: "04", indent: 2, isTotal: false },
  { name: "Adjusted balance at beginning of year", rowCode: "09", indent: 0, isTotal: true },
  { name: "Net income (loss) for the year", rowCode: "10", indent: 1, isTotal: false },
  { name: "Transfers from (to) Head Office", rowCode: "", indent: 1, isHeader: true },
  { name: "Advances (Returns)", rowCode: "20", indent: 2, isTotal: false },
  { name: "Expenses", rowCode: "21", indent: 2, isTotal: false },
  { name: "Premiums/Claims", rowCode: "22", indent: 2, isTotal: false },
  { name: "Other", rowCode: "23", indent: 2, isTotal: false },
  { name: "Subtotal", rowCode: "11", indent: 2, isTotal: true },
  { name: "Decrease (increase) in Reserves", rowCode: "12", indent: 1, isTotal: false },
  { name: "Net increase (decrease) in Head Office Account", rowCode: "15", indent: 1, isTotal: true },
  { name: "Balance at end of year", rowCode: "89", indent: 0, isTotal: true, isFinalTotal: true },
  // RESERVES Section
  { name: "RESERVES", rowCode: "", indent: 0, isSection: true, isHeader: true },
  { name: "Earthquake Reserves", rowCode: "", indent: 0, isHeader: true },
  { name: "Reserve Complement", rowCode: "90", indent: 1, isTotal: false },
  { name: "Premium Reserve", rowCode: "91", indent: 1, isTotal: false },
  { name: "Mortgage Reserve", rowCode: "95", indent: 0, isTotal: false },
  { name: "Nuclear Reserve", rowCode: "96", indent: 0, isTotal: false },
  { name: "General and Contingency Reserves", rowCode: "98", indent: 0, isTotal: false },
  { name: "Total Reserves", rowCode: "99", indent: 0, isTotal: true, isFinalTotal: true }
];

// Define column data
const columns: ColumnDefinition[] = [
  { id: "currentPeriod", label: "Current Period", colCode: "01" },
  { id: "priorPeriod", label: "Prior Period", colCode: "02" }
];

/**
 * Component for displaying Head Office Account and Reserves financial data.
 * Uses the common FinancialTable component with specific row and column definitions.
 */
const HeadOfficeAccountAndReservesTable: React.FC = () => {
  return (
    <FinancialTable 
      rows={headOfficeAccountAndReservesRows} 
      columns={columns} 
      sheetCode="2045"
    />
  );
};

export default React.memo(HeadOfficeAccountAndReservesTable);
