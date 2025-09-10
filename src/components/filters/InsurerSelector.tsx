
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
import { insurers } from "@/data/insurers";

interface InsurerSelectorProps {
  insurer: string;
  setInsurer: (insurer: string) => void;
}

const InsurerSelector: React.FC<InsurerSelectorProps> = ({ insurer, setInsurer }) => {
  const [insurerSearchTerm, setInsurerSearchTerm] = useState<string>("");
  
  // List of company codes to temporarily hide
  const hiddenCompanyCodes = [
    "A041", // Ascentus Insurance Ltd
    "A095", // Canadian Direct Insurance Incorporated
    "A254", // Coseco Insurance Company
    "A258", // DAS Legal Protection Insurance Company Limited
    "A460", // Guarantee Company of North America (The)
    "A515", // ACE INA Insurance
    "A530", // Kings Mutual Insurance Company (The)
    "A560", // Northbridge Commercial Insurance Corporation
    "A580", // Missisquoi Insurance Company (The)
    "A660", // Perth Insurance Company
    "A680", // Pictou County Farmers' Mutual Fire Insurance Company
    "A870", // Waterloo Insurance Company
    "D165", // Caisse Centrale de Reassurance
    "D765", // T.H.E. Insurance Company
    "D862", // Virginia Surety Company Inc.
    "D871", // XL Insurance Company SE
    "D416", // HDI Global Specialty SE
  ];
  
  // Filter out hidden companies first, then apply search filter
  const availableInsurers = insurers.filter(ins => !hiddenCompanyCodes.includes(ins.code));
  
  const filteredInsurers = insurerSearchTerm.length > 0
    ? availableInsurers.filter(ins => 
        ins.name.toLowerCase().startsWith(insurerSearchTerm.toLowerCase()))
    : availableInsurers;

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
