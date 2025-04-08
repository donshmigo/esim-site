import React, { useState } from 'react';
import useDataPlans from '../hooks/useDataPlans';
import { DataPlan } from '../services/api';

interface PlanSelectorProps {
  onSelectPlan: (plan: DataPlan) => void;
  countryCode?: string;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({ onSelectPlan, countryCode }) => {
  const { plans, loading, error } = useDataPlans(countryCode);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleSelectPlan = (plan: DataPlan) => {
    setSelectedPlanId(plan.id);
    onSelectPlan(plan);
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading plans...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 py-4">
        Error loading plans: {error.message}
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="py-4">
        No plans available {countryCode ? `for ${countryCode}` : ''}.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.map((plan) => (
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
                {plan.data_amount} {plan.data_unit}
              </span>
              <span className="block text-sm text-gray-500">
                Valid for {plan.validity_days} days
              </span>
            </div>
            
            <div className="text-right">
              <span className="font-bold text-xl text-blue-600">
                {plan.price.currency} {plan.price.amount.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <span>Available in {plan.countries.length} countries</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanSelector;
