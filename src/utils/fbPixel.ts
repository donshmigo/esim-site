import ReactPixel from 'react-facebook-pixel';

const options = {
  autoConfig: false,
  debug: false
};

ReactPixel.init('1727807848112777', undefined, options);

export const trackAddToCart = (planName: string, price: number) => {
  console.log('🛒 HOME PAGE - Tracking AddToCart (Interest):', { planName, price });
  ReactPixel.track('AddToCart', {
    content_name: planName,
    content_type: 'product',
    value: price,
    currency: 'USD'
  });
};

export const trackInitiateCheckout = (planName: string, price: number) => {
  console.log('💳 PLAN PAGE - Tracking InitiateCheckout (Purchase Intent):', { planName, price });
  ReactPixel.track('InitiateCheckout', {
    content_name: planName,
    content_type: 'product',
    value: price,
    currency: 'USD'
  });
};

export const trackViewContent = (planName: string, price: number) => {
  console.log('👁️ Tracking ViewContent:', { planName, price });
  ReactPixel.track('ViewContent', {
    content_name: planName,
    content_type: 'product',
    value: price,
    currency: 'USD'
  });
}; 