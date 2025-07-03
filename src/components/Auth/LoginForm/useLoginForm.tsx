/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const navigate = useNavigate();
  const { signIn, verifyTwoFactor } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
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
        toast.info('Please enter your two-factor authentication code');
        return;
      }

      toast.success('Successfully logged in');
      navigate('/dashboard');
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
      const { error } = await verifyTwoFactor(twoFactorCode);

      if (error) {
        setError(error.message);
        toast.error(error.message);
        return;
      }

      toast.success('Successfully logged in');
      navigate('/dashboard');
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
