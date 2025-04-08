import apiClient from './client';
import { Order, OrderRequest, ApiResponse } from './types';

export class OrdersService {
  /**
   * Create a new eSIM order
   */
  public async createOrder(orderData: OrderRequest): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>('/orders', orderData);
    return response.data;
  }
  
  /**
   * Get all orders for the current user or customer
   */
  public async getOrders(userId?: string): Promise<Order[]> {
    const params: Record<string, string> = {};
    if (userId) {
      params.user_id = userId;
    }
    
    const response = await apiClient.get<ApiResponse<Order[]>>('/orders', params);
    return response.data;
  }
  
  /**
   * Get a specific order by ID
   */
  public async getOrderById(orderId: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`);
    return response.data;
  }
  
  /**
   * Cancel an order (if still pending)
   */
  public async cancelOrder(orderId: string): Promise<void> {
    await apiClient.delete(`/orders/${orderId}`);
  }
}

// Create and export a singleton instance
export const ordersService = new OrdersService();

export default ordersService; 