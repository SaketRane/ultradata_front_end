
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
    <div className={cn("font-semibold flex items-center gap-2", sizeClasses[size], className)}>
      <div className="relative">
        <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">U</span>
        </div>
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary-300 rounded-full animate-pulse-slow"></div>
      </div>
      <span className="text-gradient">UltraData</span>
    </div>
  );
};

export default React.memo(Logo);
