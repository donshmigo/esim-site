import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { XMarkIcon, Bars3Icon, SignalIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../firebase/AuthContext';
import { useTranslation } from 'react-i18next';
import LocaleSelector from '../components/LocaleSelector';
// Replace the logo import
// import logo from '../assets/images/logo.svg';

// Logo will be referenced directly from public directory
const logoPath = '/images/logo.png';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();

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

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Check if current path is home
  const isHome = location.pathname === '/';
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

  // Don't show header on login/signup pages
  if (isLoginPage) {
    return null;
  }

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
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <img src={logoPath} alt="Romio Mobile" className="h-16 hover-glitch" />
            </div>
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
            <div className="flex items-center space-x-6 mr-6">
              <Link to="/plans" className="text-base font-medium text-gray-500 hover:text-gray-900">{t('header.features')}</Link>
              <Link to="/coverage" className="text-base font-medium text-gray-500 hover:text-gray-900">{t('header.coverage')}</Link>
              <Link to="/how-it-works" className="text-base font-medium text-gray-500 hover:text-gray-900">{t('header.howItWorks')}</Link>
              <Link to="/support" className="text-base font-medium text-gray-500 hover:text-gray-900">{t('header.faq')}</Link>
            </div>
            
            {/* Right - Action buttons with locale selector */}
            <div className="flex items-center space-x-3">
              {currentUser ? (
                <>
                  <Link to="/esim-dashboard" className="text-base font-medium text-gray-500 hover:text-gray-900">{t('header.dashboard')}</Link>
                  <button 
                    onClick={handleSubscribeClick}
                    className="ml-2 whitespace-nowrap inline-flex items-center justify-center bg-signal-blue text-white px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-opacity-90"
                  >
                    {t('header.subscribe')}
                  </button>
                  <LocaleSelector />
                </>
              ) : (
                <>
                  <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900">{t('header.login')}</Link>
                  <button 
                    onClick={handleSubscribeClick}
                    className="ml-2 whitespace-nowrap inline-flex items-center justify-center bg-dark-theme text-white px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-opacity-90"
                  >
                    {t('header.subscribe')}
                  </button>
                  <LocaleSelector />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden mt-3">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/plans" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t('header.features')}</Link>
              <Link to="/coverage" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t('header.coverage')}</Link>
              <Link to="/how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t('header.howItWorks')}</Link>
              <Link to="/support" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t('header.faq')}</Link>
              
              {currentUser ? (
                <>
                  <Link to="/esim-dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t('header.dashboard')}</Link>
                  <button
                    onClick={handleSubscribeClick}
                    className="block w-full text-center px-3 py-2 rounded-md shadow-sm text-base font-medium text-white bg-signal-blue hover:bg-opacity-90"
                  >
                    {t('header.subscribe')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t('header.login')}</Link>
                  <button
                    onClick={handleSubscribeClick}
                    className="block w-full text-center px-3 py-2 rounded-md shadow-sm text-base font-medium text-white bg-dark-theme hover:bg-opacity-90"
                  >
                    {t('header.subscribe')}
                  </button>
                </>
              )}
              
              <div className="mt-4 flex items-center">
                <img src={logoPath} alt="Romio Mobile" className="h-16" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;