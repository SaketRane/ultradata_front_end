
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DEV_MODE } from "@/contexts/auth/auth-utils";

interface FilterOptions {
  years: string[];
  insurers: { code: string; name: string }[];
  isLoading: boolean;
  error: string | null;
}

export const useFilterOptions = () => {
  const [options, setOptions] = useState<FilterOptions>({
    years: [],
    insurers: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        if (DEV_MODE) {
          console.log("Dev mode: Using mock filter options");
          // Return early with mock data in dev mode
          return;
        }

        // Fetch distinct years
        const { data: yearsData, error: yearsError } = await supabase
          .from("insurance_data_points")
          .select("year")
          .order("year", { ascending: false })
          .then(result => ({
            ...result,
            data: result.data ? Array.from(new Set(result.data.map(item => item.year))) : []
          }));

        if (yearsError) throw yearsError;

        // Fetch distinct insurer codes
        const { data: insurersData, error: insurersError } = await supabase
          .from("insurance_data_points")
          .select("insurer_code")
          .order("insurer_code")
          .then(result => ({
            ...result,
            data: result.data ? Array.from(new Set(result.data.map(item => item.insurer_code))) : []
          }));

        if (insurersError) throw insurersError;

        // Map insurer codes to the insurer names from our existing data
        const mappedInsurers = insurersData.map(insurer => ({
          code: insurer.insurer_code,
          name: insurer.insurer_code // Default to code if no mapping found
        }));

        setOptions({
          years: yearsData.map(year => year.year.toString()),
          insurers: mappedInsurers,
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        console.error("Error fetching filter options:", error);
        setOptions(prev => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        toast.error(`Error loading filter options: ${error.message}`);
      }
    };

    fetchOptions();
  }, []);

  return options;
};
