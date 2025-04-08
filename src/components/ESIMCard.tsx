import React, { useState } from 'react';
import { ESIM } from '../services/api';
import useESIM from '../hooks/useESIM';

interface ESIMCardProps {
  esimId: string;
  onStatusChange?: () => void;
}

export const ESIMCard: React.FC<ESIMCardProps> = ({ esimId, onStatusChange }) => {
  const { esim, loading, error, qrCode, fetchQrCode, activateEsim, deactivateEsim } = useESIM(esimId);
  const [showQrCode, setShowQrCode] = useState(false);

  if (loading && !esim) {
    return <div className="flex justify-center py-8">Loading eSIM details...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 py-4">
        Error loading eSIM: {error.message}
      </div>
    );
  }

  if (!esim) {
    return <div className="py-4">No eSIM found with ID: {esimId}</div>;
  }

  // Format data usage
  const formatDataUsage = (used: number, total: number) => {
    const usedGB = used / 1024; // Convert MB to GB
    const totalGB = total / 1024;
    const percentage = Math.round((used / total) * 100);
    
    return {
      usedGB: usedGB.toFixed(2),
      totalGB: totalGB.toFixed(2),
      percentage,
    };
  };

  const usage = formatDataUsage(esim.data_used, esim.data_limit);

  // Handle activation button
  const handleActivation = async () => {
    if (esim.status === 'provisioned') {
      await activateEsim();
    } else {
      await deactivateEsim();
    }
    
    if (onStatusChange) {
      onStatusChange();
    }
  };

  // Handle QR code display
  const handleShowQrCode = async () => {
    if (!qrCode) {
      await fetchQrCode();
    }
    setShowQrCode(true);
  };

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">eSIM {esim.iccid.substring(esim.iccid.length - 6)}</h3>
          <p className="text-gray-500 text-sm">ICCID: {esim.iccid}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          esim.status === 'activated' ? 'bg-green-100 text-green-800' :
          esim.status === 'deactivated' ? 'bg-red-100 text-red-800' :
          esim.status === 'expired' ? 'bg-gray-100 text-gray-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {esim.status.charAt(0).toUpperCase() + esim.status.slice(1)}
        </div>
      </div>

      {/* Data usage */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Data usage</span>
          <span className="text-sm font-medium">{usage.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              usage.percentage > 90 ? 'bg-red-500' :
              usage.percentage > 75 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
            style={{ width: `${usage.percentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {usage.usedGB} GB used of {usage.totalGB} GB
        </div>
      </div>

      {/* Validity */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-1">Valid until</div>
        <div className="text-md">
          {new Date(esim.valid_until).toLocaleDateString()}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col space-y-2">
        {esim.status === 'provisioned' || esim.status === 'deactivated' ? (
          <button
            onClick={handleActivation}
            disabled={loading || esim.status === ('expired' as any)}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Activate eSIM'}
          </button>
        ) : (
          <button
            onClick={handleActivation}
            disabled={loading || esim.status === ('expired' as any)}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Deactivate eSIM'}
          </button>
        )}
        
        <button
          onClick={handleShowQrCode}
          disabled={loading}
          className="border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          {loading && !qrCode ? 'Loading...' : 'Show QR Code'}
        </button>
      </div>

      {/* QR Code Modal */}
      {showQrCode && qrCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">eSIM Installation QR Code</h3>
            <div className="flex justify-center mb-4">
              <img src={qrCode} alt="eSIM QR Code" className="w-64 h-64" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Scan this QR code with your device's camera to install the eSIM.
            </p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowQrCode(false)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ESIMCard; 