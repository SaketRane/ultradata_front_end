
/**
 * This file will be replaced with an HTTP client for Spring Boot API integration.
 * 
 * The development team should implement proper API calls to the Spring Boot backend
 * using fetch, axios, or another HTTP client of their choice.
 */

// Base API URL - Update this when Spring Boot backend is available
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const MAX_RETRIES = 1; // Number of retry attempts for failed requests
const RETRY_DELAY = 1000; // Delay between retries in ms

// Helper for implementing delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simple HTTP client for Spring Boot API integration
export const apiClient = {
  /**
   * Perform a GET request to the Spring Boot API with retry logic
   * @param endpoint - API endpoint path (without base URL)
   * @param queryParams - Optional query parameters
   * @param retries - Number of retries attempted (internal use)
   * @returns Promise with the API response
   */
  get: async <T>(
    endpoint: string, 
    queryParams: Record<string, string> = {}, 
    retries = 0
  ): Promise<T> => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    console.log(`[API] GET ${url}`);
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Includes cookies for session-based auth
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${await response.text()}`);
      }

      return await response.json() as T;
    } catch (error) {
      // Implement retry logic
      if (retries < MAX_RETRIES) {
        console.log(`Request failed, retrying (${retries + 1}/${MAX_RETRIES})...`);
        await delay(RETRY_DELAY);
        return apiClient.get<T>(endpoint, queryParams, retries + 1);
      }
      throw error;
    }
  },

  /**
   * Perform a POST request to the Spring Boot API with retry logic
   * @param endpoint - API endpoint path (without base URL)
   * @param data - Data to send in the request body
   * @param retries - Number of retries attempted (internal use)
   * @returns Promise with the API response
   */
  post: async <T>(endpoint: string, data: any, retries = 0): Promise<T> => {
    console.log(`[API] POST ${API_BASE_URL}${endpoint}`);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Includes cookies for session-based auth
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${await response.text()}`);
      }

      return await response.json() as T;
    } catch (error) {
      // Implement retry logic for idempotent operations only
      if (retries < MAX_RETRIES) {
        console.log(`Request failed, retrying (${retries + 1}/${MAX_RETRIES})...`);
        await delay(RETRY_DELAY);
        return apiClient.post<T>(endpoint, data, retries + 1);
      }
      throw error;
    }
  },

  /**
   * Perform a PUT request to the Spring Boot API with retry logic
   * @param endpoint - API endpoint path (without base URL)
   * @param data - Data to send in the request body
   * @param retries - Number of retries attempted (internal use) 
   * @returns Promise with the API response
   */
  put: async <T>(endpoint: string, data: any, retries = 0): Promise<T> => {
    console.log(`[API] PUT ${API_BASE_URL}${endpoint}`);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Includes cookies for session-based auth
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${await response.text()}`);
      }

      return await response.json() as T;
    } catch (error) {
      // Implement retry logic
      if (retries < MAX_RETRIES) {
        console.log(`Request failed, retrying (${retries + 1}/${MAX_RETRIES})...`);
        await delay(RETRY_DELAY);
        return apiClient.put<T>(endpoint, data, retries + 1);
      }
      throw error;
    }
  },

  /**
   * Perform a DELETE request to the Spring Boot API
   * @param endpoint - API endpoint path (without base URL)
   * @param retries - Number of retries attempted (internal use)
   * @returns Promise with the API response
   */
  delete: async <T>(endpoint: string, retries = 0): Promise<T> => {
    console.log(`[API] DELETE ${API_BASE_URL}${endpoint}`);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Includes cookies for session-based auth
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${await response.text()}`);
      }

      return await response.json() as T;
    } catch (error) {
      // Implement retry logic
      if (retries < MAX_RETRIES) {
        console.log(`Request failed, retrying (${retries + 1}/${MAX_RETRIES})...`);
        await delay(RETRY_DELAY);
        return apiClient.delete<T>(endpoint, retries + 1);
      }
      throw error;
    }
  },
};

// Backward compatibility export
export const db = apiClient;
