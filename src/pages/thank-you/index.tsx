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

    // Fire GTM Purchase event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: data.orderId || '',
          value: parseFloat(data.amount) || 0,
          currency: 'USD',
          items: [{
            item_id: data.plan || 'esim-plan',
            item_name: data.plan || 'eSIM Plan',
            category: 'eSIM',
            quantity: 1,
            price: parseFloat(data.amount) || 0
          }]
        },
        user_data: {
          utm_source: data.utm_source || '',
          utm_medium: data.utm_medium || '',
          utm_campaign: data.utm_campaign || '',
          referral: data.referral || ''
        }
      });
      
      console.log('GTM Purchase event fired:', {
        transaction_id: data.orderId || '',
        value: parseFloat(data.amount) || 0,
        currency: 'USD',
        plan: data.plan || 'eSIM Plan'
      });
    }

    // Fire Trackdesk conversion tracking
    if (typeof window !== 'undefined' && (window as any).trackdesk) {
      (window as any).trackdesk('romio-mobile', 'conversion', {
        value: parseFloat(data.amount) || 0,
        currency: 'USD',
        order_id: data.orderId || '',
        plan: data.plan || 'eSIM Plan',
        referral: data.referral || '',
        utm_source: data.utm_source || '',
        utm_medium: data.utm_medium || '',
        utm_campaign: data.utm_campaign || ''
      });
      
      console.log('Trackdesk conversion event fired:', {
        value: parseFloat(data.amount) || 0,
        currency: 'USD',
        order_id: data.orderId || '',
        plan: data.plan || 'eSIM Plan',
        referral: data.referral || ''
      });
    } else {
      console.log('Trackdesk not available for conversion tracking');
    }

    // Fire GTM Conversion event (simple event for GTM triggers)
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'conversion',
        conversion_type: 'purchase',
        conversion_value: parseFloat(data.amount) || 0,
        conversion_currency: 'USD',
        plan_name: data.plan || 'eSIM Plan',
        order_id: data.orderId || ''
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

          {/* LoungePair Partnership */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">✈️ Enhance Your Travel Experience</h3>
            <p className="text-purple-800 mb-4 text-left">
              Now that you're connected globally, make your airport experience even better! Access 500+ premium airport lounges worldwide through our partner LoungePair.
            </p>
            <a 
              href="https://romio.loungepair.com/directory/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              Book Airport Lounges
            </a>
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