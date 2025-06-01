import { GlobeAltIcon, DevicePhoneMobileIcon, CurrencyDollarIcon, BoltIcon, PhoneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      name: t('features.global.title'),
      description: t('features.global.description'),
      icon: GlobeAltIcon,
    },
    {
      name: t('features.subscription.title'),
      description: t('features.subscription.description'),
      icon: CurrencyDollarIcon,
    },
    {
      name: t('features.activation.title'),
      description: t('features.activation.description'),
      icon: BoltIcon,
    },
    {
      name: t('features.usage.title'),
      description: t('features.usage.description'),
      icon: DevicePhoneMobileIcon,
    },
    {
      name: t('features.keepNumber.title'),
      description: t('features.keepNumber.description'),
      icon: PhoneIcon,
    },
    {
      name: t('features.topUp.title'),
      description: t('features.topUp.description'),
      icon: ArrowPathIcon,
    },
  ];

  return (
    <section id="features" className="section-spacing bg-steel-gray">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">{t('features.title')}</h2>
          <p className="text-lg text-cool-slate">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-gray-500" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-romio-black">{feature.name}</h3>
              <p className="text-cool-slate">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 