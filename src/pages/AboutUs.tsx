import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useTranslation } from 'react-i18next';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-6 pb-6 md:pt-16 md:pb-16">
        <div className="container mx-auto px-3 md:px-4 max-w-4xl">
          <div className="mb-2 md:mb-8">
            <Link to="/" className="text-signal-blue hover:underline inline-flex items-center text-xs md:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          <h1 className="text-xl md:text-4xl font-bold mb-2 md:mb-6">About Romio Mobile</h1>
          <p className="text-cool-slate mb-3 md:mb-8 text-xs md:text-base">Connecting travelers worldwide with seamless mobile connectivity.</p>

          <div className="prose prose-xs md:prose-lg max-w-none">
            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">Our Story</h2>
              <p className="text-xs md:text-base mb-2">
                Romio Mobile was founded with a simple mission: to make international travel more connected and seamless. 
                We recognized that traditional SIM cards and roaming services were outdated, expensive, and inconvenient for modern travelers.
              </p>
              <p className="text-xs md:text-base">
                Our team of telecommunications experts and travel enthusiasts came together to create a solution that would 
                revolutionize how people stay connected abroad. By leveraging eSIM technology, we've eliminated the need for 
                physical SIM cards and simplified the process of getting connected in foreign countries.
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">Our Mission</h2>
              <p className="text-xs md:text-base mb-2">
                At Romio Mobile, our mission is to provide affordable, reliable, and hassle-free mobile connectivity to travelers worldwide. 
                We believe that staying connected should be simple, transparent, and cost-effective.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-6 mt-2 md:mt-6">
                <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm md:text-xl font-medium mb-1">Accessibility</h3>
                  <p className="text-cool-slate text-xs md:text-base">Making international connectivity available to everyone, everywhere.</p>
                </div>
                <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm md:text-xl font-medium mb-1">Transparency</h3>
                  <p className="text-cool-slate text-xs md:text-base">Clear pricing and straightforward terms with no hidden fees.</p>
                </div>
                <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm md:text-xl font-medium mb-1">Innovation</h3>
                  <p className="text-cool-slate text-xs md:text-base">Continuously improving our technology and service offerings.</p>
                </div>
                <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm md:text-xl font-medium mb-1">Customer Focus</h3>
                  <p className="text-cool-slate text-xs md:text-base">Dedicated to providing exceptional support and user experience.</p>
                </div>
              </div>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">Our Technology</h2>
              <p className="text-xs md:text-base mb-2">
                Romio Mobile utilizes cutting-edge eSIM technology to provide instant connectivity without the need for physical SIM cards. 
                Our platform offers:
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 mt-1 md:mt-4 text-xs md:text-base space-y-0.5">
                <li>Instant activation upon purchase</li>
                <li>Compatibility with most modern smartphones</li>
                <li>Seamless switching between networks</li>
                <li>Real-time usage tracking and management</li>
                <li>Secure and encrypted connections</li>
              </ul>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">Our Impact</h2>
              <p className="text-xs md:text-base mb-2">
                Since our launch, Romio Mobile has helped thousands of travelers stay connected in over 190 countries. 
                We've eliminated the frustration of searching for local SIM cards, dealing with language barriers, 
                and paying exorbitant roaming fees.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-6 mt-2 md:mt-6">
                <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm text-center">
                  <h3 className="text-lg md:text-3xl font-bold text-signal-blue mb-1">50,000+</h3>
                  <p className="text-cool-slate text-xs md:text-base">Active Users</p>
                </div>
                <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm text-center">
                  <h3 className="text-lg md:text-3xl font-bold text-signal-blue mb-1">190+</h3>
                  <p className="text-cool-slate text-xs md:text-base">Countries Covered</p>
                </div>
                <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm text-center">
                  <h3 className="text-lg md:text-3xl font-bold text-signal-blue mb-1">98%</h3>
                  <p className="text-cool-slate text-xs md:text-base">Customer Satisfaction</p>
                </div>
              </div>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">Join Us</h2>
              <p className="text-xs md:text-base mb-2">
                We're always looking for talented individuals who share our passion for connectivity and innovation. 
                If you're interested in joining our team, check out our current openings.
              </p>
              <div className="mt-2 md:mt-6">
                <Link 
                  to="/contact" 
                  className="inline-block bg-signal-blue hover:bg-opacity-90 text-white py-1.5 px-3 md:px-8 rounded-lg transition-colors text-xs md:text-base"
                >
                  Contact Us
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs; 