
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  
  const navigate = useNavigate();
  const { signIn, verifyTwoFactor } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error, needsTwoFactor } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return;
      }
      
      if (needsTwoFactor) {
        setShowTwoFactorInput(true);
        toast.info("Please enter your two-factor authentication code");
        return;
      }
      
      toast.success("Successfully logged in");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!twoFactorCode) {
      toast.error("Please enter your two-factor code");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await verifyTwoFactor(twoFactorCode);
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return;
      }
      
      toast.success("Successfully logged in");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <Card className="w-full max-w-md shadow-lg glass animate-fade-up">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">Sign in to your account</CardTitle>
        <CardDescription className="text-center">
          Enter your work email and password to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!showTwoFactorInput ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button 
                  type="button" 
                  onClick={handleResetPassword}
                  className="text-sm text-primary-600 hover:text-primary-500 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twoFactorCode">Two-Factor Authentication Code</Label>
              <Input
                id="twoFactorCode"
                type="text"
                placeholder="Enter your 6-digit code"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                required
                maxLength={6}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate("/signup")}
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Contact your administrator
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
