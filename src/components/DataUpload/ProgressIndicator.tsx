
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  progress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <Progress value={progress} className="h-2 bg-gray-200" />
      <p className="text-sm text-center mt-2">{progress}% complete</p>
    </div>
  );
};

export default ProgressIndicator;
