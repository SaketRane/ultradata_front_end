import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const InsuranceRevenueTable: React.FC = () => {
  const rows: RowDefinition[] = [
    // Property section
    { name: "Property", rowCode: "", indent: 0, isHeader: true },
    { name: "Personal excluding Home and Product Warranty", rowCode: "010", indent: 1, isTotal: false },
    { name: "Home Warranty", rowCode: "020", indent: 2, isTotal: false },
    { name: "Product Warranty", rowCode: "030", indent: 2, isTotal: false },
    { name: "Subtotal - Personal", rowCode: "039", indent: 1, isTotal: true },
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
    { name: "Subtotal - Private Passenger", rowCode: "119", indent: 1, isTotal: true },
    { name: "Other than Private Passenger", rowCode: "", indent: 1, isHeader: true },
    { name: "Liability", rowCode: "130", indent: 2, isTotal: false },
    { name: "Personal Accident", rowCode: "140", indent: 2, isTotal: false },
    { name: "Other", rowCode: "150", indent: 2, isTotal: false },
    { name: "Subtotal - Other than Private Passenger", rowCode: "159", indent: 1, isTotal: true },
    { name: "Facility Assoc. Residual Market", rowCode: "", indent: 1, isHeader: true },
    { name: "Liability", rowCode: "170", indent: 2, isTotal: false },
    { name: "Personal Accident", rowCode: "180", indent: 2, isTotal: false },
    { name: "Other", rowCode: "190", indent: 2, isTotal: false },
    { name: "Subtotal - Facility Assoc. Residual Market", rowCode: "199", indent: 1, isTotal: true },
    { name: "Automobile - Subtotal", rowCode: "", indent: 1, isHeader: true },
    { name: "Liability", rowCode: "219", indent: 2, isTotal: false },
    { name: "Personal Accident", rowCode: "229", indent: 2, isTotal: false },
    { name: "Other", rowCode: "239", indent: 2, isTotal: false },
    { name: "Automobile - total", rowCode: "259", indent: 0, isTotal: true },
    
    // Boiler & Machinery
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
    
    // Remaining categories
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
    { name: "Total for Insurance contracts issued", rowCode: "599", indent: 0, isTotal: true },
    { name: "Reinsurance contracts issued", rowCode: "699", indent: 0, isTotal: false },
    { name: "TOTAL", rowCode: "899", indent: 0, isTotal: true, isFinalTotal: true },
    { name: "Dividends - direct", rowCode: "959", indent: 0, isTotal: false }
  ];

  const columns: ColumnDefinition[] = [
    { id: "NL", label: "NL", colCode: "01" },
    { id: "PE", label: "PE", colCode: "02" },
    { id: "NS", label: "NS", colCode: "03" },
    { id: "NB", label: "NB", colCode: "04" },
    { id: "QC", label: "QC", colCode: "05" },
    { id: "ON", label: "ON", colCode: "06" },
    { id: "MB", label: "MB", colCode: "07" },
    { id: "SK", label: "SK", colCode: "08" },
    { id: "AB", label: "AB", colCode: "09" },
    { id: "BC", label: "BC", colCode: "10" },
    { id: "YK", label: "YK", colCode: "11" },
    { id: "NW", label: "NW", colCode: "12" },
    { id: "NU", label: "NU", colCode: "14" },
    { id: "OUT", label: "OUT", colCode: "18" },
    { id: "Total", label: "Total", colCode: "19" }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="6740"
    />
  );
};

export default React.memo(InsuranceRevenueTable);
