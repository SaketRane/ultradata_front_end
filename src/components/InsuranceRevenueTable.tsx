
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const InsuranceRevenueTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "DIRECT BUSINESS", rowCode: "", indent: 0, isHeader: true },
    { name: "Property", rowCode: "01", indent: 1, isTotal: false },
    { name: "Automobile", rowCode: "02", indent: 1, isTotal: false },
    { name: "Liability", rowCode: "03", indent: 1, isTotal: false },
    { name: "Accident & Sickness", rowCode: "04", indent: 1, isTotal: false },
    { name: "Aircraft", rowCode: "05", indent: 1, isTotal: false },
    { name: "Boiler & Machinery", rowCode: "06", indent: 1, isTotal: false },
    { name: "Credit Protection", rowCode: "07", indent: 1, isTotal: false },
    { name: "Other", rowCode: "08", indent: 1, isTotal: false },
    { name: "Subtotal - Direct", rowCode: "09", indent: 0, isTotal: true },
    { name: "ASSUMED BUSINESS", rowCode: "", indent: 0, isHeader: true },
    { name: "Canadian", rowCode: "10", indent: 1, isTotal: false },
    { name: "Foreign", rowCode: "11", indent: 1, isTotal: false },
    { name: "Subtotal - Assumed", rowCode: "12", indent: 0, isTotal: true },
    { name: "TOTAL INSURANCE REVENUE", rowCode: "13", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "bc", label: "BC", colCode: "01" },
    { id: "ab", label: "AB", colCode: "02" },
    { id: "sk", label: "SK", colCode: "03" },
    { id: "mb", label: "MB", colCode: "04" },
    { id: "on", label: "ON", colCode: "05" },
    { id: "qc", label: "QC", colCode: "06" },
    { id: "nb", label: "NB", colCode: "07" },
    { id: "ns", label: "NS", colCode: "08" },
    { id: "pe", label: "PE", colCode: "09" },
    { id: "nl", label: "NL", colCode: "10" },
    { id: "yt", label: "YT", colCode: "11" },
    { id: "nt", label: "NT", colCode: "12" },
    { id: "nu", label: "NU", colCode: "13" },
    { id: "total", label: "Total", colCode: "14" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="6740"
    />
  );
};

export default React.memo(InsuranceRevenueTable);
