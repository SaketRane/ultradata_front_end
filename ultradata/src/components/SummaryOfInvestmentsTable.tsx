import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const SummaryOfInvestmentsTable: React.FC = () => {
  const rows: RowDefinition[] = [
    { name: "Short Term Investments", rowCode: "010", indent: 0, isTotal: false },
    
    // Bonds and Debentures section
    { name: "Bonds and Debentures", rowCode: "", indent: 0, isHeader: true },
    { name: "Government - Federal", rowCode: "", indent: 0, isHeader: true },
    { name: "Investment Grade", rowCode: "110", indent: 1, isTotal: false },
    { name: "Below Investment Grade", rowCode: "115", indent: 1, isTotal: false },
    { name: "Government - Provincial", rowCode: "", indent: 0, isHeader: true },
    { name: "Investment Grade", rowCode: "120", indent: 1, isTotal: false },
    { name: "Below Investment Grade", rowCode: "130", indent: 1, isTotal: false },
    { name: "Municipal, Public Authority, Schools", rowCode: "", indent: 0, isHeader: true },
    { name: "Investment Grade", rowCode: "140", indent: 1, isTotal: false },
    { name: "Below Investment Grade", rowCode: "150", indent: 1, isTotal: false },
    { name: "Corporate - Public:", rowCode: "", indent: 0, isHeader: true },
    { name: "Investment Grade", rowCode: "160", indent: 1, isTotal: false },
    { name: "Below Investment Grade", rowCode: "170", indent: 1, isTotal: false },
    { name: "Corporate - Private:", rowCode: "", indent: 0, isHeader: true },
    { name: "Investment Grade", rowCode: "180", indent: 1, isTotal: false },
    { name: "Below Investment Grade", rowCode: "190", indent: 1, isTotal: false },
    { name: "Total Bonds and Debentures", rowCode: "199", indent: 0, isTotal: true },
    
    // Other investment types
    { name: "Mortgage Loans", rowCode: "210", indent: 0, isTotal: false },
    
    // Preferred Shares section
    { name: "Preferred Shares", rowCode: "", indent: 0, isHeader: true },
    { name: "Fixed Term", rowCode: "220", indent: 1, isTotal: false },
    { name: "Equity Preferred", rowCode: "230", indent: 1, isTotal: false },
    { name: "Total Preferred Shares", rowCode: "259", indent: 0, isTotal: true },
    
    // Other shares
    { name: "Total Common Shares", rowCode: "279", indent: 0, isTotal: true },
    { name: "Investment in Subsidiaries", rowCode: "289", indent: 0, isTotal: false },
    { name: "Total Shares", rowCode: "299", indent: 0, isTotal: true },
    
    // Final categories
    { name: "Other Loans", rowCode: "310", indent: 0, isTotal: false },
    { name: "Other Invested Assets", rowCode: "320", indent: 0, isTotal: false },
    { name: "Total Investments", rowCode: "899", indent: 0, isTotal: true, isFinalTotal: true },
    
    // Geographic breakdown
    { name: "Out of Canada", rowCode: "510", indent: 0, isTotal: false },
    { name: "Foreign Pay Securities", rowCode: "520", indent: 0, isTotal: false },
    
    // Individual Holdings section
    { name: "Individual Holdings:", rowCode: "", indent: 0, isHeader: true },
    { name: "Largest Exposure to an Entity or Connected Group", rowCode: "610", indent: 1, isTotal: false },
    { name: "2nd Largest Exposure to an Entity or Connected Group", rowCode: "620", indent: 1, isTotal: false },
    { name: "Largest Pooled Holding", rowCode: "630", indent: 1, isTotal: false },
    { name: "2nd Largest Pooled Holding", rowCode: "640", indent: 1, isTotal: false }
  ];

  const columns: ColumnDefinition[] = [
    { id: "fvtpl", label: "Fair Value Through Profit or Loss (FVTPL)", colCode: "05" },
    { id: "fvoci", label: "Fair Value Through Other Comprehensive Income (FVOCI)", colCode: "10" },
    { id: "fvHedges", label: "Fair Value Hedges (FV)", colCode: "15" },
    { id: "cashFlowHedges", label: "Cash Flow Hedges", colCode: "20" },
    { id: "amortizedCost", label: "Amortized Cost", colCode: "30" },
    { id: "balanceSheetValue", label: "Balance Sheet Value Col.", colCode: "35" },
    { id: "provisionsStageI", label: "Stage I", colCode: "40" },
    { id: "provisionsStageII", label: "Stage II", colCode: "45" },
    { id: "provisionsStageIII", label: "Stage III", colCode: "50" },
    { id: "provisionsTotal", label: "Total", colCode: "59" },
    { id: "impairedAmount", label: "Impaired Amount (Before Provisions)", colCode: "60" },
    { id: "marketValue", label: "Market Value of Column (30)", colCode: "65" },
    { id: "indexLinkedProducts", label: "Balance Sheet Value of Assets Used to Back Index Linked Products", colCode: "70" }
  ];

  // Create a secondary header for the ECL provisions
  const secondaryHeader = (
    <tr className="h-6 border-b">
      <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={6}></th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r bg-blue-50" colSpan={4}>
        Provisions including Expected Credit Loss (ECL)
      </th>
      <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={2}></th>
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
