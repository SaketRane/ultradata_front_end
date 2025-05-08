
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionSheetMapping } from "../DataFilterSelector";

/**
 * Props for the SectionSelector component
 */
export interface SectionSelectorProps {
  /** Currently selected section */
  section: string;
  /** Function to update the selected section */
  setSection: (section: string) => void;
  /** Mapping of sections to their available sheets */
  sectionSheetsMapping: Record<string, SectionSheetMapping>;
}

/**
 * SectionSelector component for selecting data section
 * 
 * This component renders a dropdown that allows users to select
 * the section of financial data they want to view.
 * 
 * @param {SectionSelectorProps} props - Component props
 * @returns {JSX.Element} A Select component for section selection
 */
const SectionSelector: React.FC<SectionSelectorProps> = ({ 
  section, 
  setSection, 
  sectionSheetsMapping 
}) => {
  const sections = Object.keys(sectionSheetsMapping);

  const handleSectionChange = (value: string) => {
    setSection(value);
    const selectedSection = sectionSheetsMapping[value];
    console.log("Selected section code:", selectedSection.code);
  };

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">Section</label>
      <Select value={section} onValueChange={handleSectionChange}>
        <SelectTrigger className="w-full h-8 text-xs">
          <SelectValue placeholder="Select Section" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border dropdown-data" position="popper">
          <SelectGroup>
            <SelectLabel>Sections</SelectLabel>
            {sections.map((sec) => (
              <SelectItem key={sec} value={sec}>
                {sec}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SectionSelector;
