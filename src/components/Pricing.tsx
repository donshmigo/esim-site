import { CheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Pricing() {
  const { t } = useTranslation();
  
  const plans = [
    {
      name: 'Lite',
      price: 19.99,
      dataAmount: '5GB',
      features: [
        t('pricing.commonFeatures.feature1'),
        t('pricing.commonFeatures.feature2'),
        t('pricing.commonFeatures.feature3'),
        t('pricing.commonFeatures.feature4'),
        t('pricing.commonFeatures.feature5'),
        t('pricing.commonFeatures.feature6'),
        t('pricing.commonFeatures.feature7')
      ],
      popular: false,
      ctaText: t('pricing.lite.ctaText', 'View Plan Details'),
      path: '/plans/lite'
    },
    {
      name: 'Traveler',
      price: 39.99,
      dataAmount: '20GB',
      features: [
        t('pricing.commonFeatures.feature1'),
        t('pricing.commonFeatures.feature2'),
        t('pricing.commonFeatures.feature3'),
        t('pricing.commonFeatures.feature4'),
        t('pricing.commonFeatures.feature5'),
        t('pricing.commonFeatures.feature6'),
        t('pricing.commonFeatures.feature7')
      ],
      popular: true,
      ctaText: t('pricing.traveler.ctaText', 'View Plan Details'),
      path: '/plans/traveler'
    },
    {
      name: 'Max',
      price: 59.99,
      dataAmount: '30GB',
      features: [
        t('pricing.commonFeatures.feature1'),
        t('pricing.commonFeatures.feature2'),
        t('pricing.commonFeatures.feature3'),
        t('pricing.commonFeatures.feature4'),
        t('pricing.commonFeatures.feature5'),
        t('pricing.commonFeatures.feature6'),
        t('pricing.commonFeatures.feature7')
      ],
      popular: false,
      ctaText: t('pricing.max.ctaText', 'View Plan Details'),
      path: '/plans/max'
    }
  ];

  return (
    <section id="pricing" className="section-spacing bg-white">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">{t('pricing.title')}</h2>
          <p className="text-lg text-cool-slate">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative rounded-xl p-8 ${plan.popular ? 'border-2 border-signal-blue' : 'border border-steel-gray'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-signal-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                  {t('pricing.mostPopular')}
                </div>
              )}
              <h3 className="text-2xl font-bold text-romio-black">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-romio-black">${plan.price}</span>
                <span className="text-cool-slate">/{t('pricing.monthly').toLowerCase()}</span>
                <div className="mt-1 text-lg font-medium text-signal-blue">{plan.dataAmount} {t('dashboard.plans.data')}</div>
              </div>
              
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-signal-blue flex-shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to={plan.path}
                className={`block text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular 
                    ? 'bg-signal-blue text-white hover:bg-opacity-90' 
                    : 'bg-transparent border border-signal-blue text-signal-blue hover:bg-signal-blue hover:bg-opacity-10'
                }`}
              >
                {plan.ctaText}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-steel-gray rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">{t('pricing.customPlan')}</h3>
          <p className="text-cool-slate mb-6">
            {t('contact.businessSection.text')}
          </p>
          <Link to="/contact" className="btn-secondary inline-block">
            {t('pricing.contactUs')}
          </Link>
        </div>
      </div>
    </section>
  );
} 