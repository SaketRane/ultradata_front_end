
import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

type SizeMapping = {
  [key in Required<LogoProps>['size']]: string;
};

/**
 * Logo component with configurable size
 * Uses TypeScript for better type safety and autocompletion
 */
const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  // Map sizes to corresponding Tailwind classes
  const sizeClasses: SizeMapping = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/Logo.png" 
        alt="UltraData Logo" 
        className="h-10 w-32 object-contain"
      />
    </div>
  );
};

export default React.memo(Logo);
