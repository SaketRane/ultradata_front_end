
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DEV_MODE } from "@/contexts/auth/auth-utils";
import { Json } from "@/integrations/supabase/types";

interface CsvDataPoint {
  year: number;
  insurer_code: string;
  sheet_code: string;
  value: number;
}

// Utility function to convert CsvDataPoint to Json type
const convertToJson = (records: CsvDataPoint[]): Json[] => {
  return records as unknown as Json[];
};

// Throttle function to limit how often a function can be called
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean = false;
  return function(...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const processAndUploadCsv = async (
  file: File,
  onProgressUpdate: (progress: number) => void,
  onCancel?: () => void
): Promise<number> => {
  let isCancelled = false;

  // Set up cancellation handler if provided
  if (onCancel) {
    const originalOnCancel = onCancel;
    onCancel = () => {
      isCancelled = true;
      originalOnCancel();
    };
  }

  return new Promise((resolve, reject) => {
    onProgressUpdate(0);
    
    // Use FileReader to read the file as text chunks
    const reader = new FileReader();
    
    // Use a more memory-efficient reading approach
    const CHUNK_SIZE = 1024 * 1024; // 1MB chunks for reading
    let offset = 0;
    let processedRows = 0;
    let successfulRows = 0;
    let totalRows = 0;
    let headerSkipped = false;
    let buffer = '';
    
    // Create a throttled progress update function
    const throttledProgressUpdate = throttle((current: number, total: number) => {
      const progressPercent = Math.min(99, Math.round((current / total) * 100));
      onProgressUpdate(progressPercent);
    }, 300); // Update at most every 300ms
    
    // Efficiently process a chunk of CSV text
    const processChunk = async (chunk: string, isLastChunk: boolean = false) => {
      if (isCancelled) return;
      
      // Append new data to existing buffer
      buffer += chunk;
      
      // Split by newlines, keeping last potentially incomplete line in buffer
      const lines = buffer.split('\n');
      
      // Keep the last line in the buffer (unless this is the last chunk)
      if (!isLastChunk) {
        buffer = lines.pop() || '';
      }
      
      // Skip header if needed
      let startIndex = 0;
      if (!headerSkipped && lines.length > 0) {
        if (lines[0].toLowerCase().includes("year")) {
          startIndex = 1;
        }
        headerSkipped = true;
        
        // Estimate total rows for progress calculations
        totalRows = file.size / (lines.length > 1 ? lines[1].length : 50);
      }
      
      // Process batch of lines
      const batchSize = 250; // Optimal batch size for Supabase
      let batch: CsvDataPoint[] = [];
      
      for (let i = startIndex; i < lines.length; i++) {
        if (isCancelled) return;
        
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(",");
        if (values.length < 4) continue;
        
        try {
          batch.push({
            year: parseInt(values[0].trim()),
            insurer_code: values[1].trim(),
            sheet_code: values[2].trim(),
            value: parseFloat(values[3].trim())
          });
          
          // If batch is full, upload it
          if (batch.length >= batchSize) {
            await uploadBatch(batch);
            processedRows += batch.length;
            batch = [];
            
            // Update progress
            throttledProgressUpdate(processedRows, totalRows);
            
            // Add a small delay between batches
            await new Promise(resolve => setTimeout(resolve, 5));
          }
        } catch (err) {
          console.error("Error parsing line:", line, err);
        }
      }
      
      // Upload any remaining items in batch
      if (batch.length > 0 && !isCancelled) {
        await uploadBatch(batch);
        processedRows += batch.length;
        throttledProgressUpdate(processedRows, totalRows);
      }
    };
    
    // Upload a batch of data points
    const uploadBatch = async (batch: CsvDataPoint[]) => {
      if (batch.length === 0 || isCancelled) return;
      
      try {
        // In dev mode, bypass the RPC call entirely
        if (DEV_MODE) {
          successfulRows += batch.length;
          console.log("DEV MODE: Simulated successful upload of", batch.length, "rows");
        } else {
          // Use RPC to bypass RLS
          const { data, error } = await supabase.rpc('insert_insurance_data', {
            records: convertToJson(batch)
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
    };
    
    // Handle file reading in chunks
    const readNextChunk = () => {
      if (isCancelled) {
        reader.abort();
        resolve(successfulRows);
        return;
      }
      
      if (offset >= file.size) {
        // We've read the whole file, process final buffer
        processChunk('', true).then(() => {
          onProgressUpdate(100);
          resolve(successfulRows);
        });
        return;
      }
      
      // Read the next chunk
      const slice = file.slice(offset, offset + CHUNK_SIZE);
      reader.readAsText(slice);
    };
    
    // Set up FileReader events
    reader.onload = async (e) => {
      const chunk = e.target?.result as string;
      offset += CHUNK_SIZE;
      
      await processChunk(chunk);
      readNextChunk();
    };
    
    reader.onerror = (error) => {
      console.error("File read error:", error);
      reject(error);
    };
    
    // Start reading the file
    readNextChunk();
  });
};
