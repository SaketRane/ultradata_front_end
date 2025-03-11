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
import PremiumsTable from "@/components/PremiumsTable";

const sectionSheetsMapping = {
  "Financial Statements": {
    code: "FS",
    sheets: [
      { code: "2010", label: "Assets" },
      { code: "2020", label: "Liabilities, Equity, Head Office Account, Reserves & AOCI" },
      { code: "2030", label: "Statement of Income" },
      { code: "2042", label: "Comprehensive Income(Loss) & Accumulated Other Comprehensive Income(Loss)" },
      { code: "2045", label: "Reserves" },
      { code: "2045", label: "Head Office Account" },
      { code: "2054", label: "Statement of Changes in Equity" },
    ]
  },
  "Investments": {
    code: "INV",
    sheets: [
      { code: "4007", label: "Summary of Investments" },
      { code: "4080", label: "Other Loans and Invested Assets" },
    ]
  },
  "Premiums, Claims, & LAE": {
    code: "PCL",
    sheets: [
      { code: "6020", label: "Premiums and Claims" },
      { code: "6021", label: "Undiscounted Claims Incurred" },
      { code: "6021", label: "Discounted Amounts and Foreign Exchange" },
      { code: "6021", label: "Gains and Losses on Investments" },
      { code: "6030", label: "Claims and Adjustment Expenses - Paid, Current Year and Unpaid, Current and Prior Year" },
    ]
  },
  "Provincial Stats": {
    code: "PROV",
    sheets: [
      { code: "6710", label: "Premiums Written" },
      { code: "6720", label: "Premiums Earned" },
      { code: "6730", label: "Claims Incurred including Adjustment Expenses" },
      { code: "6731", label: "Claims Incurred including Adjustment Expenses - Undiscounted" },
    ]
  },
  "Commissions & Expenses": {
    code: "CE",
    sheets: [
      { code: "8010", label: "Commissions" },
    ]
  },
  "Reinsurance": {
    code: "REIN",
    sheets: [
      { code: "7050", label: "Registered Reinsurance" },
      { code: "7060", label: "Unregistered Reinsurance (Canadian)" },
      { code: "7061", label: "Unregistered Reinsurance (Foreign)" },
    ]
  },
  "MCT/BAAT": {
    code: "MCT",
    sheets: [
      { code: "3061", label: "Minimum Capital Test/Branch Adequacy of Assets Test" },
      { code: "3062", label: "Minimum Capital Test: Capital Available" },
      { code: "3092", label: "Branch Adequacy of Assets Test: Net Assets Available" },
      { code: "3064", label: "Insurance Risk: Capital/Margin Required for Unpaid Claims and Premium Liabilities" },
      { code: "3066", label: "Market Risk Capital/Margin Requirements" },
      { code: "3071", label: "Credit Risk: Capital Required for Balance Sheet Assets" },
      { code: "3081", label: "Credit Risk: Margins Required for Balance Sheet Assets" },
      { code: "3073", label: "Credit Risk: Capital/Margin Required for Balance Sheet/Vested Assets based on External Credit Ratings" },
      { code: "3074", label: "Credit Risk: Capital Required for Balance Sheet Assets based on External Credit Ratings (Québec**)" },
      { code: "3075", label: "Credit Risk: Capital/Margin Required for Off-Balance Sheet Exposures" },
      { code: "3077", label: "Credit Risk: Capital/Margin Required for Collateral held for Unregistered Reinsurance Exposures and Self-Insured Retention" },
      { code: "3079", label: "Operational Risk: Capital/Margin Required" },
    ]
  }
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");
  const [insurerSearchTerm, setInsurerSearchTerm] = useState<string>("");
  const [availableSheets, setAvailableSheets] = useState<Array<{code: string, label: string}>>([]);

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

  useEffect(() => {
    if (section) {
      setAvailableSheets(sectionSheetsMapping[section].sheets);
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

  const shouldShowPremiumsTable = () => {
    return section === "Provincial Stats" && 
           availableSheets.find(s => s.code === "6710")?.label === sheet;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto py-2 px-1">
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
      
      <main className="flex-1 container mx-auto py-4 px-0.5 page-transition data-container">
        <section className="mb-3 w-full mx-auto">
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
        </section>
        
        {shouldShowPremiumsTable() && (
          <section className="mb-4 w-full mx-auto">
            <Card className="shadow-lg glass w-full">
              <CardContent className="p-3">
                <h2 className="text-xl font-semibold mb-3">Premiums Written by Province</h2>
                <PremiumsTable />
              </CardContent>
            </Card>
          </section>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-2">
        <div className="container mx-auto px-1 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
