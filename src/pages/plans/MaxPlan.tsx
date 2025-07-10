import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, DevicePhoneMobileIcon, GlobeAltIcon, SignalIcon, WifiIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { trackInitiateCheckout } from '../../utils/fbPixel';

const MaxPlan = () => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleCheckout = async () => {
    // Prevent multiple rapid clicks
    if (isProcessing) return;
    setIsProcessing(true);
    
    // Open window immediately to avoid popup blockers
    const checkoutWindow = window.open('https://account.romiomobile.com/estore/purchase/d88cb722-aab6-4d3c-8509-2091228eb1f1', '_blank');
    
    // Track InitiateCheckout only (AddToCart happens on home page)
    trackInitiateCheckout('Max Plan', 64.99);
    
    // Reset processing state after a short delay
    setTimeout(() => setIsProcessing(false), 1000);
  };

  return (
    <div className="pt-4 pb-16">
      <div className="container-custom mx-auto">
        {/* Back button and breadcrumb */}
        <div className="mb-4">
          <Link to="/#pricing" className="inline-flex items-center text-signal-blue hover:underline group">
            <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('common.backToAllPlans')}
          </Link>
        </div>

        {/* Plan Header */}
        <div className="mb-4 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <SignalIcon className="h-5 w-5 text-signal-blue animate-signal" />
            <span className="text-signal-blue font-medium">30GB {t('plans.dataPlan')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-romio-black mb-4 tech-accent">
            {t('pricing.max.name')} – 30GB {t('plans.esimPlan')}
          </h1>
          
          <div className="flex flex-col lg:flex-row lg:items-start">
            <p className="text-xl text-cool-slate lg:max-w-xl">
              {t('pricing.max.description')}
            </p>
            
            {/* Mobile subscription box - visible only on mobile - NOW ALIGNED WITH DESCRIPTION */}
            <div className="lg:hidden mt-4">
              <div className="bg-white rounded-xl border-2 border-signal-blue p-4 shadow-lg">
                <div className="mb-2 text-center">
                  <h3 className="text-lg font-medium mb-1">{t('pricing.monthly')}: <span className="text-2xl font-bold text-signal-blue">{t('pricing.max.price')}</span></h3>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="m-0 text-center py-3 bg-signal-blue text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer select-none w-full"
                  type="button"
                >
                  {t('pricing.cta')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Plan details */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">{t('plans.overview')}</h2>
              <p>
                {t('plans.maxOverview')}
              </p>

              {/* Key features */}
              <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  t('plans.features.streaming'),
                  t('plans.features.highSpeedCoverage'),
                  t('plans.features.autoRenewing'),
                  t('plans.features.remoteWork'),
                  t('plans.features.addons')
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-signal-blue flex-shrink-0 mr-2 mt-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">{t('plans.whatYouCanDo')} 30GB</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <GlobeAltIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">40+ {t('common.hours')}</h3>
                  </div>
                  <p className="text-cool-slate">{t('plans.usage.hdVideo')}</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <DevicePhoneMobileIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">15+ {t('common.hours')}</h3>
                  </div>
                  <p className="text-cool-slate">{t('plans.usage.zoomCalls')}</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <WifiIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">{t('plans.usage.wifiBackup')}</h3>
                  </div>
                  <p className="text-cool-slate">{t('plans.usage.hotspot')}</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <ComputerDesktopIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">{t('plans.usage.unlimited')}</h3>
                  </div>
                  <p className="text-cool-slate">{t('plans.usage.anywhere')}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">{t('plans.perfectFor')}</h2>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li>{t('plans.userTypes.remoteWorkers')}</li>
                <li>{t('plans.userTypes.digitalNomads')}</li>
                <li>{t('plans.userTypes.fullTimeTravelers')}</li>
                <li>{t('plans.userTypes.contentCreators')}</li>
                <li>{t('plans.userTypes.heavyUsers')}</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">{t('plans.premiumAddons')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-steel-gray bg-opacity-10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">{t('plans.voipComingSoon')}</h3>
                  <p className="text-cool-slate text-sm">
                    {t('plans.voipDescription')}
                  </p>
                </div>
                
                <div className="bg-steel-gray bg-opacity-10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">{t('plans.deviceInsurance')}</h3>
                  <p className="text-cool-slate text-sm">
                    {t('plans.insuranceDescription')}
                  </p>
                </div>
              </div>
              
              <p>
                {t('plans.maxConclusion')}
              </p>
            </div>
          </div>

          {/* Right column - Sidebar with pricing and CTA - visible only on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border-2 border-signal-blue p-6 shadow-lg">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-medium mb-1">{t('pricing.monthly')}</h3>
                <div className="text-4xl font-bold text-signal-blue mb-2">{t('pricing.max.price')} <span className="text-lg font-normal text-cool-slate">/{t('common.month')}</span></div>
                <p className="text-cool-slate text-sm">{t('plans.autoRenew')}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">{t('plans.includes')}:</h4>
                <ul className="space-y-3">
                  {[
                    `30GB ${t('plans.highSpeedData')}`,
                    t('pricing.commonFeatures.feature1'),
                    t('pricing.commonFeatures.feature3'),
                    t('pricing.commonFeatures.feature4'),
                    t('pricing.commonFeatures.feature5'),
                    t('pricing.commonFeatures.feature6'), 
                    t('pricing.commonFeatures.feature7'),
                    t('pricing.commonFeatures.feature8')
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-signal-blue flex-shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={handleCheckout}
                className="m-0 text-center py-3 bg-signal-blue text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer select-none w-full"
                type="button"
              >
                {t('pricing.cta')}
              </button>
            </div>
          </div>
        </div>

        {/* Other plans section */}
        <div className="mt-16 pt-12 border-t border-steel-gray">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('plans.browseOther')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-steel-gray p-6 hover:border-signal-blue hover:shadow-md transition-all">
              <h3 className="text-xl font-bold mb-1">{t('pricing.lite.name')} – 5GB</h3>
              <p className="text-cool-slate mb-4">{t('pricing.lite.description')}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-signal-blue">{t('pricing.lite.price')}<span className="text-sm font-normal text-cool-slate">/{t('common.mo')}</span></span>
                <Link to="/plans/lite" className="btn-secondary text-sm">{t('common.learnMore')}</Link>
              </div>
            </div>
            
            <div className="rounded-xl border border-steel-gray p-6 hover:border-signal-blue hover:shadow-md transition-all">
              <h3 className="text-xl font-bold mb-1">{t('pricing.traveler.name')} – 15GB</h3>
              <p className="text-cool-slate mb-4">{t('pricing.traveler.description')}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-signal-blue">{t('pricing.traveler.price')}<span className="text-sm font-normal text-cool-slate">/{t('common.mo')}</span></span>
                <Link to="/plans/pro" className="btn-secondary text-sm">{t('common.learnMore')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxPlan; 