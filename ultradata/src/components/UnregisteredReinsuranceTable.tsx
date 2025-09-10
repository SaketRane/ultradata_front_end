
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const UnregisteredReinsuranceTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "CEDED REINSURANCE", rowCode: "", indent: 0, isHeader: true },
    { name: "Property", rowCode: "01", indent: 1, isTotal: false },
    { name: "Automobile", rowCode: "02", indent: 1, isTotal: false },
    { name: "Liability", rowCode: "03", indent: 1, isTotal: false },
    { name: "Accident & Sickness", rowCode: "04", indent: 1, isTotal: false },
    { name: "Aircraft", rowCode: "05", indent: 1, isTotal: false },
    { name: "Boiler & Machinery", rowCode: "06", indent: 1, isTotal: false },
    { name: "Credit Protection", rowCode: "07", indent: 1, isTotal: false },
    { name: "Other", rowCode: "08", indent: 1, isTotal: false },
    { name: "Total Ceded", rowCode: "09", indent: 0, isTotal: true },
    { name: "ASSUMED REINSURANCE", rowCode: "", indent: 0, isHeader: true },
    { name: "Property", rowCode: "10", indent: 1, isTotal: false },
    { name: "Automobile", rowCode: "11", indent: 1, isTotal: false },
    { name: "Liability", rowCode: "12", indent: 1, isTotal: false },
    { name: "Accident & Sickness", rowCode: "13", indent: 1, isTotal: false },
    { name: "Aircraft", rowCode: "14", indent: 1, isTotal: false },
    { name: "Boiler & Machinery", rowCode: "15", indent: 1, isTotal: false },
    { name: "Credit Protection", rowCode: "16", indent: 1, isTotal: false },
    { name: "Other", rowCode: "17", indent: 1, isTotal: false },
    { name: "Total Assumed", rowCode: "18", indent: 0, isTotal: true },
    { name: "NET UNREGISTERED REINSURANCE", rowCode: "19", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "premiumsWritten", label: "Premiums Written", colCode: "01" },
    { id: "premiumsEarned", label: "Premiums Earned", colCode: "02" },
    { id: "claimsIncurred", label: "Claims Incurred", colCode: "03" },
    { id: "commissions", label: "Commissions", colCode: "04" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="7060"
    />
  );
};

export default React.memo(UnregisteredReinsuranceTable);
