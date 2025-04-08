import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PhoneHero from '../../components/PhoneHero';
import Features from '../../features/home/components/Features';
import HowItWorks from '../../features/home/components/HowItWorks';
import Coverage from '../../features/home/components/Coverage';
import Pricing from '../../features/home/components/Pricing';
import FAQ from '../../features/home/components/FAQ';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const location = useLocation();
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [inPricingSection, setInPricingSection] = useState(false);
  const [activePlanIndex, setActivePlanIndex] = useState(1); // Default to middle plan (Traveler)
  const pricingSectionRef = useRef<HTMLElement | null>(null);
  
  // Plans data for the CTA
  const plans = [
    { name: 'Lite', path: '/plans/lite' },
    { name: 'Traveler', path: '/plans/traveler' },
    { name: 'Max', path: '/plans/max' }
  ];
  
  // Show sticky CTA and scroll-to-top button after scrolling down
  useEffect(() => {
    // Get a reference to the pricing section
    pricingSectionRef.current = document.getElementById('pricing');
    
    const handleScroll = () => {
      // Show the sticky CTA after scrolling down a bit
      const showCTAPosition = window.innerHeight * 0.5;
      setShowStickyCTA(window.scrollY > showCTAPosition);
      
      // Show scroll-to-top after scrolling down significantly
      const showScrollTopPosition = window.innerHeight;
      setShowScrollTop(window.scrollY > showScrollTopPosition);
      
      // Check if user is in pricing section
      if (pricingSectionRef.current) {
        const rect = pricingSectionRef.current.getBoundingClientRect();
        // Consider user in pricing section if the section is visible in viewport
        setInPricingSection(rect.top < window.innerHeight / 2 && rect.bottom > 0);
        
        // Try to get the active plan index from a data attribute (set by Pricing component)
        const activePlanAttribute = pricingSectionRef.current.getAttribute('data-active-plan');
        if (activePlanAttribute) {
          setActivePlanIndex(parseInt(activePlanAttribute));
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle hash links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Add a slight delay to ensure DOM is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToPricing = () => {
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container pb-16 md:pb-0">
      <Header />
      <PhoneHero />
      <Features />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <Coverage />
      <div id="pricing">
        <Pricing />
      </div>
      <FAQ />
      <Footer />
      
      {/* Mobile sticky CTA */}
      {showStickyCTA && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40 flex justify-between items-center">
          <div className="flex-1">
            {inPricingSection ? (
              <Link
                to={plans[activePlanIndex].path}
                className="w-full py-3 rounded-lg font-medium bg-signal-blue text-white flex items-center justify-center"
              >
                Get {plans[activePlanIndex].name} Plan
              </Link>
            ) : (
              <button
                onClick={scrollToPricing}
                className="w-full py-3 rounded-lg font-medium bg-signal-blue text-white flex items-center justify-center"
              >
                View Plans
              </button>
            )}
          </div>
          
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="ml-2 p-3 rounded-lg bg-steel-gray bg-opacity-10 flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <ArrowUpIcon className="h-5 w-5 text-dark-theme" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home; 