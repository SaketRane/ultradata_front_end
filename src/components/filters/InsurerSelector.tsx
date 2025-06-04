/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
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

interface InsurerSelectorProps {
  insurer: string;
  setInsurer: (insurer: string) => void;
  options: any;
}

const InsurerSelector: React.FC<InsurerSelectorProps> = ({ insurer, setInsurer, options }) => {
  const [insurerSearchTerm, setInsurerSearchTerm] = useState<string>("");
  
  const filteredInsurers = insurerSearchTerm.length > 0
    ? options.filter(ins => 
        ins.name.toLowerCase().startsWith(insurerSearchTerm.toLowerCase()))
    : options;

  const handleInsurerChange = (value: string) => {
    setInsurer(value);
    const selectedInsurer = options.find(ins => ins.name === value);
    console.log("Selected insurer code:", selectedInsurer?.code);
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
  );
};

export default InsurerSelector;
