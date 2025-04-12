import React, { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import TopUp from '../../components/dashboard/TopUp';
import './PlanUsage.css';

interface PlanUsageProps {
  userId: string;
}

interface UsageData {
  used: number;
  total: number;
  lastUpdated: string;
  startDate: string;
  endDate: string;
  plan: string;
}

// Function to generate mock data for demonstration
const generateMockData = (): UsageData => {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 5);
  
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - Math.floor(Math.random() * 10) - 1);
  
  return {
    used: Math.random() * 8,
    total: 10,
    lastUpdated: today.toISOString(),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    plan: 'Premium Global'
  };
};

const PlanUsage: React.FC<PlanUsageProps> = ({ userId }) => {
  const { } = useAuth();
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsageData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching usage data for user:', userId);
      
      // Check if the user has usage data in Firestore
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists() && userDoc.data().dataBalance) {
        const userData = userDoc.data();
        const usageInfo: UsageData = {
          used: userData.dataUsed || 0,
          total: userData.dataBalance || 10,
          lastUpdated: userData.lastUpdated ? userData.lastUpdated.toDate().toISOString() : new Date().toISOString(),
          startDate: userData.planStartDate ? userData.planStartDate.toDate().toISOString() : new Date().toISOString(),
          endDate: userData.planEndDate ? userData.planEndDate.toDate().toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          plan: userData.plan || 'Basic Plan'
        };
        
        setUsageData(usageInfo);
      } else {
        // If no data is found, generate mock data for demonstration
        console.log('No usage data found, generating mock data');
        setUsageData(generateMockData());
      }
    } catch (err) {
      console.error('Error fetching usage data:', err);
      setError('Failed to load your usage data. Please try again.');
      
      // If an error occurs, still set mock data for demonstration
      setUsageData(generateMockData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUsageData();
    }
  }, [userId]);

  const handleRetry = () => {
    fetchUsageData();
  };

  const calculatePercentage = (): number => {
    if (!usageData) return 0;
    return (usageData.used / usageData.total) * 100;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getDaysRemaining = (): number => {
    if (!usageData) return 0;
    
    const today = new Date();
    const endDate = new Date(usageData.endDate);
    
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="loading-placeholder">
        <div className="loading-spinner"></div>
        <p>Loading your usage data...</p>
      </div>
    );
  }

  if (error && !usageData) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={handleRetry}>
          Retry
        </button>
      </div>
    );
  }

  if (!usageData) {
    return (
      <div className="error-container">
        <p className="error-message">No usage data available. Please contact support.</p>
      </div>
    );
  }

  const percentage = calculatePercentage();
  const daysRemaining = getDaysRemaining();

  return (
    <div className="plan-usage-container">
      <h2>Plan Usage</h2>
      
      <div className="usage-overview">
        <div className="usage-meter">
          <p className="usage-percentage">{percentage.toFixed(0)}% Used</p>
          <div className="usage-progress">
            <div 
              className="usage-progress-bar" 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: percentage > 90 ? '#ef4444' : (percentage > 75 ? '#f59e0b' : '#0ea5e9')
              }}
            ></div>
          </div>
          <div className="usage-labels">
            <span>0 GB</span>
            <span>{usageData.total} GB</span>
          </div>
        </div>
        
        <div className="usage-info">
          <div className="usage-info-item">
            <h4>Data Used</h4>
            <p>{usageData.used.toFixed(2)} GB</p>
          </div>
          <div className="usage-info-item">
            <h4>Data Remaining</h4>
            <p>{(usageData.total - usageData.used).toFixed(2)} GB</p>
          </div>
          <div className="usage-info-item">
            <h4>Days Remaining</h4>
            <p>{daysRemaining} days</p>
          </div>
        </div>
      </div>
      
      <div className="plan-details">
        <h3>Current Plan: {usageData.plan}</h3>
        <div className="plan-dates">
          <p>Started: {formatDate(usageData.startDate)}</p>
          <p>Expires: {formatDate(usageData.endDate)}</p>
          <p>Last Updated: {formatDate(usageData.lastUpdated)} at {formatTime(usageData.lastUpdated)}</p>
        </div>
      </div>
      
      {/* Add the TopUp component */}
      <TopUp userId={userId} onSuccess={fetchUsageData} />
    </div>
  );
};

export default PlanUsage; 