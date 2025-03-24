
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import YearSelector from "./filters/YearSelector";
import InsurerSelector from "./filters/InsurerSelector";
import SectionSelector from "./filters/SectionSelector";
import SheetSelector from "./filters/SheetSelector";

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
  availableSheets,
  sectionSheetsMapping
}) => {
  return (
    <Card className="shadow-lg glass w-full">
      <CardContent className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 dropdown-data compact-dropdown">
          <YearSelector year={year} setYear={setYear} />
          <InsurerSelector insurer={insurer} setInsurer={setInsurer} />
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
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DataFilterSelector;
