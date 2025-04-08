import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlanSelector from '../components/PlanSelector';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { DataPlan, OrderRequest } from '../services/api';
import { useAuth } from '../firebase/AuthContext';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { db } from '../firebase/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

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
  const [countryCode, setCountryCode] = useState<string>('');
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
  const [googleSignInLoading, setGoogleSignInLoading] = useState(false);
  const [googleSignInError, setGoogleSignInError] = useState<string | null>(null);
  const [googleSignInSuccess, setGoogleSignInSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { createOrder, order, loading, error } = useCreateOrder();
  const { loginWithGoogle } = useAuth();
  const analytics = getAnalytics();

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
  
  // Handle country change
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };
  
  // Handle Google Sign In with direct approach
  const handleGoogleSignIn = async () => {
    if (googleSignInLoading) {
      console.log('Already processing Google sign-in, ignoring click');
      return; // Prevent multiple clicks
    }
    
    // Reset states
    setGoogleSignInLoading(true);
    setGoogleSignInError(null);
    setGoogleSignInSuccess(false);
    
    console.log('Google sign-in initiated - states reset');
    
    // Log the sign-in attempt
    logEvent(analytics, 'login_attempt', { method: 'google' });
    
    try {
      console.log('Starting Google sign-in process...');
      const user = await loginWithGoogle();
      
      console.log('Google sign-in successful:', user ? {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid ? 'Present' : 'Missing'
      } : 'No user data');
      
      // Only proceed if we have a user
      if (user) {
        // Log successful sign-in
        logEvent(analytics, 'login', { 
          method: 'google',
          success: true 
        });
        
        // Fill the form with Google user data
        const userEmail = user.email || '';
        const displayName = user.displayName || '';
        let firstName = '';
        let lastName = '';
        
        // Try to split display name into first and last name
        if (displayName) {
          const nameParts = displayName.split(' ');
          firstName = nameParts[0] || '';
          lastName = nameParts.slice(1).join(' ') || '';
        }
        
        // Update form data synchronously
        console.log('Setting form data with values from Google account');
        const newFormData = {
          email: userEmail,
          firstName: firstName,
          lastName: lastName,
          phone: ''
        };
        
        setFormData(newFormData);
        
        // Set success state
        console.log('Setting googleSignInSuccess to true');
        setGoogleSignInSuccess(true);
        
        // DIRECTLY ADVANCE TO CONFIRMATION STEP
        console.log('Directly advancing to confirmation step');
        
        // Create checkout data object for analytics
        const checkoutData = {
          email: userEmail,
          firstName: firstName,
          lastName: lastName,
          phone: '',
          lastUpdated: serverTimestamp(),
          checkoutStep: 'confirm', // Set to confirm since we're advancing
          authenticated_with: 'google',
          selectedPlan: selectedPlan ? {
            id: selectedPlan.id,
            name: selectedPlan.name,
            price: selectedPlan.price.amount
          } : null
        };
        
        // Store checkout data in Firestore for tracking abandonment
        if (user.uid) {
          try {
            setDoc(doc(db, 'checkouts', user.uid), checkoutData, { merge: true })
              .then(() => console.log('Checkout data saved for user tracking'))
              .catch(err => console.error('Failed to save checkout data', err));
            
            // Track that we're storing user data
            logEvent(analytics, 'user_data_stored', {
              method: 'google_auth',
              data_fields: ['email', 'firstName', 'lastName']
            });
          } catch (err) {
            console.error('Failed to save checkout data', err);
          }
        }
        
        // Track checkout step advancement
        logEvent(analytics, 'checkout_progress', {
          step: 2,
          step_name: 'confirm',
          method: 'google_auth'
        });
        
        // USE TIMEOUT TO ENSURE STATE UPDATES BEFORE STEP CHANGE
        setTimeout(() => {
          console.log('Timeout completed - setting step to confirm');
          setStep('confirm');
        }, 500);
        
      } else {
        console.error('No user data returned from Google sign-in');
        logEvent(analytics, 'login_error', { 
          method: 'google',
          error: 'no_user_data_returned'
        });
        setGoogleSignInError('Sign-in completed but no user data was returned.');
      }
    } catch (error: any) {
      console.error("Google sign-in failed", error);
      console.error("Error details:", { 
        code: error?.code,
        message: error?.message,
        stack: error?.stack
      });
      
      // Log error
      logEvent(analytics, 'login_error', { 
        method: 'google',
        error_code: error?.code || 'unknown',
        error_message: error?.message || 'Unknown error'
      });
      
      // Handle specific error types
      if (error?.code === 'auth/unauthorized-domain') {
        setGoogleSignInError(
          'This website domain is not authorized for Google sign-in. Please contact support or fill out the form manually.'
        );
      } else if (error?.code === 'auth/popup-closed-by-user') {
        setGoogleSignInError('Sign-in was cancelled. Please try again or fill out the form manually.');
      } else if (error?.code === 'auth/timeout') {
        setGoogleSignInError('Sign-in timed out. Please check your connection and try again.');
      } else if (error?.message?.includes('timeout')) {
        setGoogleSignInError('Sign-in process took too long. Please try again.');
      } else if (error?.code) {
        setGoogleSignInError(`Authentication error (${error.code}). Please try again or fill out the form manually.`);
      } else {
        setGoogleSignInError(error?.message || 'Google sign-in failed. Please try again or use manual entry.');
      }
    } finally {
      // Ensure loading state is cleared
      console.log('Clearing loading state');
      setGoogleSignInLoading(false);
    }
  };
  
  // Add a log for state changes
  useEffect(() => {
    console.log('Step changed to:', step);
  }, [step]);
  
  // Track checkout steps
  useEffect(() => {
    // Log each step change for analytics
    if (step !== 'select-plan') {
      const stepNumber = {
        'enter-details': 1,
        'confirm': 2,
        'payment': 3,
        'success': 4
      }[step] || 0;
      
      logEvent(analytics, 'checkout_progress', {
        step: stepNumber,
        step_name: step
      });
    }
  }, [step, analytics]);
  
  // Handle form submission with tracking
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName) {
      console.error('Required fields missing:', formData);
      return; // Don't proceed if required fields are missing
    }
    
    console.log('Form submitted, advancing to confirm step');
    
    // Track manual form submission
    logEvent(analytics, 'checkout_progress', {
      step: 2,
      step_name: 'confirm',
      method: 'manual_form'
    });
    
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
    
    // Track payment attempt
    logEvent(analytics, 'begin_checkout', {
      value: selectedPlan?.price.amount,
      currency: selectedPlan?.price.currency,
      payment_method: paymentMethod
    });
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After successful payment, create the order
      if (selectedPlan) {
        const orderData: OrderRequest = {
          plan_id: selectedPlan.id,
          quantity: 1,
          customer: {
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone
          }
        };
        
        const createdOrder = await createOrder(orderData);
        
        if (createdOrder) {
          // Track successful purchase
          logEvent(analytics, 'purchase', {
            transaction_id: createdOrder.id,
            value: selectedPlan.price.amount,
            currency: selectedPlan.price.currency,
            items: [{
              item_id: selectedPlan.id,
              item_name: selectedPlan.name,
              price: selectedPlan.price.amount,
              quantity: 1
            }]
          });
          
          // Simulate sending email with QR code
          console.log(`Sending eSIM QR code email to ${formData.email}`);
          
          // Move to success step
          setStep('success');
        }
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      
      // Track payment error
      logEvent(analytics, 'payment_error', {
        value: selectedPlan?.price.amount,
        currency: selectedPlan?.price.currency,
        payment_method: paymentMethod,
        error: err
      });
      
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Handle order confirmation - now moves to payment step
  const handleConfirmOrder = () => {
    if (!selectedPlan) return;
    setStep('payment');
  };
  
  // Redirect to dashboard
  const goToDashboard = () => {
    navigate('/esim-dashboard?newPurchase=true');
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
            step === 'success' 
              ? 'bg-blue-600' 
              : 'bg-gray-200'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            step === 'success' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {skipPlanSelection ? '4' : '5'}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          {!skipPlanSelection && (
            <div className="text-xs text-center w-20">
              Select Plan
            </div>
          )}
          <div className="text-xs text-center w-20">
            Your Details
          </div>
          <div className="text-xs text-center w-20">
            Confirm
          </div>
          <div className="text-xs text-center w-20">
            Payment
          </div>
          <div className="text-xs text-center w-20">
            Success
          </div>
        </div>
      </div>
      
      {/* Step-specific content */}
      {step === 'select-plan' && !skipPlanSelection && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Select a Data Plan</h2>
          
          {/* Country selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Country
            </label>
            <select
              value={countryCode}
              onChange={handleCountryChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Countries</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="JP">Japan</option>
              <option value="KR">South Korea</option>
              <option value="SG">Singapore</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          
          <PlanSelector onSelectPlan={handleSelectPlan} countryCode={countryCode || undefined} />
        </div>
      )}
      
      {step === 'enter-details' && selectedPlan && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Enter Your Details</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Selected Plan:</h3>
            <div className="bg-white p-4 rounded-lg border">
              <div className="font-semibold">{selectedPlan.name}</div>
              <div className="text-gray-600 text-sm">{selectedPlan.description}</div>
              <div className="flex justify-between mt-2">
                <span className="font-medium">{selectedPlan.data_amount} {selectedPlan.data_unit}</span>
                <span className="font-bold text-blue-600">
                  {selectedPlan.price.currency} {selectedPlan.price.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Show different content based on Google sign-in status */}
          {googleSignInSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <svg className="h-8 w-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h3 className="text-lg font-medium text-green-800">Signed in with Google</h3>
              </div>
              
              <div className="bg-white p-4 rounded-lg border mb-4">
                <div className="mb-2">
                  <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {formData.email}
                </div>
              </div>
              
              <button 
                type="button" 
                onClick={() => {
                  console.log("Continue button clicked, current states:", {
                    googleSignInSuccess,
                    formData,
                    step
                  });
                  
                  logEvent(analytics, 'checkout_progress', {
                    step: 2,
                    step_name: 'confirm',
                    method: 'google_auth_continue'
                  });
                  
                  console.log('Setting step to confirm');
                  setStep('confirm');
                }}
                className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center font-bold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span>Continue to Order Review</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          ) : (
            <div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium mb-4">Choose how to continue</h3>
                
                {/* Google Sign Up Button - Ultra simplified */}
                <button 
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-4 px-4 text-gray-700 hover:bg-gray-50 transition-colors mb-4 shadow-md hover:shadow-lg font-medium text-lg"
                  onClick={async () => {
                    try {
                      console.log('Starting direct Google sign-in...');
                      setGoogleSignInLoading(true);
                      setGoogleSignInError(null);
                      
                      // Attempt Google login
                      const user = await loginWithGoogle();
                      
                      if (user && user.email) {
                        console.log('Sign-in successful, user:', user.email);
                        
                        // Update form data directly
                        const displayName = user.displayName || '';
                        let firstName = '';
                        let lastName = '';
                        
                        if (displayName) {
                          const nameParts = displayName.split(' ');
                          firstName = nameParts[0] || '';
                          lastName = nameParts.slice(1).join(' ') || '';
                        }
                        
                        setFormData({
                          email: user.email,
                          firstName: firstName,
                          lastName: lastName,
                          phone: ''
                        });
                        
                        // SUPER DIRECT APPROACH - skip state updates and directly navigate
                        setGoogleSignInSuccess(true);
                        console.log('Directly advancing to confirmation page NOW');
                        setStep('confirm');
                      } else {
                        console.error('No user data returned from Google sign-in');
                        setGoogleSignInError('Sign-in completed but no user data was returned');
                      }
                    } catch (error: any) {
                      console.error('Google sign-in error:', error);
                      setGoogleSignInError(error?.message || 'Sign-in failed. Please try again or use manual entry.');
                    } finally {
                      setGoogleSignInLoading(false);
                    }
                  }}
                  disabled={googleSignInLoading}
                >
                  {googleSignInLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                  )}
                  {googleSignInLoading ? 'Signing in...' : 'Continue with Google'}
                </button>
                
                {/* Status message to help diagnose issues */}
                <div className="text-sm text-center mb-4">
                  <div className="flex items-center justify-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      googleSignInSuccess ? 'bg-green-500' : googleSignInLoading ? 'bg-yellow-500' : googleSignInError ? 'bg-red-500' : 'bg-gray-300'
                    }`}></span>
                    <span className="text-gray-600">
                      {googleSignInSuccess ? 'Sign-in successful' : 
                       googleSignInLoading ? 'Signing in...' : 
                       googleSignInError ? 'Sign-in failed' : 
                       'Ready to sign in'}
                    </span>
                  </div>
                </div>
                
                {googleSignInError && (
                  <div className="text-sm text-red-600 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <div className="font-medium">Error signing in:</div>
                    <div>{googleSignInError}</div>
                  </div>
                )}
                
                {/* If sign-in successful but stuck, show manual continue button */}
                {googleSignInSuccess && (
                  <div className="bg-green-50 p-4 border border-green-200 rounded-lg mb-4">
                    <div className="text-green-800 font-medium mb-2">Sign-in successful!</div>
                    <p className="text-sm mb-3">If you're not automatically redirected, please click the button below:</p>
                    <button 
                      type="button"
                      onClick={() => {
                        console.log('Manual continue button clicked');
                        setStep('confirm');
                      }}
                      className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Continue to Order Review
                    </button>
                  </div>
                )}
                
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-sm text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                <h3 className="font-medium mb-4">Fill out the form manually</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  {!skipPlanSelection && (
                    <button
                      type="button"
                      onClick={() => setStep('select-plan')}
                      className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className={`py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${skipPlanSelection ? 'ml-auto' : ''}`}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
      
      {/* The confirm, payment, and success steps remain unchanged */}
      {step === 'confirm' && selectedPlan && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Confirm Your Order</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Order Summary:</h3>
            <div className="bg-white p-4 rounded-lg border mb-4">
              <div className="font-semibold">{selectedPlan.name}</div>
              <div className="text-gray-600 text-sm">{selectedPlan.description}</div>
              <div className="flex justify-between mt-2">
                <span className="font-medium">{selectedPlan.data_amount} {selectedPlan.data_unit}</span>
                <span className="font-bold text-blue-600">
                  {selectedPlan.price.currency} {selectedPlan.price.amount.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Customer Details:</h4>
              <div className="text-sm">
                <div className="mb-1">
                  <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                </div>
                <div className="mb-1">
                  <span className="font-medium">Email:</span> {formData.email}
                </div>
                {formData.phone && (
                  <div>
                    <span className="font-medium">Phone:</span> {formData.phone}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-blue-600">
                {selectedPlan.price.currency} {selectedPlan.price.amount.toFixed(2)}
              </span>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error.message}
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep('enter-details')}
              className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleConfirmOrder}
              className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
      
      {/* Payment step */}
      {step === 'payment' && selectedPlan && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Payment</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-blue-600">
                {selectedPlan.price.currency} {selectedPlan.price.amount.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-4">Select Payment Method</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handlePaymentMethodSelect('credit-card')}
                className={`p-4 border rounded-lg flex flex-col items-center justify-center ${
                  paymentMethod === 'credit-card' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Credit Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => handlePaymentMethodSelect('paypal')}
                className={`p-4 border rounded-lg flex flex-col items-center justify-center ${
                  paymentMethod === 'paypal' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span>PayPal</span>
              </button>
            </div>
          </div>
          
          {paymentMethod === 'credit-card' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  placeholder="1234 5678 9012 3456"
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleCardDetailsChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailsChange}
                    placeholder="MM/YY"
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                    placeholder="123"
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
          
          {paymentMethod === 'paypal' && (
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
              <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.067 8.5C20.25 7.833 20.333 7.167 20.333 6.5C20.333 3.733 18.1 1.5 15.333 1.5H7.5C6.667 1.5 6 2.167 6 3V14.167C6 15 6.667 15.667 7.5 15.667H10.75L11.583 20.167C11.667 20.583 12 20.833 12.417 20.833H14.25C14.75 20.833 15.167 20.417 15.167 19.917L15.083 19.333L15.75 15.667H17.833C18.5 15.667 19.083 15.25 19.25 14.583L20.067 8.5Z" fill="#1DA1F2" />
              </svg>
            </div>
          )}
          
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep('confirm')}
              className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isProcessingPayment}
            >
              Back
            </button>
            <button
              type="button"
              onClick={processPayment}
              disabled={!paymentMethod || isProcessingPayment}
              className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isProcessingPayment ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        </div>
      )}
      
      {/* Success step */}
      {step === 'success' && order && (
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Thank You For Your Order!</h2>
          <p className="text-gray-600 mb-6">
            Your eSIM has been ordered successfully. You will receive an email with activation instructions and QR code shortly.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <div className="mb-2 font-medium">Order Details:</div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="mb-1">
                <span className="font-medium">Order ID:</span> {order.id}
              </div>
              <div className="mb-1">
                <span className="font-medium">Status:</span> {order.status}
              </div>
              <div>
                <span className="font-medium">Order Date:</span> {new Date(order.created_at).toLocaleString()}
              </div>
            </div>
          </div>
          
          <button
            onClick={goToDashboard}
            className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout; 