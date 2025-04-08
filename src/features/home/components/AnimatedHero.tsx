import { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { SignalIcon, DevicePhoneMobileIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const AnimatedHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative overflow-hidden bg-white py-16">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 -right-10 w-72 h-72 rounded-full bg-signal-blue opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-signal-blue opacity-5 blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(36, 35, 35, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        
        {/* Animated signal dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="signal-dot absolute"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left content */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tech-accent">
              {t('hero.title')}
              <span className="text-signal-blue"> {t('hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-lg text-cool-slate mb-8 animate-fade-in-up animate-delay-200">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up animate-delay-300">
              <a href="#pricing" className="btn-primary group relative">
                {t('hero.primaryCta')}
                <ArrowRightIcon className="ml-2 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#how-it-works" className="btn-secondary hover-glitch">
                {t('hero.secondaryCta')}
              </a>
            </div>
            
            {/* Feature list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animate-delay-400">
              {[
                { icon: GlobeAltIcon, title: t('hero.features.global.title'), desc: t('hero.features.global.description') },
                { icon: DevicePhoneMobileIcon, title: t('hero.features.setup.title'), desc: t('hero.features.setup.description') },
                { icon: SignalIcon, title: t('hero.features.speed.title'), desc: t('hero.features.speed.description') }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <div className="mb-2 p-2 rounded-lg bg-steel-gray bg-opacity-10 w-fit">
                    <feature.icon className="h-6 w-6 text-signal-blue" />
                  </div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-cool-slate">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right content - Tech animation */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Central phone */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                <div className="relative w-28 h-28 rounded-lg bg-signal-blue bg-opacity-10 flex items-center justify-center">
                  <DevicePhoneMobileIcon className="h-14 w-14 text-signal-blue animate-pulse-subtle" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-signal-blue rounded-full animate-signal"></div>
                </div>
              </div>
              
              {/* Orbital elements */}
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-blue border-opacity-20"
                  style={{
                    width: `${200 + i * 60}px`,
                    height: `${200 + i * 60}px`,
                    animationDuration: `${20 + i * 5}s`,
                    animation: `spin ${20 + i * 5}s linear infinite`
                  }}
                >
                  <div 
                    className="absolute w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center animate-fade-in-up"
                    style={{
                      top: `${Math.sin(i * Math.PI / 4) * 50 + 50}%`,
                      left: `${Math.cos(i * Math.PI / 4) * 50 + 50}%`,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${i * 0.2}s`
                    }}
                  >
                    <GlobeAltIcon className="h-6 w-6 text-signal-blue" />
                  </div>
                </div>
              ))}
              
              {/* Signal waves */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i + 'wave'}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-blue border-opacity-20 animate-ping"
                  style={{
                    width: `${80 + i * 40}px`,
                    height: `${80 + i * 40}px`,
                    animationDuration: `${3 + i}s`,
                    animationDelay: `${i * 0.5}s`
                  }}
                ></div>
              ))}
              
              {/* Data indicators */}
              <div className="absolute bottom-0 right-0 bg-white rounded-lg shadow-lg p-3 animate-fade-in-up animate-delay-500">
                <div className="flex items-center">
                  <SignalIcon className="h-5 w-5 text-signal-blue mr-2" />
                  <span className="font-medium">{t('hero.indicator.status')}</span>
                </div>
                <p className="text-xs text-cool-slate">{t('hero.indicator.ready')}</p>
              </div>
              
              <div className="absolute top-0 left-0 bg-white rounded-lg shadow-lg p-3 animate-fade-in-up animate-delay-600">
                <div className="flex items-center">
                  <GlobeAltIcon className="h-5 w-5 text-signal-blue mr-2" />
                  <span className="font-medium">{t('hero.indicator.network')}</span>
                </div>
                <p className="text-xs text-cool-slate">{t('hero.indicator.countries')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero; 