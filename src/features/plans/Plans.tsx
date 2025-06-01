import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setPlans([
        {
          id: 'lite',
          name: t('plans.lite.name', 'Lite Plan'),
          price: 9.99,
          dataAmount: '5GB',
          duration: '30 days',
          description: t('plans.lite.description', 'Perfect for occasional travelers who need basic connectivity.'),
          features: [
            t('plans.lite.feature1', '5GB Data'),
            t('plans.lite.feature2', 'Valid for 30 days'),
            t('plans.lite.feature3', 'Coverage in 90+ countries'),
            t('plans.lite.feature4', 'Standard support')
          ]
        },
        {
          id: 'traveler',
          name: t('plans.traveler.name', 'Traveler Plan'),
          price: 19.99,
          dataAmount: '20GB',
          duration: '30 days',
          description: t('plans.traveler.description', 'Our most popular plan for regular travelers.'),
          features: [
            t('plans.traveler.feature1', '20GB Data'),
            t('plans.traveler.feature2', 'Valid for 30 days'),
            t('plans.traveler.feature3', 'Coverage in 90+ countries'),
            t('plans.traveler.feature4', 'Priority support'),
            t('plans.traveler.feature5', 'Data rollover')
          ]
        },
        {
          id: 'max',
          name: t('plans.max.name', 'Max Plan'),
          price: 29.99,
          dataAmount: '30GB',
          duration: '30 days',
          description: t('plans.max.description', 'For heavy data users who need reliable connectivity.'),
          features: [
            t('plans.max.feature1', '30GB Data'),
            t('plans.max.feature2', 'Valid for 30 days'),
            t('plans.max.feature3', 'Coverage in 90+ countries'),
            t('plans.max.feature4', 'Premium support'),
            t('plans.max.feature5', 'Data rollover'),
            t('plans.max.feature6', 'Higher network priority')
          ]
        }
      ]);
      setLoading(false);
    }, 800); // Simulate loading delay
  }, [t]);

  const handleSelectPlan = (planId: string) => {
    const selectedPlan = plans.find(plan => plan.id === planId);
    if (selectedPlan) {
      navigate('/checkout', { 
        state: { 
          selectedPlan: {
            id: selectedPlan.id,
            name: selectedPlan.name,
            data: selectedPlan.dataAmount,
            description: selectedPlan.description,
            price: {
              amount: selectedPlan.price,
              currency: 'USD'
            }
          }
        } 
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">{t('general.loading', 'Loading available plans...')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{t('plans.title', 'Choose Your eSIM Plan')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">{plan.name}</h2>
              <div className="flex items-end mt-2">
                <span className="text-3xl font-bold text-white">${plan.price.toFixed(2)}</span>
                <span className="text-white opacity-80 ml-1">/ {plan.duration}</span>
              </div>
              <p className="text-sm text-white mt-2">{plan.dataAmount} Data</p>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                onClick={() => handleSelectPlan(plan.id)}
              >
                {t('plans.selectButton', 'Select Plan')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans; 