import { useState, useEffect } from 'react';
import { esimService, ESIM, ApiError } from '../services/api';

export const useESIM = (esimId: string) => {
  const [esim, setEsim] = useState<ESIM | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  // Fetch eSIM data
  useEffect(() => {
    const fetchEsim = async () => {
      try {
        setLoading(true);
        const data = await esimService.getESIMById(esimId);
        setEsim(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching eSIM:', err);
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    if (esimId) {
      fetchEsim();
    }
  }, [esimId]);

  // Function to fetch QR code
  const fetchQrCode = async () => {
    if (!esimId) return;
    
    try {
      setLoading(true);
      const qrCodeUrl = await esimService.getESIMQRCode(esimId);
      setQrCode(qrCodeUrl);
      setError(null);
      return qrCodeUrl;
    } catch (err) {
      console.error('Error fetching QR code:', err);
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to activate eSIM
  const activateEsim = async () => {
    if (!esimId) return null;
    
    try {
      setLoading(true);
      const updatedEsim = await esimService.activateESIM(esimId);
      setEsim(updatedEsim);
      setError(null);
      return updatedEsim;
    } catch (err) {
      console.error('Error activating eSIM:', err);
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to deactivate eSIM
  const deactivateEsim = async () => {
    if (!esimId) return null;
    
    try {
      setLoading(true);
      const updatedEsim = await esimService.deactivateESIM(esimId);
      setEsim(updatedEsim);
      setError(null);
      return updatedEsim;
    } catch (err) {
      console.error('Error deactivating eSIM:', err);
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { 
    esim, 
    loading, 
    error, 
    qrCode,
    fetchQrCode,
    activateEsim,
    deactivateEsim
  };
};

export default useESIM; 