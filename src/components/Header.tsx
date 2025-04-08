import { useState, useEffect } from 'react';
import { XMarkIcon, Bars3Icon, SignalIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LocaleSelector from './LocaleSelector';
// import logo from '../assets/images/logo.svg';

// Use the logo from the public directory instead
const logoPath = '/images/logo.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
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

  // Handle navigation
  const handleNavigation = (path: string): void => {
    navigate(path);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-95 shadow-sm'
    }`}>
      <nav className="container-custom mx-auto py-4 flex items-center justify-between">
        {/* Logo with signal animation */}
        <Link to="/" className="flex items-center group">
          <img src={logoPath} alt="Romio Mobile" className="h-16 hover-glitch" />
          <span className="ml-2 flex items-center">
            <SignalIcon className="h-4 w-4 text-signal-blue animate-signal hidden md:block" />
          </span>
        </Link>
        
        {/* Desktop Navigation with animations */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { key: 'features', label: t('header.features') },
            { key: 'how-it-works', label: t('header.howItWorks') },
            { key: 'coverage', label: t('header.coverage') },
            { key: 'pricing', label: t('header.pricing') },
            { key: 'faq', label: t('header.faq') }
          ].map((item, index) => (
            <a 
              key={item.key} 
              href={`#${item.key}`} 
              className={`text-romio-black hover:text-signal-blue transition-colors animate-fade-in-right animate-delay-${(index + 1) * 100}`}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        {/* CTA Buttons with animations */}
        <div className="hidden md:flex items-center gap-4">
          <LocaleSelector />
          
          {currentUser ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-romio-black hover:text-signal-blue transition-colors animate-fade-in-right animate-delay-500"
              >
                {t('header.dashboard')}
              </Link>
              <Link 
                to="/signup" 
                className="btn-primary animate-fade-in-right animate-delay-600 hover:animate-pulse-subtle"
              >
                {t('header.subscribe')}
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-romio-black hover:text-signal-blue transition-colors animate-fade-in-right animate-delay-500"
              >
                {t('header.login')}
              </Link>
              <Link 
                to="/signup" 
                className="btn-primary animate-fade-in-right animate-delay-500 hover:animate-pulse-subtle"
              >
                {t('header.subscribe')}
              </Link>
            </>
          )}
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
          <div className="md:hidden fixed inset-0 z-50 bg-white animate-fade-in-up">
            <div className="container-custom pt-5 pb-6">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <img src={logoPath} alt="Romio Mobile" className="h-16" />
                  <SignalIcon className="h-4 w-4 ml-2 text-signal-blue animate-signal" />
                </Link>
                <button
                  type="button"
                  className="p-2 rounded-md text-cool-slate hover:bg-steel-gray hover:bg-opacity-30 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6 hover-glitch" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flex flex-col gap-6">
                {[
                  { key: 'features', label: t('header.features') },
                  { key: 'how-it-works', label: t('header.howItWorks') },
                  { key: 'coverage', label: t('header.coverage') },
                  { key: 'pricing', label: t('header.pricing') },
                  { key: 'faq', label: t('header.faq') }
                ].map((item, index) => (
                  <a 
                    key={item.key}
                    href={`#${item.key}`} 
                    onClick={() => setMobileMenuOpen(false)} 
                    className={`text-lg font-medium text-romio-black hover:text-signal-blue animate-fade-in-up animate-delay-${(index + 1) * 100}`}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="my-4">
                  <LocaleSelector />
                </div>
                <div className="mt-2 flex flex-col gap-4">
                  {currentUser ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2 text-romio-black hover:text-signal-blue animate-fade-in-up animate-delay-500"
                      >
                        {t('header.dashboard')}
                      </Link>
                      <Link 
                        to="/signup" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn-primary text-center animate-fade-in-up animate-delay-600"
                      >
                        {t('header.subscribe')}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2 text-romio-black hover:text-signal-blue animate-fade-in-up animate-delay-500"
                      >
                        {t('header.login')}
                      </Link>
                      <Link 
                        to="/signup" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn-primary text-center animate-fade-in-up animate-delay-500"
                      >
                        {t('header.subscribe')}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 