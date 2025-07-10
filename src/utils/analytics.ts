// Function to track Add to Cart event
export const trackAddToCart = (planName: string, price: number) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'AddToCart', {
      content_name: planName,
      content_type: 'product',
      value: price,
      currency: 'USD'
    });
  }
};

// Function to track Initiate Checkout event
export const trackInitiateCheckout = (planName: string, price: number) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      content_name: planName,
      content_type: 'product',
      value: price,
      currency: 'USD'
    });
  }
};

// Function to track View Content event
export const trackViewContent = (contentName: string, contentType: string = 'page') => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: contentName,
      content_type: contentType
    });
  }
}; 