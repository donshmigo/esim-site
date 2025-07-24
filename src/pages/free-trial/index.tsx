import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  CheckIcon, 
  GlobeAltIcon, 
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const FreeTrial: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // Reset for demo
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: GlobeAltIcon,
      title: '5GB Free Data',
      description: 'Full 5GB of high-speed data to try our service'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Works in 90+ Countries',
      description: 'Global coverage wherever you travel'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Cancel Anytime',
      description: 'No long-term commitment, cancel subscription anytime'
    },
    {
      icon: ClockIcon,
      title: 'Instant Activation',
      description: 'Get connected in minutes with QR code'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Digital Nomad',
      text: 'Amazing! The free first month let me test before committing. Now I use Romio everywhere I travel.',
      rating: 5
    },
    {
      name: 'Mike R.',
      location: 'Business Traveler',
      text: 'Perfect for my European trip. The free month was enough to decide this is the best eSIM service.',
      rating: 5
    },
    {
      name: 'Lisa K.',
      location: 'Frequent Traveler',
      text: 'No complicated setup, worked instantly. Great value at $19.99/month after the free month.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-8 pb-16 md:py-16">
        {/* Hero Section - Same style as PhoneHero */}
        <section className="relative overflow-hidden bg-white pt-8 pb-16 md:py-16">
          {/* Background elements - Same as home page */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 -right-10 w-72 h-72 rounded-full bg-dark-theme opacity-5 blur-3xl"></div>
            <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-dark-theme opacity-5 blur-3xl"></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(rgba(36, 35, 35, 0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left content */}
              <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                {/* Limited Time Offer Badge */}
                <div className="inline-flex items-center bg-dark-theme bg-opacity-10 text-dark-theme px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  🔥 Limited Time Offer - Free Trial
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tech-accent">
                  Get <span className="text-dark-theme">5GB Free</span>
                  <br />
                  Global eSIM Trial
                </h1>
                
                <p className="text-lg text-cool-slate mb-8 animate-fade-in-up animate-delay-200">
                  Experience premium global connectivity with 5GB free first month. 
                  Then just $19.99/month - cancel anytime with no commitment.
                </p>

                {/* Countdown Timer */}
                <div className="bg-dark-theme bg-opacity-5 rounded-2xl p-6 max-w-md mb-8">
                  <p className="text-dark-theme text-sm mb-3 font-medium">Offer expires in:</p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-dark-theme">{timeLeft.hours.toString().padStart(2, '0')}</div>
                      <div className="text-cool-slate text-xs">Hours</div>
                    </div>
                    <div className="text-dark-theme text-2xl">:</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-dark-theme">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                      <div className="text-cool-slate text-xs">Minutes</div>
                    </div>
                    <div className="text-dark-theme text-2xl">:</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-dark-theme">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                      <div className="text-cool-slate text-xs">Seconds</div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons - Same style as home page */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up animate-delay-300 relative z-50">
                  <a
                    href="https://buy.stripe.com/free-trial-5gb"
                    className="btn-primary group relative z-50"
                    style={{ position: 'relative', zIndex: 9999 }}
                    onClick={() => {
                      // Track GTM begin_checkout for free trial
                      if (typeof window !== 'undefined' && (window as any).dataLayer) {
                        (window as any).dataLayer.push({
                          event: 'begin_checkout',
                          ecommerce: {
                            currency: 'USD',
                            value: '19.99',
                            items: [{
                              item_id: 'free_trial_5gb',
                              item_name: 'Free Trial 5GB',
                              category: 'eSIM Plan',
                              quantity: '1',
                              price: '19.99'
                            }]
                          },
                          checkout_step: '1',
                          plan_name: 'Free Trial 5GB',
                          source: 'free_trial_page'
                        });

                        console.log('✅ GTM Free Trial begin_checkout fired');
                      }
                    }}
                  >
                    Start Free Month (5GB)
                    <ArrowRightIcon className="ml-2 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
                  </a>
                  <a 
                    href="#how-it-works" 
                    className="btn-secondary no-focus-outline relative z-50"
                    style={{ outline: 'none', position: 'relative', zIndex: 9999 }}
                  >
                    How It Works
                  </a>
                </div>

                                 {/* Trust indicators */}
                 <div className="flex flex-wrap items-center gap-6 text-cool-slate text-sm">
                   <div className="flex items-center">
                     <CheckIcon className="h-4 w-4 mr-2" />
                     <span>5GB Free First Month</span>
                   </div>
                   <div className="flex items-center">
                     <CheckIcon className="h-4 w-4 mr-2" />
                     <span>Then $19.99/Month</span>
                   </div>
                   <div className="flex items-center">
                     <CheckIcon className="h-4 w-4 mr-2" />
                     <span>Cancel Anytime</span>
                   </div>
                 </div>
              </div>
              
              {/* Right content - Feature highlights */}
              <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                {/* Feature list - Same style as home page */}
                <div className="grid grid-cols-2 gap-6 animate-fade-in-up animate-delay-400">
                  {[
                    { icon: GlobeAltIcon, title: "Global Coverage", desc: "90+ countries worldwide" },
                    { icon: BoltIcon, title: "Instant Setup", desc: "QR code activation" },
                    { icon: DevicePhoneMobileIcon, title: "No Roaming", desc: "Local network speeds" },
                    { icon: ShieldCheckIcon, title: "Risk Free", desc: "No commitment trial" }
                  ].map((feature, index) => (
                    <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <div className="mb-3 p-3 rounded-lg bg-dark-theme bg-opacity-10 w-fit">
                        <feature.icon className="h-7 w-7 text-dark-theme" />
                      </div>
                      <h3 className="font-medium text-gray-800 text-base mb-1">{feature.title}</h3>
                      <p className="text-sm text-cool-slate">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Same style as home page */}
        <section id="features" className="section-spacing bg-steel-gray">
          <div className="container-custom mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
              <h2 className="section-title">Why Choose Our Free First Month?</h2>
              <p className="text-lg text-cool-slate">
                Experience the full power of our premium eSIM service. Cancel anytime with no commitment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-gray-500" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-romio-black">
                      {feature.title}
                    </h3>
                    <p className="text-cool-slate text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works - Same style as home page */}
        <section id="how-it-works" className="section-spacing bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
              <h2 className="section-title">Get Started in 3 Simple Steps</h2>
              <p className="text-lg text-cool-slate">
                Your free first month with 5GB is just minutes away
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-dark-theme rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-theme mb-4">
                  Start Your Free Month
                </h3>
                <p className="text-cool-slate">
                  Enter your details and payment info for after the free month.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-dark-theme rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-theme mb-4">
                  Scan QR Code
                </h3>
                <p className="text-cool-slate">
                  Install your eSIM instantly by scanning the QR code we send you.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-dark-theme rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-theme mb-4">
                  Stay Connected
                </h3>
                <p className="text-cool-slate">
                  Enjoy 5GB of high-speed data in 90+ countries worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="section-spacing bg-steel-gray">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
              <h2 className="section-title">Join Thousands of Happy Travelers</h2>
              <p className="text-lg text-cool-slate">
                See what our customers are saying
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-cool-slate mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-romio-black">{testimonial.name}</div>
                    <div className="text-sm text-cool-slate">{testimonial.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-spacing bg-white">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title mb-6">
                Don't Miss Out on Your Free First Month
              </h2>
              <p className="text-lg text-cool-slate mb-8">
                Join thousands of travelers who discovered the freedom of global connectivity. 
                Start with 5GB free, then just $19.99/month.
              </p>
              
              <div className="space-y-6">
                <a
                  href="https://buy.stripe.com/free-trial-5gb"
                  className="btn-primary group"
                  onClick={() => {
                    // Track GTM begin_checkout for free trial
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        event: 'begin_checkout',
                        ecommerce: {
                          currency: 'USD',
                          value: '19.99',
                          items: [{
                            item_id: 'free_trial_5gb',
                            item_name: 'Free Trial 5GB',
                            category: 'eSIM Plan',
                            quantity: '1',
                            price: '19.99'
                          }]
                        },
                        checkout_step: '1',
                        plan_name: 'Free Trial 5GB',
                        source: 'free_trial_page'
                      });

                      console.log('✅ GTM Free Trial begin_checkout fired');
                    }
                  }}
                >
                  Start Your Free Month Now
                  <ArrowRightIcon className="ml-2 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
                </a>
                
                <div className="flex flex-wrap justify-center items-center gap-8 text-cool-slate">
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2" />
                    <span>Free First Month</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2" />
                    <span>Then $19.99/Month</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2" />
                    <span>Cancel Anytime</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2" />
                    <span>5GB Monthly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 bg-steel-gray">
          <div className="container-custom">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-dark-theme mb-2">50,000+</div>
                <div className="text-cool-slate">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-dark-theme mb-2">90+</div>
                <div className="text-cool-slate">Countries Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-dark-theme mb-2">4.9/5</div>
                <div className="text-cool-slate">Customer Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-dark-theme mb-2">24/7</div>
                <div className="text-cool-slate">Customer Support</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FreeTrial; 