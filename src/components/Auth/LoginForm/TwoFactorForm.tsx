
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TwoFactorFormProps {
  twoFactorCode: string;
  setTwoFactorCode: (code: string) => void;
  handleTwoFactorSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({
  twoFactorCode,
  setTwoFactorCode,
  handleTwoFactorSubmit,
  isLoading,
  error,
}) => {
  return (
    <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
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
  );
};

export default TwoFactorForm;
