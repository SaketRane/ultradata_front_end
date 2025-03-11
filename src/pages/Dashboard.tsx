
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Bell, ChevronDown, LogOut, Search, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { insurers } from "@/data/insurers";
import { Input } from "@/components/ui/input";

// Define section-to-sheets mapping with internal codes
const sectionSheetsMapping = {
  "Financial Statements": {
    code: "FS",
    sheets: [
      { code: "BAL", label: "Balance Sheet" },
      { code: "INC", label: "Income Statement" },
      { code: "CF", label: "Cash Flow" },
      { code: "EQ", label: "Equity" },
      { code: "YOY", label: "YoY Comparison" },
    ]
  },
  "Investments": {
    code: "INV",
    sheets: [
      { code: "SUM", label: "Summary" },
      { code: "DET", label: "Detailed" },
      { code: "ALL", label: "Allocation" },
      { code: "PERF", label: "Performance" },
    ]
  },
  "Premiums, Claims, & LAE": {
    code: "PCL",
    sheets: [
      { code: "SUM", label: "Summary" },
      { code: "LOB", label: "By Line of Business" },
      { code: "QTR", label: "Quarterly" },
      { code: "RATIO", label: "Loss Ratios" },
    ]
  },
  "Provincial Stats": {
    code: "PROV",
    sheets: [
      { code: "SUM", label: "Summary" },
      { code: "DET", label: "Detailed" },
      { code: "MAP", label: "Map View" },
      { code: "TREND", label: "Trends" },
    ]
  },
  "Commissions & Expenses": {
    code: "CE",
    sheets: [
      { code: "SUM", label: "Summary" },
      { code: "RATIO", label: "Expense Ratios" },
      { code: "TREND", label: "Trends" },
      { code: "COMP", label: "Competitive Analysis" },
    ]
  },
  "Reinsurance": {
    code: "REIN",
    sheets: [
      { code: "SUM", label: "Summary" },
      { code: "PROG", label: "Programs" },
      { code: "REC", label: "Recoveries" },
      { code: "PERF", label: "Performance" },
    ]
  },
  "MCT/BAAT": {
    code: "MCT",
    sheets: [
      { code: "CURR", label: "Current Ratio" },
      { code: "HIST", label: "Historical" },
      { code: "PROJ", label: "Projection" },
      { code: "PEER", label: "Peer Comparison" },
    ]
  }
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // State for the dropdown values
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");
  const [insurerSearchTerm, setInsurerSearchTerm] = useState<string>("");
  const [availableSheets, setAvailableSheets] = useState<Array<{code: string, label: string}>>([]);

  // Mock data for dropdowns - updated years to include 2024-2014 with "Coming Soon" label for 2024
  const years = [
    { value: "2024", label: "2024 (Coming Soon)", disabled: true },
    { value: "2023", label: "2023" },
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
  
  // Updated sections list based on user request
  const sections = Object.keys(sectionSheetsMapping);
  
  // Filter insurers based on search term
  const filteredInsurers = insurerSearchTerm.length > 0
    ? insurers.filter(ins => 
        ins.name.toLowerCase().startsWith(insurerSearchTerm.toLowerCase()))
    : insurers;
  
  // Update available sheets when section changes
  useEffect(() => {
    if (section) {
      setAvailableSheets(sectionSheetsMapping[section].sheets);
      // Reset sheet selection when section changes
      setSheet("");
    } else {
      setAvailableSheets([]);
    }
  }, [section]);
  
  useEffect(() => {
    document.title = "UltraData | Dashboard";
  }, []);
  
  const handleLogout = () => {
    toast.info('Logging out...');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  // When an insurer is selected, we'll get both the name (displayed) and the code (stored)
  const handleInsurerChange = (value: string) => {
    setInsurer(value);
    // The code is stored in the background, but we don't need to display it
    const selectedInsurer = insurers.find(ins => ins.name === value);
    console.log("Selected insurer code:", selectedInsurer?.code);
  };

  // When a section is selected, we'll get both the name (displayed) and the code (stored)
  const handleSectionChange = (value: string) => {
    setSection(value);
    const selectedSection = sectionSheetsMapping[value];
    console.log("Selected section code:", selectedSection.code);
  };

  // When a sheet is selected, we'll get both the name (displayed) and the code (stored)
  const handleSheetChange = (value: string) => {
    setSheet(value);
    const selectedSheet = availableSheets.find(s => s.label === value);
    console.log("Selected sheet code:", selectedSheet?.code);
  };

  // Reset search when closing the dropdown
  const handleInsurerOpenChange = (open: boolean) => {
    if (!open) {
      setInsurerSearchTerm("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary-500 rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary-100 text-primary-700">JD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium hidden md:inline-block">John Doe</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-50 bg-white/95 backdrop-blur-sm">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-6 page-transition">
        <section className="mb-8">
          <Card className="shadow-lg glass w-full">
            <CardContent className="p-6">
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Insurer</label>
                  <Select 
                    value={insurer} 
                    onValueChange={handleInsurerChange}
                    onOpenChange={handleInsurerOpenChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Insurer" />
                    </SelectTrigger>
                    <SelectContent 
                      className="z-50 bg-white/95 backdrop-blur-sm border-border max-h-[300px]" 
                      position="popper"
                    >
                      <div className="px-3 py-2 sticky top-0 bg-white z-10 border-b">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search insurers..."
                            value={insurerSearchTerm}
                            onChange={(e) => setInsurerSearchTerm(e.target.value)}
                            className="pl-8 h-9"
                          />
                        </div>
                      </div>
                      <SelectGroup>
                        <SelectLabel className="px-3 pt-2">Insurers</SelectLabel>
                        {filteredInsurers.length > 0 ? (
                          filteredInsurers.map((ins) => (
                            <SelectItem key={ins.code} value={ins.name}>
                              {ins.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-muted-foreground">
                            No insurers found
                          </div>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Section</label>
                  <Select value={section} onValueChange={handleSectionChange}>
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
                  <Select 
                    value={sheet} 
                    onValueChange={handleSheetChange}
                    disabled={!section}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={!section ? "Select Section First" : "Select Sheet"} />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white/95 backdrop-blur-sm border-border" position="popper">
                      <SelectGroup>
                        <SelectLabel>Sheets</SelectLabel>
                        {availableSheets.length > 0 ? (
                          availableSheets.map((s) => (
                            <SelectItem key={s.code} value={s.label}>
                              {s.label}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-muted-foreground">
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
        </section>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
