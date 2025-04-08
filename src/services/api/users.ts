import apiClient from './client';
import { User, ApiResponse } from './types';

export class UsersService {
  /**
   * Create a new user
   */
  public async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>('/users', userData);
    return response.data;
  }
  
  /**
   * Get a user by ID
   */
  public async getUserById(userId: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
    return response.data;
  }
  
  /**
   * Update a user's information
   */
  public async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${userId}`, userData);
    return response.data;
  }
  
  /**
   * Find a user by email
   */
  public async findUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await apiClient.get<ApiResponse<User[]>>('/users', {
        email: email
      });
      
      if (response.data.length > 0) {
        return response.data[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }
}

// Create and export a singleton instance
export const usersService = new UsersService();

export default usersService; 