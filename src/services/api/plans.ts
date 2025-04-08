import apiClient from './client';
import { DataPlan, ApiResponse } from './types';

export class PlansService {
  /**
   * Get all available data plans
   */
  public async getAllPlans(): Promise<DataPlan[]> {
    const response = await apiClient.get<ApiResponse<DataPlan[]>>('/plans');
    return response.data;
  }
  
  /**
   * Get plans filtered by country code (ISO-2)
   */
  public async getPlansByCountry(countryCode: string): Promise<DataPlan[]> {
    const response = await apiClient.get<ApiResponse<DataPlan[]>>('/plans', {
      country: countryCode
    });
    return response.data;
  }
  
  /**
   * Get plans filtered by region
   */
  public async getPlansByRegion(region: string): Promise<DataPlan[]> {
    const response = await apiClient.get<ApiResponse<DataPlan[]>>('/plans', {
      region: region
    });
    return response.data;
  }
  
  /**
   * Get a specific plan by ID
   */
  public async getPlanById(planId: string): Promise<DataPlan> {
    const response = await apiClient.get<ApiResponse<DataPlan>>(`/plans/${planId}`);
    return response.data;
  }
}

// Create and export a singleton instance
export const plansService = new PlansService();

export default plansService; 