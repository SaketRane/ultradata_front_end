
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
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
import { useInsurerOptions } from "@/hooks/useFilterOptions";
import { Skeleton } from "@/components/ui/skeleton";

interface InsurerSelectorProps {
  insurer: string;
  setInsurer: (insurer: string) => void;
}

const InsurerSelector: React.FC<InsurerSelectorProps> = ({ insurer, setInsurer }) => {
  const [insurerSearchTerm, setInsurerSearchTerm] = useState<string>("");
  const { insurerOptions, isLoading } = useInsurerOptions();
  
  // Memoize the filtered insurers to avoid recomputing on every render
  const filteredInsurers = useMemo(() => {
    if (insurerSearchTerm.length === 0) return insurerOptions;
    
    return insurerOptions.filter(ins => 
      ins.toLowerCase().includes(insurerSearchTerm.toLowerCase())
    );
  }, [insurerOptions, insurerSearchTerm]);

  const handleInsurerChange = (value: string) => {
    setInsurer(value);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setInsurerSearchTerm("");
    }
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="space-y-1">
        <label className="text-xs font-medium">Insurer</label>
        <Skeleton className="w-full h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">Insurer</label>
      <Select 
        value={insurer} 
        onValueChange={handleInsurerChange}
        onOpenChange={handleOpenChange}
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
                <SelectItem key={ins} value={ins}>
                  {ins}
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
  );
};

export default InsurerSelector;
