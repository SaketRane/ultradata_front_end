
import React, { useEffect, useState, useCallback } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import DataFilterSelector from "@/components/DataFilterSelector";
import DataVisualization from "@/components/DataVisualization";
import { sectionSheetsMapping } from "@/constants/sectionSheets";

/**
 * Main dashboard component with optimized state handling
 */
const Dashboard: React.FC = () => {
  // State for filter selections
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");
  const [availableSheets, setAvailableSheets] = useState<Array<{code: string, label: string}>>([]);
  const [availableSections, setAvailableSections] = useState<string[]>([]);

  // Memoized state handlers to prevent unnecessary re-renders
  const handleYearChange = useCallback((value: string) => {
    setYear(value);
    
    // Reset section and sheet when year changes
    setSection("");
    setSheet("");
    
    // All supported years (2023-2025) use IFRS 17 sections
    setAvailableSections([
      "Financial Statements",
      "Investments",
      "Insurance Results & Onerous Contracts",
      "Provincial Stats",
      "Commissions & Expenses",
      "Reinsurance"
    ]);
  }, []);
  
  const handleInsurerChange = useCallback((value: string) => setInsurer(value), []);
  
  const handleSectionChange = useCallback((value: string) => {
    setSection(value);
    // Reset sheet when section changes
    setSheet("");
  }, []);
  
  const handleSheetChange = useCallback((value: string) => setSheet(value), []);

  // Update available sheets when section changes
  useEffect(() => {
    if (section) {
      // All supported years (2023-2025) use IFRS 17 sheets
      const ifrs17Sheets = [
        "2010", "2011", "2012", "2014", "2016", "2018", "2022", "2041", "2042", "2045", "2054",
        "4008",
        "6025", "6080",
        "6740", "6750", "6760", "6770",
        "8015", "8025",
        "7050", "7060"
      ];
      
      if (sectionSheetsMapping[section]) {
        setAvailableSheets(sectionSheetsMapping[section].sheets.filter(
          sheet => ifrs17Sheets.includes(sheet.code)
        ));
      } else {
        setAvailableSheets([]);
      }
    } else {
      setAvailableSheets([]);
    }
  }, [section, year]);

  // Set page title
  useEffect(() => {
    document.title = "UltraData | Dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 w-full max-w-full py-4 px-1 page-transition data-container">
        <section className="mb-3 w-full">
          <DataFilterSelector 
            year={year}
            setYear={handleYearChange}
            insurer={insurer}
            setInsurer={handleInsurerChange}
            section={section}
            setSection={handleSectionChange}
            sheet={sheet}
            setSheet={handleSheetChange}
            availableSheets={availableSheets}
            sectionSheetsMapping={sectionSheetsMapping}
            availableSections={availableSections}
          />
        </section>
        
        <DataVisualization 
          section={section}
          sheet={sheet}
          availableSheets={availableSheets}
        />
      </main>
      
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
