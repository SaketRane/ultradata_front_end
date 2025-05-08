
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

  // Memoized state handlers to prevent unnecessary re-renders
  const handleYearChange = useCallback((value: string) => setYear(value), []);
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
      setAvailableSheets(sectionSheetsMapping[section].sheets);
    } else {
      setAvailableSheets([]);
    }
  }, [section]);

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
