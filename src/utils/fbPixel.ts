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
  console.log('💳 HOME PAGE - Tracking InitiateCheckout (Purchase Intent):', { planName, price });
  
  // Check if Facebook Pixel is loaded
  if (typeof window !== 'undefined' && (window as any).fbq) {
    console.log('✅ Facebook Pixel is available, tracking event');
    ReactPixel.track('InitiateCheckout', {
      content_name: planName,
      content_type: 'product',
      value: price,
      currency: 'USD'
    });
  } else {
    console.warn('❌ Facebook Pixel not available');
  }

  // Track GTM begin_checkout custom event with ecommerce data
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'USD',
        value: price.toString(),
        items: [{
          item_id: planName.toLowerCase().replace(' ', '_'),
          item_name: planName,
          category: 'eSIM Plan',
          quantity: '1',
          price: price.toString()
        }]
      },
      checkout_step: '1',
      plan_name: planName
    });

    console.log('✅ GTM begin_checkout custom event fired:', {
      value: price,
      currency: 'USD',
      plan: planName
    });
  } else {
    console.warn('❌ GTM dataLayer not available');
  }
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