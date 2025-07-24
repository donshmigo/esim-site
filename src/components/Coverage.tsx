import React, { useState } from 'react';

export default function Coverage() {
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());

  const toggleRegionExpansion = (regionName: string) => {
    const newExpanded = new Set(expandedRegions);
    if (newExpanded.has(regionName)) {
      newExpanded.delete(regionName);
    } else {
      newExpanded.add(regionName);
    }
    setExpandedRegions(newExpanded);
  };

  const regions = [
    {
      name: 'Europe',
      countries: [
        'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina',
        'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 
        'Faroe Islands', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 
        'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 
        'Lithuania', 'Luxembourg', 'Macedonia', 'Macedonia-the former Yugoslav Republic of',
        'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'Norway', 'Poland', 
        'Portugal', 'Romania', 'Russian Federation', 'Serbia', 'Slovakia', 
        'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 
        'United Kingdom'
      ]
    },
    {
      name: 'Americas',
      countries: [
        'Brazil', 'Canada', 'French Guiana', 'Mexico', 'United States'
      ]
    },
    {
      name: 'Asia & Pacific',
      countries: [
        'Australia', 'Bangladesh', 'Cambodia', 'China', 'Hong Kong', 'India', 
        'Indonesia', 'Japan', 'Kazakhstan', 'Kyrgyzstan', 'Laos', 'Macao China', 
        'Madagascar', 'Malaysia', 'New Zealand', 'Pakistan', 'Philippines', 
        'Singapore', 'South Korea', 'Sri Lanka', 'Taiwan', 'Thailand', 
        'Uzbekistan', 'Vietnam'
      ]
    },
    {
      name: 'Middle East & Africa',
      countries: [
        'Algeria', 'Armenia', 'Azerbaijan', 'Bahrain', 'Egypt', 'Georgia', 'Ghana', 
        'Gibraltar', 'Iraq', 'Israel', 'Kuwait', 'Qatar', 'Saudi Arabia', 'Tunisia', 
        'United Arab Emirates'
      ]
    }
  ];

  return (
    <section id="coverage" className="section-spacing bg-steel-gray">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">Global Coverage in 90+ Countries</h2>
          <p className="text-lg text-cool-slate">
            Stay connected wherever your travels take you with our extensive global network coverage.
          </p>
        </div>

        <div className="mb-16">
          <div className="w-full h-64 bg-gray-200 rounded-xl shadow-sm flex items-center justify-center">
            <p className="text-gray-500">Interactive World Map (see main coverage section)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region) => {
            const isExpanded = expandedRegions.has(region.name);
            const displayCountries = isExpanded ? region.countries : region.countries.slice(0, 8);
            
            return (
              <div key={region.name} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-romio-black">{region.name}</h3>
                <ul className="text-cool-slate grid grid-cols-1 gap-y-2">
                  {displayCountries.map((country) => (
                    <li key={country} className="flex items-center">
                      <span className="h-2 w-2 bg-signal-blue rounded-full mr-2"></span>
                      {country}
                    </li>
                  ))}
                  {region.countries.length > 8 && (
                    <li className="mt-2">
                      <button 
                        onClick={() => toggleRegionExpansion(region.name)}
                        className="text-signal-blue font-medium hover:text-signal-blue hover:underline transition-colors focus:outline-none"
                      >
                        {isExpanded 
                          ? '- Show less' 
                          : `+${region.countries.length - 8} more countries`
                        }
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 