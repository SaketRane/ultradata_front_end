
import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInsurers } from "@/hooks/useApiData";

interface InsurerSelectorProps {
  insurer: string;
  setInsurer: (insurer: string) => void;
  year?: number;
}

const InsurerSelector: React.FC<InsurerSelectorProps> = ({ insurer, setInsurer, year }) => {
  const [insurerSearchTerm, setInsurerSearchTerm] = useState<string>("");
  const { data: insurersData, isLoading, error } = useInsurers(year);
  
  const filteredInsurers = insurerSearchTerm.length > 0
    ? insurersData?.filter(ins => 
        ins.toLowerCase().startsWith(insurerSearchTerm.toLowerCase())) || []
    : insurersData || [];

  const handleInsurerChange = (value: string) => {
    setInsurer(value);
    console.log("Selected insurer:", value);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setInsurerSearchTerm("");
    }
  };

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">Insurer</label>
      <Select 
        value={insurer} 
        onValueChange={handleInsurerChange}
        onOpenChange={handleOpenChange}
      >
        <SelectTrigger className="w-full h-8 text-xs">
          <SelectValue placeholder={isLoading ? "Loading..." : "Select Insurer"} />
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
            {isLoading ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-2 text-xs">Loading insurers...</span>
              </div>
            ) : error ? (
              <div className="px-3 py-2 text-xs text-red-500">
                Error loading insurers
              </div>
            ) : filteredInsurers.length > 0 ? (
              filteredInsurers.map((ins) => (
                <SelectItem key={ins} value={ins}>
                  {ins}
                </SelectItem>
              ))
            ) : (
              <div className="px-3 py-1 text-xs text-muted-foreground">
                {year ? "No insurers found for this year" : "Select a year first"}
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default InsurerSelector;
