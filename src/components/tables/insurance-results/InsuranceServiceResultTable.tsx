import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const InsuranceServiceResultTable: React.FC = () => {
  const rows: RowDefinition[] = [
    // Property section
    { name: "Property", rowCode: "", indent: 0, isHeader: true },
    { name: "Personal excluding Home and Product Warranty", rowCode: "010", indent: 1, isTotal: false },
    { name: "Home Warranty", rowCode: "020", indent: 1, isTotal: false },
    { name: "Product Warranty", rowCode: "030", indent: 1, isTotal: false },
    { name: "Subtotal - Personal", rowCode: "039", indent: 0, isTotal: true },
    { name: "Commercial", rowCode: "050", indent: 1, isTotal: false },
    { name: "Property - total", rowCode: "059", indent: 0, isTotal: true },
    
    // Aircraft
    { name: "Aircraft", rowCode: "070", indent: 0, isTotal: false },
    
    // Automobile section
    { name: "Automobile:", rowCode: "", indent: 0, isHeader: true },
    { name: "Private Passenger", rowCode: "", indent: 1, isHeader: true },
    { name: "Liability", rowCode: "080", indent: 2, isTotal: false },
    { name: "Personal Accident", rowCode: "090", indent: 2, isTotal: false },
    { name: "Other", rowCode: "100", indent: 2, isTotal: false },
    { name: "Subtotal - Private Passenger", rowCode: "119", indent: 0, isTotal: true },
    { name: "Other than Private Passenger", rowCode: "", indent: 1, isHeader: true },
    { name: "Liability", rowCode: "130", indent: 2, isTotal: false },
    { name: "Personal Accident", rowCode: "140", indent: 2, isTotal: false },
    { name: "Other", rowCode: "150", indent: 2, isTotal: false },
    { name: "Subtotal - Other than Private Passenger", rowCode: "159", indent: 0, isTotal: true },
    { name: "Facility Assoc. Residual Market", rowCode: "", indent: 1, isHeader: true },
    { name: "Liability", rowCode: "170", indent: 2, isTotal: false },
    { name: "Personal Accident", rowCode: "180", indent: 2, isTotal: false },
    { name: "Other", rowCode: "190", indent: 2, isTotal: false },
    { name: "Subtotal - Facility Assoc. Residual Market", rowCode: "199", indent: 0, isTotal: true },
    { name: "Automobile - Subtotal", rowCode: "", indent: 1, isHeader: true },
    { name: "Liability", rowCode: "219", indent: 2, isTotal: false },
    { name: "Personal Accident", rowCode: "229", indent: 2, isTotal: false },
    { name: "Other", rowCode: "239", indent: 2, isTotal: false },
    { name: "Automobile - total", rowCode: "259", indent: 0, isTotal: true },
    
    // Boiler and Machinery
    { name: "Boiler and Machinery excluding Equipment Warranty", rowCode: "270", indent: 0, isTotal: false },
    { name: "Equipment Warranty", rowCode: "280", indent: 1, isTotal: false },
    
    // Other insurance types
    { name: "Credit", rowCode: "290", indent: 0, isTotal: false },
    { name: "Credit Protection", rowCode: "300", indent: 0, isTotal: false },
    { name: "Fidelity", rowCode: "310", indent: 0, isTotal: false },
    { name: "Hail", rowCode: "320", indent: 0, isTotal: false },
    { name: "Legal Expense", rowCode: "330", indent: 0, isTotal: false },
    
    // Liability section
    { name: "Liability:", rowCode: "", indent: 0, isHeader: true },
    { name: "Comprehensive General Liability (with products)", rowCode: "340", indent: 1, isTotal: false },
    { name: "Comprehensive General Liability (without products)", rowCode: "350", indent: 1, isTotal: false },
    { name: "Cyber Liability", rowCode: "360", indent: 1, isTotal: false },
    { name: "Directors and Officers Liability", rowCode: "370", indent: 1, isTotal: false },
    { name: "Excess Liability", rowCode: "380", indent: 1, isTotal: false },
    { name: "Professional Liability", rowCode: "390", indent: 1, isTotal: false },
    { name: "Umbrella Liability", rowCode: "400", indent: 1, isTotal: false },
    { name: "Pollution Liability", rowCode: "410", indent: 1, isTotal: false },
    { name: "All other", rowCode: "420", indent: 1, isTotal: false },
    { name: "Liability - total", rowCode: "429", indent: 0, isTotal: true },
    
    // Additional categories
    { name: "Mortgage", rowCode: "440", indent: 0, isTotal: false },
    { name: "Other Approved Products", rowCode: "450", indent: 0, isTotal: false },
    
    // Surety section
    { name: "Surety:", rowCode: "", indent: 0, isHeader: true },
    { name: "Contract Surety", rowCode: "460", indent: 1, isTotal: false },
    { name: "All Other Surety", rowCode: "470", indent: 1, isTotal: false },
    { name: "Surety - total", rowCode: "479", indent: 0, isTotal: true },
    
    // Final categories
    { name: "Title", rowCode: "490", indent: 0, isTotal: false },
    { name: "Marine", rowCode: "500", indent: 0, isTotal: false },
    { name: "Accident and Sickness", rowCode: "510", indent: 0, isTotal: false },
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
