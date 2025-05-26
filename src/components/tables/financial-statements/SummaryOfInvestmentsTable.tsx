
import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const SummaryOfInvestmentsTable: React.FC = () => {
  const columns: ColumnDefinition[] = [
    { id: "fvtpl", label: "Fair Value Through Profit or Loss (FVTPL)", colCode: "05" },
    { id: "fvoci", label: "Fair Value Through Other Comprehensive Income (FVOCI)", colCode: "10" },
    { id: "fv_hedges", label: "Fair Value Hedges (FV)", colCode: "15" },
    { id: "cash_flow_hedges", label: "Cash Flow Hedges", colCode: "20" },
    { id: "amortized_cost", label: "Amortized Cost", colCode: "30" },
    { id: "balance_sheet_value", label: "Balance Sheet Value Col.", colCode: "35" },
    { id: "ecl_stage_i", label: "Stage I", colCode: "40" },
    { id: "ecl_stage_ii", label: "Stage II", colCode: "45" },
    { id: "ecl_stage_iii", label: "Stage III", colCode: "50" },
    { id: "ecl_total", label: "Total", colCode: "59" },
    { id: "impaired_amount", label: "Impaired Amount (Before Provisions)", colCode: "60" },
    { id: "market_value", label: "Market Value of Column (30)", colCode: "65" },
    { id: "index_linked", label: "Balance Sheet Value of Assets Used to Back Index Linked Products", colCode: "70" }
  ];

  const rows: RowDefinition[] = [
    { name: "Short Term Investments", rowCode: "010", indent: 0 },
    
    // Bonds and Debentures section
    { name: "Bonds and Debentures", rowCode: "", indent: 0, isHeader: true },
    { name: "Government - Federal", rowCode: "", indent: 1, isHeader: true },
    { name: "Investment Grade", rowCode: "110", indent: 2 },
    { name: "Below Investment Grade", rowCode: "115", indent: 2 },
    { name: "Government - Provincial", rowCode: "", indent: 1, isHeader: true },
    { name: "Investment Grade", rowCode: "120", indent: 2 },
    { name: "Below Investment Grade", rowCode: "130", indent: 2 },
    { name: "Municipal, Public Authority, Schools", rowCode: "", indent: 1, isHeader: true },
    { name: "Investment Grade", rowCode: "140", indent: 2 },
    { name: "Below Investment Grade", rowCode: "150", indent: 2 },
    { name: "Corporate - Public:", rowCode: "", indent: 1, isHeader: true },
    { name: "Investment Grade", rowCode: "160", indent: 2 },
    { name: "Below Investment Grade", rowCode: "170", indent: 2 },
    { name: "Corporate - Private:", rowCode: "", indent: 1, isHeader: true },
    { name: "Investment Grade", rowCode: "180", indent: 2 },
    { name: "Below Investment Grade", rowCode: "190", indent: 2 },
    { name: "Total Bonds and Debentures", rowCode: "199", indent: 0, isTotal: true },
    
    { name: "Mortgage Loans", rowCode: "210", indent: 0 },
    
    // Preferred Shares section
    { name: "Preferred Shares", rowCode: "", indent: 0, isHeader: true },
    { name: "Fixed Term", rowCode: "220", indent: 1 },
    { name: "Equity Preferred", rowCode: "230", indent: 1 },
    { name: "Total Preferred Shares", rowCode: "259", indent: 0, isTotal: true },
    
    { name: "Total Common Shares", rowCode: "279", indent: 0, isTotal: true },
    { name: "Investment in Subsidiaries", rowCode: "289", indent: 0 },
    { name: "Total Shares", rowCode: "299", indent: 0, isTotal: true },
    
    { name: "Other Loans", rowCode: "310", indent: 0 },
    { name: "Other Invested Assets", rowCode: "320", indent: 0 },
    { name: "Total Investments", rowCode: "899", indent: 0, isFinalTotal: true },
    
    // Geographic breakdown
    { name: "Out of Canada", rowCode: "510", indent: 0 },
    { name: "Foreign Pay Securities", rowCode: "520", indent: 0 },
    
    // Individual Holdings section
    { name: "Individual Holdings:", rowCode: "", indent: 0, isHeader: true },
    { name: "Largest Exposure to an Entity or Connected Group", rowCode: "610", indent: 1 },
    { name: "2nd Largest Exposure to an Entity or Connected Group", rowCode: "620", indent: 2 },
    { name: "Largest Pooled Holding", rowCode: "630", indent: 1 },
    { name: "2nd Largest Pooled Holding", rowCode: "640", indent: 2 }
  ];

  // Create secondary header for ECL provisions
  const secondaryHeader = (
    <tr className="h-6 border-b">
      <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={4}>
        Provisions including Expected Credit Loss (ECL)
      </th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r-0"></th>
    </tr>
  );

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="4008"
      secondaryHeader={secondaryHeader}
    />
  );
};

export default React.memo(SummaryOfInvestmentsTable);
