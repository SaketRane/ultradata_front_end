
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const InsuranceServiceOperatingExpensesTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "Claims and Benefits", rowCode: "010", indent: 0, isTotal: false },
    { name: "Salaries and employee benefits", rowCode: "020", indent: 0, isTotal: false },
    { name: "Defined Benefit Pension Plan Expense", rowCode: "030", indent: 0, isTotal: false },
    { name: "Directors remuneration", rowCode: "040", indent: 0, isTotal: false },
    { name: "Agency (excluding commissions)", rowCode: "050", indent: 0, isTotal: false },
    { name: "Management fees", rowCode: "060", indent: 0, isTotal: false },
    { name: "Professional fees (other than legal)", rowCode: "070", indent: 0, isTotal: false },
    { name: "Legal fees", rowCode: "080", indent: 0, isTotal: false },
    { name: "Commissions", rowCode: "090", indent: 0, isTotal: false },
    { name: "Contingent Commissions", rowCode: "095", indent: 0, isTotal: false },
    { name: "Losses on onerous insurance contracts", rowCode: "100", indent: 0, isTotal: false },
    { name: "Depreciation and Amortization", rowCode: "110", indent: 0, isTotal: false },
    { name: "Amortization of Intangible Assets", rowCode: "120", indent: 0, isTotal: false },
    { name: "Impairment of goodwill and intangible assets", rowCode: "130", indent: 0, isTotal: false },
    { name: "Amortization and Impairment loss on Investment/Service Contracts", rowCode: "140", indent: 0, isTotal: false },
    { name: "Occupancy expenses (including rent, leasing and maintenance)", rowCode: "150", indent: 0, isTotal: false },
    { name: "Information technology", rowCode: "160", indent: 0, isTotal: false },
    { name: "Inspections and Investigations", rowCode: "170", indent: 0, isTotal: false },
    { name: "Home Office overhead", rowCode: "180", indent: 0, isTotal: false },
    { name: "Allowance", rowCode: "190", indent: 0, isTotal: false },
    { name: "Experience Rating Refunds", rowCode: "200", indent: 0, isTotal: false },
    { name: "Interest on debt", rowCode: "212", indent: 0, isTotal: false },
    { name: "Other interest expenses", rowCode: "214", indent: 0, isTotal: false },
    { name: "Other finance costs", rowCode: "216", indent: 0, isTotal: false },
    { name: "Other general expenses:", rowCode: "", indent: 0, isHeader: true },
    { name: "(Specify)", rowCode: "220", indent: 1, isTotal: false },
    { name: "(Specify)", rowCode: "230", indent: 1, isTotal: false },
    { name: "(Specify)", rowCode: "240", indent: 1, isTotal: false },
    { name: "Subtotal", rowCode: "299", indent: 0, isTotal: true },
    { name: "Amounts attributed to insurance acquisition cash flows", rowCode: "320", indent: 0, isTotal: false },
    { name: "Amortization of insurance acquisition cash flows", rowCode: "340", indent: 0, isTotal: false },
    { name: "Total", rowCode: "899", indent: 0, isTotal: true, isFinalTotal: true },
    { name: "Represented by:", rowCode: "", indent: 0, isHeader: true },
    { name: "Insurance service expenses", rowCode: "420", indent: 0, isTotal: false },
    { name: "General and operating expenses", rowCode: "440", indent: 0, isTotal: false },
    { name: "Total", rowCode: "499", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "currentPeriod", label: "Current Period", colCode: "01" },
    { id: "priorPeriod", label: "Prior Period", colCode: "03" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="8025"
    />
  );
};

export default React.memo(InsuranceServiceOperatingExpensesTable);
