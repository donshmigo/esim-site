import { GlobeAltIcon, DevicePhoneMobileIcon, CurrencyDollarIcon, BoltIcon, PhoneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
// import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

export default function Features() {
  // const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const features = [
    {
      name: 'Feature 3 Title',
      description: 'Feature 3 Description',
      icon: DevicePhoneMobileIcon,
    },
    {
      name: 'Feature 2 Title',
      description: 'Feature 2 Description',
      icon: GlobeAltIcon,
    },
    {
      name: 'Feature 1 Title',
      description: 'Feature 1 Description',
      icon: BoltIcon,
    },
    {
      name: "Keep Your Phone Number",
      description: "Use your existing number while enjoying Romio eSIM data worldwide",
      icon: PhoneIcon,
    },
    {
      name: 'Feature 5 Title',
      description: 'Feature 5 Description',
      icon: CurrencyDollarIcon,
    },
    {
      name: 'Feature 6 Title',
      description: 'Feature 6 Description',
      icon: ArrowPathIcon,
    },
  ];

  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.scrollWidth;
        const viewportWidth = scrollContainerRef.current.clientWidth;
        setMaxScroll(containerWidth - viewportWidth);
      }
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <section id="features" className="section-spacing bg-steel-gray">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="section-title">Features Title</h2>
          <p className="text-lg text-cool-slate">
            Features Subtitle
          </p>
        </div>

        {/* Mobile view: Horizontal scrolling container */}
        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar"
            onScroll={handleScroll}
            style={{ scrollBehavior: 'smooth' }}
          >
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="flex-shrink-0 w-[80%] mx-2 first:ml-4 last:mr-4 snap-center bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-gray-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-romio-black">{feature.name}</h3>
                <p className="text-cool-slate text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = scrollContainerRef.current.scrollWidth / features.length;
                    scrollContainerRef.current.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  scrollPosition >= (maxScroll * idx) / (features.length - 1) - 20 &&
                  scrollPosition <= (maxScroll * (idx + 1)) / (features.length - 1) + 20
                    ? 'w-6 bg-dark-theme'
                    : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop view: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-gray-500" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-romio-black">{feature.name}</h3>
              <p className="text-cool-slate">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}