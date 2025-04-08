import React, { useState, useEffect, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { CloudArrowDownIcon, CreditCardIcon, CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  date: any;
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: {
    type: 'card' | 'paypal';
    last4?: string;
    brand?: string;
  };
  invoice?: string;
}

interface BillingHistoryProps {
  userId: string;
}

const BillingHistory: React.FC<BillingHistoryProps> = ({ userId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const generateMockTransactions = (): Transaction[] => {
    const mockTransactions: Transaction[] = [];
    const now = new Date();
    
    // Generate between 3-8 transactions
    const transactionCount = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < transactionCount; i++) {
      const date = new Date();
      // Random date within the last 6 months
      date.setMonth(now.getMonth() - Math.floor(Math.random() * 6));
      date.setDate(Math.floor(Math.random() * 28) + 1);
      
      const plans = ['Global Lite', 'Global Plus', 'Global Unlimited'];
      const planIndex = Math.floor(Math.random() * plans.length);
      const plan = plans[planIndex];
      
      let amount = 0;
      switch (plan) {
        case 'Global Lite':
          amount = 29.99;
          break;
        case 'Global Plus':
          amount = 49.99;
          break;
        case 'Global Unlimited':
          amount = 99.99;
          break;
      }
      
      // 80% of transactions are completed, 10% pending, 10% failed
      const randomStatus = Math.random();
      let status: 'completed' | 'pending' | 'failed' = 'completed';
      
      if (randomStatus > 0.9) {
        status = 'failed';
      } else if (randomStatus > 0.8) {
        status = 'pending';
      }
      
      // 70% of payments are via card, 30% via PayPal
      const paymentType = Math.random() > 0.3 ? 'card' : 'paypal';
      
      const transaction: Transaction = {
        id: `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        date,
        amount,
        description: `${plan} Plan - Monthly Subscription`,
        status,
        paymentMethod: {
          type: paymentType as 'card' | 'paypal'
        }
      };
      
      if (paymentType === 'card') {
        // Generate random last 4 digits
        const last4 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // Random card brand
        const brands = ['Visa', 'Mastercard', 'American Express'];
        const brandIndex = Math.floor(Math.random() * brands.length);
        
        transaction.paymentMethod.last4 = last4;
        transaction.paymentMethod.brand = brands[brandIndex];
      }
      
      // Add invoice for completed transactions
      if (status === 'completed') {
        transaction.invoice = `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      }
      
      mockTransactions.push(transaction);
    }
    
    // Sort by date (newest first)
    mockTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    return mockTransactions;
  };

  const fetchBillingHistory = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching billing history for user:', userId);
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (userDoc.exists()) {
        console.log('User document exists for billing history');
        // In a real app, you would fetch transactions from Firestore
        // For demo purposes, generate mock data with a slight delay
        setTimeout(() => {
          const mockTransactions = generateMockTransactions();
          setTransactions(mockTransactions);
          setLoading(false);
        }, 500);
      } else {
        console.log('User document does not exist for billing history');
        // Even if user doesn't exist, show empty transactions list
        setTransactions([]);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching billing history:', err);
      setError('Failed to load your billing history. Please try again.');
      setLoading(false);
    }
  }, [userId]);

  // Initial data fetch
  useEffect(() => {
    fetchBillingHistory();
  }, [fetchBillingHistory]);

  const handleRetry = () => {
    fetchBillingHistory();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-signal-blue mb-4"></div>
        <p className="text-cool-slate">Loading billing history...</p>
      </div>
    );
  }

  if (error) {
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
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Billing History</h2>
        <button
          onClick={handleRetry}
          className="text-cool-slate hover:text-signal-blue transition-colors"
          title="Refresh billing history"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>
      
      {transactions.length > 0 ? (
        <>
          <div className="bg-white rounded-lg overflow-hidden border border-steel-gray border-opacity-10 mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-steel-gray divide-opacity-10">
                <thead>
                  <tr className="bg-steel-gray bg-opacity-5">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-slate uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-slate uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-slate uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-slate uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-slate uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-slate uppercase tracking-wider">
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-steel-gray divide-opacity-10">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-steel-gray hover:bg-opacity-5">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatAmount(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          <span className="flex items-center">
                            {transaction.status === 'completed' ? (
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                            ) : transaction.status === 'pending' ? (
                              <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 6v6l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            ) : (
                              <XCircleIcon className="h-3 w-3 mr-1" />
                            )}
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <CreditCardIcon className="h-4 w-4 mr-2 text-cool-slate" />
                          {transaction.paymentMethod.type === 'card' ? (
                            <span>{transaction.paymentMethod.brand} •••• {transaction.paymentMethod.last4}</span>
                          ) : (
                            <span>PayPal</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.invoice ? (
                          <button
                            className="text-signal-blue hover:underline flex items-center"
                            onClick={() => alert('In a real app, this would download the invoice')}
                          >
                            <CloudArrowDownIcon className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        ) : (
                          <span className="text-cool-slate">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-cool-slate">
              Showing {transactions.length} transactions
            </p>
            <button
              className="px-4 py-2 border border-signal-blue text-signal-blue rounded-lg hover:bg-signal-blue hover:bg-opacity-10 transition-colors"
              onClick={() => alert('In a real app, this would download all invoices')}
            >
              <span className="flex items-center">
                <CloudArrowDownIcon className="h-5 w-5 mr-2" />
                Download All Invoices
              </span>
            </button>
          </div>
        </>
      ) : (
        <div className="text-center p-6 bg-steel-gray bg-opacity-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No Billing History</h3>
          <p className="text-cool-slate mb-4">
            You don't have any billing transactions yet.
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

export default BillingHistory; 