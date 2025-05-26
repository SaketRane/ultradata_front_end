import React from "react";
import FinancialTable from "@/components/ui/financial-table";
import { RowDefinition, ColumnDefinition } from "@/types/financial";

const ChangesInOnerousContractsTable: React.FC = () => {
  const rows: RowDefinition[] = [
    // Property section
    { name: "Personal Property, excluding Home and Product Warranty", rowCode: "010", indent: 0, isTotal: false },
    { name: "Home Warranty", rowCode: "020", indent: 1, isTotal: false },
    { name: "Product Warranty", rowCode: "030", indent: 1, isTotal: false },
    { name: "Subtotal - Personal", rowCode: "039", indent: 0, isTotal: true },
    { name: "Commercial Property", rowCode: "040", indent: 0, isTotal: false },
    
    // Other insurance types
    { name: "Aircraft", rowCode: "050", indent: 0, isTotal: false },
    { name: "Automobile - PPV", rowCode: "060", indent: 0, isTotal: false },
    { name: "Automobile - Other than PPV", rowCode: "070", indent: 0, isTotal: false },
    { name: "Automobile - Facility", rowCode: "080", indent: 0, isTotal: false },
    { name: "Boiler & Machinery, excluding Equipment Warranty", rowCode: "090", indent: 0, isTotal: false },
    { name: "Equipment Warranty", rowCode: "100", indent: 1, isTotal: false },
    { name: "Credit", rowCode: "110", indent: 0, isTotal: false },
    { name: "Credit Protection", rowCode: "120", indent: 0, isTotal: false },
    { name: "Fidelity", rowCode: "130", indent: 0, isTotal: false },
    { name: "Hail", rowCode: "140", indent: 0, isTotal: false },
    { name: "Legal Expense", rowCode: "150", indent: 0, isTotal: false },
    { name: "Liability", rowCode: "160", indent: 0, isTotal: false },
    { name: "Other Approved Products", rowCode: "170", indent: 0, isTotal: false },
    
    // Surety section
    { name: "Surety", rowCode: "", indent: 0, isHeader: true },
    { name: "Contract Surety", rowCode: "180", indent: 1, isTotal: false },
    { name: "All Other Surety", rowCode: "190", indent: 1, isTotal: false },
    { name: "Surety - total", rowCode: "199", indent: 0, isTotal: true },
    
    // Final categories
    { name: "Title", rowCode: "210", indent: 0, isTotal: false },
    { name: "Marine", rowCode: "220", indent: 0, isTotal: false },
    { name: "Accident and Sickness", rowCode: "230", indent: 0, isTotal: false },
    { name: "Total", rowCode: "299", indent: 0, isTotal: true, isFinalTotal: true }
  ];

  const columns: ColumnDefinition[] = [
    { 
      id: "lossesReversalIssued", 
      label: "Losses and Reversal of Losses (Insurance and Reinsurance Contracts Issued)", 
      colCode: "05" 
    },
    { 
      id: "lossRecoveryReversalHeld", 
      label: "Loss-Recovery and Reversal of Loss-Recovery (Reinsurance Contracts Held)", 
      colCode: "10" 
    },
    { 
      id: "onerousContractsLossesNet", 
      label: "Onerous Contracts Losses (Net)", 
      colCode: "15" 
    }
  ];

  return (
    <FinancialTable 
      rows={rows} 
      columns={columns} 
      sheetCode="6080"
    />
  );
};

export default React.memo(ChangesInOnerousContractsTable);
