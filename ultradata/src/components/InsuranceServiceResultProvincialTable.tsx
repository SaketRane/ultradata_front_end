
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const InsuranceServiceResultProvincialTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "INSURANCE REVENUE", rowCode: "01", indent: 0, isTotal: true },
    { name: "INSURANCE SERVICE EXPENSES", rowCode: "02", indent: 0, isTotal: true },
    { name: "INSURANCE SERVICE RESULT", rowCode: "03", indent: 0, isTotal: true, isFinalTotal: true }
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
      sheetCode="6770"
    />
  );
};

export default React.memo(InsuranceServiceResultProvincialTable);
