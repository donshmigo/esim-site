import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextLogo from '../../components/TextLogo';

const ThankYou: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [purchaseData, setPurchaseData] = useState({
    plan: '',
    amount: '',
    orderId: '',
    referral: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: ''
  });

  useEffect(() => {
    // Extract URL parameters for tracking
    const data = {
      plan: searchParams.get('plan') || '',
      amount: searchParams.get('amount') || '',
      orderId: searchParams.get('order_id') || '',
      referral: searchParams.get('ref') || '',
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || ''
    };
    
    setPurchaseData(data);

    // Fire Facebook Pixel Purchase event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: parseFloat(data.amount) || 0,
        currency: 'USD',
        content_name: data.plan || 'eSIM Plan',
        content_type: 'product'
      });
      
      console.log('FB Pixel Purchase event fired:', {
        value: parseFloat(data.amount) || 0,
        currency: 'USD',
        content_name: data.plan || 'eSIM Plan',
        content_type: 'product'
      });
    }

    // Track referral data (you can send this to your analytics)
    if (data.referral || data.utm_source) {
      console.log('Referral tracking data:', data);
      // Here you could send to your analytics service
      // trackReferral(data);
    }

  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="flex items-center">
            <TextLogo className="text-3xl py-1" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto" />
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl font-bold text-dark-theme mb-4">
            Thank You for Your Purchase!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your eSIM plan has been successfully purchased. You'll receive your activation instructions via email within the next few minutes.
          </p>

          {/* Purchase Details */}
          {purchaseData.plan && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold mb-4">Purchase Details</h2>
              <div className="space-y-2">
                {purchaseData.plan && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">{purchaseData.plan}</span>
                  </div>
                )}
                {purchaseData.amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">${purchaseData.amount}</span>
                  </div>
                )}
                {purchaseData.orderId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{purchaseData.orderId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
            <div className="text-left space-y-2 text-blue-800">
              <p>• Check your email for activation instructions</p>
              <p>• Download the QR code to activate your eSIM</p>
              <p>• Follow our setup guide for your device</p>
              <p>• Start using your global connectivity!</p>
            </div>
          </div>

          {/* Support */}
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              Need help? Our support team is here to assist you.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-6 py-3 bg-dark-theme text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Contact Support
            </Link>
          </div>

          {/* Return Home */}
          <Link 
            to="/" 
            className="inline-flex items-center text-dark-theme hover:text-opacity-80 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Return to Homepage
          </Link>
        </div>
      </main>

      {/* Tracking Data (Hidden) */}
      <div style={{ display: 'none' }} id="tracking-data">
        <script type="application/json">
          {JSON.stringify(purchaseData)}
        </script>
      </div>
    </div>
  );
};

export default ThankYou; 