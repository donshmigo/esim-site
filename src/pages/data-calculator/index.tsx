import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  DevicePhoneMobileIcon, 
  ComputerDesktopIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  ChatBubbleBottomCenterTextIcon,
  MapIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

interface DataUsage {
  socialMedia: number;
  webBrowsing: number;
  music: number;
  videoStreaming: number;
  videoCalls: number;
  maps: number;
}

const DataCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [usage, setUsage] = useState<DataUsage>({
    socialMedia: 1,
    webBrowsing: 2,
    music: 1,
    videoStreaming: 1,
    videoCalls: 0.5,
    maps: 0.5
  });

  const [totalDataGB, setTotalDataGB] = useState(0);
  const [recommendedPlan, setRecommendedPlan] = useState('');

  // Data consumption rates (MB per hour) - Very conservative estimates
  const dataRates = {
    socialMedia: 60, // MB per hour (scrolling feeds, some video)
    webBrowsing: 15, // MB per hour (text, images, light content)
    music: 25, // MB per hour (streaming audio)
    videoStreaming: 200, // MB per hour (mostly SD quality, good compression)
    videoCalls: 80, // MB per hour (video calling)
    maps: 10 // MB per hour (GPS navigation with map data)
  };

  const activities = [
    {
      key: 'socialMedia' as keyof DataUsage,
      icon: DevicePhoneMobileIcon,
      title: 'Social Media',
      unit: 'hours per day',
      color: 'text-purple-600',
      max: 8
    },
    {
      key: 'webBrowsing' as keyof DataUsage,
      icon: ComputerDesktopIcon,
      title: 'Web Browsing',
      unit: 'hours per day',
      color: 'text-green-600',
      max: 8
    },
    {
      key: 'music' as keyof DataUsage,
      icon: MusicalNoteIcon,
      title: 'Music Streaming',
      unit: 'hours per day',
      color: 'text-pink-600',
      max: 6
    },
    {
      key: 'videoStreaming' as keyof DataUsage,
      icon: VideoCameraIcon,
      title: 'Video Streaming',
      unit: 'hours per day',
      color: 'text-red-600',
      max: 4
    },
    {
      key: 'videoCalls' as keyof DataUsage,
      icon: ChatBubbleBottomCenterTextIcon,
      title: 'Video Calls',
      unit: 'hours per day',
      color: 'text-indigo-600',
      max: 3
    },
    {
      key: 'maps' as keyof DataUsage,
      icon: MapIcon,
      title: 'Maps & Navigation',
      unit: 'hours per day',
      color: 'text-teal-600',
      max: 6
    }
  ];

  useEffect(() => {
    // Calculate total monthly data usage
    const monthlyUsage = Object.entries(usage).reduce((total, [key, value]) => {
      const rate = dataRates[key as keyof DataUsage];
      const monthlyMB = value * rate * 30; // 30 days per month
      return total + monthlyMB;
    }, 0);

    const totalGB = monthlyUsage / 1024; // Convert MB to GB
    setTotalDataGB(Math.round(totalGB * 10) / 10); // Round to 1 decimal

    // Recommend plan based on usage
    if (totalGB <= 5) {
      setRecommendedPlan('Lite');
    } else if (totalGB <= 15) {
      setRecommendedPlan('Pro');
    } else {
      setRecommendedPlan('Max');
    }
  }, [usage]);

  const handleUsageChange = (key: keyof DataUsage, value: number) => {
    setUsage(prev => ({
      ...prev,
      [key]: Math.max(0, value)
    }));
  };

  const plans = [
    {
      name: 'Lite',
      data: '5GB',
      price: '$19.99',
      features: ['Perfect for light users', 'Email & messaging', 'Light web browsing'],
      color: 'border-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      checkoutUrl: 'https://buy.stripe.com/8x28wR0IPdCYbYA9XP7Zu01'
    },
    {
      name: 'Pro',
      data: '15GB',
      price: '$39.99',
      features: ['Great for regular users', 'Social media & streaming', 'Video calls'],
      color: 'border-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      checkoutUrl: 'https://buy.stripe.com/8x28wR0IPdCYbYA9XP7Zu01',
      popular: true
    },
    {
      name: 'Max',
      data: 'Unlimited',
      price: '$84.99',
      features: ['Perfect for heavy users', 'HD video streaming', 'Work from anywhere'],
      color: 'border-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      checkoutUrl: 'https://buy.stripe.com/aFa5kF0IP1Ugd2E1rj7Zu03'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-signal-blue to-blue-600">
          <div className="container mx-auto px-6 text-center">
            <ChartBarIcon className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Data Usage Calculator
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Use our simple sliders to estimate your monthly data usage. 
              Get personalized plan recommendations based on your habits.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Section */}
              <div>
                <h2 className="text-3xl font-bold text-dark-theme mb-8">
                  Adjust the sliders for your daily usage
                </h2>
                <div className="space-y-6">
                  {activities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.key} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <Icon className={`h-6 w-6 ${activity.color} mr-3`} />
                          <h3 className="text-lg font-semibold text-dark-theme">
                            {activity.title}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">{activity.unit}</span>
                            <span className="text-lg font-semibold text-dark-theme">
                              {usage[activity.key]} {activity.unit.includes('hour') ? 'hrs' : ''}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max={activity.max}
                            step="0.5"
                            value={usage[activity.key]}
                            onChange={(e) => handleUsageChange(activity.key, parseFloat(e.target.value))}
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-signal-blue"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>0</span>
                            <span>{activity.max}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-gradient-to-br from-signal-blue to-blue-600 rounded-2xl p-8 text-white">
                  <h2 className="text-2xl font-bold mb-6">Your Monthly Data Usage</h2>
                  
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold mb-2">{totalDataGB}</div>
                    <div className="text-xl opacity-90">GB per month</div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4">Recommended Plan</h3>
                    <div className="text-2xl font-bold text-yellow-300">
                      {recommendedPlan} Plan
                    </div>
                    <p className="text-sm opacity-90 mt-2">
                      Based on your usage pattern, this plan offers the best value for your needs.
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <h4 className="font-semibold">Usage Breakdown:</h4>
                    {Object.entries(usage).map(([key, value]) => {
                      if (value === 0) return null;
                      const activity = activities.find(a => a.key === key);
                      const monthlyMB = value * dataRates[key as keyof DataUsage] * 30;
                      const monthlyGB = Math.round((monthlyMB / 1024) * 10) / 10;
                      
                      return (
                        <div key={key} className="flex justify-between">
                          <span>{activity?.title}:</span>
                          <span>{monthlyGB} GB</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-dark-theme mb-4">
                Choose Your Perfect Plan
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Based on your calculated usage, here are our recommended plans with global coverage.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${
                    plan.name === recommendedPlan ? 'ring-4 ring-signal-blue transform scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 inset-x-0 flex justify-center z-20">
                      <span className="bg-signal-blue text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  {plan.name === recommendedPlan && (
                    <div className="absolute -top-5 inset-x-0 flex justify-center z-20">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                        Recommended for You
                      </span>
                    </div>
                  )}

                  <div className={`${plan.bgColor} p-8 text-center`}>
                    <h3 className={`text-2xl font-bold ${plan.textColor} mb-2`}>
                      {plan.name}
                    </h3>
                    <div className="text-4xl font-bold text-dark-theme mb-1">
                      {plan.price}
                    </div>
                    <div className="text-gray-600 mb-4">/month</div>
                    <div className={`text-lg font-medium ${plan.textColor}`}>
                      {plan.data} Data
                    </div>
                  </div>

                  <div className="p-8">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={plan.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                        plan.name === recommendedPlan
                          ? 'bg-signal-blue text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-dark-theme hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        // Track GTM begin_checkout for data calculator
                        const planPrice = plan.name === 'Lite' ? 19.99 : plan.name === 'Pro' ? 39.99 : 84.99;
                        if (typeof window !== 'undefined' && (window as any).dataLayer) {
                          (window as any).dataLayer.push({
                            event: 'begin_checkout',
                            ecommerce: {
                              currency: 'USD',
                              value: planPrice.toString(),
                              items: [{
                                item_id: plan.name.toLowerCase(),
                                item_name: `${plan.name} Plan`,
                                category: 'eSIM Plan',
                                quantity: '1',
                                price: planPrice.toString()
                              }]
                            },
                            checkout_step: '1',
                            plan_name: `${plan.name} Plan`,
                            source: 'data_calculator'
                          });

                          console.log('✅ GTM Data Calculator begin_checkout fired:', plan.name);
                        }
                      }}
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-dark-theme mb-4">
                Data Saving Tips
              </h2>
              <p className="text-lg text-gray-600">
                Maximize your data plan with these helpful tips
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <VideoCameraIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Adjust Video Quality</h3>
                <p className="text-gray-600">
                  Lower video streaming quality when on mobile data. SD quality uses 70% less data than HD.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <DevicePhoneMobileIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Use WiFi When Available</h3>
                <p className="text-gray-600">
                  Connect to WiFi networks when possible to save your mobile data for when you really need it.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <ComputerDesktopIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Enable Data Saver</h3>
                <p className="text-gray-600">
                  Turn on data saver modes in your apps and browser to reduce background data usage.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DataCalculator; 