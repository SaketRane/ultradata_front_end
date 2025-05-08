
import React from "react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { 
  BarChart4, 
  FileText, 
  PieChart, 
  Layers, 
  Database, 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  HelpCircle 
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left transition-colors",
      active
        ? "bg-primary text-primary-foreground"
        : "text-gray-600 hover:bg-primary/10 hover:text-primary-700"
    )}
  >
    <Icon className="h-5 w-5" />
    <span className="font-medium">{label}</span>
  </button>
);

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b flex items-center justify-between h-16">
        <div className={cn("overflow-hidden", isOpen ? "w-auto" : "w-0")}>
          <Logo size="sm" />
        </div>
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 hover:bg-gray-100 text-gray-500"
          aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {isOpen ? (
          <nav className="space-y-1">
            <NavItem icon={BarChart4} label="Dashboard" active />
            <NavItem icon={FileText} label="Reports" />
            <NavItem icon={PieChart} label="Analytics" />
            <NavItem icon={Layers} label="Models" />
            <NavItem icon={Database} label="Data Sources" />
          </nav>
        ) : (
          <nav className="flex flex-col items-center space-y-4 pt-2">
            <button className="p-2 bg-primary rounded-lg text-primary-foreground">
              <BarChart4 className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <FileText className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <PieChart className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <Layers className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <Database className="h-5 w-5" />
            </button>
          </nav>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t">
        {isOpen ? (
          <div className="space-y-1">
            <NavItem icon={Settings} label="Settings" />
            <NavItem icon={HelpCircle} label="Help & Support" />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
