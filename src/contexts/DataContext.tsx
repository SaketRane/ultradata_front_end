
import React, { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DataContextProps {
  children: ReactNode;
}

interface DataContextType {
  fetchDataPoints: (sheetCode: string, year?: string, insurer?: string) => Promise<any[]>;
  isLoading: boolean;
  error: Error | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const fetchDataPoints = async (sheetCode: string, year?: string, insurer?: string) => {
    let query = supabase
      .from('insurance_data_points')
      .select('*')
      .eq('sheet_code', sheetCode);
    
    if (year) {
      query = query.eq('year', year);
    }
    
    if (insurer) {
      query = query.eq('insurer_code', insurer);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
    
    return data || [];
  };

  const { isLoading, error } = useQuery({
    queryKey: ['data-status'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('insurance_data_points')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw new Error(error.message);
      return { count };
    }
  });

  const value = {
    fetchDataPoints,
    isLoading,
    error
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
