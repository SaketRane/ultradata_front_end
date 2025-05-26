
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

/**
 * Interface for year options in the selector
 */
export interface YearOption {
  /** Unique value for the year (e.g., "2022") */
  value: string;
  /** Display label for the year (e.g., "2022" or "2024 (IFRS 17)") */
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
  // Available years with labels and disabled status
  const years: YearOption[] = [
    { value: "2025", label: "2025 (IFRS 17)" },
    { value: "2024", label: "2024 (IFRS 17)" },
    { value: "2023", label: "2023 (IFRS 17)" },
    { value: "2022", label: "2022", disabled: true },
    { value: "2021", label: "2021", disabled: true },
    { value: "2020", label: "2020", disabled: true },
    { value: "2019", label: "2019", disabled: true },
    { value: "2018", label: "2018", disabled: true },
    { value: "2017", label: "2017", disabled: true },
    { value: "2016", label: "2016", disabled: true },
    { value: "2015", label: "2015", disabled: true }
  ];

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">Year</label>
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className="w-full h-8 text-xs">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border dropdown-data" position="popper">
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            {years.map((y) => (
              <SelectItem 
                key={y.value} 
                value={y.value}
                disabled={y.disabled}
              >
                {y.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearSelector;
