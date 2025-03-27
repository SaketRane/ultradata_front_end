
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import YearSelector from "./filters/YearSelector";
import InsurerSelector from "./filters/InsurerSelector";
import SectionSelector from "./filters/SectionSelector";
import SheetSelector from "./filters/SheetSelector";
import { useFilterOptions } from "@/hooks/useFilterOptions";
import { useAvailableSheets } from "@/hooks/useAvailableSheets";
import { DEV_MODE } from "@/contexts/auth/auth-utils";

interface DataFilterSelectorProps {
  year: string;
  setYear: (year: string) => void;
  insurer: string;
  setInsurer: (insurer: string) => void;
  section: string;
  setSection: (section: string) => void;
  sheet: string;
  setSheet: (sheet: string) => void;
  availableSheets: Array<{code: string, label: string}>;
  sectionSheetsMapping: Record<string, { code: string, sheets: Array<{code: string, label: string}> }>;
}

const DataFilterSelector: React.FC<DataFilterSelectorProps> = ({
  year,
  setYear,
  insurer,
  setInsurer,
  section,
  setSection,
  sheet,
  setSheet,
  sectionSheetsMapping
}) => {
  // Fetch available years and insurers from the database
  const { years, insurers, isLoading: isLoadingFilters } = useFilterOptions();
  
  // Determine the insurer code based on selected insurer name
  const selectedInsurerCode = React.useMemo(() => {
    if (!insurer) return null;
    
    const selectedInsurer = insurers.find(ins => ins.name === insurer);
    return selectedInsurer?.code || null;
  }, [insurer, insurers]);

  // Fetch available sheets for the selected section, year, and insurer
  const { 
    availableSheets, 
    isLoading: isLoadingSheets 
  } = useAvailableSheets({
    section,
    year,
    insurerCode: selectedInsurerCode
  });

  if (DEV_MODE) {
    console.log("DataFilterSelector state:", {
      year, insurer, section, sheet,
      availableYears: years,
      availableInsurers: insurers,
      selectedInsurerCode,
      availableSheets
    });
  }

  return (
    <Card className="shadow-lg glass w-full">
      <CardContent className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 dropdown-data compact-dropdown">
          <YearSelector 
            year={year} 
            setYear={setYear} 
            availableYears={years}
            isLoading={isLoadingFilters}
          />
          <InsurerSelector 
            insurer={insurer} 
            setInsurer={setInsurer} 
            availableInsurerCodes={insurers}
            isLoading={isLoadingFilters}
          />
          <SectionSelector 
            section={section} 
            setSection={setSection} 
            sectionSheetsMapping={sectionSheetsMapping} 
          />
          <SheetSelector 
            sheet={sheet} 
            setSheet={setSheet} 
            section={section}
            availableSheets={availableSheets} 
            isLoading={isLoadingSheets}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DataFilterSelector;
