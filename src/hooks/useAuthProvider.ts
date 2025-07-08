/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserProfile } from '@/types/auth';
import { DEV_MODE, mockUser, mockProfile } from '@/utils/auth-utils';
import {
  signIn,
  signUp,
  signOut as authSignOut,
  verifyTwoFactor,
  resetPassword,
  updatePassword,
  fetchCurrentUserProfile,
} from '@/services/auth-service';
import { toast } from 'sonner';

/**
 * Custom hook that provides authentication functionality
 */
export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(DEV_MODE ? mockUser : null);
  const [profile, setProfile] = useState<UserProfile | null>(
    DEV_MODE ? mockProfile : null,
  );
  const [loading, setLoading] = useState(!DEV_MODE);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Authentication state and session management
  useEffect(() => {
    if (DEV_MODE) {
      console.log('Development mode: Using mock auth data');
      setLoading(false);
      return;
    }

    return () => {
      console.log('Auth listener cleanup');
    };
  }, []);

  // Enhanced sign out handler
  const handleSignOut = useCallback(async () => {
    if (DEV_MODE) {
      console.log('Dev mode: Simulating sign out');
      setUser(null);
      setProfile(null);
      navigate('/');
      toast.success('Signed out successfully');
      return;
    }

    setLoading(true);
    try {
      const { error } = await authSignOut();
      if (!error) {
        setUser(null);
        setProfile(null);
        navigate('/');
        toast.success('Signed out successfully');
      } else {
        toast.error('Sign out failed: ' + error.message);
      }
    } catch (err: any) {
      console.error('Sign out error:', err);
      // Fallback sign out - still clear local state even if API call fails
      setUser(null);
      setProfile(null);
      navigate('/');
      toast.success('Signed out successfully');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Check if user is an admin
  const isAdmin = profile?.role === 'admin';

  return {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut: handleSignOut,
    verifyTwoFactor,
    resetPassword,
    updatePassword,
    isAdmin,
  };
};
