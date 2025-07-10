declare const fbq: any;

// Initialize Facebook Pixel
if (typeof window !== 'undefined') {
  fbq('init', '1727807848112777');
}

export const trackAddToCart = (planName: string, price: number) => {
  if (typeof window !== 'undefined') {
    fbq('track', 'AddToCart', {
      content_name: planName,
      content_type: 'product',
      value: price,
      currency: 'USD'
    });
  }
};

export const trackInitiateCheckout = (planName: string, price: number) => {
  if (typeof window !== 'undefined') {
    fbq('track', 'InitiateCheckout', {
      content_name: planName,
      content_type: 'product',
      value: price,
      currency: 'USD'
    });
  }
};

export const trackViewContent = (planName: string, price: number) => {
  if (typeof window !== 'undefined') {
    fbq('track', 'ViewContent', {
      content_name: planName,
      content_type: 'product',
      value: price,
      currency: 'USD'
    });
  }
}; 