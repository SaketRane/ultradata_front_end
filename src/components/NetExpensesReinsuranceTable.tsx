
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const NetExpensesReinsuranceTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "REINSURANCE REVENUE", rowCode: "01", indent: 0, isTotal: false },
    { name: "REINSURANCE SERVICE EXPENSES", rowCode: "", indent: 0, isHeader: true },
    { name: "Claims and other directly attributable expenses", rowCode: "02", indent: 1, isTotal: false },
    { name: "Changes that relate to past service", rowCode: "03", indent: 1, isTotal: false },
    { name: "Other reinsurance service expenses", rowCode: "04", indent: 1, isTotal: false },
    { name: "Total reinsurance service expenses", rowCode: "05", indent: 0, isTotal: true },
    { name: "NET EXPENSES FROM REINSURANCE CONTRACTS HELD", rowCode: "06", indent: 0, isTotal: true, isFinalTotal: true }
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
      sheetCode="6760"
    />
  );
};

export default React.memo(NetExpensesReinsuranceTable);
