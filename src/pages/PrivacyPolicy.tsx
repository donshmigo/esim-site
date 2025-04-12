import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useTranslation } from 'react-i18next';

// Logo will be referenced directly from public directory
const logoPath = '/images/logo.png';

const PrivacyPolicy: React.FC = () => {
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

          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6">Privacy Policy</h1>
          <p className="text-cool-slate mb-6 md:mb-8 text-sm md:text-base">Last updated: {currentYear}</p>

          <div className="prose prose-sm md:prose-lg max-w-none">
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">1. Introduction</h2>
              <p className="text-sm md:text-base">
                Romio Mobile ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our eSIM service, website, and mobile application (collectively, the "Service").
              </p>
              <p className="text-sm md:text-base">
                Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">2. Information We Collect</h2>
              <h3 className="text-lg md:text-xl font-medium mb-2">2.1 Personal Information</h3>
              <p className="text-sm md:text-base">We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>Register for an account</li>
                <li>Subscribe to our eSIM service</li>
                <li>Contact our customer support</li>
                <li>Sign up for our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-sm md:text-base">This information may include:</p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing information</li>
                <li>Device information</li>
                <li>Location data</li>
              </ul>

              <h3 className="text-lg md:text-xl font-medium mb-2">2.2 Automatically Collected Information</h3>
              <p className="text-sm md:text-base">
                When you access or use our Service, we may automatically collect certain information about your device and your use of the Service, including:
              </p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Access times</li>
                <li>Pages viewed</li>
                <li>Data usage</li>
                <li>Device identifiers</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">3. How We Use Your Information</h2>
              <p className="text-sm md:text-base">We may use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process your transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your experience</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">4. Sharing Your Information</h2>
              <p className="text-sm md:text-base">We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>With service providers who perform tasks on our behalf</li>
                <li>With business partners who provide services to you through our Service</li>
                <li>In connection with a merger, sale, or acquisition</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With your consent</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">5. Data Security</h2>
              <p className="text-sm md:text-base">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">6. Your Rights</h2>
              <p className="text-sm md:text-base">Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-sm md:text-base">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">7. Children's Privacy</h2>
              <p className="text-sm md:text-base">
                Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">8. International Data Transfers</h2>
              <p className="text-sm md:text-base">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our Service, you consent to the transfer of your information to these countries.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-sm md:text-base">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">10. Contact Us</h2>
              <p className="text-sm md:text-base">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2 text-sm md:text-base">
                <strong>Email:</strong> privacy@romiomobile.com<br />
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

export default PrivacyPolicy; 