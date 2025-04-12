import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useTranslation } from 'react-i18next';

const TermsOfService: React.FC = () => {
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

          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6">Terms of Service</h1>
          <p className="text-cool-slate mb-6 md:mb-8 text-sm md:text-base">Last updated: {currentYear}</p>

          <div className="prose prose-sm md:prose-lg max-w-none">
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">1. Acceptance of Terms</h2>
              <p className="text-sm md:text-base">
                By accessing or using Romio Mobile's eSIM service, website, and mobile application (collectively, the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">2. Description of Service</h2>
              <p className="text-sm md:text-base">
                Romio Mobile provides eSIM services that allow users to access mobile data in various countries. Our Service includes:
              </p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>Purchase and activation of eSIMs</li>
                <li>Mobile data plans for different regions</li>
                <li>Account management and usage tracking</li>
                <li>Customer support services</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">3. User Accounts</h2>
              <p className="text-sm md:text-base">To use certain features of the Service, you must register for an account. You agree to:</p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update your account information</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">4. Payment Terms</h2>
              <p className="text-sm md:text-base">
                All purchases are final and non-refundable unless otherwise specified. By making a purchase, you agree to:
              </p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>Provide valid payment information</li>
                <li>Pay all applicable fees and taxes</li>
                <li>Authorize us to charge your payment method</li>
                <li>Accept our refund policy</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">5. Service Usage</h2>
              <p className="text-sm md:text-base">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>Use the Service in any way that violates applicable laws</li>
                <li>Attempt to circumvent any security features</li>
                <li>Interfere with the proper functioning of the Service</li>
                <li>Use the Service for any unauthorized or illegal purpose</li>
                <li>Share your account credentials with others</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">6. Intellectual Property</h2>
              <p className="text-sm md:text-base">
                The Service and its original content, features, and functionality are owned by Romio Mobile and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">7. Limitation of Liability</h2>
              <p className="text-sm md:text-base">
                Romio Mobile shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">8. Termination</h2>
              <p className="text-sm md:text-base">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">9. Changes to Terms</h2>
              <p className="text-sm md:text-base">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">10. Contact Information</h2>
              <p className="text-sm md:text-base">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mt-2 text-sm md:text-base">
                <strong>Email:</strong> legal@romiomobile.com<br />
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

export default TermsOfService; 