
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DataFetchOptions {
  tableName: string;
  column?: string;
  distinct?: boolean;
  limit?: number;
  orderBy?: { column: string; ascending: boolean };
  filters?: Record<string, any>;
}

export function useDataFetching<T>(options: DataFetchOptions) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabase.from(options.tableName);

        // Apply distinct selection if needed
        if (options.distinct && options.column) {
          query = query.select(options.column, { count: 'exact', head: false });
        } else {
          query = query.select('*');
        }

        // Apply filters
        if (options.filters) {
          Object.entries(options.filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
              query = query.eq(key, value);
            }
          });
        }

        // Apply ordering
        if (options.orderBy) {
          query = query.order(options.orderBy.column, { 
            ascending: options.orderBy.ascending 
          });
        }

        // Apply pagination
        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data: responseData, error: responseError } = await query;

        if (responseError) {
          throw responseError;
        }

        // For distinct queries, transform data to expected format
        if (options.distinct && options.column && responseData) {
          const uniqueValues = [...new Set(responseData.map(item => item[options.column!]))];
          setData(uniqueValues as unknown as T[]);
        } else {
          setData(responseData as T[]);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message);
        toast.error(`Failed to fetch data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    options.tableName, 
    options.distinct, 
    options.column,
    options.limit,
    options.orderBy?.column,
    options.orderBy?.ascending,
    JSON.stringify(options.filters)
  ]);

  return { data, isLoading, error };
}
