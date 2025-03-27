
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { sectionSheetsMapping } from "@/constants/sectionSheets";

interface FilterContextType {
  year: string;
  setYear: (year: string) => void;
  insurer: string;
  setInsurer: (insurer: string) => void;
  section: string;
  setSection: (section: string) => void;
  sheet: string;
  setSheet: (sheet: string) => void;
  availableSheets: Array<{code: string, label: string}>;
  sheetCode: string | null;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");

  // Derive available sheets based on selected section
  const availableSheets = section 
    ? sectionSheetsMapping[section]?.sheets || []
    : [];

  // Derive sheet code for visualization
  const sheetCode = React.useMemo(() => {
    if (!sheet) return null;
    const selectedSheet = availableSheets.find(s => s.label === sheet);
    return selectedSheet?.code || null;
  }, [sheet, availableSheets]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setYear("");
    setInsurer("");
    setSection("");
    setSheet("");
  }, []);

  // Handle section change
  const handleSectionChange = useCallback((newSection: string) => {
    setSection(newSection);
    setSheet(""); // Reset sheet when section changes
  }, []);

  return (
    <FilterContext.Provider
      value={{
        year,
        setYear,
        insurer,
        setInsurer,
        section,
        setSection: handleSectionChange,
        sheet,
        setSheet,
        availableSheets,
        sheetCode,
        resetFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
