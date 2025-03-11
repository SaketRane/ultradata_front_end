
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import DataSelector from "@/components/DataSelector";
import Logo from "@/components/Logo";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "UltraData | Dashboard";
  }, []);
  
  const handleLogout = () => {
    toast.info('Logging out...');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary-500 rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary-100 text-primary-700">JD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium hidden md:inline-block">John Doe</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-50 bg-white/95 backdrop-blur-sm">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-6 page-transition">
        <div className="mb-8">
          {/* Removed the "Access your property and casualty data below" text */}
        </div>
        
        <section className="mb-8">
          <DataSelector className="w-full" />
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-lg shadow-md animate-fade-up" style={{animationDelay: '100ms'}}>
            <h3 className="text-lg font-semibold mb-2">Recent Reports</h3>
            <Separator className="my-3" />
            <p className="text-gray-500 text-sm">Select a data configuration to view reports</p>
          </div>
          
          <div className="glass p-6 rounded-lg shadow-md animate-fade-up" style={{animationDelay: '200ms'}}>
            <h3 className="text-lg font-semibold mb-2">Saved Filters</h3>
            <Separator className="my-3" />
            <p className="text-gray-500 text-sm">No saved filters yet</p>
          </div>
          
          <div className="glass p-6 rounded-lg shadow-md animate-fade-up" style={{animationDelay: '300ms'}}>
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <Separator className="my-3" />
            <p className="text-gray-500 text-sm">Select data to view statistics</p>
          </div>
        </section>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
