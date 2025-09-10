
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const LiabilitiesAndEquityTable: React.FC = () => {
  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriodRestated", label: "Prior Period Restated", colCode: "03" },
    { id: "openingPriorPeriodRestated", label: "Opening Prior Period Restated", colCode: "05" }
  ];

  const rows: RowDefinition[] = [
    // LIABILITIES
    { name: "LIABILITIES:", rowCode: "", indent: 0, isHeader: true },
    { name: "Provisions, Accruals and Other Liabilities", rowCode: "030", indent: 1, isTotal: false },
    { name: "Liabilities held for sale", rowCode: "040", indent: 1, isTotal: false },
    { name: "Current Tax Liabilities", rowCode: "050", indent: 1, isTotal: false },
    { name: "Encumbrances on Real Estate & Mortgage Loans", rowCode: "060", indent: 1, isTotal: false },
    { name: "Financial Instrument Derivative Liabilities", rowCode: "070", indent: 1, isTotal: false },
    { name: "Insurance Contract Liabilities", rowCode: "", indent: 1, isTotal: false },
    { name: "Insurance Contract Liabilities – Excluding Segregated Funds", rowCode: "150", indent: 2, isTotal: false },
    { name: "Insurance Contract Liabilities - Segregated Fund Guarantees", rowCode: "155", indent: 2, isTotal: false },
    { name: "Insurance Contract Liabilities – Segregated Funds Net Liabilities", rowCode: "160", indent: 2, isTotal: false },
    { name: "Total Insurance Contract Liabilities", rowCode: "169", indent: 1, isTotal: true },
    { name: "Reinsurance Contract Held Liabilities", rowCode: "", indent: 1, isTotal: false },
    { name: "Reinsurance Contract Held Liabilities – Excluding Segregated Funds", rowCode: "170", indent: 2, isTotal: false },
    { name: "Reinsurance Contract Held Liabilities - Segregated Fund Guarantees", rowCode: "175", indent: 2, isTotal: false },
    { name: "Reinsurance Contract Held Liabilities – Segregated Funds Net Liabilities", rowCode: "180", indent: 2, isTotal: false },
    { name: "Total Reinsurance Contract Held Liabilities", rowCode: "189", indent: 1, isTotal: true },
    { name: "Trust and Banking Deposits", rowCode: "080", indent: 1, isTotal: false },
    { name: "Other Debt", rowCode: "090", indent: 1, isTotal: false },
    { name: "Defined Benefit Pension Plan", rowCode: "110", indent: 1, isTotal: false },
    { name: "Employment Benefits (not including amounts in line above)", rowCode: "120", indent: 1, isTotal: false },
    { name: "Subordinated Debt", rowCode: "130", indent: 1, isTotal: false },
    { name: "Preferred shares - Debt", rowCode: "140", indent: 1, isTotal: false },
    { name: "Deferred Tax Liabilities", rowCode: "100", indent: 1, isTotal: false },
    { name: "Investment Contract Liabilities", rowCode: "", indent: 1, isTotal: false },
    { name: "Investment Contract Liabilities – Excluding Segregated Funds Net Liabilities", rowCode: "190", indent: 2, isTotal: false },
    { name: "Investment Contract Liabilities – Segregated Funds Net Liabilities", rowCode: "195", indent: 2, isTotal: false },
    { name: "Total Investment Contract Liabilities", rowCode: "199", indent: 1, isTotal: true },
    { name: "Liabilities before Policyholders' Liabilities", rowCode: "299", indent: 0, isTotal: true },
    { name: "Policyholders' Liabilities", rowCode: "", indent: 0, isTotal: false },
    { name: "Residual Interest (Non-Stock)", rowCode: "310", indent: 1, isTotal: false },
    { name: "Participating Account", rowCode: "320", indent: 1, isTotal: false },
    { name: "Non-Participating Account (Non-Stock)", rowCode: "330", indent: 1, isTotal: false },
    { name: "Total Policyholders' Liabilities", rowCode: "359", indent: 1, isTotal: true },
    { name: "TOTAL LIABILITIES", rowCode: "399", indent: 0, isTotal: true, isFinalTotal: true },
    
    // EQUITY
    { name: "EQUITY", rowCode: "", indent: 0, isHeader: true },
    { name: "CANADIAN INSURERS ONLY:", rowCode: "", indent: 0, isHeader: true },
    { name: "Policyholders' Equity", rowCode: "", indent: 0, isTotal: false },
    { name: "Residual Interest (Non-Stock)", rowCode: "410", indent: 1, isTotal: false },
    { name: "Participating Account", rowCode: "420", indent: 1, isTotal: false },
    { name: "Participating Account - Accumulated OCI (Loss)", rowCode: "430", indent: 1, isTotal: false },
    { name: "Non-Participating Account", rowCode: "440", indent: 1, isTotal: false },
    { name: "Non-Participating Account - Accumulated OCI (Loss)", rowCode: "450", indent: 1, isTotal: false },
    { name: "Total Policyholders' Equity", rowCode: "499", indent: 0, isTotal: true },
    { name: "Shareholders' Equity", rowCode: "", indent: 0, isTotal: false },
    { name: "Common Shares", rowCode: "510", indent: 1, isTotal: false },
    { name: "Preferred Shares", rowCode: "520", indent: 1, isTotal: false },
    { name: "Contributed Surplus", rowCode: "530", indent: 1, isTotal: false },
    { name: "Other Capital", rowCode: "540", indent: 1, isTotal: false },
    { name: "Retained Earnings", rowCode: "550", indent: 1, isTotal: false },
    { name: "Nuclear and Other Reserves", rowCode: "560", indent: 1, isTotal: false },
    { name: "Accumulated Other Comprehensive Income (Loss)", rowCode: "570", indent: 1, isTotal: false },
    { name: "Total Shareholders' Equity", rowCode: "599", indent: 0, isTotal: true },
    { name: "Non-controlling Interests", rowCode: "620", indent: 0, isTotal: false },
    { name: "Total Equity", rowCode: "699", indent: 0, isTotal: true },
    { name: "TOTAL LIABILITIES AND EQUITY", rowCode: "799", indent: 0, isTotal: true, isFinalTotal: true },
    
    // FOREIGN INSURERS SECTION
    { name: "FOREIGN INSURERS ONLY:", rowCode: "", indent: 0, isHeader: true },
    { name: "Head Office Account, Reserves & AOCI", rowCode: "", indent: 0, isTotal: false },
    { name: "Head Office Account", rowCode: "810", indent: 1, isTotal: false },
    { name: "Reserves", rowCode: "820", indent: 1, isTotal: false },
    { name: "(Specify)", rowCode: "830", indent: 1, isTotal: false },
    { name: "Accumulated Other Comprehensive Income (Loss)", rowCode: "840", indent: 1, isTotal: false },
    { name: "Total Head Office Account, Reserves & AOCI", rowCode: "899", indent: 0, isTotal: true },
    { name: "TOTAL LIABILITIES, EQUITY, HEAD OFFICE ACCOUNT, RESERVES & AOCI", rowCode: "999", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="2011"
    />
  );
};

export default React.memo(LiabilitiesAndEquityTable);
