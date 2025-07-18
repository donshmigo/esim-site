import { useState, useEffect } from 'react';
import { ArrowRightIcon, SignalIcon, DevicePhoneMobileIcon, GlobeAltIcon, BoltIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const PhoneHero = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Countries for the scrolling animation with flag emojis
  const countries = [
    { name: 'United States', code: 'US', flag: '🇺🇸' },
    { name: 'France', code: 'FR', flag: '🇫🇷' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪' },
    { name: 'Japan', code: 'JP', flag: '🇯🇵' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
    { name: 'Canada', code: 'CA', flag: '🇨🇦' },
    { name: 'Italy', code: 'IT', flag: '🇮🇹' },
    { name: 'Spain', code: 'ES', flag: '🇪🇸' },
    { name: 'Australia', code: 'AU', flag: '🇦🇺' },
    { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
    { name: 'China', code: 'CN', flag: '🇨🇳' },
    { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
    { name: 'Singapore', code: 'SG', flag: '🇸🇬' },
    { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
    { name: 'South Africa', code: 'ZA', flag: '🇿🇦' }
  ];
  
  // Create another set of countries for continuous scrolling effect
  const allCountries = [...countries, ...countries];
  
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 md:py-16">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 -right-10 w-72 h-72 rounded-full bg-dark-theme opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-dark-theme opacity-5 blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(36, 35, 35, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left content */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tech-accent">
              {t('hero.title')}
              <br />
              <span className="text-dark-theme">{t('hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-lg text-cool-slate mb-8 animate-fade-in-up animate-delay-200">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up animate-delay-300 relative z-50">
              <a href="#pricing" className="btn-primary group relative z-50" style={{ position: 'relative', zIndex: 9999 }}>
                {t('hero.primaryCta')}
                <ArrowRightIcon className="ml-2 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#how-it-works" 
                className="btn-secondary no-focus-outline relative z-50"
                style={{ outline: 'none', position: 'relative', zIndex: 9999 }}
              >
                {t('hero.secondaryCta')}
              </a>
            </div>
            
            {/* Feature list */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 animate-fade-in-up animate-delay-400">
              {[
                { icon: GlobeAltIcon, title: t('hero.features.global.title'), desc: t('hero.features.global.description') },
                { icon: BoltIcon, title: t('hero.features.setup.title'), desc: t('hero.features.setup.description') },
                { icon: DevicePhoneMobileIcon, title: t('features.keepNumber.title'), desc: "Voice calls over data" }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="mb-2 p-2 sm:p-3 rounded-lg bg-dark-theme bg-opacity-10 w-fit">
                    <feature.icon className="h-5 w-5 sm:h-7 sm:w-7 text-dark-theme" />
                  </div>
                  <h3 className="font-medium text-gray-800 text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-cool-slate">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right content - Phone with scrolling countries */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative aspect-[9/16] max-w-[300px] mx-auto">
              {/* Phone frame */}
              <div className="absolute inset-0 bg-romio-black rounded-[32px] shadow-2xl overflow-hidden border border-gray-800">
                {/* Phone screen - Changed to white background */}
                <div className="absolute inset-[6px] rounded-[26px] bg-white overflow-hidden">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-7 bg-romio-black rounded-b-xl z-10"></div>
                  
                  {/* Status bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-steel-gray bg-opacity-10 flex items-center justify-between px-6 z-5">
                    <div className="flex items-center">
                      <SignalIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-xs font-semibold text-gray-800">{t('hero.indicator.status')}</div>
                    <div className="flex items-center">
                      <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* App content */}
                  <div className="absolute top-10 left-0 right-0 bottom-0 overflow-hidden bg-white">
                    {/* Scrolling countries section */}
                    <div className="pt-6 pb-32 relative overflow-hidden">
                      <div className="flex items-center justify-between px-4 mb-4">
                        <h4 className="text-sm font-semibold text-dark-theme">{t('coverage.title')}</h4>
                        <span className="text-xs font-medium bg-dark-theme bg-opacity-10 text-dark-theme px-2 py-1 rounded-full">{t('hero.features.global.description')}</span>
                      </div>
                      
                      {/* Single row of full-width square country cards - Made taller */}
                      <div className="overflow-hidden w-full px-4">
                        <div className="scrolling-countries-1 flex" style={{ width: 'max-content' }}>
                          {allCountries.map((country, index) => (
                            <div 
                              key={`country-${country.code}-${index}`} 
                              className="country-card flex flex-col items-center p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1"
                              style={{ 
                                width: '90%', 
                                minWidth: '220px',
                                height: '250px',
                                marginRight: '12px'
                              }}
                            >
                              <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-5xl shadow-inner mb-6">
                                {country.flag}
                              </div>
                              <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">{country.name}</h4>
                              
                              <div className="mt-auto flex items-center bg-dark-theme bg-opacity-5 px-4 py-2 rounded-full">
                                <GlobeAltIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-xs font-medium">{t('techAnimation.instantConnection')}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                    </div>
                    
                    {/* Connection status - Added grey background back */}
                    <div className="absolute bottom-[52px] left-0 right-0 p-4 bg-dark-theme bg-opacity-5">
                      <div className="bg-white rounded-lg p-3 shadow-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <SignalIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="font-semibold text-sm text-gray-800">{t('hero.indicator.ready')}</span>
                          </div>
                          <span className="text-xs font-bold px-2 py-1 bg-dark-theme bg-opacity-10 rounded-full text-dark-theme">{t('hero.indicator.status')}</span>
                        </div>
                        <p className="text-xs font-medium text-cool-slate mt-1">{t('pricing.commonFeatures.feature2')}</p>
                      </div>
                    </div>
                    
                    {/* App navigation bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-100 flex justify-evenly items-center px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
                      <div className="flex flex-col items-center justify-center w-1/3">
                        <GlobeAltIcon className="h-5 w-5 text-gray-400 mb-1" />
                        <span className="text-[10px] font-medium text-dark-theme text-center">{t('coverage.world')}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center w-1/3">
                        <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 mb-1" />
                        <span className="text-[10px] font-medium text-gray-400 text-center">{t('dashboard.sidebar.myPlans')}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center w-1/3">
                        <SignalIcon className="h-5 w-5 text-gray-400 mb-1" />
                        <span className="text-[10px] font-medium text-gray-400 text-center">{t('dashboard.plans.availablePlans')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneHero; 