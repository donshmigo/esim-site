import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

export default function HowItWorks() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      number: '01',
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
    },
    {
      number: '02',
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
    },
    {
      number: '03',
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
    },
    {
      number: '04',
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
    },
  ];

  // Calculate max scroll value when component mounts or window resizes
  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollContainerRef.current) {
        // const containerWidth = scrollContainerRef.current.scrollWidth;
        // const viewportWidth = scrollContainerRef.current.clientWidth;
      }
    };

    // Update on mount
    updateMaxScroll();
    
    // Update on resize
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, []);

  // Update scroll position and active step when user scrolls
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const newPosition = scrollContainerRef.current.scrollLeft;
      // setScrollPosition(newPosition);
      
      // Calculate active step based on scroll position
      const stepWidth = scrollContainerRef.current.scrollWidth / steps.length;
      const newActiveStep = Math.min(
        steps.length - 1,
        Math.floor((newPosition + stepWidth / 2) / stepWidth)
      );
      setActiveStep(newActiveStep);
    }
  };

  // Handle step navigation
  const goToStep = (stepIndex: number) => {
    if (scrollContainerRef.current) {
      const stepWidth = scrollContainerRef.current.scrollWidth / steps.length;
      scrollContainerRef.current.scrollTo({
        left: stepWidth * stepIndex,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="how-it-works" className="pt-12 pb-8 md:pt-12 md:pb-6 bg-white">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="section-title">{t('howItWorks.title')}</h2>
          <p className="text-lg text-cool-slate">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Mobile View: Horizontal scrolling carousel */}
        <div className="md:hidden">
          {/* Step indicators at the top */}
          <div className="flex justify-center mb-6 space-x-2">
            {steps.map((_, idx) => (
              <button 
                key={`indicator-${idx}`}
                onClick={() => goToStep(idx)}
                className={`relative px-3 py-1 rounded-full transition-all ${
                  activeStep === idx 
                    ? 'bg-dark-theme text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          
          {/* Scrollable step cards */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
            onScroll={handleScroll}
            style={{ scrollBehavior: 'smooth' }}
          >
            {steps.map((_, idx) => (
              <div 
                key={`mobile-step-${idx}`}
                className="flex-shrink-0 w-full snap-center px-4"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dark-theme bg-opacity-10 flex items-center justify-center text-xl font-bold text-dark-theme">
                      {steps[idx].number}
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-romio-black">{steps[idx].title}</h3>
                  </div>
                  <p className="text-cool-slate pl-16">{steps[idx].description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-full mt-6 mb-2 mx-4">
            <div 
              className="h-1 bg-dark-theme rounded-full transition-all duration-300"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {/* Mobile CTA */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-primary"
            >
              {t('howItWorks.cta')}
            </button>
          </div>
        </div>

        {/* Desktop View: Grid layout with connector lines */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((_, idx) => (
            <div key={`desktop-step-${idx}`} className="relative">
              <div className="mb-6">
                <span className="text-6xl font-bold text-signal-blue opacity-20">{steps[idx].number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-romio-black">{steps[idx].title}</h3>
              <p className="text-cool-slate">{steps[idx].description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 text-center">
          <button 
            onClick={() => {
              const pricingSection = document.getElementById('pricing');
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-primary hidden md:inline-block"
          >
            {t('howItWorks.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}