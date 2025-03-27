
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

interface YearSelectorProps {
  year: string;
  setYear: (year: string) => void;
  availableYears: string[];
  isLoading: boolean;
}

const YearSelector: React.FC<YearSelectorProps> = ({ 
  year, 
  setYear, 
  availableYears,
  isLoading 
}) => {
  // Future years that may be added
  const upcomingYears = [
    { value: "2024", label: "2024 (Coming Soon)", disabled: true },
    { value: "2023", label: "2023 (Coming Soon)", disabled: true },
  ];

  // Filter out upcoming years that are already in available years
  const filteredUpcomingYears = upcomingYears.filter(
    upcoming => !availableYears.includes(upcoming.value)
  );

  // Combine available years with upcoming years
  const allYears = [
    ...availableYears.map(y => ({ value: y, label: y, disabled: false })),
    ...filteredUpcomingYears
  ];

  // Sort years in descending order
  allYears.sort((a, b) => parseInt(b.value) - parseInt(a.value));

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">Year</label>
      <Select value={year} onValueChange={setYear} disabled={isLoading}>
        <SelectTrigger className="w-full h-8 text-xs">
          <SelectValue placeholder={isLoading ? "Loading..." : "Select Year"} />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border dropdown-data" position="popper">
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            {allYears.map((y) => (
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
