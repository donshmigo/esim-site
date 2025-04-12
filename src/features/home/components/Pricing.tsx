import { CheckIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../../contexts/CurrencyContext';
import { useState, useEffect } from 'react';

export default function Pricing() {
  const { t } = useTranslation();
  const { formatPrice, convertFromUSD } = useCurrency();
  const [activeIndex, setActiveIndex] = useState(1); // Default to the popular plan (Traveler)
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false);
  const [swipeLocked, setSwipeLocked] = useState(false);

  const plans = [
    {
      name: t('pricing.lite.name'),
      price: 19.99,
      dataAmount: t('pricing.lite.data'),
      features: [
        t('pricing.commonFeatures.feature1'),
        t('pricing.commonFeatures.feature2'),
        t('pricing.commonFeatures.feature3'),
        t('pricing.commonFeatures.feature4'),
        t('pricing.commonFeatures.feature5'),
        t('pricing.lite.features.feature1')
      ],
      popular: false,
      ctaText: t('pricing.cta'),
      path: '/plans/lite'
    },
    {
      name: t('pricing.traveler.name'),
      price: 39.99,
      dataAmount: t('pricing.traveler.data'),
      features: [
        t('pricing.commonFeatures.feature1'),
        t('pricing.commonFeatures.feature2'),
        t('pricing.commonFeatures.feature3'),
        t('pricing.commonFeatures.feature4'),
        t('pricing.commonFeatures.feature5'),
        t('pricing.traveler.features.feature1'),
        t('pricing.traveler.features.feature2')
      ],
      popular: true,
      ctaText: t('pricing.cta'),
      path: '/plans/traveler'
    },
    {
      name: t('pricing.max.name'),
      price: 59.99,
      dataAmount: t('pricing.max.data'),
      features: [
        t('pricing.commonFeatures.feature1'),
        t('pricing.commonFeatures.feature2'),
        t('pricing.commonFeatures.feature3'),
        t('pricing.commonFeatures.feature4'),
        t('pricing.commonFeatures.feature5'),
        t('pricing.max.features.feature1'),
        t('pricing.max.features.feature2'),
        t('pricing.max.features.feature3')
      ],
      popular: false,
      ctaText: t('pricing.cta'),
      path: '/plans/max'
    }
  ];

  // Create a helper function to generate features arrays with fallbacks
  const getFeatures = (planKey: string) => {
    const commonFeatures = [
      'pricing.commonFeatures.feature1',
      'pricing.commonFeatures.feature2',
      'pricing.commonFeatures.feature3',
      'pricing.commonFeatures.feature4',
      'pricing.commonFeatures.feature5',
      'pricing.commonFeatures.feature6',
      'pricing.commonFeatures.feature7'
    ].map(key => t(key));
    
    // Add plan-specific features
    const planFeatures: string[] = [];
    try {
      if (planKey === 'lite') {
        // No plan-specific features for now
      } else if (planKey === 'traveler') {
        // No plan-specific features for now
      } else if (planKey === 'max') {
        // No plan-specific features for now
      }
    } catch (e) {
      // Fallback for languages without the nested features structure
      console.error('Error loading features for', planKey, e);
    }
    
    const result = [...commonFeatures, ...planFeatures].filter(f => f !== '' && !f.includes('pricing.') && f !== undefined);
    console.log(`Features for ${planKey}:`, result);
    return result;
  };

  const plansWithFallback = [
    {
      name: t('pricing.lite.name'),
      price: 19.99,
      dataAmount: t('pricing.lite.data'),
      features: getFeatures('lite'),
      popular: false,
      ctaText: t('pricing.cta'),
      path: '/plans/lite'
    },
    {
      name: t('pricing.traveler.name'),
      price: 39.99,
      dataAmount: t('pricing.traveler.data'),
      features: getFeatures('traveler'),
      popular: true,
      ctaText: t('pricing.cta'),
      path: '/plans/traveler'
    },
    {
      name: t('pricing.max.name'),
      price: 59.99,
      dataAmount: t('pricing.max.data'),
      features: getFeatures('max'),
      popular: false,
      ctaText: t('pricing.cta'),
      path: '/plans/max'
    }
  ];

  const scrollToIndex = (index: number) => {
    // Skip if index is out of bounds
    if (index < 0 || index >= plansWithFallback.length) return;
    
    // Simply update the active index
    setActiveIndex(index);
  };

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsHorizontalSwipe(false);
    setSwipeLocked(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipeLocked) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    
    const deltaX = Math.abs(touchX - touchStartX);
    const deltaY = Math.abs(touchY - touchStartY);
    
    // If we haven't determined direction yet and the movement is significant
    if (!isHorizontalSwipe && !swipeLocked && (deltaX > 10 || deltaY > 10)) {
      // If horizontal movement is greater than vertical, it's a horizontal swipe
      if (deltaX > deltaY * 1.2) { // Bias toward horizontal detection
        setIsHorizontalSwipe(true);
      } else {
        // It's a vertical swipe, lock to vertical scrolling
        setSwipeLocked(true);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if ((isHorizontalSwipe || !swipeLocked) && touchStartX > 0) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchDiff = touchEndX - touchStartX;
      
      // Only handle as a swipe if the movement is primarily horizontal
      const touchEndY = e.changedTouches[0].clientY;
      const verticalDiff = Math.abs(touchEndY - touchStartY);
      const horizontalDiff = Math.abs(touchDiff);
      
      if (horizontalDiff > verticalDiff * 1.2) { // Ensure it's more horizontal than vertical
        // Swipe right (prev plan)
        if (touchDiff > 50 && activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
        // Swipe left (next plan)
        else if (touchDiff < -50 && activeIndex < plansWithFallback.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
      }
    }
    
    // Reset states
    setIsHorizontalSwipe(false);
    setSwipeLocked(false);
  };

  // Update the data attribute when the active index changes
  useEffect(() => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.setAttribute('data-active-plan', activeIndex.toString());
    }
  }, [activeIndex]);

  // Set initial position to the popular plan on component mount
  useEffect(() => {
    const popularIndex = plansWithFallback.findIndex(plan => plan.popular);
    if (popularIndex !== -1) {
      setActiveIndex(popularIndex);
    }
  }, []);

  return (
    <section id="pricing" className="pt-8 md:pt-6 pb-12 bg-white" data-active-plan={activeIndex.toString()}>
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="section-title">{t('pricing.title')}</h2>
          <p className="text-lg text-cool-slate">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Mobile View - Horizontal Carousel */}
        <div className="md:hidden relative">
          {/* Navigation controls */}
          <div className="flex justify-between items-center mb-4 px-4">
            <button 
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              className={`p-2 rounded-full ${
                activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-steel-gray bg-opacity-10'
              }`}
            >
              <ArrowLeftIcon className="h-5 w-5 text-cool-slate" />
            </button>
            
            <div className="flex space-x-2">
              {plansWithFallback.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === idx ? 'w-6 bg-signal-blue' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`View ${plansWithFallback[idx].name} plan`}
                />
              ))}
            </div>
            
            <button 
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === plansWithFallback.length - 1}
              className={`p-2 rounded-full ${
                activeIndex === plansWithFallback.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-steel-gray bg-opacity-10'
              }`}
            >
              <ArrowRightIcon className="h-5 w-5 text-cool-slate" />
            </button>
          </div>
          
          {/* Visible plan for vertical scrolling */}
          <div className="px-4 relative">
            {/* Swipe detection layer without visual indicators */}
            <div 
              className={`absolute inset-0 z-10 ${isHorizontalSwipe ? 'cursor-ew-resize' : ''}`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            ></div>
            
            {plansWithFallback[activeIndex] && (
              <div className={`w-full rounded-xl p-6 flex flex-col ${plansWithFallback[activeIndex].popular ? 'border-2 border-signal-blue relative mt-4' : 'border-2 border-dark-theme'}`}>
                {plansWithFallback[activeIndex].popular && (
                  <div className="absolute -top-5 inset-x-0 flex justify-center z-20">
                    <span className="bg-signal-blue text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                      {t('pricing.mostPopular')}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-romio-black">{plansWithFallback[activeIndex].name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-romio-black">{formatPrice(convertFromUSD(plansWithFallback[activeIndex].price))}</span>
                    <span className="text-cool-slate">/{t('pricing.monthly')}</span>
                  </div>
                  <div className="mt-1 text-lg font-medium text-signal-blue">{plansWithFallback[activeIndex].dataAmount}</div>
                  <p className="mt-2 text-sm text-cool-slate">
                    {t(`pricing.${plansWithFallback[activeIndex].name.toLowerCase()}.description`)}
                  </p>
                </div>
                
                <ul className="mb-6 space-y-2 pointer-events-auto min-h-[120px]">
                  {plansWithFallback[activeIndex].features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start text-sm">
                      <CheckIcon className="h-4 w-4 text-signal-blue flex-shrink-0 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={plansWithFallback[activeIndex].path}
                  className={`block text-center py-3 px-4 rounded-lg font-medium transition-colors pointer-events-auto z-20 relative ${
                    plansWithFallback[activeIndex].popular 
                      ? 'bg-signal-blue text-white hover:bg-opacity-90' 
                      : 'bg-transparent border border-signal-blue text-signal-blue hover:bg-signal-blue hover:bg-opacity-10'
                  }`}
                >
                  {plansWithFallback[activeIndex].ctaText}
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile-only custom plan option */}
          <div className="mt-8 px-4 md:hidden">
            <div className="bg-steel-gray rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold mb-3">{t('pricing.customPlan')}</h3>
              <p className="text-cool-slate text-sm mb-4">
                {t('pricing.contactUs')}
              </p>
              <Link to="/contact" className="btn-secondary inline-block text-sm py-2 px-4">
                {t('pricing.contactUs')}
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {plansWithFallback.map((plan) => (
            <div 
              key={`desktop-${plan.name}`} 
              className={`relative rounded-xl p-8 ${plan.popular ? 'border-2 border-signal-blue' : 'border-2 border-dark-theme'}`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-signal-blue text-white px-4 py-1 rounded-full text-sm font-medium z-10 shadow-sm">
                  {t('pricing.mostPopular')}
                </div>
              )}
              <h3 className="text-2xl font-bold text-romio-black">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-romio-black">{formatPrice(convertFromUSD(plan.price))}</span>
                <span className="text-cool-slate">/{t('pricing.monthly')}</span>
                <div className="mt-1 text-lg font-medium text-signal-blue">{plan.dataAmount}</div>
                <p className="mt-2 text-sm text-cool-slate min-h-[80px]">
                  {t(`pricing.${plan.name.toLowerCase()}.description`)}
                </p>
              </div>
              
              <ul className="mb-8 space-y-4 min-h-[200px]">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-signal-blue flex-shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to={plan.path}
                className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular 
                    ? 'bg-signal-blue text-white hover:bg-opacity-90' 
                    : 'bg-transparent border border-signal-blue text-signal-blue hover:bg-signal-blue hover:bg-opacity-10'
                }`}
              >
                {plan.ctaText}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-steel-gray rounded-xl p-8 text-center hidden md:block">
          <h3 className="text-xl font-semibold mb-4">{t('pricing.customPlan')}</h3>
          <p className="text-cool-slate mb-6">
            {t('pricing.contactUs')}
          </p>
          <Link to="/contact" className="btn-secondary inline-block">
            {t('pricing.contactUs')}
          </Link>
        </div>
      </div>
    </section>
  );
} 