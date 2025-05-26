
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getVisualizationTitle, getSheetCode } from "@/utils/visualization-utils";
import VisualizationMapper from "./visualizations/VisualizationMapper";

interface DataVisualizationProps {
  section: string;
  sheet: string;
  availableSheets: Array<{code: string, label: string}>;
}

/**
 * Renders the appropriate data visualization based on selected section and sheet.
 * Uses memoization to prevent unnecessary re-renders.
 */
const DataVisualization: React.FC<DataVisualizationProps> = ({
  section,
  sheet,
  availableSheets
}) => {
  // If no section or sheet is selected, don't render anything
  if (!section || !sheet) {
    return null;
  }

  // Get the sheet code from the selected sheet
  const sheetCode = useMemo(() => 
    getSheetCode(sheet, availableSheets),
    [sheet, availableSheets]
  );
  
  if (!sheetCode) {
    console.debug(`No sheet code found for sheet: ${sheet}`);
    return null;
  }

  // Get the title for the visualization
  const title = useMemo(() => 
    getVisualizationTitle(section, sheetCode),
    [section, sheetCode]
  );
  
  if (!title) {
    console.debug(`No title found for section: ${section}, sheetCode: ${sheetCode}`);
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

export default React.memo(DataVisualization);
