import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // In a real implementation, you would send the form data to your backend or a service like Netlify forms
      console.log('Form data submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        phone: ''
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setFormStatus('error');
      setError(t('contact.error'));
    }
  };

  const contactInfo = [
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: t('contact.emailUs'),
      details: 'support@romiomobile.com',
      action: 'mailto:support@romiomobile.com'
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: t('contact.callUs'),
      details: '+1 (888) 123-4567',
      action: 'tel:+18881234567'
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: t('contact.office'),
      details: 'San Francisco, CA, USA',
      action: 'https://maps.google.com/?q=San+Francisco,CA,USA'
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-8 pb-16">
        {/* Hero Section */}
        <section className="bg-signal-blue text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
              <p className="text-lg md:text-xl mb-8">
                {t('contact.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-semibold mb-6">{t('contact.getInTouch')}</h2>
                <p className="text-cool-slate mb-8">
                  {t('contact.getInTouchText')}
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-steel-gray bg-opacity-20 flex items-center justify-center text-signal-blue">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <p className="text-cool-slate">
                          <a 
                            href={item.action} 
                            className="hover:text-signal-blue transition-colors"
                            target={item.icon.type === MapPinIcon ? "_blank" : undefined}
                            rel={item.icon.type === MapPinIcon ? "noopener noreferrer" : undefined}
                          >
                            {item.details}
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 p-6 bg-steel-gray bg-opacity-10 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">{t('contact.followUs')}</h3>
                  <div className="flex space-x-4">
                    <a href="https://twitter.com" className="text-cool-slate hover:text-signal-blue transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="https://facebook.com" className="text-cool-slate hover:text-signal-blue transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://instagram.com" className="text-cool-slate hover:text-signal-blue transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-6">{t('contact.sendMessage')}</h2>
                  
                  {formStatus === 'success' ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <svg className="h-12 w-12 text-green-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-xl font-medium text-green-800 mb-2">{t('contact.success.title')}</h3>
                      <p className="text-green-700 mb-4">{t('contact.success.text')}</p>
                      <button 
                        onClick={() => setFormStatus('idle')}
                        className="btn-primary inline-block"
                      >
                        {t('contact.success.button')}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.fullName')} *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-signal-blue"
                            placeholder={t('contact.placeholder.name')}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.emailAddress')} *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-signal-blue"
                            placeholder={t('contact.placeholder.email')}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.company')}
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-signal-blue"
                            placeholder={t('contact.placeholder.company')}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.phone')}
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-signal-blue"
                            placeholder={t('contact.placeholder.phone')}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.subject')} *
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-signal-blue"
                            placeholder={t('contact.placeholder.subject')}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.message')} *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-signal-blue"
                            placeholder={t('contact.placeholder.message')}
                          />
                        </div>
                      </div>
                      
                      {formStatus === 'error' && (
                        <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-md">
                          <p>{error}</p>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          className={`btn-primary w-full py-3 flex items-center justify-center ${
                            formStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
                          }`}
                        >
                          {formStatus === 'submitting' ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {t('contact.sending')}
                            </>
                          ) : (
                            <>
                              {t('contact.sendButton')}
                              <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage; 