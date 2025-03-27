
import React from "react";

interface FileLabelProps {
  fileName: string | null;
}

const FileLabel: React.FC<FileLabelProps> = ({ fileName }) => {
  return (
    <>
      <span className="block text-blue-600 hover:text-blue-800 transition-colors">
        {fileName || "Click to select a CSV file"}
      </span>
      <p className="text-sm text-gray-500 mt-1">
        Format: Year, Insurer Code, Sheet Code, Value
      </p>
    </>
  );
};

export default FileLabel;
