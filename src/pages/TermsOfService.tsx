import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  const { t } = useTranslation();

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
              {t('navigation.backToHome', 'Back to Home')}
            </Link>
          </div>

          <h1 className="text-xl md:text-4xl font-bold mb-2 md:mb-6">{t('termsOfService.title', 'Terms of Service')}</h1>
          <p className="text-cool-slate mb-3 md:mb-8 text-xs md:text-base">{t('termsOfService.lastUpdated', 'Last Updated: March 15, 2024')}</p>

          <div className="prose prose-xs md:prose-lg max-w-none">
            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.introduction.title', 'Introduction')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.introduction.p1', 'These Terms of Service ("Terms") govern your use of the Romio eSIM service, website, and mobile application (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.')}
              </p>
              <p className="text-xs md:text-base">
                {t('termsOfService.introduction.p2', 'If you do not agree to these Terms, please do not use our Service.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.eligibility.title', 'Eligibility')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.eligibility.p1', 'You must be at least 18 years old to use our Service. By using our Service, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.account.title', 'Account Registration')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.account.p1', 'To use certain features of our Service, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.')}
              </p>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.account.p2', 'You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.')}
              </p>
              <p className="text-xs md:text-base">
                {t('termsOfService.account.p3', 'We reserve the right to disable your account if we determine, in our sole discretion, that you have violated these Terms.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.services.title', 'eSIM Services')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.services.p1', 'Romio provides eSIM services that allow you to connect to mobile networks in various countries. The availability and quality of the service may vary depending on your location, device compatibility, and other factors beyond our control.')}
              </p>
              <p className="text-xs md:text-base">
                {t('termsOfService.services.p2', 'We strive to provide accurate information about our service coverage, but we do not guarantee connectivity in all areas within a covered country. You are responsible for checking if your device is compatible with our eSIM service before making a purchase.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.payment.title', 'Payment and Billing')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.payment.p1', 'By purchasing our eSIM services, you agree to pay the fees indicated at the time of purchase. All payments are non-refundable unless otherwise specified in our refund policy or required by law.')}
              </p>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.payment.p2', 'We use third-party payment processors and do not store your full payment information. You agree to review and be bound by the terms of service of these payment processors.')}
              </p>
              <p className="text-xs md:text-base">
                {t('termsOfService.payment.p3', 'For subscription plans, you authorize us to charge your payment method on a recurring basis until you cancel your subscription.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.usage.title', 'Acceptable Use')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.usage.p1', 'You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to:')}
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 mt-1 md:mt-4 text-xs md:text-base space-y-0.5">
                <li>{t('termsOfService.usage.item1', 'Use the Service in any way that violates any applicable laws or regulations')}</li>
                <li>{t('termsOfService.usage.item2', 'Resell or redistribute our eSIM services without our express permission')}</li>
                <li>{t('termsOfService.usage.item3', 'Use the Service for any illegal or unauthorized purpose')}</li>
                <li>{t('termsOfService.usage.item4', 'Interfere with or disrupt the Service or servers or networks connected to the Service')}</li>
                <li>{t('termsOfService.usage.item5', 'Engage in excessive data usage that negatively impacts other users')}</li>
              </ul>
              <p className="text-xs md:text-base">
                {t('termsOfService.usage.p2', 'We reserve the right to terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including a breach of these Terms.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.intellectual.title', 'Intellectual Property')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.intellectual.p1', 'The Service and its original content, features, and functionality are and will remain the exclusive property of Romio and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.')}
              </p>
              <p className="text-xs md:text-base">
                {t('termsOfService.intellectual.p2', 'Our name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Romio or its affiliates. You may not use such marks without our prior written permission.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.disclaimer.title', 'Disclaimer of Warranties')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.disclaimer.p1', 'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.')}
              </p>
              <p className="text-xs md:text-base">
                {t('termsOfService.disclaimer.p2', 'ROMIO AND ITS AFFILIATES DO NOT WARRANT THAT (A) THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (B) ANY ERRORS OR DEFECTS WILL BE CORRECTED; (C) THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (D) THE RESULTS OF USING THE SERVICE WILL MEET YOUR REQUIREMENTS.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.limitation.title', 'Limitation of Liability')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.limitation.p1', 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ROMIO, ITS AFFILIATES, OR THEIR DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:')}
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 mt-1 md:mt-4 text-xs md:text-base space-y-0.5">
                <li>{t('termsOfService.limitation.item1', 'YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE')}</li>
                <li>{t('termsOfService.limitation.item2', 'ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE')}</li>
                <li>{t('termsOfService.limitation.item3', 'ANY CONTENT OBTAINED FROM THE SERVICE')}</li>
                <li>{t('termsOfService.limitation.item4', 'UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT')}</li>
              </ul>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.changes.title', 'Changes to Terms')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.changes.p1', 'We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.')}
              </p>
              <p className="text-xs md:text-base">
                {t('termsOfService.changes.p2', 'By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('termsOfService.contact.title', 'Contact Us')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('termsOfService.contact.p1', 'If you have any questions about these Terms, please contact us:')}
              </p>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-xs md:text-base mb-1">
                  <strong>{t('termsOfService.contact.email', 'Email')}:</strong> legal@romio-mobile.com
                </p>
                <p className="text-xs md:text-base">
                  <strong>{t('termsOfService.contact.address', 'Address')}:</strong> 123 Legal Street, Terms City, 10001
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 