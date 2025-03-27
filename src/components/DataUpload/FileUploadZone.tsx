
import React from "react";
import { Input } from "@/components/ui/input";

interface FileUploadZoneProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ file, onFileChange, uploading }) => {
  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
      <Input
        type="file"
        accept=".csv"
        onChange={onFileChange}
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
  );
};

export default FileUploadZone;
