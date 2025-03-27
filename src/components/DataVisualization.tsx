
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getVisualizationTitle } from "@/utils/visualization-utils";
import VisualizationMapper from "./visualizations/VisualizationMapper";
import { useFilters } from "@/contexts/FilterContext";

const DataVisualization: React.FC = () => {
  const { section, sheet, sheetCode } = useFilters();

  // If no section or sheet is selected, don't render anything
  if (!section || !sheet || !sheetCode) {
    return null;
  }

  // Get the title for the visualization
  const title = getVisualizationTitle(section, sheetCode);
  if (!title) {
    return null;
  }

  return (
    <section className="mb-4 w-full mx-auto">
      <Card className="shadow-lg glass w-full">
        <CardContent className="p-3">
          <h2 className="text-lg font-semibold mb-3">{title}</h2>
          <VisualizationMapper 
            section={section} 
            sheet={sheet} 
            sheetCode={sheetCode} 
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default DataVisualization;
