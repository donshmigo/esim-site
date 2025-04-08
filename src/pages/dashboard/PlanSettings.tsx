import React, { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { CheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface PlanData {
  plan: string | null;
  startDate: any;
  endDate: any;
  autoRenew: boolean;
}

interface PlanSettingsProps {
  userId: string;
}

const PlanSettings: React.FC<PlanSettingsProps> = ({ userId }) => {
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPlanData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching plan data for user:', userId);
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (userDoc.exists()) {
        console.log('User document exists for plan data');
        const userData = userDoc.data();
        
        // Set plan data from Firestore or defaults
        setPlanData({
          plan: userData.plan || null,
          startDate: userData.planStartDate || null,
          endDate: userData.planEndDate || null,
          autoRenew: userData.autoRenew || false
        });
      } else {
        console.log('User document does not exist for plan data');
        // Create default plan data if user doesn't exist yet
        setPlanData({
          plan: null,
          startDate: null,
          endDate: null,
          autoRenew: false
        });
      }
    } catch (err) {
      console.error('Error fetching plan data:', err);
      setError('Failed to load your plan data. Please try refreshing the page.');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200); // Small delay to prevent flash of loading state
    }
  }, [userId]);

  // Initial data fetch
  useEffect(() => {
    fetchPlanData();
  }, [fetchPlanData]);

  const handleRetry = () => {
    fetchPlanData();
  };

  const toggleAutoRenew = async () => {
    if (!userId || !planData) return;
    
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      
      const newAutoRenew = !planData.autoRenew;
      console.log('Updating auto-renew setting to:', newAutoRenew);
      
      await updateDoc(doc(db, 'users', userId), {
        autoRenew: newAutoRenew
      });
      
      setPlanData({
        ...planData,
        autoRenew: newAutoRenew
      });
      
      setSuccessMessage(`Auto-renewal has been ${newAutoRenew ? 'enabled' : 'disabled'}.`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating auto-renew setting:', err);
      setError('Failed to update auto-renew setting. Please try again.');
      
      // Clear error message after 5 seconds
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid date';
    }
  };

  const getPlanDetails = () => {
    switch (planData?.plan) {
      case 'Global Lite':
        return {
          name: 'Global Lite',
          data: '5GB',
          validity: '30 days',
          price: '$29.99',
          features: [
            '150+ countries',
            'Up to 5GB of data',
            '30-day validity',
            '24/7 customer support'
          ]
        };
      case 'Global Plus':
        return {
          name: 'Global Plus',
          data: '15GB',
          validity: '30 days',
          price: '$49.99',
          features: [
            '150+ countries',
            'Up to 15GB of data',
            '30-day validity',
            'Priority customer support',
            'Hotspot capability'
          ]
        };
      case 'Global Unlimited':
        return {
          name: 'Global Unlimited',
          data: 'Unlimited',
          validity: '30 days',
          price: '$99.99',
          features: [
            '150+ countries',
            'Unlimited data',
            '30-day validity',
            'Premium customer support',
            'Hotspot capability',
            'Multi-device support'
          ]
        };
      default:
        return null;
    }
  };

  if (loading && !planData) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-signal-blue mb-4"></div>
        <p className="text-cool-slate">Loading plan data...</p>
      </div>
    );
  }

  if (error && !planData) {
    return (
      <div className="text-center p-8">
        <div className="mb-4 p-4 bg-red-500 bg-opacity-10 text-red-500 rounded-lg">
          {error}
        </div>
        <button
          onClick={handleRetry}
          className="flex items-center justify-center mx-auto px-4 py-2 bg-signal-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Retry Loading Data
        </button>
      </div>
    );
  }

  const planDetails = getPlanDetails();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Plan</h2>
        <button
          onClick={handleRetry}
          className="text-cool-slate hover:text-signal-blue transition-colors"
          title="Refresh plan data"
          disabled={loading}
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      
      {loading && planData && (
        <div className="bg-steel-gray bg-opacity-5 p-3 rounded-lg mb-4 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-signal-blue mr-2"></div>
          <span className="text-cool-slate">Updating plan data...</span>
        </div>
      )}
      
      {planData?.plan ? (
        <div>
          <div className="bg-steel-gray bg-opacity-5 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-block px-3 py-1 bg-signal-blue text-white text-xs rounded-full mb-2">
                  Current Plan
                </div>
                <h3 className="text-lg font-semibold mb-1">{planDetails?.name}</h3>
                <p className="text-cool-slate">
                  {planDetails?.data} • Valid for {planDetails?.validity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{planDetails?.price}</p>
                <p className="text-xs text-cool-slate">per month</p>
              </div>
            </div>
            
            <hr className="my-4 border-steel-gray border-opacity-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-cool-slate mb-1">Start Date</p>
                <p className="font-medium">{formatDate(planData.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-cool-slate mb-1">Expiry Date</p>
                <p className="font-medium">{formatDate(planData.endDate)}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Renewal</p>
                  <p className="text-sm text-cool-slate">
                    Your plan will {planData.autoRenew ? '' : 'not'} automatically renew
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={planData.autoRenew}
                    onChange={toggleAutoRenew}
                    disabled={loading}
                  />
                  <div className="w-11 h-6 bg-steel-gray bg-opacity-30 rounded-full peer peer-checked:bg-signal-blue peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Plan Features</h3>
            <ul className="space-y-2">
              {planDetails?.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-signal-blue mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex mt-8 justify-between">
            <button
              className="px-4 py-2 border border-signal-blue text-signal-blue rounded-lg hover:bg-signal-blue hover:bg-opacity-10 transition-colors"
              disabled={loading}
            >
              Upgrade Plan
            </button>
            <button
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:bg-opacity-10 transition-colors"
              disabled={loading}
            >
              Cancel Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-6 bg-steel-gray bg-opacity-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No Active Plan</h3>
          <p className="text-cool-slate mb-4">
            You don't have an active eSIM plan. Choose one of our plans to get started.
          </p>
          <a
            href="/plans"
            className="px-4 py-2 bg-signal-blue text-white rounded-lg hover:bg-opacity-90 transition-colors inline-block"
          >
            View Plans
          </a>
        </div>
      )}
    </div>
  );
};

export default PlanSettings; 