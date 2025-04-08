import { useState, useEffect } from 'react';
import { esimService, ESIM, ApiError } from '../services/api';

export const useUserESIMs = (userId: string) => {
  const [esims, setEsims] = useState<ESIM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchESIMs = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await esimService.getESIMs(userId);
      setEsims(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user eSIMs:', err);
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // Fetch eSIMs on component mount and when userId changes
  useEffect(() => {
    fetchESIMs();
  }, [userId]);

  return { 
    esims, 
    loading, 
    error,
    refetch: fetchESIMs
  };
};

export default useUserESIMs; 