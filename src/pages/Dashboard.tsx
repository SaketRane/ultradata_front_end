
import React, { useEffect, useState, useCallback, useMemo } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import DataFilterSelector from "@/components/DataFilterSelector";
import DataVisualization from "@/components/DataVisualization";
import { sectionSheetsMapping } from "@/constants/sectionSheets";

const Dashboard: React.FC = () => {
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");

  const availableSections = useMemo(() => [
    "Financial Statements",
    "Investments",
    "Insurance Results & Onerous Contracts",
    "Provincial Stats",
    "Commissions & Expenses",
    "Reinsurance"
  ], []);

  const availableSheets = useMemo(() => {
    if (!section) return [];
    
    const ifrs17Sheets = [
      "2010", "2011", "2012", "2014", "2016", "2018", "2022", "2041", "2042", "2045", "2054",
      "4008", "6025", "6080", "6740", "6750", "6760", "6770", "8015", "8025", "7050", "7060"
    ];
    
    return sectionSheetsMapping[section]?.sheets.filter(
      sheet => ifrs17Sheets.includes(sheet.code)
    ) || [];
  }, [section]);

  const handleYearChange = useCallback((value: string) => {
    setYear(value);
    setSection("");
    setSheet("");
  }, []);
  
  const handleInsurerChange = useCallback((value: string) => setInsurer(value), []);
  
  const handleSectionChange = useCallback((value: string) => {
    setSection(value);
    setSheet("");
  }, []);
  
  const handleSheetChange = useCallback((value: string) => setSheet(value), []);

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
          year={year}
          insurer={insurer}
        />
      </main>
      
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
