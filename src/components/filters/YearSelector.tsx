
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
import { useYears } from "@/hooks/useApiData";
import { Loader2 } from "lucide-react";

/**
 * Interface for year options in the selector
 */
export interface YearOption {
  /** Unique value for the year (e.g., "2023") */
  value: string;
  /** Display label for the year (e.g., "2023 (IFRS 17)") */
  label: string;
  /** Whether this option is disabled (e.g., future years) */
  disabled?: boolean;
}

/**
 * Props for the YearSelector component
 */
export interface YearSelectorProps {
  /** Currently selected year */
  year: string;
  /** Function to update the selected year */
  setYear: (year: string) => void;
}

/**
 * YearSelector component for selecting data year
 * 
 * This component renders a dropdown that allows users to select
 * the year for which they want to view financial data.
 * 
 * @param {YearSelectorProps} props - Component props 
 * @returns {JSX.Element} A Select component for year selection
 */
const YearSelector: React.FC<YearSelectorProps> = ({ year, setYear }) => {
  const { data: yearsData, isLoading, error } = useYears();
  
  // Transform backend data to YearOption format
  const years: YearOption[] = yearsData?.map(yearValue => ({
    value: yearValue.toString(),
    label: yearValue.toString()
  })) || [];

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">Year</label>
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className="w-full h-8 text-xs">
          <SelectValue placeholder={isLoading ? "Loading..." : "Select Year"} />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border dropdown-data" position="popper">
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            {isLoading ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-2 text-xs">Loading years...</span>
              </div>
            ) : error ? (
              <div className="px-3 py-2 text-xs text-red-500">
                Error loading years
              </div>
            ) : years.length === 0 ? (
              <div className="px-3 py-2 text-xs text-muted-foreground">
                No years available
              </div>
            ) : (
              years.map((y) => (
                <SelectItem 
                  key={y.value} 
                  value={y.value}
                  disabled={y.disabled}
                >
                  {y.label}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearSelector;
