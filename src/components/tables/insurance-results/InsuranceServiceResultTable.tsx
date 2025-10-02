import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const InsuranceServiceResultTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "TOTAL", rowCode: "599", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "policiesInForce", label: "Number of Policies in Force", colCode: "02" },
    { id: "directClaims", label: "Number of Direct Claims Reported During the Current Fiscal Year", colCode: "04" },
    { id: "insuranceRevenueGMM", label: "Contracts Measured under GMM", colCode: "06" },
    { id: "insuranceRevenuePAA", label: "Contracts Measured under PAA", colCode: "14" },
    { id: "insuranceRevenueTotal", label: "Total", colCode: "19" },
    { id: "incurredClaims", label: "Incurred Claims and Other Insurance Service Expenses", colCode: "22" },
    { id: "amortizationAcquisition", label: "Amortization of Insurance Acquisition Cash Flows", colCode: "24" },
    { id: "lossesOnerous", label: "Losses and Reversal of Losses on Onerous Contracts", colCode: "26" },
    { id: "adjustmentsLiabilities", label: "Adjustments to Liabilities for Incurred Claims", colCode: "28" },
    { id: "insuranceExpensesTotal", label: "Total", colCode: "29" },
    { id: "reinsurancePremiums", label: "Allocation of reinsurance premiums", colCode: "32" },
    { id: "amountsRecoverable", label: "Amounts recoverable from reinsurers for incurred claims", colCode: "34" },
    { id: "nonPerformanceRisk", label: "Effect of changes in non-performance risk of reinsurers", colCode: "36" },
    { id: "reinsuranceTotal", label: "Total", colCode: "39" },
    { id: "insuranceServiceResult", label: "Insurance Service Result", colCode: "45" }
  ];

  // Create secondary headers for the main sections
  const secondaryHeader = (
    <tr className="h-6 border-b">
      <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={2}></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r bg-blue-50" colSpan={3}>
        Insurance Revenue
      </th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r bg-green-50" colSpan={5}>
        Insurance Service Expenses
      </th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r bg-orange-50" colSpan={4}>
        Net Expenses from Reinsurance Contracts Held
      </th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={1}></th>
    </tr>
  );

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="6025"
      secondaryHeader={secondaryHeader}
    />
  );
};

export default React.memo(InsuranceServiceResultTable);
