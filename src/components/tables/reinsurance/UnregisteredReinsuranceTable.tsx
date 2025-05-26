
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const UnregisteredReinsuranceTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "Total Associated and Non-qualifying subsidiary", rowCode: "09", indent: 0, isTotal: false },
    { name: "Total Non-associated and Non-subsidiary", rowCode: "19", indent: 0, isTotal: false },
    { name: "TOTAL BUSINESS", rowCode: "29", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "allocationReinsurancePremiums", label: "Allocation of Reinsurance Premiums", colCode: "50" },
    { id: "amountsRecoverableIncurredClaims", label: "Amounts Recoverable from Reinsurers for Incurred Claims", colCode: "52" },
    { id: "effectChangesNonPerformanceRisk", label: "Effect of changes in non-performance risk of reinsurers", colCode: "54" },
    { id: "netExpensesTotal", label: "Total", colCode: "59" },
    { id: "assetsRemainingCoverage", label: "Assets for Remaining Coverage", colCode: "62" },
    { id: "assetsIncurredClaimsUnderPAA", label: "Under PAA", colCode: "72" },
    { id: "assetsIncurredClaimsNotUnderPAA", label: "Not under PAA", colCode: "74" },
    { id: "reinsuranceContractHeldBalancesTotal", label: "Reinsurance Contract Held Balances Total", colCode: "79" },
    { id: "reinsuranceReceivable", label: "Reinsurance Receivable", colCode: "24" },
    { id: "reinsurancePayable", label: "Reinsurance Payable", colCode: "26" },
    { id: "netReceivable", label: "Net Receivable", colCode: "28" },
    { id: "nonOwnedDepositsRSA", label: "Non-owned deposits - RSA", colCode: "32" },
    { id: "otherAcceptableNonOwnedDeposits", label: "Other acceptable non-owned deposits", colCode: "34" },
    { id: "reinsuranceCollateralFundsHeld", label: "Reinsurance Collateral - Funds Held", colCode: "36" },
    { id: "lettersOfCredit", label: "Letters of Credit", colCode: "38" },
    { id: "reinsuranceCollateralTotal", label: "Total", colCode: "39" }
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
