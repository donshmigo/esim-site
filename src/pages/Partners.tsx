import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useTranslation } from 'react-i18next';

const Partners: React.FC = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="container mx-auto px-3 md:px-4 max-w-4xl">
          <div className="mb-4 md:mb-8">
            <Link to="/" className="text-signal-blue hover:underline inline-flex items-center text-sm md:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6">Partner Program</h1>
          <p className="text-cool-slate mb-6 md:mb-8 text-sm md:text-base">Join our global network of partners and help connect the world.</p>

          <div className="prose prose-sm md:prose-lg max-w-none">
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Why Partner with Romio?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Global Coverage</h3>
                  <p className="text-cool-slate text-sm md:text-base">Access to eSIMs in over 190+ countries and territories worldwide.</p>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Competitive Commission</h3>
                  <p className="text-cool-slate text-sm md:text-base">Earn up to 20% commission on every successful referral.</p>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Marketing Support</h3>
                  <p className="text-cool-slate text-sm md:text-base">Get access to marketing materials, banners, and promotional content.</p>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Real-time Analytics</h3>
                  <p className="text-cool-slate text-sm md:text-base">Track your performance with our comprehensive dashboard.</p>
                </div>
              </div>
            </section>

            <section className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">How It Works</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-signal-blue text-white rounded-full flex items-center justify-center mr-3 md:mr-4 text-sm md:text-base">1</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Sign Up</h3>
                    <p className="text-cool-slate text-sm md:text-base">Complete our simple registration form to join the partner program.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-signal-blue text-white rounded-full flex items-center justify-center mr-3 md:mr-4 text-sm md:text-base">2</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Get Your Link</h3>
                    <p className="text-cool-slate text-sm md:text-base">Receive your unique referral link and marketing materials.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-signal-blue text-white rounded-full flex items-center justify-center mr-3 md:mr-4 text-sm md:text-base">3</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Start Promoting</h3>
                    <p className="text-cool-slate text-sm md:text-base">Share your link and start earning commissions on every sale.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Partner Benefits</h2>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2 text-cool-slate text-sm md:text-base">
                <li>Dedicated account manager</li>
                <li>Priority support</li>
                <li>Custom promotional materials</li>
                <li>Regular performance reports</li>
                <li>Early access to new features</li>
                <li>Marketing support and guidance</li>
              </ul>
            </section>

            <section className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Ready to Get Started?</h2>
              <p className="text-cool-slate mb-4 md:mb-6 text-sm md:text-base">
                Join our partner program today and start earning commissions while helping travelers stay connected worldwide.
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-signal-blue hover:bg-opacity-90 text-white py-2 md:py-3 px-6 md:px-8 rounded-lg transition-colors text-sm md:text-base"
              >
                Contact Our Partner Team
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Partners; 