
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DEV_MODE } from "@/contexts/auth/auth-utils";

interface CsvDataPoint {
  year: number;
  insurer_code: string;
  sheet_code: string;
  value: number;
}

export const processAndUploadCsv = async (
  file: File,
  onProgressUpdate: (progress: number) => void
): Promise<number> => {
  return new Promise((resolve, reject) => {
    onProgressUpdate(0);
    
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n");
        
        // Skip header if exists
        const startIndex = lines[0].toLowerCase().includes("year") ? 1 : 0;
        const totalRows = lines.length - startIndex;
        
        // Process in smaller batches
        const batchSize = 100;
        let processedRows = 0;
        let successfulRows = 0;
        
        for (let i = startIndex; i < lines.length; i += batchSize) {
          if (lines.length <= i) break;
          
          const batch = lines.slice(i, Math.min(i + batchSize, lines.length))
            .filter(line => line.trim() !== "")
            .map(line => {
              const values = line.split(",");
              if (values.length < 4) return null;
              
              try {
                return {
                  year: parseInt(values[0].trim()),
                  insurer_code: values[1].trim(),
                  sheet_code: values[2].trim(),
                  value: parseFloat(values[3].trim())
                };
              } catch (err) {
                console.error("Error parsing line:", line, err);
                return null;
              }
            })
            .filter(item => item !== null) as CsvDataPoint[];
          
          if (batch.length > 0) {
            try {
              // Convert batch to format expected by RPC function
              const recordsArray = batch.map(item => ({
                year: item.year,
                insurer_code: item.insurer_code,
                sheet_code: item.sheet_code,
                value: item.value
              }));
              
              // In dev mode, bypass the RPC call entirely
              if (DEV_MODE) {
                successfulRows += batch.length;
                console.log("DEV MODE: Simulated successful upload of", batch.length, "rows");
              } else {
                // Use RPC to bypass RLS
                const { data, error } = await supabase.rpc('insert_insurance_data', {
                  records: recordsArray
                });
                
                if (error) {
                  console.error("Upload error:", error);
                  toast.error(`Error in batch: ${error.message}`);
                } else {
                  successfulRows += batch.length;
                }
              }
            } catch (batchError: any) {
              console.error("Batch error:", batchError);
              toast.error(`Error processing batch: ${batchError.message}`);
            }
          }
          
          processedRows += batch.length;
          // Update progress more frequently
          onProgressUpdate(Math.min(100, Math.round((processedRows / totalRows) * 100)));
          
          // Add a small delay to allow UI updates
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        resolve(successfulRows);
      } catch (error: any) {
        console.error("Process error:", error);
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsText(file);
  });
};
