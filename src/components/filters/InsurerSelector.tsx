/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InsurerSelectorProps {
  insurer: string;
  setInsurer: (insurer: string) => void;
  options: any;
}

const InsurerSelector: React.FC<InsurerSelectorProps> = ({
  insurer,
  setInsurer,
  options,
}) => {
  const [insurerSearchTerm, setInsurerSearchTerm] = useState<string>('');
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Define parent-child relationships based on the API data structure
  const parentChildMappings = {
    // Allianz
    "D037": ["D037", "D063"], // Allianz Global Risks US Insurance Company + Euler Hermes
    // Allstate
    "A030": ["A030", "A321", "A639", "A648"], // Allstate + Esurance + Pafco + Pembridge
    // Aviva
    "A390": ["A390", "A393", "A310", "A685", "A807", "A751", "A820", "A823"], // Aviva + subsidiaries
    // Chubb
    "A196": ["A196", "D273"], // Chubb + Federal Insurance
    // Co-operators
    "A252": ["A252", "A255", "A770"], // Co-operators + CUMIS + Sovereign
    // Definity
    "A300": ["A300", "A748", "A350"], // Definity + Petline + Sonnet
    // Desjardins
    "A000": ["A000", "A191", "A193"], // Desjardins + Certas Direct + Certas Home and Auto
    // Intact
    "A480": ["A480", "A135", "A522", "A470", "A115", "A720", "A735", "A835", "A895"], // Intact + subsidiaries
    // Northbridge
    "A246": ["A246", "A325", "A249", "A935"], // Northbridge + Federated + Verassure + Zenith
    // Security National (TD)
    "A760": ["A760", "A085", "A635", "A045", "A717"], // Security National + Primmum + TD Direct + TD General + TD Home and Auto
    // Tokio Marine
    "D770": ["D770", "A815"], // Tokio Marine + Tokio Marine Canada
    // Travelers
    "A555": ["A555", "A270", "D672"] // Travelers + Dominion of Canada + St. Paul Fire and Marine
  };

  // Create hierarchical structure from API data
  const createHierarchicalStructure = () => {
    const hierarchicalInsurers: any[] = [];
    const processedCodes = new Set<string>();

    // Filter out hidden companies first
    const availableInsurers = options.filter(ins => !hiddenCompanyCodes.includes(ins.code));

    // Create parent-child groups
    Object.entries(parentChildMappings).forEach(([parentCode, childCodes]) => {
      const parentInsurer = availableInsurers.find(ins => ins.code === parentCode);
      if (parentInsurer) {
        const children = childCodes
          .filter(code => code !== parentCode) // Don't include parent as child of itself
          .map(code => availableInsurers.find(ins => ins.code === code))
          .filter(Boolean); // Remove undefined entries

        if (children.length > 0) {
          hierarchicalInsurers.push({
            ...parentInsurer,
            isParent: true,
            children: [
              { ...parentInsurer, parentCode: parentCode }, // Parent as first child
              ...children.map(child => ({ ...child, parentCode: parentCode }))
            ]
          });
          
          // Mark all codes as processed
          childCodes.forEach(code => processedCodes.add(code));
        }
      }
    });

    // Add remaining insurers that weren't part of any hierarchy
    const remainingInsurers = availableInsurers.filter(ins => !processedCodes.has(ins.code));
    
    return [...hierarchicalInsurers, ...remainingInsurers].sort((a, b) => a.name.localeCompare(b.name));
  };

  const hierarchicalInsurers = createHierarchicalStructure();

  // Filter based on search term and auto-expand parents when searching for children
  const filteredInsurers = insurerSearchTerm.length > 0
    ? hierarchicalInsurers.filter(ins => {
        // Clean the name for search (remove code suffix)
        const cleanName = ins.name.replace(/\s*\([A-Z0-9]+\)_[DF]$/, '').toLowerCase();
        const searchTerm = insurerSearchTerm.toLowerCase();
        
        if (ins.isParent && ins.children) {
          // For parent companies, search in parent name and all children names
          const parentMatch = cleanName.includes(searchTerm);
          const childrenMatch = ins.children.some(child => {
            const childCleanName = child.name.replace(/\s*\([A-Z0-9]+\)_[DF]$/, '').toLowerCase();
            return childCleanName.includes(searchTerm);
          });
          
          // Auto-expand parent if searching for a child OR parent itself
          if ((childrenMatch || parentMatch) && !expandedParents.has(ins.code)) {
            setExpandedParents(prev => new Set(prev).add(ins.code));
          }
          
          return parentMatch || childrenMatch;
        } else {
          // For regular insurers
          return cleanName.includes(searchTerm);
        }
      })
    : hierarchicalInsurers;

  const handleInsurerChange = (value: string) => {
    setInsurer(value);
    
    // Find the insurer in the options (API data)
    const selectedInsurer = options.find((ins: any) => ins.name === value);
    console.log('Selected insurer code:', selectedInsurer?.code);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setInsurerSearchTerm('');
    }
  };

  const toggleParentExpansion = (parentCode: string) => {
    setExpandedParents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(parentCode)) {
        newSet.delete(parentCode);
      } else {
        newSet.add(parentCode);
      }
      return newSet;
    });
  };

  // Ensure input maintains focus
  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }, [insurerSearchTerm]);

  return (
    <div className="space-y-0.5">
      <label className="text-xs font-medium">Insurer</label>
      <Select
        value={insurer}
        onValueChange={handleInsurerChange}
        onOpenChange={handleOpenChange}
      >
        <SelectTrigger className="w-full h-8 text-xs text-center">
          <SelectValue placeholder="Select Insurer" />
        </SelectTrigger>
        <SelectContent
          className="z-50 bg-white/95 backdrop-blur-sm border-border max-h-[300px] dropdown-data"
          position="popper"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div
            className="px-3 py-1 sticky top-0 bg-white z-10 border-b"
            style={{ top: '-5px' }}
          >
            <div className="relative">
              <Search className="absolute left-2 top-1.5 h-3 w-3 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Search insurers..."
                value={insurerSearchTerm}
                onChange={(e) => {
                  e.stopPropagation();
                  setInsurerSearchTerm(e.target.value);
                }}
                className="pl-7 h-7 text-xs border-0 focus:ring-0 focus:ring-offset-0"
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                onFocus={(e) => {
                  e.stopPropagation();
                }}
                onBlur={(e) => {
                  e.stopPropagation();
                }}
                autoFocus
              />
            </div>
          </div>
          <SelectGroup>
            <SelectLabel className="px-3 pt-1">Insurers</SelectLabel>
            {filteredInsurers.length > 0 ? (
              filteredInsurers.map((ins, index) => {
                // Remove code pattern like (A321)_D from the name
                const cleanName = ins.name.replace(/\s*\([A-Z0-9]+\)_[DF]$/, '');
                
                if (ins.isParent && ins.children) {
                  const isExpanded = expandedParents.has(ins.code);
                  const hasChildren = ins.children && ins.children.length > 0;
                  const isSearching = insurerSearchTerm.length > 0;
                  
                  return (
                    <div key={ins.code}>
                      {/* Parent Insurer - Bold and Expandable, inline with other insurers, selectable */}
                      <div className="flex items-center">
                        {hasChildren && !isSearching && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleParentExpansion(ins.code);
                            }}
                            className="p-1 hover:bg-gray-100 rounded mr-2"
                          >
                                    {isExpanded ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                          </button>
                        )}
                        <SelectItem 
                          value={ins.name}
                          className={isSearching ? "w-full" : "flex-1"}
                        >
                          <span className="font-bold text-sm">{cleanName}</span>
                        </SelectItem>
                      </div>
                      
                      {/* Children Insurers - Indented and Selectable - Always show when expanded OR when searching */}
                      {(isExpanded || isSearching) && ins.children && (
                        <div className="ml-8">
                          {ins.children.map((childInsurer) => {
                            // When searching, check if parent matches - if so, show all children
                            if (isSearching) {
                              const parentCleanName = ins.name.replace(/\s*\([A-Z0-9]+\)_[DF]$/, '').toLowerCase();
                              const parentMatch = parentCleanName.includes(insurerSearchTerm.toLowerCase());
                              const childCleanName = childInsurer.name.replace(/\s*\([A-Z0-9]+\)_[DF]$/, '').toLowerCase();
                              const childMatch = childCleanName.includes(insurerSearchTerm.toLowerCase());
                              
                              // Show child if either parent matches OR child itself matches
                              if (!parentMatch && !childMatch) {
                                return null;
                              }
                            }
                            
                            return (
                              <SelectItem 
                                key={childInsurer.code} 
                                value={childInsurer.name}
                                className="pl-6 pr-8"
                              >
                                <span className="text-sm text-gray-600 block">
                                  {childInsurer.name.replace(/\s*\([A-Z0-9]+\)_[DF]$/, '')}
                                </span>
                              </SelectItem>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  // Regular insurer
                  return (
                    <SelectItem key={`${ins.code}-${ins.name}`} value={ins.name}>
                      {cleanName}
                    </SelectItem>
                  );
                }
              })
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
