/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';
import { DEV_MODE } from '@/utils/auth-utils';
import { apiClient } from '@/integrations/database/client';
import { User, UserProfile } from '@/types/auth';
import axios from 'axios';
import api from '@/api/api';

const baseURL = 'http://194.163.164.118:8094/api';
const API_SIGN_URL = '/authorization/login';
const API_RESET_PASSWORD_URL = '/authorization/password/restore/send';
const API_NEW_PASSWORD_URL = '/authorization/password/restore/confirm';

/**
 * Sign in with email and password
 * This implementation will work with Spring Security
 */
export const signIn = async (email: string, password: string) => {
  try {
    // This would call the Spring Boot login endpoint
    const response: any = await axios.post(baseURL + API_SIGN_URL, {
      email: email,
      password: password,
    });

    const data = response.data;

    const { accessToken, refreshToken } = data.data;
    localStorage.setItem('access', accessToken);
    localStorage.setItem('refresh', refreshToken);

    return { success: data.success, data: data.data };

    // After login, fetch the user profile
    // This mimics how Spring Security typically works with separate endpoints
    // const userData = await apiClient.get<User>('/auth/user');

    // return { error: null, needsTwoFactor: false, user: userData };
  } catch (err: any) {
    const response = err?.response;
    const data = response.data.data;

    toast.error('Incorrect username or password!');

    return { status: response.status, body: data, success: false };
  }
};

/**
 * Sign up with email and password
 * This implementation will work with Spring Security
 */
export const signUp = async (email: string, password: string) => {
  if (DEV_MODE) {
    console.log('Dev mode: mock successful signup');
    return { error: null };
  }

  try {
    await apiClient.post('/auth/register', {
      email,
      password,
    });

    toast.success('Registration successful. Please log in.');
    return { error: null };
  } catch (err: any) {
    console.error('Registration error:', err);
    toast.error(err.message || 'Registration failed');
    return { error: { message: err.message || 'Registration failed' } };
  }
};

/**
 * Sign out the current user
 * This implementation will work with Spring Security
 */
export const signOut = async () => {
  if (DEV_MODE) {
    console.log('Dev mode: mock successful sign out');
    return { error: null };
  }

  try {
    await apiClient.post('/auth/logout', {});
    return { error: null };
  } catch (err: any) {
    console.error('Logout error:', err);
    toast.error(err.message || 'Logout failed');
    return { error: { message: err.message || 'Logout failed' } };
  }
};

/**
 * Verify two-factor authentication
 * This implementation will work with Spring Security
 * @param token The two-factor authentication token
 */
export const verifyTwoFactor = async (token: string) => {
  if (DEV_MODE) {
    console.log('Dev mode: mock successful 2FA verification');
    return { error: null };
  }

  try {
    await apiClient.post('/auth/verify-2fa', { token });
    return { error: null };
  } catch (err: any) {
    console.error('2FA verification error:', err);
    toast.error(err.message || '2FA verification failed');
    return { error: { message: err.message || '2FA verification failed' } };
  }
};

/**
 * Reset password
 * This implementation will work with Spring Security
 * @param email The email address to send the password reset link to
 */
export const resetPassword = async (email: string) => {
  try {
    // This would call the Spring Boot login endpoint
    const response: any = await axios.post(
      baseURL + API_RESET_PASSWORD_URL,
      {},
      { params: { email } },
    );

    const data = response.data;

    return { success: data.success };

    // After login, fetch the user profile
    // This mimics how Spring Security typically works with separate endpoints
    // const userData = await apiClient.get<User>('/auth/user');

    // return { error: null, needsTwoFactor: false, user: userData };
  } catch (err: any) {
    const response = err?.response;
    const data = response.data.data;

    toast.error('Incorrect username or password!');

    return { status: response.status, body: data, success: false };
  }
};

/**
 * Update password
 * This implementation will work with Spring Security
 * @param password The new password
 */
export const updatePassword = async (
  createPassword: string,
  confirmPassword: string,
  resetPasswordToken: string,
) => {
  try {
    // This would call the Spring Boot login endpoint
    const response: any = await axios.post(baseURL + API_RESET_PASSWORD_URL, {
      createPassword,
      confirmPassword,
      resetPasswordToken,
    });

    const data = response.data;

    return { success: data.success };

    // After login, fetch the user profile
    // This mimics how Spring Security typically works with separate endpoints
    // const userData = await apiClient.get<User>('/auth/user');

    // return { error: null, needsTwoFactor: false, user: userData };
  } catch (err: any) {
    const response = err?.response;
    const data = response.data.data;

    toast.error(
      'Unable to reset password due to an unknown error. Please try again.',
    );

    return { status: response.status, body: data, success: false };
  }
};

/**
 * Fetch user profile
 * This implementation will work with Spring Security
 */
export const fetchCurrentUserProfile =
  async (): Promise<UserProfile | null> => {
    if (DEV_MODE) {
      console.log('Dev mode: returning mock profile');
      return {
        id: 'dev-user-id',
        email: 'dev@example.com',
        role: 'admin',
        company_id: null,
      };
    }

    try {
      return await apiClient.get<UserProfile>('/auth/profile');
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      return null;
    }
  };
