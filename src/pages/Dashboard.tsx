
import React, { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import DataFilterSelector from "@/components/DataFilterSelector";
import DataVisualization from "@/components/DataVisualization";
import { sectionSheetsMapping } from "@/constants/sectionSheets";
import { useFilterOptions } from "@/hooks/useFilterOptions";
import { DEV_MODE } from "@/contexts/auth/auth-utils";

const Dashboard: React.FC = () => {
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");
  const [availableSheets, setAvailableSheets] = useState<Array<{code: string, label: string}>>([]);
  
  // Get filter options from our hook
  const { years, insurers, isLoading } = useFilterOptions();

  useEffect(() => {
    if (section) {
      setAvailableSheets(sectionSheetsMapping[section].sheets);
      setSheet("");
    } else {
      setAvailableSheets([]);
    }
  }, [section]);

  useEffect(() => {
    document.title = "UltraData | Dashboard";
    
    // Debug info
    if (DEV_MODE) {
      console.log("Dashboard loaded:", {
        availableYears: years,
        availableInsurers: insurers,
        isLoading
      });
    }
  }, [years, insurers, isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto py-4 px-0.5 page-transition data-container">
        <section className="mb-3 w-full mx-auto">
          <DataFilterSelector 
            year={year}
            setYear={setYear}
            insurer={insurer}
            setInsurer={setInsurer}
            section={section}
            setSection={setSection}
            sheet={sheet}
            setSheet={setSheet}
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
