import React, { useState } from 'react';
import { DataPlan } from '../types/plans';

interface PlanSelectorProps {
  onSelectPlan: (plan: DataPlan) => void;
  selectedPlan: DataPlan | null;
}

// Mock data for plans
const mockPlans: DataPlan[] = [
  {
    id: 'lite',
    name: 'Lite Plan',
    data: '5GB',
    description: 'Perfect for occasional travelers',
    price: {
      amount: 4.99,
      currency: 'USD'
    }
  },
  {
    id: 'traveler',
    name: 'Traveler Plan',
    data: '20GB',
    description: 'Ideal for frequent travelers',
    price: {
      amount: 9.99,
      currency: 'USD'
    }
  },
  {
    id: 'max',
    name: 'Max Plan',
    data: '30GB',
    description: 'Best for digital nomads',
    price: {
      amount: 19.99,
      currency: 'USD'
    }
  }
];

export const PlanSelector: React.FC<PlanSelectorProps> = ({ onSelectPlan, selectedPlan }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(selectedPlan?.id || null);

  const handleSelectPlan = (plan: DataPlan) => {
    setSelectedPlanId(plan.id);
    onSelectPlan(plan);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {mockPlans.map((plan) => (
        <div 
          key={plan.id}
          className={`border rounded-lg p-4 cursor-pointer transition-all
            ${selectedPlanId === plan.id 
              ? 'border-blue-500 shadow-lg bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300 hover:shadow'
            }`}
          onClick={() => handleSelectPlan(plan)}
        >
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="text-gray-600 mb-4">{plan.description}</p>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-lg">
                {plan.data}
              </span>
              <span className="block text-sm text-gray-500">
                Valid for 30 days
              </span>
            </div>
            
            <div className="text-right">
              <span className="font-bold text-xl text-blue-600">
                {plan.price?.currency} {typeof plan.price?.amount === 'number' ? plan.price?.amount.toFixed(2) : plan.price?.amount}
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <span>Available in 90+ countries</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanSelector;
