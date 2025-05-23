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
    
    // Determine available sections based on year
    const yearValue = parseInt(value, 10);
    if (yearValue >= 2023) {
      // For 2023, 2024, 2025 IFRS 17 years
      setAvailableSections([
        "Financial Statements",
        "Investments",
        "Insurance Results & Onerous Contracts",
        "Provincial Stats",
        "Commissions & Expenses",
        "Reinsurance"
      ]);
    } else {
      // For 2022 and earlier years
      setAvailableSections([
        "Financial Statements",
        "Investments",
        "Premiums, Claims, & LAE",
        "Provincial Stats",
        "Commissions",
        "Reinsurance",
        "MCT/BAAT"
      ]);
    }
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
      // If we're in an IFRS 17 year (2023+)
      const yearValue = parseInt(year, 10);
      if (yearValue >= 2023) {
        // For 2023+ years, show only the IFRS 17 sheets
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
        // For non-IFRS 17 years (2022 and earlier)
        if (sectionSheetsMapping[section]) {
          const legacySheets = [
            "2010", "2020", "2030", "2042", "2045", "2054",
            "4007",
            "6020", "6021", "6030",
            "6710", "6720", "6730", "6731",
            "8010",
            "7050", "7060", "7061",
            "3061", "3062", "3092", "3064", "3066", "3071", "3081", "3073", "3074", "3075", "3077", "3079"
          ];
          
          setAvailableSheets(sectionSheetsMapping[section].sheets.filter(
            sheet => legacySheets.includes(sheet.code)
          ));
        } else {
          setAvailableSheets([]);
        }
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
      
      <main className="flex-1 container mx-auto py-4 px-0.5 page-transition data-container">
        <section className="mb-3 w-full mx-auto">
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
