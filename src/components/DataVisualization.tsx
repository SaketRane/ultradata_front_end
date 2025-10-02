
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getVisualizationTitle, getSheetCode } from "@/utils/visualization-utils";
import VisualizationMapper from "./visualizations/VisualizationMapper";

interface DataVisualizationProps {
  section: string;
  sheet: string;
  availableSheets: Array<{code: string, label: string}>;
  insurerType?: string | null;
  year?: string;
}

/**
 * Renders the appropriate data visualization based on selected section and sheet.
 * Uses memoization to prevent unnecessary re-renders.
 */
const DataVisualization: React.FC<DataVisualizationProps> = ({
  section,
  sheet,
  availableSheets,
  insurerType,
  year
}) => {
  console.log('DataVisualization rendering with:', { section, sheet, year, insurerType });
  
  // Get the sheet code from the selected sheet
  const sheetCode = useMemo(() => 
    getSheetCode(sheet, availableSheets),
    [sheet, availableSheets]
  );
  
  console.log('DataVisualization - sheetCode:', sheetCode);

  // Get the title for the visualization
  const title = useMemo(() => 
    getVisualizationTitle(section, sheetCode),
    [section, sheetCode]
  );

  // If no section or sheet is selected, don't render anything
  if (!section || !sheet) {
    return null;
  }
  
  if (!sheetCode) {
    console.debug(`No sheet code found for sheet: ${sheet}`);
    return null;
  }
  
  if (!title) {
    console.debug(`No title found for section: ${section}, sheetCode: ${sheetCode}`);
    return null;
  }

  return (
    <section className="mb-0 h-full flex flex-col">
      <Card className="shadow-lg glass flex-1 flex flex-col">
        <CardContent className="p-1 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-1 flex-shrink-0">
            <h2 className="text-lg font-semibold ml-2">{title}</h2>
            {insurerType && (
              <span className="text-lg font-semibold mr-2">
                {insurerType}
              </span>
            )}
          </div>
          <div className="flex-1 min-h-0 flex flex-col">
            <VisualizationMapper 
              section={section} 
              sheet={sheet} 
              sheetCode={sheetCode}
              year={year}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default React.memo(DataVisualization);
