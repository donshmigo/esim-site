import { useState, useEffect } from 'react';
import { plansService, DataPlan, ApiError } from '../services/api';

export const useDataPlans = (countryCode?: string) => {
  const [plans, setPlans] = useState<DataPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        let data: DataPlan[];
        
        if (countryCode) {
          data = await plansService.getPlansByCountry(countryCode);
        } else {
          data = await plansService.getAllPlans();
        }
        
        setPlans(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [countryCode]);

  return { plans, loading, error };
};

export default useDataPlans; 