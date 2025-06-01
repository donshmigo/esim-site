import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Link } from 'react-router-dom';

export default function FairUsagePolicy() {
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

          <h1 className="text-xl md:text-4xl font-bold mb-2 md:mb-6">{t('fairUsagePolicy.title', 'Fair Usage Policy')}</h1>
          <p className="text-cool-slate mb-3 md:mb-8 text-xs md:text-base">{t('fairUsagePolicy.lastUpdated', 'Last Updated: March 15, 2024')}</p>

          <div className="prose prose-xs md:prose-lg max-w-none">
            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('fairUsagePolicy.introduction.title', 'Introduction')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('fairUsagePolicy.introduction.p1', 'At Romio, we are committed to providing reliable and high-quality eSIM services. This Fair Usage Policy (\"FUP\") is designed to ensure that all our customers can enjoy optimal service quality.')}
              </p>
              <p className="text-xs md:text-base">
                {t('fairUsagePolicy.introduction.p2', 'This policy applies to all our services and plans. By using our services, you agree to comply with this policy.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('fairUsagePolicy.dataAllowance.title', 'Data Allowance and Speed')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('fairUsagePolicy.dataAllowance.p1', 'Each of our plans comes with a specified data allowance. Once you exceed this allowance, your connection speed may be reduced for the remainder of your billing cycle.')}
              </p>
              <p className="text-xs md:text-base mb-2">
                {t('fairUsagePolicy.dataAllowance.p2', 'For unlimited plans, after consuming a substantial amount of data (typically 20-30GB, depending on the plan), your connection speed may be reduced to ensure network quality for all users.')}
              </p>
              <p className="text-xs md:text-base">
                {t('fairUsagePolicy.dataAllowance.p3', 'We do not block access to any services after you reach your data limit; we only reduce the speed.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('fairUsagePolicy.prohibitedUses.title', 'Prohibited Uses')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('fairUsagePolicy.prohibitedUses.p1', 'Our services are intended for regular personal use. The following uses are prohibited:')}
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 mt-1 md:mt-4 text-xs md:text-base space-y-0.5">
                <li>{t('fairUsagePolicy.prohibitedUses.item1', 'Continuous, unattended streaming or downloads')}</li>
                <li>{t('fairUsagePolicy.prohibitedUses.item2', 'Automated or machine-to-machine connections unless explicitly allowed by your plan')}</li>
                <li>{t('fairUsagePolicy.prohibitedUses.item3', 'Reselling or sharing your connection with others outside your immediate household')}</li>
                <li>{t('fairUsagePolicy.prohibitedUses.item4', 'Using our services for commercial purposes without an appropriate business plan')}</li>
                <li>{t('fairUsagePolicy.prohibitedUses.item5', 'Any illegal activities or activities that adversely affect our network or other customers')}</li>
              </ul>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('fairUsagePolicy.roaming.title', 'Roaming and International Usage')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('fairUsagePolicy.roaming.p1', 'Our eSIMs are designed for travelers and international use. However, we expect most customers to primarily use their eSIM in their home country or for temporary travel periods.')}
              </p>
              <p className="text-xs md:text-base">
                {t('fairUsagePolicy.roaming.p2', 'Excessive or prolonged use outside the intended coverage regions may result in service limitations or additional charges.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('fairUsagePolicy.monitoring.title', 'Monitoring and Enforcement')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('fairUsagePolicy.monitoring.p1', 'We monitor network usage to ensure fair access for all customers. If we notice usage patterns that violate this policy, we may:')}
              </p>
              <ul className="list-disc pl-4 md:pl-6 mb-2 md:mb-4 mt-1 md:mt-4 text-xs md:text-base space-y-0.5">
                <li>{t('fairUsagePolicy.monitoring.item1', 'Contact you to discuss your usage')}</li>
                <li>{t('fairUsagePolicy.monitoring.item2', 'Temporarily reduce your connection speed')}</li>
                <li>{t('fairUsagePolicy.monitoring.item3', 'Recommend a more suitable plan for your usage')}</li>
                <li>{t('fairUsagePolicy.monitoring.item4', 'In severe cases, suspend or terminate your service')}</li>
              </ul>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('fairUsagePolicy.changes.title', 'Changes to This Policy')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('fairUsagePolicy.changes.p1', 'We may update this Fair Usage Policy from time to time. We will notify you of any significant changes via email or through our website.')}
              </p>
            </section>

            <section className="mb-4 md:mb-12">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{t('fairUsagePolicy.contact.title', 'Contact Us')}</h2>
              <p className="text-xs md:text-base mb-2">
                {t('fairUsagePolicy.contact.p1', 'If you have any questions about this Fair Usage Policy, please contact our customer support team at:')}
              </p>
              <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm">
                <p className="text-xs md:text-base mb-1">
                  <strong>{t('fairUsagePolicy.contact.email', 'Email')}:</strong> support@romio-mobile.com
                </p>
                <p className="text-xs md:text-base">
                  <strong>{t('fairUsagePolicy.contact.hours', 'Hours')}:</strong> 24/7
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