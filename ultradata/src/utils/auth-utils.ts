/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, UserProfile } from '@/types/auth';

// Development mode configuration
// This is explicitly separated from production code for clarity
export const DEV_MODE =
  import.meta.env?.NODE_ENV === 'development' &&
  import.meta.env.VITE_USE_MOCK_AUTH === 'true';

// Development mock user and profile (only used in DEV_MODE)
export const mockUser: User | null = DEV_MODE
  ? {
      id: 'dev-user-id',
      email: 'dev@example.com',
    }
  : null;

export const mockProfile: UserProfile | null = DEV_MODE
  ? {
      id: 'dev-user-id',
      email: 'dev@example.com',
      role: 'admin' as const,
      company_id: null,
    }
  : null;

/**
 * Fetch user profile
 * This is a placeholder implementation that will be replaced with PostgreSQL
 */
export const fetchUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  if (DEV_MODE) {
    console.log('Dev mode: returning mock profile');
    return mockProfile;
  }

  try {
    // This is a placeholder for PostgreSQL implementation
    console.log('Fetching user profile for:', userId);
    return null;
  } catch (error: any) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }
};
