
import React, { useMemo } from "react";
import FinancialTable from "@/components/ui/financial-table";
import { TableRow, TableHead } from "@/components/ui/table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

interface UnregisteredReinsuranceTableProps {
  year?: string;
}

const UnregisteredReinsuranceTable: React.FC<UnregisteredReinsuranceTableProps> = ({ year }) => {
  console.log('UnregisteredReinsuranceTable rendering with year:', year);
  
  // Define table rows based on year
  const rows: RowDefinition[] = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    console.log('UnregisteredReinsuranceTable - isIFRS17Year:', isIFRS17Year);
    
    if (isIFRS17Year) {
      // For 2023+: New structure with CEDED and ASSUMED sections
      return [
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
    } else {
      // For 2015-2022: Original structure
      return [
        { name: "Total Associated and Non-qualifying subsidiary", rowCode: "09", indent: 0, isTotal: false },
        { name: "Total Non-associated and Non-subsidiary", rowCode: "19", indent: 0, isTotal: false },
        { name: "TOTAL BUSINESS", rowCode: "29", indent: 0, isTotal: true, isFinalTotal: true }
      ];
    }
  }, [year]);

  // Define column data based on year
  const columns: ColumnDefinition[] = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023+: New simplified columns
      return [
        { id: "premiumsWritten", label: "Premiums Written", colCode: "01" },
        { id: "premiumsEarned", label: "Premiums Earned", colCode: "02" },
        { id: "claimsIncurred", label: "Claims Incurred", colCode: "03" },
        { id: "commissions", label: "Commissions", colCode: "04" }
      ];
    } else {
      // For 2015-2022: Original complex columns
      return [
        { id: "reinsPremiumsCeded", label: "Reinsurance Premiums Ceded", colCode: "18" },
        { id: "uepCeded", label: "UEP ceded to assuming insurer", colCode: "20" },
        { id: "outstandingLosses", label: "Outstanding losses recoverable from assuming insurer", colCode: "22" },
        { id: "reinsReceivable", label: "Reinsurance Receivable", colCode: "24" },
        { id: "reinsPayable", label: "Reinsurance Payable", colCode: "26" },
        { id: "netReceivable", label: "Net Receivable", colCode: "28" },
        { id: "agingReinsAsset", label: "Aging of Reinsurance Asset", colCode: "30" },
        { id: "nonOwnedDepositsRSA", label: "Non-owned deposits - RSA", colCode: "32" },
        { id: "otherAcceptableDeposits", label: "Other acceptable non-owned deposits", colCode: "34" },
        { id: "reinsCollateralFundsHeld", label: "Reinsurance Collateral - Funds Held", colCode: "36" },
        { id: "lettersOfCredit", label: "Letters of Credit", colCode: "38" },
        { id: "collateralTotal", label: "Total", colCode: "39" },
        { id: "margin20Percent", label: "20% Margin on UEP and outstanding losses recoverable", colCode: "40" },
        { id: "recoverablesExcess", label: "Recoverables in excess of acceptable collateral", colCode: "42" },
        { id: "collateralExcess", label: "Acceptable collateral in excess of recoverables", colCode: "44" },
        { id: "marginRequired", label: "Margin Required", colCode: "46" },
        { id: "excessCollateral", label: "Excess Collateral", colCode: "48" }
      ];
    }
  }, [year]);

  // Secondary header for the table showing column groupings (only for 2015-2022)
  const secondaryHeader = useMemo(() => {
    const isIFRS17Year = year && parseInt(year) >= 2023;
    
    if (isIFRS17Year) {
      // For 2023+: No secondary header needed
      return null;
    } else {
      // For 2015-2022: Only show secondary headers for grouped sections
      return (
        <TableRow className="h-6">
          <TableHead className="text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
          <TableHead className="text-xs font-semibold text-center py-0 px-2 border-r"></TableHead>
          <TableHead className="text-xs font-semibold text-center py-0 px-2 border-r"></TableHead>
          <TableHead className="text-xs font-semibold text-center py-0 px-2 border-r"></TableHead>
          <TableHead colSpan={4} className="text-xs font-semibold text-center py-0 px-2 border-r">
            Receivables
          </TableHead>
          <TableHead colSpan={5} className="text-xs font-semibold text-center py-0 px-2 border-r">
            Reinsurance Collateral
          </TableHead>
          <TableHead colSpan={5} className="text-xs font-semibold text-center py-0 px-2">
            Calculations for MCT purposes (where positive)
          </TableHead>
        </TableRow>
      );
    }
  }, [year]);

  console.log('UnregisteredReinsuranceTable - rows:', rows.length, 'columns:', columns.length);
  
  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="7060"
      secondaryHeader={secondaryHeader}
      maxHeight="85vh"
    />
  );
};

export default React.memo(UnregisteredReinsuranceTable);
