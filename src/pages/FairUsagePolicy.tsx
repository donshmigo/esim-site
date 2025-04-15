import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useTranslation } from 'react-i18next';

const FairUsagePolicy: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

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

          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6">Fair Usage Policy</h1>
          <p className="text-cool-slate mb-6 md:mb-8 text-sm md:text-base">Last updated: {currentYear}</p>

          <div className="prose prose-sm md:prose-base max-w-none">
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">1. Introduction</h2>
              <p className="text-sm md:text-base">
                This Fair Usage Policy ("Policy") outlines the acceptable use of Romio Mobile's eSIM services. 
                By using our services, you agree to comply with this Policy. We reserve the right to modify 
                this Policy at any time.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">2. Data Usage Guidelines</h2>
              <p className="text-sm md:text-base">
                Our eSIM plans are designed for normal personal use. This includes:
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base">
                <li>Web browsing and email</li>
                <li>Social media and messaging</li>
                <li>Streaming music and video (within reasonable limits)</li>
                <li>Mobile applications</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">3. Prohibited Activities</h2>
              <p className="text-sm md:text-base">
                The following activities are strictly prohibited:
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base">
                <li>Using the service for illegal purposes</li>
                <li>Reselling or redistributing the service</li>
                <li>Using automated systems to access the service</li>
                <li>Engaging in activities that may harm the network</li>
                <li>Excessive data usage that impacts other users</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">4. Data Usage Limits</h2>
              <p className="text-sm md:text-base">
                While we don't implement hard data caps, we monitor usage patterns to ensure fair access for all users. 
                If we detect excessive usage that impacts other customers, we may:
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base">
                <li>Contact you to discuss your usage</li>
                <li>Suggest a more suitable plan</li>
                <li>Implement temporary speed restrictions</li>
                <li>In extreme cases, suspend or terminate service</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">5. Network Management</h2>
              <p className="text-sm md:text-base">
                To ensure optimal service for all users, we may:
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base">
                <li>Monitor network usage patterns</li>
                <li>Implement traffic management during peak times</li>
                <li>Prioritize certain types of traffic</li>
                <li>Take necessary actions to maintain network quality</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">6. Contact Information</h2>
              <p className="text-sm md:text-base">
                If you have any questions about this Fair Usage Policy, please contact us at:
              </p>
              <p className="mt-2 text-sm md:text-base">
                <strong>Email:</strong> support@romiomobile.com<br />
                <strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105, USA
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FairUsagePolicy; 