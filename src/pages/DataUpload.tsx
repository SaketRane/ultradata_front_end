
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
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
import FileUploadZone from "@/components/DataUpload/FileUploadZone";
import UploadProgress from "@/components/DataUpload/UploadProgress";
import { processAndUploadCsv } from "@/services/csvUploadService";
import { DEV_MODE } from "@/contexts/auth/auth-utils";

const DataUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      navigate("/dashboard");
      toast.error("You need admin privileges to access this page");
    }
  }, [isAdmin, isSuperAdmin, navigate]);

  useEffect(() => {
    // Log authentication state for debugging
    if (DEV_MODE) {
      console.log("Dev mode is enabled");
      console.log("Admin status:", { isAdmin, isSuperAdmin });
    }
  }, [isAdmin, isSuperAdmin]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      
      // Log file size for debugging
      if (DEV_MODE) {
        console.log(`Selected file: ${e.target.files[0].name}, Size: ${(e.target.files[0].size / 1024 / 1024).toFixed(2)} MB`);
      }
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) {
      toast.error("Please select a CSV file to upload");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a valid CSV file");
      return;
    }

    // Show a warning for large files
    if (file.size > 10 * 1024 * 1024) {
      toast.warning("Uploading a large file. This may take some time.");
    }

    setUploading(true);
    setProgress(0);
    
    try {
      // Additional debug information
      if (DEV_MODE) {
        console.log("Starting upload in dev mode");
        toast.info("Dev mode is active - upload will be simulated");
      }
      
      const successfulRows = await processAndUploadCsv(
        file, 
        setProgress,
        // Provide cancellation handler
        () => {
          setUploading(false);
          setProgress(0);
        }
      );
      
      if (successfulRows > 0) {
        toast.success(`Successfully uploaded ${successfulRows} data points`);
      } else {
        toast.error("No data was successfully uploaded. Check console for details.");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Error uploading data: ${error.message}`);
    } finally {
      // Small delay before resetting upload state to ensure UI updates correctly
      setTimeout(() => {
        setUploading(false);
        setFile(null);
        setProgress(0);
      }, 500);
    }
  }, [file]);

  const handleCancelUpload = useCallback(() => {
    if (uploading) {
      setUploading(false);
      setProgress(0);
      toast.info("Upload cancelled");
    }
  }, [uploading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Data Upload</h1>
        
        {DEV_MODE && (
          <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm">
            <p className="font-bold">Dev Mode Active</p>
            <p>Admin status: {isAdmin ? "✅" : "❌"}</p>
            <p>Super Admin status: {isSuperAdmin ? "✅" : "❌"}</p>
          </div>
        )}
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Insurance Data</CardTitle>
            <CardDescription>
              Upload a CSV file containing insurance data points with columns: Year, Insurer Code, Sheet Code, Value
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <FileUploadZone 
                file={file} 
                onFileChange={handleFileChange}
                uploading={uploading}
              />
              
              <UploadProgress 
                progress={progress} 
                visible={uploading}
              />
              
              {uploading && (
                <Button
                  onClick={handleCancelUpload}
                  variant="destructive"
                  className="w-full mt-2"
                >
                  Cancel Upload
                </Button>
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
