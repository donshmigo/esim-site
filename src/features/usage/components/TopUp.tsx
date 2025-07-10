import React, { useState } from 'react';
import { useCurrency } from '../../../hooks/useCurrency';
import './TopUp.css';

interface TopUpProps {
  userId: string;
  onSuccess?: () => void;
}

interface TopUpOption {
  id: string;
  data: number;
  price: number;
}

const TOP_UP_OPTIONS: TopUpOption[] = [
  { id: 'basic', data: 1, price: 10 },
  { id: 'standard', data: 3, price: 25 },
  { id: 'premium', data: 5, price: 40 }
];

const TopUp: React.FC<TopUpProps> = ({ userId, onSuccess }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { formatPrice, convertFromUSD } = useCurrency();

  const handleTopUp = async () => {
    if (!selectedOption) {
      setError('Please select a top-up option');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful top-up
      setSuccess(true);
        if (onSuccess) {
          onSuccess();
      }
    } catch (err) {
      console.error('Error processing top-up:', err);
      setError('Failed to process top-up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="top-up-success">
        <h3>Top-Up Successful!</h3>
        <p>Your data balance has been updated.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="reset-button"
        >
          Add More Data
        </button>
      </div>
    );
  }

  return (
    <div className="top-up-container">
      <h3>Add More Data</h3>
      
        <div className="top-up-options">
        {TOP_UP_OPTIONS.map((option) => (
            <div 
              key={option.id} 
              className={`top-up-option ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => setSelectedOption(option.id)}
            >
            <h4>{option.data} GB</h4>
            <p>{formatPrice(convertFromUSD(option.price))}</p>
            </div>
          ))}
        </div>

      {error && <p className="error-message">{error}</p>}

                <button 
                  onClick={handleTopUp}
        disabled={loading || !selectedOption}
        className="top-up-button"
      >
        {loading ? 'Processing...' : 'Add Data'}
                </button>
    </div>
  );
};

export default TopUp; 