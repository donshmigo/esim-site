import apiClient from './client';
import { ESIM, Usage, ApiResponse } from './types';

export class ESIMService {
  /**
   * Get all eSIMs for a user
   */
  public async getESIMs(userId: string): Promise<ESIM[]> {
    const response = await apiClient.get<ApiResponse<ESIM[]>>('/esims', {
      user_id: userId
    });
    return response.data;
  }
  
  /**
   * Get a specific eSIM by ID
   */
  public async getESIMById(esimId: string): Promise<ESIM> {
    const response = await apiClient.get<ApiResponse<ESIM>>(`/esims/${esimId}`);
    return response.data;
  }
  
  /**
   * Activate an eSIM
   */
  public async activateESIM(esimId: string): Promise<ESIM> {
    const response = await apiClient.post<ApiResponse<ESIM>>(`/esims/${esimId}/activate`, {});
    return response.data;
  }
  
  /**
   * Deactivate an eSIM
   */
  public async deactivateESIM(esimId: string): Promise<ESIM> {
    const response = await apiClient.post<ApiResponse<ESIM>>(`/esims/${esimId}/deactivate`, {});
    return response.data;
  }
  
  /**
   * Get the QR code for eSIM installation
   */
  public async getESIMQRCode(esimId: string): Promise<string> {
    const response = await apiClient.get<ApiResponse<{ qr_code_url: string }>>(`/esims/${esimId}/qr-code`);
    return response.data.qr_code_url;
  }
  
  /**
   * Get usage information for an eSIM
   */
  public async getESIMUsage(esimId: string): Promise<Usage> {
    const response = await apiClient.get<ApiResponse<Usage>>(`/esims/${esimId}/usage`);
    return response.data;
  }
}

// Create and export a singleton instance
export const esimService = new ESIMService();

export default esimService; 