
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataSelectorProps {
  className?: string;
}

const DataSelector: React.FC<DataSelectorProps> = ({ className }) => {
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");

  // Mock data for dropdowns
  const years = ["2024", "2023", "2022", "2021", "2020"];
  const insurers = ["Allianz", "AXA", "Zurich", "Liberty Mutual", "Travelers", "Chubb"];
  const sections = ["Claims", "Premiums", "Policies", "Exposure", "Losses"];
  const sheets = ["Summary", "Detailed", "YoY Comparison", "Quarterly", "Regional"];

  return (
    <Card className={cn("shadow-lg glass", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Data Selector</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border" position="popper">
                <SelectGroup>
                  <SelectLabel>Years</SelectLabel>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Insurer</label>
            <Select value={insurer} onValueChange={setInsurer}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Insurer" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border" position="popper">
                <SelectGroup>
                  <SelectLabel>Insurers</SelectLabel>
                  {insurers.map((ins) => (
                    <SelectItem key={ins} value={ins}>
                      {ins}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Section</label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border" position="popper">
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Sheet</label>
            <Select value={sheet} onValueChange={setSheet}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Sheet" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border" position="popper">
                <SelectGroup>
                  <SelectLabel>Sheets</SelectLabel>
                  {sheets.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSelector;
