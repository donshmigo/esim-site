import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, DevicePhoneMobileIcon, GlobeAltIcon, SignalIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackAddToCart, trackInitiateCheckout } from '../../utils/fbPixel';

const ProPlan = () => {
  const { t } = useTranslation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleCheckout = async () => {
    // Track AddToCart first
    trackAddToCart('Pro Plan', 39.99);
    
    // Wait a bit then track InitiateCheckout
    await new Promise(resolve => setTimeout(resolve, 100));
    trackInitiateCheckout('Pro Plan', 39.99);
    
    // Give Facebook time to track both events
    await new Promise(resolve => setTimeout(resolve, 250));
    
    window.open('https://account.romiomobile.com/estore/purchase/35890baa-0611-4c9b-a7ae-ccb82810578f', '_blank');
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
            <span className="text-signal-blue font-medium">15GB {t('plans.dataPlan')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-romio-black mb-4 tech-accent">
            {t('pricing.traveler.name')} – 15GB {t('plans.esimPlan')}
          </h1>
          
          <div className="flex flex-col lg:flex-row lg:items-start">
            <p className="text-xl text-cool-slate lg:max-w-xl">
              {t('pricing.traveler.description')}
            </p>
            
            {/* Mobile subscription box - visible only on mobile - NOW ALIGNED WITH DESCRIPTION */}
            <div className="lg:hidden mt-4 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-signal-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                {t('pricing.mostPopular')}
              </div>
              <div className="bg-white rounded-xl border-2 border-signal-blue p-4 shadow-lg pt-8">
                <div className="mb-2 text-center">
                  <h3 className="text-lg font-medium mb-1">{t('pricing.monthly')}: <span className="text-2xl font-bold text-signal-blue">{t('pricing.traveler.price')}</span></h3>
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
                {t('plans.proOverview')}
              </p>

              {/* Key features */}
              <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  t('plans.features.globalCoverage'),
                  t('plans.features.useAnywhere'),
                  t('pricing.commonFeatures.feature1'),
                  "Supports video calls, social, hotspotting",
                  t('plans.features.cancelAnytime')
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-signal-blue flex-shrink-0 mr-2 mt-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">{t('plans.whatYouCanDo')} 15GB</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <VideoCameraIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">25+ {t('common.hours')}</h3>
                  </div>
                  <p className="text-cool-slate">{t('plans.usage.videoStreaming')}</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <DevicePhoneMobileIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">10 {t('common.hours')}</h3>
                  </div>
                  <p className="text-cool-slate">{t('plans.usage.zoomCalls')}</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <GlobeAltIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">1,000+</h3>
                  </div>
                  <p className="text-cool-slate">{t('plans.usage.socialMedia')}</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <SignalIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">{t('common.daily')}</h3>
                  </div>
                  <p className="text-cool-slate">{t('plans.usage.streaming')}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">{t('plans.perfectFor')}</h2>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li>{t('plans.userTypes.digitalNomads')}</li>
                <li>{t('plans.userTypes.contentCreators')}</li>
                <li>{t('plans.userTypes.frequentTravelers')}</li>
                <li>{t('plans.userTypes.extendedStay')}</li>
                <li>{t('plans.userTypes.remoteWorkers')}</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">{t('plans.whyPopular')}</h2>
              <p>
                {t('plans.proWhyPopular')}
              </p>
            </div>
          </div>

          {/* Right column - Sidebar with pricing and CTA - visible only on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border-2 border-signal-blue p-6 shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-signal-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                {t('pricing.mostPopular')}
              </div>
            
              <div className="mb-6 text-center">
                <h3 className="text-lg font-medium mb-1">{t('pricing.monthly')}</h3>
                <div className="text-4xl font-bold text-signal-blue mb-2">{t('pricing.traveler.price')} <span className="text-lg font-normal text-cool-slate">/{t('common.month')}</span></div>
                <p className="text-cool-slate text-sm">{t('plans.autoRenew')}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">{t('plans.includes')}:</h4>
                <ul className="space-y-3">
                  {[
                    `15GB ${t('plans.highSpeedData')}`,
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
              <h3 className="text-xl font-bold mb-1">{t('pricing.max.name')} – 30GB</h3>
              <p className="text-cool-slate mb-4">{t('pricing.max.description')}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-signal-blue">$69.99<span className="text-sm font-normal text-cool-slate">/{t('common.mo')}</span></span>
                <Link to="/plans/max" className="btn-secondary text-sm">{t('common.learnMore')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlan; 