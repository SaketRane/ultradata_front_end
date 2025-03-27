
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

interface SheetSelectorProps {
  sheet: string;
  setSheet: (sheet: string) => void;
  section: string;
  availableSheets: Array<{code: string, label: string}>;
  isLoading?: boolean;
}

const SheetSelector: React.FC<SheetSelectorProps> = ({ 
  sheet, 
  setSheet, 
  section,
  availableSheets,
  isLoading = false
}) => {
  const handleSheetChange = (value: string) => {
    setSheet(value);
    const selectedSheet = availableSheets.find(s => s.label === value);
    console.log("Selected sheet code:", selectedSheet?.code);
  };

  const placeholder = !section 
    ? "Select Section First" 
    : isLoading 
      ? "Loading..." 
      : "Select Sheet";

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">Sheet</label>
      <Select 
        value={sheet} 
        onValueChange={handleSheetChange}
        disabled={!section || isLoading}
      >
        <SelectTrigger className="w-full h-8 text-xs">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border dropdown-data" position="popper">
          <SelectGroup>
            <SelectLabel>Sheets</SelectLabel>
            {availableSheets.length > 0 ? (
              availableSheets.map((s) => (
                <SelectItem key={s.code} value={s.label}>
                  {s.label}
                </SelectItem>
              ))
            ) : (
              <div className="px-3 py-1 text-xs text-muted-foreground">
                {!section ? "Please select a section first" : "No sheets available for selection"}
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SheetSelector;
