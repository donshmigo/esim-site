import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is an eSIM and how does it work?',
    answer: 'An eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan without having to use a physical SIM card. It\'s built into your device. With Romio, you simply purchase a plan, scan the QR code we send you, and you\'re connected to data networks in 80+ countries.'
  },
  {
    question: 'Is my device compatible with Romio eSIM?',
    answer: 'Romio works with most modern smartphones that support eSIM technology, including iPhone XS and newer models, Google Pixel 3 and newer, Samsung Galaxy S20 and newer, and many other Android devices. Check your phone settings for "Add eSIM" or "Add cellular plan" to confirm compatibility.'
  },
  {
    question: 'Can I keep my current phone number with Romio?',
    answer: 'Romio is primarily a data eSIM service. However, with our optional VoIP add-on, you can keep receiving calls and texts to your existing number over data. This feature is included in our Global plan and available as an add-on for other plans.'
  },
  {
    question: 'Does my eSIM work in multiple countries or do I need separate eSIMs?',
    answer: 'One Romio eSIM works across all 80+ countries we cover. There\'s no need to switch eSIMs or buy country-specific plans when crossing borders. Your data simply works as you travel between covered countries.'
  },
  {
    question: 'What happens if I run out of data before the month ends?',
    answer: 'You can easily purchase additional data through your Romio dashboard or app. Top-ups are available in various sizes to fit your needs, and any unused top-up data will roll over to the next month.'
  },
  {
    question: 'How do I cancel my Romio subscription?',
    answer: 'You can cancel your subscription anytime through your Romio dashboard. Go to "Subscription Settings" and select "Cancel Subscription." Your service will continue until the end of your current billing period.'
  }
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-steel-gray">
      <button 
        type="button"
        className="flex w-full justify-between items-center py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-romio-black">{question}</h3>
        <ChevronDownIcon 
          className={`h-5 w-5 text-signal-blue transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-cool-slate">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-spacing bg-steel-gray">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="text-lg text-cool-slate">
            Find answers to the most common questions about Romio eSIM.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-sm">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto text-center mt-16">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-cool-slate mb-6">
            Our support team is ready to help you with any questions about our eSIM service.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
} 