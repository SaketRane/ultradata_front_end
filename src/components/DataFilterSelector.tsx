/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import YearSelector, { YearOption } from "./filters/YearSelector";
import InsurerSelector from "./filters/InsurerSelector";
import SectionSelector from "./filters/SectionSelector";
import SheetSelector from "./filters/SheetSelector";

/**
 * Sheet object interface representing a data sheet
 */
export interface SheetOption {
  /** Unique code identifier for the sheet */
  code: string;
  /** Display label for the sheet in the UI */
  label: string;
}

/**
 * Section mapping interface representing the structure of sections and their sheets
 */
export interface SectionSheetMapping {
  /** Unique code identifier for the section */
  code: string;
  /** Collection of sheets available in this section */
  sheets: SheetOption[];
}

/**
 * Props for the DataFilterSelector component
 */
export interface DataFilterSelectorProps {
  /** Currently selected year */
  year: string;
  /** Function to update the selected year */
  setYear: (year: string) => void;
  /** Currently selected insurer */
  insurer: string;
  /** Function to update the selected insurer */
  setInsurer: (insurer: string) => void;
  /** Currently selected section */
  section: string;
  /** Function to update the selected section */
  setSection: (section: string) => void;
  /** Currently selected sheet */
  sheet: string;
  /** Function to update the selected sheet */
  setSheet: (sheet: string) => void;
  /** Collection of available sheets based on the current selection */
  availableSheets: SheetOption[];
  /** Mapping of sections to their available sheets */
  sectionSheetsMapping: Record<string, SectionSheetMapping>;
  /** List of available sections based on the selected year */
  availableSections?: string[];
  yearOptions: any;
  insurerOptions: any;
}

/**
 * DataFilterSelector component
 * 
 * This component provides the filter interface for the dashboard, allowing users
 * to select year, insurer, section, and sheet to view specific financial data.
 * The filters have dependencies (e.g., available sheets depend on the selected section).
 * 
 * @param {DataFilterSelectorProps} props - Component props
 * @returns {JSX.Element} A card containing the filter selection UI
 */
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
  sectionSheetsMapping,
  availableSections,
  yearOptions,
  insurerOptions
}) => {
  return (
    <Card className="shadow-lg glass w-full">
      <CardContent className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 dropdown-data compact-dropdown">
          <YearSelector year={year} setYear={setYear} yearOptions={yearOptions}/>
          <InsurerSelector insurer={insurer} setInsurer={setInsurer} options={insurerOptions}/>
          <SectionSelector 
            section={section} 
            setSection={setSection} 
            sectionSheetsMapping={sectionSheetsMapping} 
            availableSections={availableSections}
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
