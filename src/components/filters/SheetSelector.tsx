
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
import { SheetOption } from "../DataFilterSelector";

/**
 * Props for the SheetSelector component
 */
export interface SheetSelectorProps {
  /** Currently selected sheet */
  sheet: string;
  /** Function to update the selected sheet */
  setSheet: (sheet: string) => void;
  /** Currently selected section (needed to determine available sheets) */
  section: string;
  /** Collection of available sheets based on the current section */
  availableSheets: SheetOption[];
}

/**
 * SheetSelector component for selecting specific data sheet
 * 
 * This component renders a dropdown that allows users to select
 * a specific sheet within the chosen section. The available sheets
 * depend on the currently selected section.
 * 
 * @param {SheetSelectorProps} props - Component props
 * @returns {JSX.Element} A Select component for sheet selection
 */
const SheetSelector: React.FC<SheetSelectorProps> = ({ 
  sheet, 
  setSheet, 
  section,
  availableSheets 
}) => {
  const handleSheetChange = (value: string) => {
    setSheet(value);
    const selectedSheet = availableSheets.find(s => s.code === value);
    console.log("Selected sheet code:", selectedSheet?.code);
  };

  // Find the label for the current sheet code
  const selectedSheetLabel = availableSheets.find(s => s.code === sheet)?.label || '';

  return (
    <div className="space-y-0.5">
      <label className="text-xs font-medium">Sheet</label>
      <Select 
        value={sheet} 
        onValueChange={handleSheetChange}
        disabled={!section}
      >
        <SelectTrigger className="w-full h-8 text-xs text-center">
          <SelectValue placeholder={!section ? "Select Section First" : "Select Sheet"}>
            {selectedSheetLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border dropdown-data" position="popper">
          <SelectGroup>
            <SelectLabel>Sheets</SelectLabel>
            {availableSheets.length > 0 ? (
              availableSheets.map((s) => (
                <SelectItem key={s.code} value={s.code}>
                  {s.label}
                </SelectItem>
              ))
            ) : (
              <div className="px-3 py-1 text-xs text-muted-foreground">
                Please select a section first
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SheetSelector;
