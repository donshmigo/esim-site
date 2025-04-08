import { AuthToken, ApiError } from './types';

class ApiClient {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;
  private token: AuthToken | null = null;
  private tokenExpiry: number = 0;
  
  constructor() {
    this.baseUrl = import.meta.env.VITE_DROAM_API_BASE_URL || 'https://api.droam.com';
    this.clientId = import.meta.env.VITE_DROAM_API_CLIENT_ID || '';
    this.clientSecret = import.meta.env.VITE_DROAM_API_CLIENT_SECRET || '';
    
    if (!this.clientId || !this.clientSecret) {
      console.warn('Droam API credentials not configured properly');
    }
  }
  
  /**
   * Get the current authentication token, refreshing if needed
   */
  private async getToken(): Promise<string> {
    const now = Date.now();
    
    // If token is expired or will expire in the next minute, refresh it
    if (!this.token || now >= this.tokenExpiry - 60000) {
      await this.refreshToken();
    }
    
    return this.token?.access_token || '';
  }
  
  /**
   * Refresh the authentication token
   */
  private async refreshToken(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      });
      
      if (!response.ok) {
        throw await this.handleErrorResponse(response);
      }
      
      this.token = await response.json() as AuthToken;
      
      // Set expiry time (subtract 5 minutes to be safe)
      this.tokenExpiry = Date.now() + (this.token.expires_in * 1000) - 300000;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }
  
  /**
   * Handle error responses from the API
   */
  private async handleErrorResponse(response: Response): Promise<ApiError> {
    try {
      const errorData = await response.json();
      return {
        message: errorData.message || 'An unknown error occurred',
        errors: errorData.errors,
        status_code: response.status,
      };
    } catch (e) {
      return {
        message: `API request failed with status ${response.status}`,
        status_code: response.status,
      };
    }
  }
  
  /**
   * Make an authenticated request to the API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Get authentication token
    const token = await this.getToken();
    
    // Prepare headers
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    // Make the request
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });
    
    // Handle non-successful responses
    if (!response.ok) {
      throw await this.handleErrorResponse(response);
    }
    
    // Return the parsed JSON response
    return response.json();
  }
  
  /**
   * Make a GET request to the API
   */
  public async get<T>(endpoint: string, queryParams: Record<string, string> = {}): Promise<T> {
    // Build query string
    const queryString = new URLSearchParams(queryParams).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request<T>(url, { method: 'GET' });
  }
  
  /**
   * Make a POST request to the API
   */
  public async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * Make a PUT request to the API
   */
  public async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * Make a DELETE request to the API
   */
  public async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

export default apiClient; 