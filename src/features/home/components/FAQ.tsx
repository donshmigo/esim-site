import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function FaqItem({ questionKey, answerKey, initiallyOpen = false }: { questionKey: string; answerKey: string; initiallyOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const { t } = useTranslation();

  return (
    <div className="border-b border-steel-gray last:border-b-0">
      <button 
        type="button"
        className="flex w-full justify-between items-center py-4 md:py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-base md:text-lg font-medium text-romio-black pr-3">{t(questionKey)}</h3>
        <ChevronDownIcon 
          className={`h-4 w-4 md:h-5 md:w-5 text-signal-blue flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-4 md:pb-6 text-sm md:text-base text-cool-slate">{t(answerKey)}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if viewport is mobile width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const faqs = [
    {
      questionKey: 'faq.q1',
      answerKey: 'faq.a1'
    },
    {
      questionKey: 'faq.q2',
      answerKey: 'faq.a2'
    },
    {
      questionKey: 'faq.q3',
      answerKey: 'faq.a3'
    },
    {
      questionKey: 'faq.q4',
      answerKey: 'faq.a4'
    },
    {
      questionKey: 'faq.q5',
      answerKey: 'faq.a5'
    },
    {
      questionKey: 'faq.q6',
      answerKey: 'faq.a6'
    }
  ];

  // Number of FAQs to show initially on mobile
  const initialFaqCount = 3;
  
  // Calculate which FAQs to display
  const displayedFaqs = isMobile && !showAll ? faqs.slice(0, initialFaqCount) : faqs;

  return (
    <section id="faq" className="section-spacing bg-steel-gray">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="section-title">{t('faq.title')}</h2>
          <p className="text-base md:text-lg text-cool-slate">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl p-4 md:p-8 shadow-sm">
          {displayedFaqs.map((faq, index) => (
            <FaqItem 
              key={faq.questionKey} 
              questionKey={faq.questionKey} 
              answerKey={faq.answerKey}
              initiallyOpen={index === 0} // Open the first FAQ by default
            />
          ))}
          
          {/* Mobile "Show More/Less" button */}
          {isMobile && faqs.length > initialFaqCount && (
            <button
              className="w-full mt-4 py-3 text-center text-signal-blue font-medium flex items-center justify-center"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <span className="mr-1">Show Less</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span className="mr-1">Show More</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
        
        <div className="max-w-2xl mx-auto text-center mt-8 md:mt-16">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{t('faq.moreQuestions')}</h3>
          <Link to="/contact" className="btn-primary inline-block text-sm md:text-base py-2 px-4 md:py-3 md:px-5">
            {t('faq.contactSupport')}
          </Link>
        </div>
      </div>
    </section>
  );
} 