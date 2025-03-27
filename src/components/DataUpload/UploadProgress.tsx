
import React from "react";
import ProgressIndicator from "./ProgressIndicator";

interface UploadProgressProps {
  progress: number;
  visible: boolean;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress, visible }) => {
  if (!visible) return null;
  
  return <ProgressIndicator progress={progress} />;
};

export default UploadProgress;
