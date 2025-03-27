
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import YearSelector from "./filters/YearSelector";
import InsurerSelector from "./filters/InsurerSelector";
import SectionSelector from "./filters/SectionSelector";
import SheetSelector from "./filters/SheetSelector";
import { useFilters } from "@/contexts/FilterContext";

const DataFilterSelector: React.FC = () => {
  const {
    year,
    setYear,
    insurer,
    setInsurer,
    section,
    setSection,
    sheet,
    setSheet,
    availableSheets,
    sectionSheetsMapping
  } = useFilters();

  return (
    <Card className="shadow-lg glass w-full">
      <CardContent className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 dropdown-data compact-dropdown">
          <YearSelector year={year} setYear={setYear} />
          <InsurerSelector insurer={insurer} setInsurer={setInsurer} />
          <SectionSelector 
            section={section} 
            setSection={setSection} 
          />
          <SheetSelector 
            sheet={sheet} 
            setSheet={setSheet} 
            section={section}
            availableSheets={availableSheets} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DataFilterSelector;
