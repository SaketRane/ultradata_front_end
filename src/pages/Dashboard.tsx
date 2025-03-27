
import React, { useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import DataFilterSelector from "@/components/DataFilterSelector";
import DataVisualization from "@/components/DataVisualization";
import { FilterProvider } from "@/contexts/FilterContext";

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = "UltraData | Dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <DashboardHeader />
      
      <FilterProvider>
        <main className="flex-1 container mx-auto py-4 px-0.5 page-transition data-container">
          <section className="mb-3 w-full mx-auto">
            <DataFilterSelector />
          </section>
          
          <DataVisualization />
        </main>
      </FilterProvider>
      
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
