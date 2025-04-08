import { useState } from 'react';
import { ordersService, OrderRequest, Order, ApiError } from '../services/api';

export const useCreateOrder = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createOrder = async (orderData: OrderRequest) => {
    try {
      setLoading(true);
      const newOrder = await ordersService.createOrder(orderData);
      setOrder(newOrder);
      setError(null);
      return newOrder;
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { 
    order, 
    loading, 
    error, 
    createOrder 
  };
};

export default useCreateOrder; 