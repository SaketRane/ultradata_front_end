
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import DataFilterSelector from "@/components/DataFilterSelector";
import DataVisualization from "@/components/DataVisualization";
import { sectionSheetsMapping } from "@/constants/sectionSheets";
import { Dices, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";

/**
 * Modern dashboard component with enhanced UI
 */
const Dashboard: React.FC = () => {
  // State for filter selections
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");
  const [availableSheets, setAvailableSheets] = useState<Array<{code: string, label: string}>>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Memoized state handlers to prevent unnecessary re-renders
  const handleYearChange = useCallback((value: string) => setYear(value), []);
  const handleInsurerChange = useCallback((value: string) => setInsurer(value), []);
  
  const handleSectionChange = useCallback((value: string) => {
    setSection(value);
    // Reset sheet when section changes
    setSheet("");
  }, []);
  
  const handleSheetChange = useCallback((value: string) => setSheet(value), []);

  // Update available sheets when section changes
  useEffect(() => {
    if (section) {
      setAvailableSheets(sectionSheetsMapping[section].sheets);
    } else {
      setAvailableSheets([]);
    }
  }, [section]);

  const handleRandomSelection = () => {
    // Get random selections for demo purposes
    const sections = Object.keys(sectionSheetsMapping);
    const randomSection = sections[Math.floor(Math.random() * sections.length)];
    
    setSection(randomSection);
    
    // Set random sheet after availableSheets updates
    setTimeout(() => {
      const sheets = sectionSheetsMapping[randomSection].sheets;
      const randomSheet = sheets[Math.floor(Math.random() * sheets.length)].label;
      setSheet(randomSheet);
      
      // Also set year and insurer
      setYear("2020");
      setInsurer("Sample Insurance Company");
      
      toast.success("Random data selections applied", {
        description: "Visualizing sample data for demonstration purposes"
      });
    }, 100);
  };

  // Set page title
  useEffect(() => {
    document.title = "UltraData | Dashboard";
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Sidebar - collapsible */}
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 container mx-auto px-4 py-8 page-transition data-container">
          {/* Dashboard Summary Banner */}
          <div className="mb-6">
            <Card className="bg-gradient-to-r from-primary-600 to-primary-700 border-none text-white shadow-lg">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2">Financial Data Dashboard</h1>
                <p className="text-primary-100 max-w-3xl">
                  Select your filters below to visualize financial data. Use the sidebar for quick navigation 
                  between different sections.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Main Filters Card */}
            <div className="lg:col-span-3">
              <Card className="shadow-md border border-gray-100 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Data Filters</h2>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1 text-xs border-primary-300 text-primary-700 hover:text-primary-800"
                        onClick={handleRandomSelection}
                      >
                        <Dices className="h-3.5 w-3.5" />
                        <span>Sample Data</span>
                      </Button>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <HelpCircle className="h-4 w-4" />
                              <span className="sr-only">Help</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">Select a year, insurer, section, and sheet to view financial data visualizations.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <DataFilterSelector 
                    year={year}
                    setYear={handleYearChange}
                    insurer={insurer}
                    setInsurer={handleInsurerChange}
                    section={section}
                    setSection={handleSectionChange}
                    sheet={sheet}
                    setSheet={handleSheetChange}
                    availableSheets={availableSheets}
                    sectionSheetsMapping={sectionSheetsMapping}
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Stats Summary Card */}
            <div className="lg:col-span-1">
              <Card className="shadow-md h-full bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
                <CardContent className="p-4 flex flex-col h-full justify-center">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Selected Data</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Year:</span>
                      <span className="font-medium">{year || "—"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Insurer:</span>
                      <span className="font-medium truncate max-w-[120px]">{insurer || "—"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Section:</span>
                      <span className="font-medium">{section || "—"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Sheet:</span>
                      <span className="font-medium truncate max-w-[120px]">{sheet || "—"}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Data Visualization Area */}
          <Card className="shadow-lg border border-gray-100 bg-white/90 backdrop-blur-sm mb-6">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Visualization</h2>
              <div className="bg-gray-50 rounded-md p-1">
                <DataVisualization 
                  section={section}
                  sheet={sheet}
                  availableSheets={availableSheets}
                />
              </div>
            </CardContent>
          </Card>
        </main>
        
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;
