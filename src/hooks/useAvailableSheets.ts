
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sectionSheetsMapping } from "@/constants/sectionSheets";
import { DEV_MODE } from "@/contexts/auth/auth-utils";

interface AvailableSheetsOptions {
  section: string;
  year: string;
  insurerCode: string | null;
}

export const useAvailableSheets = ({ section, year, insurerCode }: AvailableSheetsOptions) => {
  const [availableSheets, setAvailableSheets] = useState<Array<{code: string, label: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!section) {
      setAvailableSheets([]);
      return;
    }

    // First, get all possible sheets for this section from the static mapping
    const allSectionSheets = sectionSheetsMapping[section]?.sheets || [];
    
    if (!year || DEV_MODE) {
      // In dev mode, just use the static mapping
      setAvailableSheets(allSectionSheets);
      return;
    }

    // If we have a year and section, fetch the available sheets from the database
    const fetchAvailableSheets = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get sheet codes used in the database for this section, year, and insurer if specified
        let query = supabase
          .from("insurance_data_points")
          .select("sheet_code")
          .eq("year", parseInt(year));
        
        if (insurerCode) {
          query = query.eq("insurer_code", insurerCode);
        }
        
        const { data, error } = await query;

        if (error) throw error;

        if (!data || data.length === 0) {
          // No data for this year/section/insurer combination
          setAvailableSheets([]);
          setIsLoading(false);
          return;
        }

        // Get unique sheet codes from the response
        const availableSheetCodes = [...new Set(data.map(item => item.sheet_code))];
        
        // Map the sheet codes to their labels using our static mapping
        const mappedSheets = allSectionSheets.filter(sheet => 
          availableSheetCodes.includes(sheet.code)
        );

        setAvailableSheets(mappedSheets);
      } catch (err: any) {
        console.error("Error fetching available sheets:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSheets();
  }, [section, year, insurerCode]);

  return { availableSheets, isLoading, error };
};
