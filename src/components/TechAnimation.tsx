import { useState, useEffect } from 'react';
import { DevicePhoneMobileIcon, WifiIcon, GlobeAltIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

export default function TechAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [signalStrength, setSignalStrength] = useState(0);
  
  useEffect(() => {
    // Animation entry
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    // Signal strength animation
    const signalTimer = setInterval(() => {
      setSignalStrength(prev => (prev < 3 ? prev + 1 : 0));
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(signalTimer);
    };
  }, []);
  
  return (
    <section className="relative py-16 overflow-hidden bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 tech-accent">Advanced Cellular Technology</h2>
          <p className="text-lg text-cool-slate max-w-3xl mx-auto">
            Romio's eSIM uses next-generation connectivity to provide you with high-speed data 
            on leading carrier networks around the world.
          </p>
        </div>
        
        <div className="relative h-96 md:h-[500px]">
          {/* Center element */}
          <div className={`absolute inset-0 m-auto w-32 h-32 bg-signal-blue bg-opacity-10 rounded-full flex items-center justify-center animate-pulse-subtle transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Phone icon */}
            <DevicePhoneMobileIcon className="h-10 w-10 text-signal-blue" />
          </div>
          
          {/* Animated signal points */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 bg-signal-blue rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-signal transition-opacity duration-1000 delay-${i * 200} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{
                top: `${Math.random() * 60 + 20}%`,
                left: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
          
          {/* Tech lines connecting elements */}
          <svg
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isVisible ? 'opacity-30' : 'opacity-0'}`}
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M400 300 L650 150 M400 300 L200 400 M400 300 L500 500 M400 300 L150 200"
              stroke="#242323"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          </svg>
          
          {/* Signal strength bars */}
          <div className={`absolute left-3/4 top-1/4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-cool-slate mr-2">Signal Strength</span>
              </div>
              <div className="flex h-6 space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 rounded-t-sm transition-all duration-300 ${i <= signalStrength ? 'bg-signal-blue' : 'bg-gray-200'}`}
                    style={{ height: `${(i + 1) * 25}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* WiFi node */}
          <div className={`absolute left-1/4 top-2/3 bg-white p-3 rounded-lg shadow-md transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <WifiIcon className="h-10 w-10 text-signal-blue animate-shimmer" />
            <p className="text-xs mt-1 font-medium">High-Speed</p>
          </div>
          
          {/* Global network node */}
          <div className={`absolute right-1/4 bottom-1/4 bg-white p-3 rounded-lg shadow-md transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <GlobeAltIcon className="h-10 w-10 text-signal-blue animate-signal" />
            <p className="text-xs mt-1 font-medium">Global Access</p>
          </div>
          
          {/* Tech stats */}
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "5G", label: "Network Ready", icon: WifiIcon },
              { number: "80+", label: "Countries", icon: GlobeAltIcon },
              { number: "100%", label: "Digital", icon: DevicePhoneMobileIcon },
              { number: "24/7", label: "Support", icon: ArrowPathIcon }
            ].map((stat, i) => (
              <div
                key={i}
                className={`bg-white rounded-lg p-4 shadow-md text-center transition-all duration-1000 delay-${i * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <stat.icon className="h-8 w-8 text-signal-blue mb-4" />
                <div className="data-number">{stat.number}</div>
                <p className="text-sm text-cool-slate">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 