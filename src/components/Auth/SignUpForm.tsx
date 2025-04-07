
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const validatePassword = (password: string) => {
    // Password must be at least 8 characters, include a number, uppercase, and lowercase letter
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    
    return minLength && hasNumber && hasUppercase && hasLowercase;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters and include a number, uppercase, and lowercase letter");
      toast.error("Password does not meet requirements");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return;
      }
      
      setIsSuccess(true);
      toast.success("Account created successfully! Please check your email to confirm your account.");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md shadow-lg glass animate-fade-up">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">Account Created</CardTitle>
          <CardDescription className="text-center">
            Please check your email to verify your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-primary-50 border-primary-200">
            <AlertDescription>
              We've sent a confirmation email to <strong>{email}</strong>. 
              Please click the link in the email to verify your account.
            </AlertDescription>
          </Alert>
          <Button 
            type="button" 
            className="w-full" 
            onClick={() => navigate("/")}
          >
            Return to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg glass animate-fade-up">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your work email and create a password
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
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
            <div className="text-xs text-muted-foreground">
              Password must be at least 8 characters and include a number, uppercase, and lowercase letter.
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                className="pl-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button 
            onClick={() => navigate("/")}
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Sign in
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
