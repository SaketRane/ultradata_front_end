import React from 'react';
import FinancialTable from '@/components/ui/financial-table';
import { RowDefinition, ColumnDefinition } from '@/types/financial';
import { TableRow, TableHead } from '@/components/ui/table';

const SummaryOfInvestmentsTable2015: React.FC = () => {
  const rows: RowDefinition[] = [
    // Aggregate Holdings section
    { name: "Aggregate Holdings:", rowCode: "", indent: 0, isHeader: true, isBold: true },
    { name: "Short Term Investments (1 year or less)", rowCode: "01", indent: 1, isTotal: false },
    { name: "Bonds and Debentures (1 year or less)", rowCode: "06", indent: 1, isTotal: false },
    { name: "Bonds and Debentures > 1 year and ≤ 5 years", rowCode: "02", indent: 1, isTotal: false },
    { name: "Bonds and Debentures > 5 years", rowCode: "05", indent: 1, isTotal: false },
    { name: "Mortgage Loans", rowCode: "", indent: 1, isHeader: true },
    { name: "- ≤ 80% Loan to Value Ratio", rowCode: "03", indent: 2, isTotal: false },
    { name: "- Other", rowCode: "04", indent: 2, isTotal: false },
    { name: "Preferred Shares", rowCode: "", indent: 1, isHeader: true },
    { name: "- Debt", rowCode: "10", indent: 2, isTotal: false },
    { name: "- Equity", rowCode: "11", indent: 2, isTotal: false },
    { name: "Common Shares", rowCode: "15", indent: 1, isTotal: false },
    { name: "Investment Properties", rowCode: "20", indent: 1, isTotal: false, hasLimitedColumns: true },
    { name: "Other Loans and Invested Assets", rowCode: "30", indent: 1, isTotal: false },
    { name: "Pooled Funds - items not captured in above rows", rowCode: "32", indent: 1, isTotal: false },
    { name: "Deduct: Pooled Funds accounted using the Equity Method", rowCode: "34", indent: 1, isTotal: false },
    { name: "Total Investments", rowCode: "39", indent: 1, isTotal: true, isBold: true },
    
    // Additional information section
    { name: "Out of Canada", rowCode: "40", indent: 1, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
    { name: "Foreign Pay Securities", rowCode: "41", indent: 1, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
    
    // Individual Holdings section
    { name: "Individual Holdings:", rowCode: "", indent: 0, isHeader: true, isBold: true },
    { name: "Largest Exposure to an Entity or Connected Group", rowCode: "50", indent: 1, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
    { name: "2nd Largest Exposure to an Entity or Connected Group", rowCode: "51", indent: 2, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
    { name: "Largest Pooled Holding", rowCode: "60", indent: 1, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true },
    { name: "2nd Largest Pooled Holding", rowCode: "61", indent: 2, isTotal: false, hasLimitedColumns: true, balanceSheetOnly: true }
  ];

  const columns: ColumnDefinition[] = [
    { id: "fvtpl", label: "Fair Value Through Profit or Loss (FVTPL)", colCode: "01" },
    { id: "fvoci", label: "Fair Value Through Other Comprehensive Income (FVOCI)", colCode: "03" },
    { id: "hedges", label: "Hedges", colCode: "05" },
    { id: "fvOption", label: "FV Option/ Investment Properties Fair Value", colCode: "07" },
    { id: "amortizedCost", label: "Amortized Cost", colCode: "09" },
    { id: "balanceSheet", label: "Balance Sheet", colCode: "12" },
    { id: "pooledFunds", label: "Pooled Funds", colCode: "13" },
    { id: "realizedGains", label: "Realized Gains(Losses)", colCode: "15" },
    { id: "income", label: "Income", colCode: "16" },
    { id: "gainLossFVOption", label: "Gain/(Loss) from FV Option", colCode: "19" }
  ];

  // Create a secondary header for the Fair Value grouping
  const secondaryHeader = (
    <TableRow className="h-6">
      <TableHead className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></TableHead>
      <TableHead colSpan={4} className="text-xs font-semibold text-center py-0 px-1 border-r bg-blue-50/60">
        Fair Value
      </TableHead>
      <TableHead colSpan={6} className="text-xs font-semibold text-center py-0 px-1"></TableHead>
    </TableRow>
  );

  return (
    <FinancialTable
      rows={rows}
      columns={columns}
      sheetCode="4007"
      secondaryHeader={secondaryHeader}
    />
  );
};

export default React.memo(SummaryOfInvestmentsTable2015);
