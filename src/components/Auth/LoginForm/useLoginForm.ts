/* eslint-disable @typescript-eslint/no-explicit-any */
import { signIn } from '@/services/auth-service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Custom hook for login form state and behavior
 * Encapsulates all login-related logic
 */
export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      signIn(email, password).then((response) => {
        if (response.success) {
          toast.success('Successfully logged in');
          navigate('/dashboard');
        }
      });
      setIsLoading(false);
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
      toast.error('Please enter your two-factor code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // const { error } = await verifyTwoFactor(twoFactorCode);
      // if (error) {
      //   setError(error.message);
      //   toast.error(error.message);
      //   return;
      // }
      // toast.success('Successfully logged in');
      // navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = () => {
    navigate('/forgot-password');
  };

  return {
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
  };
};
