
import React, { useState, useEffect } from "react";
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
    
    try {
      const successfulRows = await processAndUploadCsv(file, setProgress);
      
      if (successfulRows > 0) {
        toast.success(`Successfully uploaded ${successfulRows} data points`);
      } else {
        toast.error("No data was successfully uploaded. Check console for details.");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Error uploading data: ${error.message}`);
    } finally {
      setUploading(false);
      setFile(null);
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
              <FileUploadZone 
                file={file} 
                onFileChange={handleFileChange}
                uploading={uploading}
              />
              
              <UploadProgress 
                progress={progress} 
                visible={uploading}
              />
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
