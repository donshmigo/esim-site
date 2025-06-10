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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pricingSectionRef = useRef<HTMLElement | null>(null);
  
  // Plans data for the CTA
  const plans = [
    { name: 'Lite', path: '/plans/lite' },
    { name: 'Pro', path: '/plans/pro' },
    { name: 'Max', path: '/plans/max' }
  ];
  
  // Show scroll-to-top button after scrolling down
  useEffect(() => {
    // Get a reference to the pricing section
    pricingSectionRef.current = document.getElementById('pricing');
    
    const handleScroll = () => {
      // Show scroll-to-top after scrolling down significantly
      const showScrollTopPosition = window.innerHeight;
      setShowScrollTop(window.scrollY > showScrollTopPosition);
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
      <Footer hideBusinessSection={false} />
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-lg bg-steel-gray bg-opacity-10 flex items-center justify-center shadow-md hover:bg-opacity-20 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon className="h-5 w-5 text-dark-theme" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home; 