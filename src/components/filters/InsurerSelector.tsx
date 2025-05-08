
import React, { useState } from "react";
import { Search, Building } from "lucide-react";
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
import { insurers } from "@/data/insurers";

interface InsurerSelectorProps {
  insurer: string;
  setInsurer: (insurer: string) => void;
}

const InsurerSelector: React.FC<InsurerSelectorProps> = ({ insurer, setInsurer }) => {
  const [insurerSearchTerm, setInsurerSearchTerm] = useState<string>("");
  
  const filteredInsurers = insurerSearchTerm.length > 0
    ? insurers.filter(ins => 
        ins.name.toLowerCase().startsWith(insurerSearchTerm.toLowerCase()))
    : insurers;

  const handleInsurerChange = (value: string) => {
    setInsurer(value);
    const selectedInsurer = insurers.find(ins => ins.name === value);
    console.log("Selected insurer code:", selectedInsurer?.code);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setInsurerSearchTerm("");
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
        <Building className="h-3.5 w-3.5 text-primary-600" />
        Insurer
      </label>
      <Select 
        value={insurer} 
        onValueChange={handleInsurerChange}
        onOpenChange={handleOpenChange}
      >
        <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-primary focus:border-primary h-9">
          <SelectValue placeholder="Select Insurer" />
        </SelectTrigger>
        <SelectContent 
          className="z-50 bg-white border-gray-200 shadow-lg max-h-[300px]" 
          position="popper"
        >
          <div className="px-3 py-2 sticky top-0 bg-white z-10 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search insurers..."
                value={insurerSearchTerm}
                onChange={(e) => setInsurerSearchTerm(e.target.value)}
                className="pl-8 h-8 text-sm border-gray-200"
              />
            </div>
          </div>
          <SelectGroup>
            <SelectLabel className="text-xs font-semibold text-gray-500 px-3">Insurers</SelectLabel>
            <div className="max-h-[200px] overflow-y-auto">
              {filteredInsurers.length > 0 ? (
                filteredInsurers.map((ins) => (
                  <SelectItem key={ins.code} value={ins.name} className="text-sm">
                    {ins.name}
                  </SelectItem>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500 italic">
                  No insurers found
                </div>
              )}
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default InsurerSelector;
