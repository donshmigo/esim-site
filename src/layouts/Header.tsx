import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LocaleSelector from '../components/LocaleSelector';
import TextLogo from '../components/TextLogo';
// Replace the logo import
// import logo from '../assets/images/logo.svg';

// Removing logo path reference since we're using text-based logo
// const logoPath = '/images/logo.png';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Check if current path is home
  const isHome = location.pathname === '/';
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

  // Don't show header on login/signup pages
  if (isLoginPage) {
    return null;
  }

  // Handle navigation links
  const handleNavigation = (linkTo: string) => {
    if (linkTo.startsWith('#') && isHome) {
      // If it's a hash link and we're on the homepage
      const element = document.getElementById(linkTo.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (linkTo.includes('#') && !isHome) {
      // If it's a hash link but we're not on the homepage, navigate to homepage first
      navigate('/');
      // We need to wait for the navigation to complete before scrolling
      setTimeout(() => {
        const sectionId = linkTo.split('#')[1];
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Regular navigation
      navigate(linkTo);
    }
  };

  // Handle Subscribe button click
  const handleSubscribeClick = () => {
    if (isHome) {
      // If on homepage, scroll to pricing section
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on any other page, navigate to plans page
      navigate('/plans');
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full ${scrolled ? 'bg-white shadow-sm' : isHome ? 'bg-transparent' : 'bg-white'}`}>
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Left side - Logo */}
          <Link to="/" className="flex items-center">
            <TextLogo className="text-3xl py-1" /> {/* Added py-1 for vertical alignment */}
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="flex items-center mr-4">
              <LocaleSelector />
            </div>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center">
            {/* Center - Navigation links */}
            <div className="flex items-center space-x-8 mr-8"> {/* Increased spacing */}
              <button 
                onClick={() => handleNavigation(isHome ? '#features' : '/plans')} 
                className="text-base font-medium text-gray-500 hover:text-gray-900 bg-transparent border-0 cursor-pointer p-0"
              >
                {t('header.features')}
              </button>
              <button 
                onClick={() => handleNavigation(isHome ? '#coverage' : '/')} 
                className="text-base font-medium text-gray-500 hover:text-gray-900 bg-transparent border-0 cursor-pointer p-0"
              >
                {t('header.coverage')}
              </button>
              <Link 
                to="/data-calculator" 
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Data Calculator
              </Link>
              <button 
                onClick={() => handleNavigation(isHome ? '#how-it-works' : '/')} 
                className="text-base font-medium text-gray-500 hover:text-gray-900 bg-transparent border-0 cursor-pointer p-0"
              >
                {t('header.howItWorks')}
              </button>
              <button 
                onClick={() => handleNavigation(isHome ? '#faq' : '/contact')} 
                className="text-base font-medium text-gray-500 hover:text-gray-900 bg-transparent border-0 cursor-pointer p-0"
              >
                {t('header.faq')}
              </button>
            </div>
            
            {/* Right - Action buttons with locale selector */}
            <div className="flex items-center space-x-3">
              <LocaleSelector />
              
                  <button
                    onClick={handleSubscribeClick}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-signal-blue hover:bg-opacity-90"
                  >
                    {t('header.subscribe')}
                  </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-3">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => {
                  handleNavigation(isHome ? '#features' : '/plans');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 bg-transparent border-0 cursor-pointer"
              >
                {t('header.features')}
              </button>
              <button 
                onClick={() => {
                  handleNavigation(isHome ? '#coverage' : '/');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 bg-transparent border-0 cursor-pointer"
              >
                {t('header.coverage')}
              </button>
              <Link 
                to="/data-calculator"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Data Calculator
              </Link>
              <button 
                onClick={() => {
                  handleNavigation(isHome ? '#how-it-works' : '/');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 bg-transparent border-0 cursor-pointer"
              >
                {t('header.howItWorks')}
              </button>
              <button 
                onClick={() => {
                  handleNavigation(isHome ? '#faq' : '/contact');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 bg-transparent border-0 cursor-pointer"
              >
                {t('header.faq')}
              </button>
              
                  <button
                    onClick={() => {
                      handleSubscribeClick();
                      setIsOpen(false);
                    }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-signal-blue text-white hover:bg-opacity-90"
                  >
                    {t('header.subscribe')}
                  </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;