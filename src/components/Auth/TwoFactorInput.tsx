
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

interface TwoFactorInputProps {
  email: string;
  onVerify: (token: string) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
}

const TwoFactorInput: React.FC<TwoFactorInputProps> = ({
  email,
  onVerify,
  onCancel,
  isLoading,
  error
}) => {
  const [token, setToken] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (token.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }
    
    await onVerify(token);
  };

  return (
    <Card className="w-full max-w-md shadow-lg glass animate-fade-up">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">Two-Factor Authentication</CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <InputOTP maxLength={6} value={token} onChange={setToken}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <div className="text-sm text-muted-foreground text-center mt-2">
              Didn't receive a code? Check your spam folder or contact your administrator.
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-between mt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full sm:w-auto" 
              onClick={onCancel}
              disabled={isLoading}
            >
              Back to Login
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto" 
              disabled={isLoading || token.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TwoFactorInput;
