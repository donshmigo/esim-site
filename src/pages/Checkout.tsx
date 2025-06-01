import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlanSelector from '../components/PlanSelector';
import { DataPlan } from '../types/plans';

export const Checkout: React.FC = () => {
  const location = useLocation();
  const { selectedPlan: initialPlan, skipPlanSelection } = (location.state as { selectedPlan?: DataPlan, skipPlanSelection?: boolean }) || {};
  
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(initialPlan || null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [step, setStep] = useState<'select-plan' | 'enter-details' | 'confirm' | 'payment' | 'success'>(
    skipPlanSelection && initialPlan ? 'enter-details' : 'select-plan'
  );
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'paypal' | ''>('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle input change for customer details
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle plan selection
  const handleSelectPlan = (plan: DataPlan) => {
    setSelectedPlan(plan);
    setStep('enter-details');
  };
  
  // Add a log for state changes
  useEffect(() => {
    console.log('Step changed to:', step);
  }, [step]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName) {
      console.error('Required fields missing:', formData);
      return; // Don't proceed if required fields are missing
    }
    
    console.log('Form submitted, advancing to confirm step');
    setStep('confirm');
  };
  
  // Handle card details change
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle payment method selection
  const handlePaymentMethodSelect = (method: 'credit-card' | 'paypal') => {
    setPaymentMethod(method);
  };

  // Process payment and create order
  const processPayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setStep('success');
    } catch (err) {
      console.error('Payment processing error:', err);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Handle order confirmation - now moves to payment step
  const handleConfirmOrder = () => {
    if (!selectedPlan) return;
    setStep('payment');
  };
  
  // Redirect to home page
  const goToHome = () => {
    navigate('/');
  };
  
  // If this is a direct navigation without a selected plan, show title accordingly
  const checkoutTitle = skipPlanSelection ? 'Complete Your Purchase' : 'Get Your eSIM';

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">{checkoutTitle}</h1>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            ['select-plan', 'enter-details', 'confirm', 'payment', 'success'].includes(step)
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {skipPlanSelection ? '1' : '1'}
          </div>
          <div className={`h-1 w-12 ${
            ['enter-details', 'confirm', 'payment', 'success'].includes(step)
              ? 'bg-blue-600' 
              : 'bg-gray-200'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            ['enter-details', 'confirm', 'payment', 'success'].includes(step) 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {skipPlanSelection ? '1' : '2'}
          </div>
          <div className={`h-1 w-12 ${
            ['confirm', 'payment', 'success'].includes(step)
              ? 'bg-blue-600' 
              : 'bg-gray-200'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            ['confirm', 'payment', 'success'].includes(step)
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {skipPlanSelection ? '2' : '3'}
          </div>
          <div className={`h-1 w-12 ${
            ['payment', 'success'].includes(step)
              ? 'bg-blue-600' 
              : 'bg-gray-200'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            ['payment', 'success'].includes(step)
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {skipPlanSelection ? '3' : '4'}
          </div>
          <div className={`h-1 w-12 ${
            ['success'].includes(step)
              ? 'bg-blue-600' 
              : 'bg-gray-200'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            ['success'].includes(step)
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {skipPlanSelection ? '4' : '5'}
          </div>
        </div>
        
        <div className="flex justify-center mt-2 text-sm text-gray-600">
          <div className="w-20 text-center">{skipPlanSelection ? 'Details' : 'Select Plan'}</div>
          <div className="w-20 text-center">{skipPlanSelection ? 'Review' : 'Details'}</div>
          <div className="w-20 text-center">{skipPlanSelection ? 'Payment' : 'Review'}</div>
          <div className="w-20 text-center">{skipPlanSelection ? 'Done' : 'Payment'}</div>
          <div className="w-20 text-center">{skipPlanSelection ? '' : 'Done'}</div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Step 1: Select Plan (if not skipped) */}
        {step === 'select-plan' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Choose Your eSIM Plan</h2>
            <PlanSelector onSelectPlan={handleSelectPlan} selectedPlan={selectedPlan} />
          </div>
        )}
        
        {/* Step 2: Enter Details */}
        {step === 'enter-details' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
            
            {selectedPlan && (
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-lg">{selectedPlan.name}</h3>
                <p className="text-gray-600">{selectedPlan.data} - {selectedPlan.price?.amount} {selectedPlan.price?.currency}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep('select-plan')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={skipPlanSelection}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Step 3: Confirm Order */}
        {step === 'confirm' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
            
            {selectedPlan && (
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-2">Selected Plan</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{selectedPlan.name}</p>
                      <p className="text-gray-600">{selectedPlan.data}</p>
                      <p className="text-gray-600">Valid for 30 days</p>
                    </div>
                    <div className="text-lg font-semibold">
                      {selectedPlan.price?.amount} {selectedPlan.price?.currency}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Customer Information</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                {formData.phone && <p><span className="font-medium">Phone:</span> {formData.phone}</p>}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{selectedPlan?.price?.amount} {selectedPlan?.price?.currency}</span>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep('enter-details')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleConfirmOrder}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
        
        {/* Step 4: Payment */}
        {step === 'payment' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => handlePaymentMethodSelect('credit-card')}
                  className={`flex-1 p-4 border rounded-md text-center ${
                    paymentMethod === 'credit-card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <p className="font-medium">Credit Card</p>
                </button>
                <button
                  onClick={() => handlePaymentMethodSelect('paypal')}
                  className={`flex-1 p-4 border rounded-md text-center ${
                    paymentMethod === 'paypal' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <p className="font-medium">PayPal</p>
                </button>
              </div>
            </div>
            
            {paymentMethod === 'credit-card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardDetailsChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardDetailsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="mb-6 p-4 bg-gray-50 rounded-md text-center">
                <p>You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{selectedPlan?.price?.amount} {selectedPlan?.price?.currency}</span>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep('confirm')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isProcessingPayment}
              >
                Back
              </button>
              <button
                onClick={processPayment}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isProcessingPayment || !paymentMethod ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isProcessingPayment || !paymentMethod}
              >
                {isProcessingPayment ? 'Processing...' : 'Complete Payment'}
              </button>
            </div>
          </div>
        )}
        
        {/* Step 5: Success */}
        {step === 'success' && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You For Your Purchase!</h2>
            <p className="text-lg mb-2">Your eSIM will be delivered to your email shortly.</p>
            <p className="text-gray-600 mb-8">Please check your inbox at {formData.email}</p>
            
            <button
              onClick={goToHome}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout; 