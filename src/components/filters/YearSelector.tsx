
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
import { useYearOptions } from "@/hooks/useFilterOptions";
import { Skeleton } from "@/components/ui/skeleton";

interface YearSelectorProps {
  year: string;
  setYear: (year: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ year, setYear }) => {
  const { yearOptions, isLoading } = useYearOptions();

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="space-y-1">
        <label className="text-xs font-medium">Year</label>
        <Skeleton className="w-full h-8" />
      </div>
    );
  }

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
            {yearOptions.map((y) => (
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
