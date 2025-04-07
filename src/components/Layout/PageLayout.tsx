
import React from "react";

interface PageLayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
  bgClass?: string;
}

/**
 * Generic page layout component for consistent page structure
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  content,
  footer,
  bgClass = "bg-background",
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      {header}
      {content}
      {footer}
    </div>
  );
};
