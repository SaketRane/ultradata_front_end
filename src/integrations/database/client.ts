
/**
 * This file will be replaced with an HTTP client for Spring Boot API integration.
 * 
 * The development team should implement proper API calls to the Spring Boot backend
 * using fetch, axios, or another HTTP client of their choice.
 */

// Base API URL - Update this when Spring Boot backend is available
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Simple HTTP client for Spring Boot API integration
export const apiClient = {
  /**
   * Perform a GET request to the Spring Boot API
   * @param endpoint - API endpoint path (without base URL)
   * @param queryParams - Optional query parameters
   * @returns Promise with the API response
   */
  get: async <T>(endpoint: string, queryParams: Record<string, string> = {}): Promise<T> => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    console.log(`[API] GET ${url}`);
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
  },

  /**
   * Perform a POST request to the Spring Boot API
   * @param endpoint - API endpoint path (without base URL)
   * @param data - Data to send in the request body
   * @returns Promise with the API response
   */
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    console.log(`[API] POST ${API_BASE_URL}${endpoint}`);
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
  },

  /**
   * Perform a PUT request to the Spring Boot API
   * @param endpoint - API endpoint path (without base URL)
   * @param data - Data to send in the request body
   * @returns Promise with the API response
   */
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    console.log(`[API] PUT ${API_BASE_URL}${endpoint}`);
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
  },

  /**
   * Perform a DELETE request to the Spring Boot API
   * @param endpoint - API endpoint path (without base URL)
   * @returns Promise with the API response
   */
  delete: async <T>(endpoint: string): Promise<T> => {
    console.log(`[API] DELETE ${API_BASE_URL}${endpoint}`);
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
  },
};

// Backward compatibility export
export const db = apiClient;

