import { CheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Lite',
    price: 19.99,
    dataAmount: '5GB',
    features: [
      'Works in 80+ countries',
      'No roaming fees',
      'No contracts',
      'Instant activation',
      'Dashboard access',
      'Email support'
    ],
    popular: false,
    ctaText: 'View Plan Details',
    path: '/plans/lite'
  },
  {
    name: 'Traveler',
    price: 39.99,
    dataAmount: '20GB',
    features: [
      'Works in 80+ countries',
      'No roaming fees',
      'No contracts',
      'Instant activation',
      'Dashboard access',
      'Priority email support',
      'Top-up discounts'
    ],
    popular: true,
    ctaText: 'View Plan Details',
    path: '/plans/traveler'
  },
  {
    name: 'Max',
    price: 59.99,
    dataAmount: '30GB',
    features: [
      'Works in 80+ countries',
      'No roaming fees',
      'No contracts',
      'Instant activation',
      'Dashboard access',
      'Priority support',
      'Top-up discounts',
      'VoIP add-on included'
    ],
    popular: false,
    ctaText: 'View Plan Details',
    path: '/plans/max'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-spacing bg-white">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="text-lg text-cool-slate">
            Choose a plan that works for your travel needs. All plans automatically renew monthly and can be canceled anytime.
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
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-romio-black">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-romio-black">${plan.price}</span>
                <span className="text-cool-slate">/month</span>
                <div className="mt-1 text-lg font-medium text-signal-blue">{plan.dataAmount} Data</div>
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
          <h3 className="text-xl font-semibold mb-4">Need a Custom Solution?</h3>
          <p className="text-cool-slate mb-6">
            For teams, families, or special travel requirements, we offer custom plans.
          </p>
          <a href="/contact" className="btn-secondary inline-block">
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
} 