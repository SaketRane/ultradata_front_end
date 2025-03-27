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
        
        // Increase batch size for better performance but not too large to prevent memory issues
        const batchSize = 250;
        let processedRows = 0;
        let successfulRows = 0;
        
        // Throttle progress updates to reduce UI refreshes
        let lastProgressUpdate = 0;
        const progressUpdateInterval = 500; // ms
        
        const updateProgressThrottled = (current: number) => {
          const now = Date.now();
          if (now - lastProgressUpdate >= progressUpdateInterval) {
            const progressPercent = Math.min(99, Math.round((current / totalRows) * 100));
            onProgressUpdate(progressPercent);
            lastProgressUpdate = now;
          }
        };
        
        // Process in chunks to avoid memory issues
        for (let i = startIndex; i < lines.length; i += batchSize) {
          if (lines[i].trim() === "") continue;
          
          const endIndex = Math.min(i + batchSize, lines.length);
          const batch = [];
          
          // Process current batch
          for (let j = i; j < endIndex; j++) {
            const line = lines[j].trim();
            if (line === "") continue;
            
            const values = line.split(",");
            if (values.length < 4) continue;
            
            try {
              batch.push({
                year: parseInt(values[0].trim()),
                insurer_code: values[1].trim(),
                sheet_code: values[2].trim(),
                value: parseFloat(values[3].trim())
              });
            } catch (err) {
              console.error("Error parsing line:", line, err);
            }
          }
          
          if (batch.length > 0) {
            try {
              // In dev mode, bypass the RPC call entirely
              if (DEV_MODE) {
                successfulRows += batch.length;
                console.log("DEV MODE: Simulated successful upload of", batch.length, "rows");
              } else {
                // Use RPC to bypass RLS
                const { data, error } = await supabase.rpc('insert_insurance_data', {
                  records: batch
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
          updateProgressThrottled(processedRows);
          
          // Add a small delay between batches to allow UI to breathe
          // Use a shorter delay to keep things moving
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        // Ensure we show 100% at the end
        onProgressUpdate(100);
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
