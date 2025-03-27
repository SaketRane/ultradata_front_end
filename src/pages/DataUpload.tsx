
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";

const DataUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      navigate("/dashboard");
      toast.error("You need admin privileges to access this page");
    }
  }, [isAdmin, isSuperAdmin, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file to upload");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a valid CSV file");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n");
        
        // Skip header if exists
        const startIndex = lines[0].toLowerCase().includes("year") ? 1 : 0;
        const totalRows = lines.length - startIndex;
        
        // Process in smaller batches to prevent timeout and show progress better
        const batchSize = 100; // Reduced batch size for more frequent progress updates
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
            .filter(item => item !== null);
          
          if (batch.length > 0) {
            try {
              // Use RPC to bypass RLS - note the records parameter is passed correctly
              const { data, error } = await supabase.rpc('insert_insurance_data', {
                records: batch
              });
              
              if (error) {
                console.error("Upload error:", error);
                toast.error(`Error in batch: ${error.message}`);
              } else {
                successfulRows += batch.length;
              }
            } catch (batchError: any) {
              console.error("Batch error:", batchError);
              toast.error(`Error processing batch: ${batchError.message}`);
            }
          }
          
          processedRows += batch.length;
          // Update progress more frequently
          setProgress(Math.min(100, Math.round((processedRows / totalRows) * 100)));
          
          // Add a small delay to allow UI updates and avoid freezing
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        if (successfulRows > 0) {
          toast.success(`Successfully uploaded ${successfulRows} data points`);
        } else {
          toast.error("No data was successfully uploaded. Check console for details.");
        }
        
        setUploading(false);
        setFile(null);
      };
      
      reader.onerror = () => {
        toast.error("Error reading file");
        setUploading(false);
      };
      
      reader.readAsText(file);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Error uploading data: ${error.message}`);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Data Upload</h1>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Insurance Data</CardTitle>
            <CardDescription>
              Upload a CSV file containing insurance data points with columns: Year, Insurer Code, Sheet Code, Value
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors block"
                >
                  {file ? file.name : "Click to select a CSV file"}
                  <p className="text-sm text-gray-500 mt-1">
                    Format: Year, Insurer Code, Sheet Code, Value
                  </p>
                </label>
              </div>
              
              {uploading && (
                <div className="w-full">
                  <Progress value={progress} className="h-2 bg-gray-200" />
                  <p className="text-sm text-center mt-2">{progress}% complete</p>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full"
            >
              {uploading ? "Uploading..." : "Upload Data"}
            </Button>
          </CardFooter>
        </Card>
      </main>
      
      <DashboardFooter />
    </div>
  );
};

export default DataUpload;
