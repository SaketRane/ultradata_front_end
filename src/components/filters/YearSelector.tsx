
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
import { Calendar } from "lucide-react";

interface YearSelectorProps {
  year: string;
  setYear: (year: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ year, setYear }) => {
  const years = [
    { value: "2024", label: "2024", disabled: true, badge: "Coming Soon" },
    { value: "2023", label: "2023", disabled: true, badge: "Coming Soon" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
        <Calendar className="h-3.5 w-3.5 text-primary-600" />
        Year
      </label>
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-primary focus:border-primary h-9">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white border-gray-200 shadow-lg" position="popper">
          <SelectGroup>
            <SelectLabel className="text-xs font-semibold text-gray-500">Years</SelectLabel>
            {years.map((y) => (
              <SelectItem 
                key={y.value} 
                value={y.value}
                disabled={y.disabled}
                className="flex justify-between items-center"
              >
                <span>{y.label}</span>
                {y.badge && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                    {y.badge}
                  </span>
                )}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearSelector;
