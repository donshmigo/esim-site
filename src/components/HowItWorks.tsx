export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose a Plan',
      description: 'Select the data amount that fits your travel style.',
    },
    {
      number: '02',
      title: 'Activate',
      description: 'Instantly activate your eSIM by scanning the QR code sent to your email.',
    },
    {
      number: '03',
      title: 'Stay Connected',
      description: 'Use data across 80+ countries, all from the same eSIM.',
    },
    {
      number: '04',
      title: 'Manage & Top-Up',
      description: 'Log in anytime to view usage, manage your subscription, and add more data or extras.',
    },
  ];

  return (
    <section id="how-it-works" className="section-spacing bg-white">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="text-lg text-cool-slate">
            Getting started with Romio eSIM is simple. Follow these easy steps
            and you'll be connected in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="mb-6">
                <span className="text-6xl font-bold text-signal-blue opacity-20">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-romio-black">{step.title}</h3>
              <p className="text-cool-slate">{step.description}</p>

              {/* Connector line - only show between items (not after the last item) */}
              {step.number !== '04' && (
                <div className="hidden md:block absolute top-10 right-0 w-full h-[2px] bg-steel-gray md:max-w-[calc(100%-1rem)] md:left-[calc(100%-(1rem/2))]"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#pricing" className="btn-primary inline-block">
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
}