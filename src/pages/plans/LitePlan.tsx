import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, DevicePhoneMobileIcon, GlobeAltIcon, SignalIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

const LitePlan = () => {
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSubscribe = () => {
    const planDetails = {
      id: 'lite',
      name: 'Romio Lite – 5GB Global eSIM Plan',
      description: 'A lightweight plan for short trips or casual use',
      data_amount: 5,
      data_unit: 'GB',
      price: {
        amount: 19.99,
        currency: 'USD'
      }
    };
    
    navigate('/checkout', { state: { selectedPlan: planDetails, skipPlanSelection: true } });
  };

  return (
    <div className="pt-4 pb-16">
      <div className="container-custom mx-auto">
        {/* Back button and breadcrumb */}
        <div className="mb-4">
          <Link to="/#pricing" className="inline-flex items-center text-signal-blue hover:underline group">
            <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to All Plans
          </Link>
        </div>

        {/* Plan Header */}
        <div className="mb-4 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <SignalIcon className="h-5 w-5 text-signal-blue animate-signal" />
            <span className="text-signal-blue font-medium">5GB Data Plan</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-romio-black mb-4 tech-accent">
            Romio Lite – 5GB Global eSIM Plan
          </h1>
          
          <div className="flex flex-col lg:flex-row lg:items-start">
            <p className="text-xl text-cool-slate lg:max-w-xl">
              A lightweight plan for short trips or casual use. Stay connected across 80+ countries with 5GB of high-speed data, no contracts, and instant activation.
            </p>
            
            {/* Mobile subscription box - visible only on mobile - NOW ALIGNED WITH DESCRIPTION */}
            <div className="lg:hidden mt-4">
              <div className="bg-white rounded-xl border-2 border-signal-blue p-4 shadow-lg">
                <div className="mb-2 text-center">
                  <h3 className="text-lg font-medium mb-1">Monthly Subscription: <span className="text-2xl font-bold text-signal-blue">$19.99</span></h3>
                </div>

                <button 
                  onClick={handleSubscribe}
                  className="btn-primary w-full text-center block py-3"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Plan details */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Plan Overview</h2>
              <p>
                Romio Lite is built for travelers who just need the essentials — messages, maps, emails, and light browsing. 
                Whether you're popping over to Europe for a few days or hitting a weekend in Mexico, this plan gives you seamless coverage 
                without the hassle of SIM swaps or roaming charges.
              </p>

              {/* Key features */}
              <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Instant eSIM delivery via QR code",
                  "Connect in 80+ countries",
                  "30-day validity from first activation",
                  "Use at home or abroad",
                  "Cancel or upgrade anytime"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-signal-blue flex-shrink-0 mr-2 mt-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">What You Can Do with 5GB</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <GlobeAltIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">7 hours</h3>
                  </div>
                  <p className="text-cool-slate">Google Maps navigation</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <DevicePhoneMobileIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">300+</h3>
                  </div>
                  <p className="text-cool-slate">Instagram uploads</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <GlobeAltIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">15 hours</h3>
                  </div>
                  <p className="text-cool-slate">Web browsing</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <SignalIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">Light use</h3>
                  </div>
                  <p className="text-cool-slate">WhatsApp/Telegram voice calls</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">Perfect For</h2>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li>Weekend travelers</li>
                <li>Short business trips</li>
                <li>Light data users</li>
                <li>First-time eSIM users</li>
                <li>Backup connectivity</li>
              </ul>
            </div>
          </div>

          {/* Right column - Sidebar with pricing and CTA - visible only on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border-2 border-signal-blue p-6 shadow-lg">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-medium mb-1">Monthly Subscription</h3>
                <div className="text-4xl font-bold text-signal-blue mb-2">$19.99 <span className="text-lg font-normal text-cool-slate">/month</span></div>
                <p className="text-cool-slate text-sm">Renews automatically. Cancel anytime.</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Plan Includes:</h4>
                <ul className="space-y-3">
                  {[
                    "5GB high-speed data",
                    "Global coverage in 80+ countries",
                    "No roaming fees",
                    "Easy setup via QR code",
                    "Access to customer dashboard",
                    "Email support"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-signal-blue flex-shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={handleSubscribe}
                className="btn-primary w-full text-center block py-3"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Other plans section */}
        <div className="mt-16 pt-12 border-t border-steel-gray">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse Other Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-steel-gray p-6 hover:border-signal-blue hover:shadow-md transition-all">
              <h3 className="text-xl font-bold mb-1">Romio Traveler – 20GB</h3>
              <p className="text-cool-slate mb-4">Perfect for digital nomads, content creators, and longer trips. More data, same freedom — in 80+ countries.</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-signal-blue">$39.99<span className="text-sm font-normal text-cool-slate">/mo</span></span>
                <Link to="/plans/traveler" className="btn-secondary text-sm">Learn More</Link>
              </div>
            </div>
            
            <div className="rounded-xl border border-steel-gray p-6 hover:border-signal-blue hover:shadow-md transition-all">
              <h3 className="text-xl font-bold mb-1">Romio Max – 30GB</h3>
              <p className="text-cool-slate mb-4">Our most powerful plan for remote workers and digital explorers. Go further, stay longer, connect more.</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-signal-blue">$59.99<span className="text-sm font-normal text-cool-slate">/mo</span></span>
                <Link to="/plans/max" className="btn-secondary text-sm">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LitePlan; 