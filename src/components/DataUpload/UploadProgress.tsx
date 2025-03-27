
import React from "react";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
  visible: boolean;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress, visible }) => {
  if (!visible) return null;
  
  return (
    <div className="w-full">
      <Progress value={progress} className="h-2 bg-gray-200" />
      <p className="text-sm text-center mt-2">{progress}% complete</p>
    </div>
  );
};

export default UploadProgress;
