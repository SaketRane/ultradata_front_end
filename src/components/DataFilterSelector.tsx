
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { insurers } from "@/data/insurers";

interface DataFilterSelectorProps {
  year: string;
  setYear: (year: string) => void;
  insurer: string;
  setInsurer: (insurer: string) => void;
  section: string;
  setSection: (section: string) => void;
  sheet: string;
  setSheet: (sheet: string) => void;
  availableSheets: Array<{code: string, label: string}>;
  sectionSheetsMapping: Record<string, { code: string, sheets: Array<{code: string, label: string}> }>;
}

const DataFilterSelector: React.FC<DataFilterSelectorProps> = ({
  year,
  setYear,
  insurer,
  setInsurer,
  section,
  setSection,
  sheet,
  setSheet,
  availableSheets,
  sectionSheetsMapping
}) => {
  const [insurerSearchTerm, setInsurerSearchTerm] = useState<string>("");
  
  const years = [
    { value: "2024", label: "2024 (Coming Soon)", disabled: true },
    { value: "2023", label: "2023 (Coming Soon)", disabled: true },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" },
    { value: "2014", label: "2014" }
  ];

  const sections = Object.keys(sectionSheetsMapping);

  const filteredInsurers = insurerSearchTerm.length > 0
    ? insurers.filter(ins => 
        ins.name.toLowerCase().startsWith(insurerSearchTerm.toLowerCase()))
    : insurers;

  const handleInsurerChange = (value: string) => {
    setInsurer(value);
    const selectedInsurer = insurers.find(ins => ins.name === value);
    console.log("Selected insurer code:", selectedInsurer?.code);
  };

  const handleSectionChange = (value: string) => {
    setSection(value);
    const selectedSection = sectionSheetsMapping[value];
    console.log("Selected section code:", selectedSection.code);
  };

  const handleSheetChange = (value: string) => {
    setSheet(value);
    const selectedSheet = availableSheets.find(s => s.label === value);
    console.log("Selected sheet code:", selectedSheet?.code);
  };

  const handleInsurerOpenChange = (open: boolean) => {
    if (!open) {
      setInsurerSearchTerm("");
    }
  };

  return (
    <Card className="shadow-lg glass w-full">
      <CardContent className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 dropdown-data compact-dropdown">
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

          <div className="space-y-1">
            <label className="text-xs font-medium">Insurer</label>
            <Select 
              value={insurer} 
              onValueChange={handleInsurerChange}
              onOpenChange={handleInsurerOpenChange}
            >
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder="Select Insurer" />
              </SelectTrigger>
              <SelectContent 
                className="z-50 bg-white/95 backdrop-blur-sm border-border max-h-[300px] dropdown-data" 
                position="popper"
              >
                <div className="px-3 py-1 sticky top-0 bg-white z-10 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-1.5 h-3 w-3 text-muted-foreground" />
                    <Input
                      placeholder="Search insurers..."
                      value={insurerSearchTerm}
                      onChange={(e) => setInsurerSearchTerm(e.target.value)}
                      className="pl-7 h-7 text-xs"
                    />
                  </div>
                </div>
                <SelectGroup>
                  <SelectLabel className="px-3 pt-1">Insurers</SelectLabel>
                  {filteredInsurers.length > 0 ? (
                    filteredInsurers.map((ins) => (
                      <SelectItem key={ins.code} value={ins.name}>
                        {ins.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-3 py-1 text-xs text-muted-foreground">
                      No insurers found
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

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

          <div className="space-y-1">
            <label className="text-xs font-medium">Sheet</label>
            <Select 
              value={sheet} 
              onValueChange={handleSheetChange}
              disabled={!section}
            >
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder={!section ? "Select Section First" : "Select Sheet"} />
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
                      Please select a section first
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataFilterSelector;
