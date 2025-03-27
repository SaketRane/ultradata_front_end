
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";

// Define valid table names to improve type safety
type ValidTableName = 'companies' | 'company_invitations' | 'insurance_data_points' | 'profiles';

interface DataFetchOptions {
  tableName: ValidTableName;
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
        // Start with the basic query
        let query = supabase.from(options.tableName);

        // Apply select - must be called before filters, ordering, etc.
        if (options.distinct && options.column) {
          query = query.select(options.column, { count: 'exact', head: false });
        } else {
          query = query.select('*');
        }

        // Apply filters after select
        if (options.filters) {
          Object.entries(options.filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
              // We need to type cast here since TypeScript doesn't recognize
              // that after select(), eq() becomes available
              query = (query as any).eq(key, value);
            }
          });
        }

        // Apply ordering after filters
        if (options.orderBy) {
          query = (query as any).order(options.orderBy.column, { 
            ascending: options.orderBy.ascending 
          });
        }

        // Apply pagination as the last operation before executing
        if (options.limit) {
          query = (query as any).limit(options.limit);
        }

        // Execute the query and get the response
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
