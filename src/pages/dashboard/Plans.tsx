import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../firebase/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

interface Plan {
  id: string;
  name: string;
  price: number;
  dataAmount: string;
  duration: string;
  description: string;
  features: string[];
}

const Plans: React.FC = () => {
  const { currentUser, loginWithGoogle } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const plansCollection = collection(db, 'plans');
      const plansSnapshot = await getDocs(plansCollection);
      
      if (!plansSnapshot.empty) {
        const plansData = plansSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Plan[];
        
        setPlans(plansData);
      } else {
        // If no plans in database, show mock plans
        setPlans([
          {
            id: 'basic',
            name: 'Basic Plan',
            price: 9.99,
            dataAmount: '1GB',
            duration: '30 days',
            description: 'Perfect for light travelers who need basic connectivity.',
            features: ['1GB Data', 'Valid for 30 days', 'Coverage in 100+ countries']
          },
          {
            id: 'standard',
            name: 'Standard Plan',
            price: 19.99,
            dataAmount: '3GB',
            duration: '30 days',
            description: 'Our most popular plan for regular travelers.',
            features: ['3GB Data', 'Valid for 30 days', 'Coverage in 130+ countries', 'Priority support']
          },
          {
            id: 'premium',
            name: 'Premium Plan',
            price: 29.99,
            dataAmount: '5GB',
            duration: '30 days',
            description: 'For heavy data users who need reliable connectivity.',
            features: ['5GB Data', 'Valid for 30 days', 'Coverage in 150+ countries', 'Priority support', 'Unlimited texting']
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Failed to load available plans. Please try again.');
      
      // Fallback to mock data
      setPlans([
        {
          id: 'basic',
          name: 'Basic Plan',
          price: 9.99,
          dataAmount: '1GB',
          duration: '30 days',
          description: 'Perfect for light travelers who need basic connectivity.',
          features: ['1GB Data', 'Valid for 30 days', 'Coverage in 100+ countries']
        },
        {
          id: 'standard',
          name: 'Standard Plan',
          price: 19.99,
          dataAmount: '3GB',
          duration: '30 days',
          description: 'Our most popular plan for regular travelers.',
          features: ['3GB Data', 'Valid for 30 days', 'Coverage in 130+ countries', 'Priority support']
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleRetry = () => {
    fetchPlans();
  };

  if (loading) {
    return (
      <div className="loading-placeholder">
        <div className="loading-spinner"></div>
        <p>Loading available plans...</p>
      </div>
    );
  }

  if (error && plans.length === 0) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={handleRetry}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="plans-container">
      <h1>Available Plans</h1>
      
      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header">
              <h2>{plan.name}</h2>
              <p className="plan-price">${plan.price.toFixed(2)}</p>
            </div>
            
            <div className="plan-details">
              <p className="plan-description">{plan.description}</p>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <button className="select-plan-button">
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans; 