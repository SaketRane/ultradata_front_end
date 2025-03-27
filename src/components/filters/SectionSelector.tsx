
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
import { sectionSheetsMapping } from "@/constants/sectionSheets";

interface SectionSelectorProps {
  section: string;
  setSection: (section: string) => void;
}

const SectionSelector: React.FC<SectionSelectorProps> = ({ 
  section, 
  setSection 
}) => {
  const sections = Object.keys(sectionSheetsMapping);

  const handleSectionChange = (value: string) => {
    setSection(value);
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
