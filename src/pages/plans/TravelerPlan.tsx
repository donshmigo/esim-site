import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, DevicePhoneMobileIcon, GlobeAltIcon, SignalIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

const TravelerPlan = () => {
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSubscribe = () => {
    const planDetails = {
      id: 'traveler',
      name: 'Romio Traveler – 20GB Global eSIM Plan',
      description: 'Perfect for digital nomads, content creators, and longer trips',
      data_amount: 20,
      data_unit: 'GB',
      price: {
        amount: 39.99,
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
            <span className="text-signal-blue font-medium">20GB Data Plan</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-romio-black mb-4 tech-accent">
            Romio Traveler – 20GB Global eSIM Plan
          </h1>
          
          <div className="flex flex-col lg:flex-row lg:items-start">
            <p className="text-xl text-cool-slate lg:max-w-xl">
              Perfect for digital nomads, content creators, and longer trips. More data, same freedom — in 80+ countries.
            </p>
            
            {/* Mobile subscription box - visible only on mobile - NOW ALIGNED WITH DESCRIPTION */}
            <div className="lg:hidden mt-4 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-signal-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="bg-white rounded-xl border-2 border-signal-blue p-4 shadow-lg pt-8">
                <div className="mb-2 text-center">
                  <h3 className="text-lg font-medium mb-1">Monthly Subscription: <span className="text-2xl font-bold text-signal-blue">$39.99</span></h3>
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
                Romio Traveler is your monthly passport to reliable global connectivity. With 20GB of high-speed data and no contracts, 
                it's ideal for work, social media, navigation, and content on the go. It's the plan most Romio users stick with long term 
                — just enough power, not too much fluff.
              </p>

              {/* Key features */}
              <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Seamless coverage in 80+ countries",
                  "Works at home and abroad",
                  "Auto-renews every 30 days",
                  "Supports video calls, social, hotspotting",
                  "Cancel, upgrade, or top up anytime"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-signal-blue flex-shrink-0 mr-2 mt-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">What You Can Do with 20GB</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <VideoCameraIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">25+ hours</h3>
                  </div>
                  <p className="text-cool-slate">Video streaming</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <DevicePhoneMobileIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">10 hours</h3>
                  </div>
                  <p className="text-cool-slate">Zoom calls</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <GlobeAltIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">1,000+</h3>
                  </div>
                  <p className="text-cool-slate">Social media posts</p>
                </div>
                
                <div className="card-tech">
                  <div className="flex items-center mb-2">
                    <SignalIcon className="h-6 w-6 text-signal-blue mr-2" />
                    <h3 className="font-bold">Daily</h3>
                  </div>
                  <p className="text-cool-slate">Stream Spotify or YouTube</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">Perfect For</h2>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li>Digital nomads</li>
                <li>Content creators</li>
                <li>Frequent travelers</li>
                <li>Extended stay tourists</li>
                <li>Remote workers</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">Why This Plan Is Popular</h2>
              <p>
                The Traveler plan strikes the perfect balance between affordability and capacity. Most subscribers 
                find that 20GB gives them more than enough data for a month of regular use, including video calls, 
                streaming, and navigation, without the premium price of our Max plan.
              </p>
            </div>
          </div>

          {/* Right column - Sidebar with pricing and CTA - visible only on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border-2 border-signal-blue p-6 shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-signal-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            
              <div className="mb-6 text-center">
                <h3 className="text-lg font-medium mb-1">Monthly Subscription</h3>
                <div className="text-4xl font-bold text-signal-blue mb-2">$39.99 <span className="text-lg font-normal text-cool-slate">/month</span></div>
                <p className="text-cool-slate text-sm">Renews automatically. Cancel anytime.</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Plan Includes:</h4>
                <ul className="space-y-3">
                  {[
                    "20GB high-speed data",
                    "Valid for 30 days",
                    "Global coverage in 80+ countries",
                    "Secure connection",
                    "Worldwide customer support",
                    "24/7 customer support", 
                    "Keep your number",
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
              <h3 className="text-xl font-bold mb-1">Romio Lite – 5GB</h3>
              <p className="text-cool-slate mb-4">A lightweight plan for short trips or casual use. Stay connected across 80+ countries with 5GB of high-speed data.</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-signal-blue">$19.99<span className="text-sm font-normal text-cool-slate">/mo</span></span>
                <Link to="/plans/lite" className="btn-secondary text-sm">Learn More</Link>
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

export default TravelerPlan; 