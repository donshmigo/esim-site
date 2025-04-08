import worldMap from '../assets/images/world-map.svg';

export default function Coverage() {
  const regions = [
    {
      name: 'Europe',
      countries: [
        'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 
        'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 
        'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 
        'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 
        'United Kingdom', 'Switzerland', 'Norway'
      ]
    },
    {
      name: 'Americas',
      countries: [
        'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 
        'Colombia', 'Peru', 'Costa Rica', 'Panama'
      ]
    },
    {
      name: 'Asia & Pacific',
      countries: [
        'Australia', 'China', 'Hong Kong', 'India', 'Indonesia', 'Japan', 
        'Malaysia', 'New Zealand', 'Philippines', 'Singapore', 'South Korea', 
        'Taiwan', 'Thailand', 'Vietnam'
      ]
    },
    {
      name: 'Middle East & Africa',
      countries: [
        'Israel', 'Turkey', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 
        'South Africa', 'Egypt', 'Morocco'
      ]
    }
  ];

  return (
    <section id="coverage" className="section-spacing bg-steel-gray">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">Global Coverage in 80+ Countries</h2>
          <p className="text-lg text-cool-slate">
            Stay connected wherever your travels take you with our extensive global network coverage.
          </p>
        </div>

        <div className="mb-16">
          <img 
            src={worldMap} 
            alt="Romio eSIM global coverage map" 
            className="w-full rounded-xl shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region) => (
            <div key={region.name} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-romio-black">{region.name}</h3>
              <ul className="text-cool-slate grid grid-cols-1 gap-y-2">
                {region.countries.slice(0, 8).map((country) => (
                  <li key={country} className="flex items-center">
                    <span className="h-2 w-2 bg-signal-blue rounded-full mr-2"></span>
                    {country}
                  </li>
                ))}
                {region.countries.length > 8 && (
                  <li className="text-signal-blue font-medium mt-2">
                    +{region.countries.length - 8} more countries
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 