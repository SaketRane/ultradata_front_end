
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EyeIcon, EyeOffIcon, Mail, Lock, User, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SuperAdminSetup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [superadminExists, setSuperadminExists] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Check if a superadmin already exists
  useEffect(() => {
    const checkSuperadmin = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("role", "superadmin")
          .limit(1);

        if (error) throw error;
        
        setSuperadminExists(data && data.length > 0);
      } catch (error) {
        console.error("Error checking for superadmin:", error);
        toast.error("Error checking for superadmin status");
        setErrorMessage("Failed to check if a superadmin already exists. Please refresh the page.");
      } finally {
        setIsChecking(false);
      }
    };

    checkSuperadmin();
  }, []);

  const validateForm = () => {
    setErrorMessage(null);
    
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return false;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      console.log("Calling create-superadmin function with email:", email);
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("create-superadmin", {
        body: { email, password }
      });
      
      console.log("Response from create-superadmin function:", data);
      
      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to create superadmin");
      }
      
      if (data && data.error) {
        console.error("Function returned error:", data.error);
        throw new Error(data.error);
      }
      
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error("Error creating superadmin:", error);
      
      let message = "Failed to create superadmin";
      
      if (error.message) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else if (error.error) {
        message = error.error;
      }
      
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <Card className="w-full max-w-md animate-pulse">
        <CardHeader>
          <CardTitle className="h-8 bg-gray-200 rounded"></CardTitle>
          <CardDescription className="h-4 bg-gray-100 rounded"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </CardFooter>
      </Card>
    );
  }

  if (superadminExists) {
    return (
      <Card className="w-full max-w-md shadow-lg glass">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">System Set Up</CardTitle>
          <CardDescription className="text-center">
            A superadmin account has already been configured for this system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <User className="h-16 w-16 mx-auto text-primary" />
            <p className="mt-4">Please log in with your superadmin credentials or contact your system administrator for access.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-md shadow-lg glass animate-fade-up">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">Create Superadmin Account</CardTitle>
          <CardDescription className="text-center">
            Set up the initial superadmin account for your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Superadmin Account"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Superadmin Account Created</AlertDialogTitle>
            <AlertDialogDescription>
              The superadmin account has been successfully created. You can now log in with your email and password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => window.location.reload()}>
              Proceed to Login
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SuperAdminSetup;
