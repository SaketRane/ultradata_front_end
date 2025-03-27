
import React from "react";
import { Input } from "@/components/ui/input";
import FileLabel from "./FileLabel";

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
        className="cursor-pointer block"
      >
        <FileLabel fileName={file ? file.name : null} />
      </label>
    </div>
  );
};

export default FileUploadZone;
