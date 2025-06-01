import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useTranslation } from 'react-i18next';

// Removed logo path reference since we're using text-based logo

const PrivacyPolicy: React.FC = () => {
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

          <h1 className="text-xl md:text-4xl font-bold mb-2 md:mb-6">{t('privacyPolicy.title', 'Privacy Policy')}</h1>
          <p className="text-cool-slate mb-3 md:mb-8 text-xs md:text-base">{t('privacyPolicy.lastUpdated', 'Last Updated: March 15, 2024')}</p>

          <div className="prose prose-xs md:prose-lg max-w-none">
            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('privacyPolicy.introduction.title', 'Introduction')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('privacyPolicy.introduction.p1', 'At Romio, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, process, and store your data when you use our services or visit our website.')}
              </p>
              <p className="text-xs md:text-base">
                {t('privacyPolicy.introduction.p2', 'By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('privacyPolicy.information.title', 'Information We Collect')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('privacyPolicy.information.p1', 'We collect several types of information for various purposes to provide and improve our service to you:')}
              </p>
              
              <h3 className="text-md md:text-xl font-semibold mb-1 md:mb-2">{t('privacyPolicy.information.personal.title', 'Personal Data')}</h3>
              <p className="text-xs md:text-base mb-2">
                {t('privacyPolicy.information.personal.p1', 'While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include:')}
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 text-xs md:text-base space-y-0.5">
                <li>{t('privacyPolicy.information.personal.item1', 'Email address')}</li>
                <li>{t('privacyPolicy.information.personal.item2', 'First name and last name')}</li>
                <li>{t('privacyPolicy.information.personal.item3', 'Phone number')}</li>
                <li>{t('privacyPolicy.information.personal.item4', 'Billing address')}</li>
                <li>{t('privacyPolicy.information.personal.item5', 'Payment information')}</li>
              </ul>

              <h3 className="text-md md:text-xl font-semibold mb-1 md:mb-2">{t('privacyPolicy.information.usage.title', 'Usage Data')}</h3>
              <p className="text-xs md:text-base mb-2">
                {t('privacyPolicy.information.usage.p1', 'We may also collect information on how you access and use our Service. This may include:')}
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 text-xs md:text-base space-y-0.5">
                <li>{t('privacyPolicy.information.usage.item1', 'Your computer\'s Internet Protocol address (e.g. IP address)')}</li>
                <li>{t('privacyPolicy.information.usage.item2', 'Browser type and version')}</li>
                <li>{t('privacyPolicy.information.usage.item3', 'Pages of our Service that you visit')}</li>
                <li>{t('privacyPolicy.information.usage.item4', 'Time and date of your visit')}</li>
                <li>{t('privacyPolicy.information.usage.item5', 'Data consumption')}</li>
                <li>{t('privacyPolicy.information.usage.item6', 'Device information')}</li>
              </ul>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('privacyPolicy.use.title', 'How We Use Your Information')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('privacyPolicy.use.p1', 'We use the collected data for various purposes:')}
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 text-xs md:text-base space-y-0.5">
                <li>{t('privacyPolicy.use.item1', 'To provide and maintain our Service')}</li>
                <li>{t('privacyPolicy.use.item2', 'To notify you about changes to our Service')}</li>
                <li>{t('privacyPolicy.use.item3', 'To allow you to participate in interactive features of our Service')}</li>
                <li>{t('privacyPolicy.use.item4', 'To provide customer support')}</li>
                <li>{t('privacyPolicy.use.item5', 'To gather analysis or valuable information so that we can improve our Service')}</li>
                <li>{t('privacyPolicy.use.item6', 'To monitor the usage of our Service')}</li>
                <li>{t('privacyPolicy.use.item7', 'To detect, prevent and address technical issues')}</li>
                <li>{t('privacyPolicy.use.item8', 'To process payments and prevent fraudulent transactions')}</li>
              </ul>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('privacyPolicy.sharing.title', 'Information Sharing and Disclosure')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('privacyPolicy.sharing.p1', 'We may share your personal information in the following situations:')}
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 text-xs md:text-base space-y-0.5">
                <li>
                  <strong>{t('privacyPolicy.sharing.providers.title', 'Service Providers:')}</strong> {t('privacyPolicy.sharing.providers.description', 'We may share your information with third-party service providers to facilitate our Service, to provide the Service on our behalf, to perform Service-related services, or to assist us in analyzing how our Service is used.')}
                </li>
                <li>
                  <strong>{t('privacyPolicy.sharing.business.title', 'Business Transfer:')}</strong> {t('privacyPolicy.sharing.business.description', 'In the event of a merger, acquisition, or asset sale, your personal information may be transferred.')}
                </li>
                <li>
                  <strong>{t('privacyPolicy.sharing.legal.title', 'Legal Requirements:')}</strong> {t('privacyPolicy.sharing.legal.description', 'We may disclose your information if required to do so by law or in response to valid requests by public authorities.')}
                </li>
                <li>
                  <strong>{t('privacyPolicy.sharing.protection.title', 'Protection:')}</strong> {t('privacyPolicy.sharing.protection.description', 'We may share information to protect the rights, property, or safety of Romio, our customers, or others.')}
                </li>
              </ul>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('privacyPolicy.security.title', 'Data Security')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('privacyPolicy.security.p1', 'The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information, but no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('privacyPolicy.rights.title', 'Your Data Protection Rights')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('privacyPolicy.rights.p1', 'Depending on your location, you may have certain rights regarding your personal data, including:')}
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 text-xs md:text-base space-y-0.5">
                <li>{t('privacyPolicy.rights.item1', 'The right to access, update, or delete your information')}</li>
                <li>{t('privacyPolicy.rights.item2', 'The right of rectification')}</li>
                <li>{t('privacyPolicy.rights.item3', 'The right to object')}</li>
                <li>{t('privacyPolicy.rights.item4', 'The right of restriction')}</li>
                <li>{t('privacyPolicy.rights.item5', 'The right to data portability')}</li>
                <li>{t('privacyPolicy.rights.item6', 'The right to withdraw consent')}</li>
              </ul>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('privacyPolicy.contact.title', 'Contact Us')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('privacyPolicy.contact.p1', 'If you have any questions about this Privacy Policy, please contact us:')}
              </p>
              <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm">
                <p className="text-xs md:text-base mb-1">
                  <strong>{t('privacyPolicy.contact.email', 'Email')}:</strong> privacy@romio-mobile.com
              </p>
                <p className="text-xs md:text-base">
                  <strong>{t('privacyPolicy.contact.address', 'Address')}:</strong> 123 Privacy Street, Data City, 10001
              </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy; 