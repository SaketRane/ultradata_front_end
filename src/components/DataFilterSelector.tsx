
import React from "react";
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 dropdown-data">
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
        <YearSelector year={year} setYear={setYear} />
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
        <InsurerSelector insurer={insurer} setInsurer={setInsurer} />
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
        <SectionSelector 
          section={section} 
          setSection={setSection} 
          sectionSheetsMapping={sectionSheetsMapping} 
        />
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
        <SheetSelector 
          sheet={sheet} 
          setSheet={setSheet} 
          section={section}
          availableSheets={availableSheets} 
        />
      </div>
    </div>
  );
};

export default DataFilterSelector;
