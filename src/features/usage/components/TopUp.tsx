import React, { useState } from 'react';
import { useAuth } from '../../firebase/AuthContext';
import { doc, updateDoc, getDoc, setDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useCurrency } from '../../../hooks/useCurrency';
import './TopUp.css';

interface TopUpProps {
  userId: string;
  onSuccess?: () => void;
}

interface TopUpOption {
  id: string;
  name: string;
  data: number;
  price: number;
  description: string;
}

const TOP_UP_OPTIONS: TopUpOption[] = [
  {
    id: 'small',
    name: 'Small',
    data: 1,
    price: 9.99,
    description: 'Perfect for light usage'
  },
  {
    id: 'medium',
    name: 'Medium',
    data: 3,
    price: 19.99,
    description: 'Ideal for regular usage'
  },
  {
    id: 'large',
    name: 'Large',
    data: 5,
    price: 29.99,
    description: 'Best value for heavy usage'
  }
];

const TopUp: React.FC<TopUpProps> = ({ userId, onSuccess }) => {
  const { currentUser } = useAuth();
  const { formatPrice, convertFromUSD } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowConfirmation(true);
    setError(null);
  };

  const getSelectedOption = (): TopUpOption | undefined => {
    return TOP_UP_OPTIONS.find(option => option.id === selectedOption);
  };

  const handleTopUp = async () => {
    const option = getSelectedOption();
    if (!option || !userId) return;

    setProcessingPayment(true);
    setError(null);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // First update the user's data allowance in their profile
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        // Get current data balance or set to 0 if not exists
        const currentData = userDoc.data().dataBalance || 0;
        const newBalance = currentData + option.data;
        
        await updateDoc(userDocRef, {
          dataBalance: newBalance,
          lastUpdated: serverTimestamp()
        });
        
        // Then record the transaction in the user's billing history
        const transactionData = {
          id: `topup-${Date.now()}`,
          date: new Date().toISOString(),
          amount: option.price,
          description: `Data Top-Up (${option.data}GB)`,
          status: 'completed',
          paymentMethod: 'Card ending in ****',
          type: 'top-up'
        };
        
        // Check if billing collection exists, if not create it
        const billingDocRef = doc(db, 'billing', userId);
        const billingDoc = await getDoc(billingDocRef);
        
        if (billingDoc.exists()) {
          await updateDoc(billingDocRef, {
            transactions: arrayUnion(transactionData)
          });
        } else {
          await setDoc(billingDocRef, {
            userId: userId,
            transactions: [transactionData]
          });
        }
        
        setSuccess(`Successfully added ${option.data}GB to your account!`);
        setShowConfirmation(false);
        setSelectedOption(null);
        
        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error('User profile not found');
      }
    } catch (err) {
      console.error('Error processing top-up:', err);
      setError('Failed to process your top-up. Please try again later.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedOption(null);
  };

  return (
    <div className="top-up-container">
      <h3>Add More Data</h3>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}
      
      {!showConfirmation ? (
        <div className="top-up-options">
          {TOP_UP_OPTIONS.map(option => (
            <div 
              key={option.id} 
              className={`top-up-option ${selectedOption === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <h4>{option.name}</h4>
              <p className="data-amount">{option.data} GB</p>
              <p className="option-description">{option.description}</p>
              <p className="price">{formatPrice(convertFromUSD(option.price))}</p>
              <button 
                className="top-up-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionSelect(option.id);
                }}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="confirmation-modal">
          <h4>Confirm Your Purchase</h4>
          {getSelectedOption() && (
            <div className="confirmation-details">
              <p>You are about to purchase:</p>
              <div className="purchase-details">
                <span className="detail-name">{getSelectedOption()?.name} Data Pack</span>
                <span className="detail-value">{getSelectedOption()?.data} GB</span>
              </div>
              <div className="purchase-details">
                <span className="detail-name">Price:</span>
                <span className="detail-value">{formatPrice(convertFromUSD(getSelectedOption()?.price || 0))}</span>
              </div>
              <div className="payment-method">
                <p>Payment Method: Visa ending in 4242</p>
              </div>
              <div className="confirmation-actions">
                <button 
                  className="button cancel-button"
                  onClick={handleCancel}
                  disabled={processingPayment}
                >
                  Cancel
                </button>
                <button 
                  className="button confirm-button"
                  onClick={handleTopUp}
                  disabled={processingPayment}
                >
                  {processingPayment ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    'Confirm Purchase'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopUp; 