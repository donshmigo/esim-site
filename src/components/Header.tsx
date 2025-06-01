import { useState, useEffect } from 'react';
import { XMarkIcon, Bars3Icon, SignalIcon } from '@heroicons/react/24/outline';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LocaleSelector from './LocaleSelector';
import TextLogo from './TextLogo';
// import logo from '../assets/images/logo.svg';

// Removing logo path reference since we're using text-based logo
// const logoPath = '/images/logo.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isHomePage = location.pathname === '/';

  // External login URL - to be updated later
  const externalLoginUrl = 'https://example.com/login';

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

  // Handle navigation with section scrolling on homepage
  const handleNavigation = (linkTo: string): void => {
    if (linkTo.startsWith('#') && isHomePage) {
      // If it's a hash link and we're on the homepage
      const element = document.getElementById(linkTo.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (linkTo.includes('#') && !isHomePage) {
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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-95 shadow-sm'
    }`}>
      <nav className="container-custom mx-auto py-4 flex items-center justify-between">
        {/* Logo with signal animation */}
        <Link to="/" className="flex items-center group">
          <TextLogo className="h-16" />
          <span className="ml-2 flex items-center">
            <SignalIcon className="h-4 w-4 text-signal-blue animate-signal hidden md:block" />
          </span>
        </Link>
        
        {/* Desktop Navigation with animations */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { key: 'features', label: t('header.features'), path: isHomePage ? '#features' : '/plans' },
            { key: 'howItWorks', label: t('header.howItWorks'), path: isHomePage ? '#how-it-works' : '/' },
            { key: 'coverage', label: t('header.coverage'), path: isHomePage ? '#coverage' : '/' },
            { key: 'pricing', label: t('header.pricing'), path: isHomePage ? '#pricing' : '/plans' },
            { key: 'faq', label: t('header.faq'), path: isHomePage ? '#faq' : '/contact' }
          ].map((item, index) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.path)}
              className={`text-romio-black hover:text-signal-blue transition-colors animate-fade-in-right animate-delay-${(index + 1) * 100} bg-transparent border-0 cursor-pointer p-0`}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        {/* CTA Buttons with animations */}
        <div className="hidden md:flex items-center gap-4">
          <LocaleSelector />
          
          <a 
            href={externalLoginUrl}
            target="_blank" 
            rel="noopener noreferrer" 
                className="text-romio-black hover:text-signal-blue transition-colors animate-fade-in-right animate-delay-500"
              >
                {t('header.login')}
          </a>
              <Link 
                to="/plans" 
                className="btn-primary animate-fade-in-right animate-delay-500 hover:animate-pulse-subtle"
              >
                {t('header.subscribe')}
              </Link>
        </div>
        
        {/* Mobile menu button with animation */}
        <button 
          type="button" 
          className="md:hidden p-2 rounded-md text-cool-slate hover:bg-steel-gray hover:bg-opacity-30 transition-colors"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        
        {/* Mobile menu with animations */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <TextLogo className="h-16" />
                </Link>
                <button
                  type="button"
                  className="p-2 rounded-md text-cool-slate hover:bg-steel-gray hover:bg-opacity-30 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="mt-6 flex flex-col gap-6">
                {[
                  { key: 'features', label: t('header.features'), path: isHomePage ? '#features' : '/plans' },
                  { key: 'howItWorks', label: t('header.howItWorks'), path: isHomePage ? '#how-it-works' : '/' },
                  { key: 'coverage', label: t('header.coverage'), path: isHomePage ? '#coverage' : '/' },
                  { key: 'pricing', label: t('header.pricing'), path: isHomePage ? '#pricing' : '/plans' },
                  { key: 'faq', label: t('header.faq'), path: isHomePage ? '#faq' : '/contact' }
                ].map((item, index) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      handleNavigation(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left text-lg font-medium text-romio-black hover:text-signal-blue animate-fade-in-up animate-delay-${(index + 1) * 100} bg-transparent border-0 cursor-pointer p-0`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="my-4">
                  <LocaleSelector />
                </div>
                <div className="mt-2 flex flex-col gap-4">
                  <a 
                    href={externalLoginUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2 text-romio-black hover:text-signal-blue animate-fade-in-up animate-delay-500"
                      >
                        {t('header.login')}
                  </a>
                      <Link 
                        to="/plans" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn-primary text-center animate-fade-in-up animate-delay-500"
                      >
                        {t('header.subscribe')}
                      </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 