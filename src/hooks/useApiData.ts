import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/integrations/database/client';

/**
 * Hook to fetch available years from the backend
 */
export const useYears = () => {
  return useQuery({
    queryKey: ['years'],
    queryFn: async () => {
      const response = await apiClient.post<{ yearList: Array<{ year: number; exist: boolean }> }>('/insurer/get/year', {});
      // Extract just the year numbers from the response
      return response.yearList?.map(item => item.year).sort((a, b) => b - a) || []; // Sort descending (newest first)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to fetch available insurers from the backend
 */
export const useInsurers = (year?: number) => {
  return useQuery({
    queryKey: ['insurers', year],
    queryFn: async () => {
      const response = await apiClient.post<{ insurerList: Array<{ name: string; code: string; countryCode: string | null; isDomestic: boolean; isChildren: boolean }> }>('/insurer/get/insurer', { year: year || 2024 });
      // Extract just the names from the response and sort them
      return response.insurerList?.map(item => item.name).sort() || [];
    },
    enabled: !!year, // Only fetch when year is selected
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to fetch financial data by code
 */
export const useFinancialData = (code: string) => {
  return useQuery({
    queryKey: ['financial-data', code],
    queryFn: async () => {
      const response = await apiClient.post<{ value: string | null; notExists: boolean }>('/data', { code });
      
      // Parse the string value to number
      let parsedValue: number | null = null;
      if (response.value && !response.notExists) {
        // Remove commas and parse as float
        const cleanValue = response.value.replace(/,/g, '');
        parsedValue = parseFloat(cleanValue);
        if (isNaN(parsedValue)) {
          parsedValue = null;
        }
      }
      
      return {
        value: parsedValue,
        notExists: response.notExists
      };
    },
    enabled: !!code,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

/**
 * Hook to fetch batch financial data
 */
export const useBatchFinancialData = (codes: string[]) => {
  return useQuery({
    queryKey: ['batch-financial-data', codes],
    queryFn: async () => {
      const response = await apiClient.post<Record<string, string>>('/data/batch', { codeList: codes });
      
      // Parse all string values to numbers
      const parsedResponse: Record<string, { value: number | null; notExists: boolean }> = {};
      
      if (response.values) {
        Object.entries(response.values).forEach(([code, value]) => {
          if (value === null || value === undefined) {
            parsedResponse[code] = { value: null, notExists: true };
          } else {
            // Remove commas and parse as float
            const cleanValue = value.replace(/,/g, '');
            const parsedValue = parseFloat(cleanValue);
            parsedResponse[code] = {
              value: isNaN(parsedValue) ? null : parsedValue,
              notExists: false
            };
          }
        });
      }
      
      return parsedResponse;
    },
    enabled: codes.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};
