
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // State for the dropdown values
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");

  // Mock data for dropdowns
  const years = ["2024", "2023", "2022", "2021", "2020"];
  const insurers = ["Allianz", "AXA", "Zurich", "Liberty Mutual", "Travelers", "Chubb"];
  const sections = ["Claims", "Premiums", "Policies", "Exposure", "Losses"];
  const sheets = ["Summary", "Detailed", "YoY Comparison", "Quarterly", "Regional"];
  
  useEffect(() => {
    document.title = "UltraData | Dashboard";
  }, []);
  
  const handleLogout = () => {
    toast.info('Logging out...');
    setTimeout(() => {
      navigate('/');
    }, 1000);
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
