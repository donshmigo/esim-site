import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ESIMCard from '../components/ESIMCard';
import { useUserESIMs } from '../hooks/useUserESIMs';
import { useAuth } from '../firebase/AuthContext';

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState<string>('');
  const [showNewEsimNotification, setShowNewEsimNotification] = useState(false);
  
  // This would normally come from your authentication system
  // For now, we'll just simulate it
  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Set the user ID
    setUserId(currentUser.uid);
    
    // Check if redirected from checkout success
    const params = new URLSearchParams(location.search);
    if (params.get('newPurchase') === 'true') {
      setShowNewEsimNotification(true);
      
      // Remove the query parameter
      navigate('/esim-dashboard', { replace: true });
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setShowNewEsimNotification(false);
      }, 5000);
    }
  }, [currentUser, navigate, location]);
  
  const { esims, loading, error, refetch } = useUserESIMs(userId);
  
  const handleStatusChange = () => {
    // Refresh the eSIM list when status changes
    refetch();
  };
  
  if (!userId) {
    return <div className="container mx-auto py-8 px-4">Loading user data...</div>;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your eSIMs</h1>
      
      {/* New eSIM Notification */}
      {showNewEsimNotification && (
        <div className="bg-green-50 border border-green-500 text-green-700 p-4 rounded-lg mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Your new eSIM has been provisioned successfully! Check your email for the QR code.</span>
          </div>
          <button 
            onClick={() => setShowNewEsimNotification(false)}
            className="text-green-700 hover:text-green-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}
      
      {loading && esims.length === 0 ? (
        <div className="flex justify-center py-8">Loading your eSIMs...</div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          Error loading your eSIMs: {error.message}
        </div>
      ) : esims.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-4">You don't have any eSIMs yet</h2>
          <p className="text-gray-600 mb-6">
            Purchase your first eSIM to get started with global connectivity.
          </p>
          <button
            onClick={() => navigate('/checkout')}
            className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Get an eSIM
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Active eSIMs</h2>
            <button
              onClick={() => navigate('/checkout')}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Get New eSIM
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {esims.map(esim => (
              <ESIMCard 
                key={esim.id} 
                esimId={esim.id} 
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
          
          {/* Data Usage Summary */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Data Usage Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Active eSIMs</div>
                <div className="text-3xl font-bold">
                  {esims.filter(e => e.status === 'activated').length}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Total Data Available</div>
                <div className="text-3xl font-bold">
                  {(esims
                    .filter(e => e.status === 'activated')
                    .reduce((acc, esim) => acc + esim.data_limit, 0) / 1024)
                    .toFixed(2)} GB
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Total Data Used</div>
                <div className="text-3xl font-bold">
                  {(esims
                    .filter(e => e.status === 'activated')
                    .reduce((acc, esim) => acc + esim.data_used, 0) / 1024)
                    .toFixed(2)} GB
                </div>
              </div>
            </div>
          </div>
          
          {/* Travel History - This would typically come from the API */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      eSIM
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* This would typically come from the API */}
                  {esims.slice(0, 5).map((esim, index) => (
                    <tr key={`activity-${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(esim.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        eSIM {esim.iccid.substring(esim.iccid.length - 6)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {esim.status === 'activated' ? 'Activated' : 
                         esim.status === 'deactivated' ? 'Deactivated' : 
                         'Provisioned'}
                      </td>
                    </tr>
                  ))}
                  
                  {esims.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                        No recent activity
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = '/esim-dashboard'}
            className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;