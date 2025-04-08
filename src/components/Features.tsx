import { GlobeAltIcon, DevicePhoneMobileIcon, CurrencyDollarIcon, BoltIcon, PhoneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Global Coverage in 80+ Countries',
    description: 'Stay connected across Europe, North America, Asia, and more — with one plan, one QR code.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Monthly Subscription Plans',
    description: 'Choose from 5GB, 20GB, or 30GB plans, starting at $19.99/month. Plans automatically renew and can be canceled anytime.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Instant Activation',
    description: 'Just scan your QR code and go. No physical SIM, no store visits, no delays.',
    icon: BoltIcon,
  },
  {
    name: 'Use at Home and Abroad',
    description: 'Romio works in your home country and while traveling, making it ideal for full-time travelers, remote workers, or long-stay expats.',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'Keep Your Number',
    description: 'Add our VoIP plan to keep your phone number, take calls over data, and use apps like WhatsApp without interruption.',
    icon: PhoneIcon,
  },
  {
    name: 'Top-Up Flexibility',
    description: 'Need more data before the month ends? Easily top up from your portal or app.',
    icon: ArrowPathIcon,
  },
];

export default function Features() {
  return (
    <section id="features" className="section-spacing bg-steel-gray">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">No Contracts, No Roaming Fees, No Hassle</h2>
          <p className="text-lg text-cool-slate">
            Romio eSIM replaces your traditional phone plan with a monthly subscription that gives you
            instant data access the moment you land.
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