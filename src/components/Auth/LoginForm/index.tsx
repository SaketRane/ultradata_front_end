
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StandardLoginForm from "./StandardLoginForm";
import TwoFactorForm from "./TwoFactorForm";
import LoginFooter from "./LoginFooter";
import { useLoginForm } from "./useLoginForm";

/**
 * Main login form component that manages the authentication UI
 * Supports both standard email/password login and two-factor authentication
 */
const LoginForm: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    showTwoFactorInput,
    twoFactorCode,
    setTwoFactorCode,
    handleSubmit,
    handleTwoFactorSubmit,
    handleResetPassword,
  } = useLoginForm();

  return (
    <Card className="w-full max-w-md shadow-lg glass animate-fade-up">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">Sign in to your account</CardTitle>
        <CardDescription className="text-center">
          Enter your work email and password to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showTwoFactorInput ? (
          <StandardLoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            handleResetPassword={handleResetPassword}
          />
        ) : (
          <TwoFactorForm
            twoFactorCode={twoFactorCode}
            setTwoFactorCode={setTwoFactorCode}
            handleTwoFactorSubmit={handleTwoFactorSubmit}
            isLoading={isLoading}
            error={error}
          />
        )}
      </CardContent>
      <LoginFooter />
    </Card>
  );
};

export default LoginForm;
