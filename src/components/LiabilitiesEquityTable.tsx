import React from "react";
import FinancialTable, { RowDefinition, ColumnDefinition } from "@/components/ui/financial-table";

// Define table rows with their codes
const liabilitiesTableRows: RowDefinition[] = [
  { name: "LIABILITIES", rowCode: "", indent: 0, isHeader: true, isSection: true, hasVested: false },
  { name: "Overdrafts", rowCode: "01", indent: 1, isTotal: false, hasVested: false },
  { name: "Borrowed Money and Accrued Interest", rowCode: "02", indent: 1, isTotal: false, hasVested: false },
  { name: "Payables:", rowCode: "", indent: 1, isHeader: true, hasVested: false },
  { name: "Agents and Brokers", rowCode: "03", indent: 2, isTotal: false, hasVested: false },
  { name: "Policyholders", rowCode: "04", indent: 2, isTotal: false, hasVested: false },
  { name: "Other Insurers", rowCode: "05", indent: 2, isTotal: false, hasVested: false },
  { name: "Subsidiaries, Associates & Joint Ventures/Affiliates", rowCode: "06", indent: 2, isTotal: false, hasVested: false },
  { name: "Expenses due and accrued", rowCode: "07", indent: 1, isTotal: false, hasVested: false },
  { name: "Other Taxes due and accrued", rowCode: "09", indent: 1, isTotal: false, hasVested: false },
  { name: "Policyholder Dividends and Rating Adjustments", rowCode: "10", indent: 1, isTotal: false, hasVested: false },
  { name: "Encumbrances on Real Estate", rowCode: "11", indent: 1, isTotal: false, hasVested: false },
  { name: "Unearned Premiums", rowCode: "12", indent: 1, isTotal: false, hasVested: false },
  { name: "Unpaid Claims and Adjustment Expenses", rowCode: "13", indent: 1, isTotal: false, hasVested: false },
  { name: "Unearned Commissions", rowCode: "14", indent: 1, isTotal: false, hasVested: false },
  { name: "Ceded Deferred Premium Taxes", rowCode: "20", indent: 1, isTotal: false, hasVested: false },
  { name: "Ceded Deferred Insurance Operations Expenses", rowCode: "34", indent: 1, isTotal: false, hasVested: false },
  { name: "Premium Deficiency", rowCode: "15", indent: 1, isTotal: false, hasVested: false },
  { name: "Liabilities held for sale", rowCode: "17", indent: 1, isTotal: false, hasVested: false },
  { name: "Current Tax Liabilities", rowCode: "18", indent: 1, isTotal: false, hasVested: false },
  { name: "Deferred Tax Liabilities", rowCode: "21", indent: 1, isTotal: false, hasVested: false },
  { name: "Self-Insured Retention (SIR) portion of unpaid claims", rowCode: "22", indent: 1, isTotal: false, hasVested: false },
  { name: "Defined Benefit Pension Plan", rowCode: "23", indent: 1, isTotal: false, hasVested: false },
  { name: "Employment Benefits (not including amounts on line 23 above)", rowCode: "24", indent: 1, isTotal: false, hasVested: false },
  { name: "Subordinated Debt", rowCode: "25", indent: 1, isTotal: false, hasVested: false },
  { name: "Preferred Shares - Debt", rowCode: "26", indent: 1, isTotal: false, hasVested: false },
  { name: "Provisions and Other Liabilities", rowCode: "28", indent: 1, isTotal: false, hasVested: false },
  { name: "Total Liabilities", rowCode: "29", indent: 0, isTotal: true, hasVested: false },
  { name: "CANADIAN INSURERS ONLY:", rowCode: "", indent: 0, isHeader: true, isSection: true, hasVested: false },
  { name: "EQUITY", rowCode: "", indent: 0, isHeader: true, isSection: true, hasVested: false },
  { name: "Shares issued and paid", rowCode: "", indent: 1, isHeader: true, hasVested: false },
  { name: "Common", rowCode: "41", indent: 2, isTotal: false, hasVested: false },
  { name: "Preferred", rowCode: "33", indent: 2, isTotal: false, hasVested: false },
  { name: "Contributed Surplus", rowCode: "42", indent: 1, isTotal: false, hasVested: false },
  { name: "(Specify)", rowCode: "43", indent: 1, isTotal: false, hasVested: false },
  { name: "Retained Earnings", rowCode: "44", indent: 1, isTotal: false, hasVested: false },
  { name: "Reserves", rowCode: "45", indent: 1, isTotal: false, hasVested: false },
  { name: "Accumulated Other Comprehensive Income (Loss)", rowCode: "47", indent: 1, isTotal: false, hasVested: false },
  { name: "Total Policyholders/Shareholders' Equity", rowCode: "59", indent: 0, isTotal: true, hasVested: false },
  { name: "Non-controlling Interests", rowCode: "48", indent: 1, isTotal: false, hasVested: false },
  { name: "Total Equity", rowCode: "49", indent: 0, isTotal: true, hasVested: false },
  { name: "TOTAL LIABILITIES AND EQUITY", rowCode: "89", indent: 0, isTotal: true, isFinalTotal: true, hasVested: false },
  { name: "FOREIGN INSURERS ONLY:", rowCode: "", indent: 0, isHeader: true, isSection: true, hasVested: false },
  { name: "HEAD OFFICE ACCOUNT, RESERVES & AOCI", rowCode: "", indent: 0, isHeader: true, isSection: true, hasVested: false },
  { name: "Head Office Account", rowCode: "51", indent: 1, isTotal: false, hasVested: false },
  { name: "(Specify)", rowCode: "53", indent: 1, isTotal: false, hasVested: false },
  { name: "Reserves", rowCode: "55", indent: 1, isTotal: false, hasVested: false },
  { name: "Accumulated Other Comprehensive Income (Loss)", rowCode: "56", indent: 1, isTotal: false, hasVested: false },
  { name: "Total Head Office Account, Reserves & AOCI", rowCode: "69", indent: 0, isTotal: true, hasVested: false },
  { name: "TOTAL LIABILITIES, HEAD OFFICE ACCOUNT, RESERVES & AOCI", rowCode: "79", indent: 0, isTotal: true, isFinalTotal: true, hasVested: false }
];

// Define column data
const columns: ColumnDefinition[] = [
  { id: "currentTotal", label: "Current Period", colCode: "01" },
  { id: "priorTotal", label: "Prior Period", colCode: "03" },
  { id: "openingTotal", label: "Opening Prior Period Restated", colCode: "05" }
];

const LiabilitiesEquityTable: React.FC = () => {
  return (
    <FinancialTable 
      rows={liabilitiesTableRows} 
      columns={columns} 
      sheetCode="2020"
    />
  );
};

export default LiabilitiesEquityTable;
