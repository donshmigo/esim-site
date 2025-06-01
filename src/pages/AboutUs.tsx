import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import TextLogo from '../components/TextLogo';

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <TextLogo className="h-20" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('aboutUs.title', 'About Us')}</h1>
          <p className="text-xl text-gray-600">
            {t('aboutUs.subtitle', 'Connecting you to the world with affordable, reliable eSIMs')}
          </p>
        </div>

        <div className="prose prose-lg mx-auto">
          <h2>{t('aboutUs.mission.title', 'Our Mission')}</h2>
          <p>
            {t('aboutUs.mission.description', 'At Romio, we\'re committed to revolutionizing the way travelers stay connected. Our mission is to provide seamless, affordable connectivity solutions that eliminate the hassle of traditional SIM cards and expensive roaming charges.')}
          </p>

          <h2>{t('aboutUs.story.title', 'Our Story')}</h2>
          <p>
            {t('aboutUs.story.description', 'Founded in 2023, Romio was born from the frustration of dealing with connectivity issues while traveling. Our team of tech enthusiasts and frequent travelers came together with a vision: to create an eSIM service that\'s not only reliable but also incredibly easy to use.')}
          </p>
          <p>
            {t('aboutUs.story.growth', 'Since then, we\'ve expanded our coverage to over 90 countries and continue to grow, driven by our passion for keeping people connected wherever they go.')}
          </p>

          <h2>{t('aboutUs.difference.title', 'The Romio Difference')}</h2>
          <ul>
            <li>
              {t('aboutUs.difference.instant', 'Instant Activation: Get connected in minutes, not days.')}
            </li>
            <li>
              {t('aboutUs.difference.global', 'Global Coverage: Stay connected in 90+ countries worldwide.')}
            </li>
            <li>
              {t('aboutUs.difference.noRoaming', 'No Roaming Charges: Say goodbye to unexpected fees.')}
            </li>
            <li>
              {t('aboutUs.difference.plans', 'Flexible Plans: Choose what works for your travel needs.')}
            </li>
            <li>
              {t('aboutUs.difference.support', '24/7 Support: We\'re here whenever you need us.')}
            </li>
          </ul>

          <h2>{t('aboutUs.team.title', 'Our Team')}</h2>
          <p>
            {t('aboutUs.team.description', 'We\'re a diverse team of tech enthusiasts, travel lovers, and customer experience experts. United by our passion for innovation and exploration, we work tirelessly to ensure Romio provides the best possible connectivity solution for travelers around the globe.')}
          </p>

          <h2>{t('aboutUs.future.title', 'Looking Forward')}</h2>
          <p>
            {t('aboutUs.future.description', 'The future of connectivity is eSIM technology, and we\'re excited to be at the forefront of this revolution. As we continue to expand our coverage and enhance our offerings, we remain committed to our core values of reliability, affordability, and exceptional customer service.')}
          </p>
          <p>
            {t('aboutUs.future.join', 'Join us on this journey and experience the freedom of staying connected anywhere in the world with Romio eSIM.')}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
} 