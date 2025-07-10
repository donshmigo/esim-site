// Direct Facebook Pixel tracking
declare global {
  interface Window {
    fbq: any;
  }
}

export const trackAddToCart = (planName: string, price: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: planName,
      content_type: 'product',
      value: price,
      currency: 'USD'
    });
  }
};

export const trackInitiateCheckout = (planName: string, price: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: planName,
      content_type: 'product',
      value: price,
      currency: 'USD'
    });
  }
};

export const trackViewContent = (planName: string, price: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: planName,
      content_type: 'product',
      value: price,
      currency: 'USD'
    });
  }
}; 