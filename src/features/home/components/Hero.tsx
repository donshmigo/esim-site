import { useEffect, useState } from 'react';
import { GlobeAltIcon, SignalIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import heroImage from '../../../assets/images/hero-image.svg';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay to trigger animations after component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-spacing bg-snow-white relative overflow-hidden">
      {/* Tech background elements */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-signal-blue rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-signal-blue rounded-full opacity-5 blur-3xl"></div>
      
      {/* Signal dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="signal-dot absolute" 
            style={{
              top: `${20 + i * 15}%`,
              left: `${5 + i * 20}%`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container-custom mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-romio-black mb-6 tech-accent">
              Seamless Global Connectivity, Monthly Freedom
            </h1>
            
            <p className="text-lg text-cool-slate mb-8 animate-fade-in-up animate-delay-200">
              Stay connected across 80+ countries with one eSIM plan. No roaming fees, no SIM swapping, 
              just instant connectivity the moment you land.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
              <a href="#pricing" className="btn-primary text-center sm:text-left group">
                Choose Your Plan
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#how-it-works" className="btn-secondary text-center sm:text-left hover-glitch">
                How It Works
              </a>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 animate-fade-in-up animate-delay-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-steel-gray border-2 border-white"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
              <p className="text-cool-slate">
                <span className="font-semibold">4.9/5</span> from 2,000+ reviews
              </p>
            </div>
            
            {/* Tech features list */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up animate-delay-500">
              {[
                { icon: GlobeAltIcon, text: "80+ Countries" },
                { icon: DevicePhoneMobileIcon, text: "Instant Activation" },
                { icon: SignalIcon, text: "High-Speed Data" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <feature.icon className="h-5 w-5 text-signal-blue mr-2" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Image */}
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-signal-blue rounded-full opacity-10 blur-xl animate-pulse scale-90"></div>
              <img 
                src={heroImage} 
                alt="Romio eSIM global connectivity" 
                className="w-full max-w-md lg:max-w-lg relative z-10 hover-glitch"
              />
              
              {/* Animated data circles */}
              <div className="absolute top-5 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-fade-in-right animate-delay-300">
                <DevicePhoneMobileIcon className="h-8 w-8 text-signal-blue" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-fade-in-right animate-delay-500">
                <GlobeAltIcon className="h-8 w-8 text-signal-blue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 