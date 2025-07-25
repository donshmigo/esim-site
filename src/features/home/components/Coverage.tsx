import { useTranslation } from 'react-i18next';
import InteractiveWorldMap from './InteractiveWorldMap';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Coverage() {
  const { t } = useTranslation();
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  
  const regions = [
    {
      name: t('coverage.regions.europe'),
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
      name: t('coverage.regions.americas'),
      countries: [
        'Brazil', 'Canada', 'French Guiana', 'Mexico', 'United States'
      ]
    },
    {
      name: t('coverage.regions.asiaPacific'),
      countries: [
        'Australia', 'Bangladesh', 'Cambodia', 'China', 'Hong Kong', 'India', 
        'Indonesia', 'Japan', 'Kazakhstan', 'Kyrgyzstan', 'Laos', 'Macao China', 
        'Madagascar', 'Malaysia', 'New Zealand', 'Pakistan', 'Philippines', 
        'Singapore', 'South Korea', 'Sri Lanka', 'Taiwan', 'Thailand', 
        'Uzbekistan', 'Vietnam'
      ]
    },
    {
      name: t('coverage.regions.middleEastAfrica'),
      countries: [
        'Algeria', 'Armenia', 'Azerbaijan', 'Bahrain', 'Egypt', 'Georgia', 'Ghana', 
        'Gibraltar', 'Iraq', 'Israel', 'Kuwait', 'Qatar', 'Saudi Arabia', 'Tunisia', 
        'United Arab Emirates'
      ]
    }
  ];

  const toggleRegion = (regionName: string) => {
    if (activeRegion === regionName) {
      setActiveRegion(null);
    } else {
      setActiveRegion(regionName);
    }
  };

  const toggleRegionExpansion = (regionName: string) => {
    const newExpanded = new Set(expandedRegions);
    if (newExpanded.has(regionName)) {
      newExpanded.delete(regionName);
    } else {
      newExpanded.add(regionName);
    }
    setExpandedRegions(newExpanded);
  };

  return (
    <section id="coverage" className="section-spacing bg-steel-gray">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="section-title">{t('coverage.title')}</h2>
          <p className="text-lg text-cool-slate">
            {t('coverage.subtitle')}
          </p>
        </div>

        <div className="mb-8 md:mb-16">
          <InteractiveWorldMap regions={regions} />
        </div>

        {/* Country count indicator */}
        <div className="flex justify-center mb-6">
          <div className="bg-dark-theme bg-opacity-10 rounded-full px-4 py-2 inline-flex items-center">
            <span className="text-dark-theme font-semibold">{t('coverage.subtitle')}</span>
          </div>
        </div>

        {/* Mobile view: Accordion tabs */}
        <div className="md:hidden space-y-3">
          {regions.map((region) => (
            <div key={region.name} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button 
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleRegion(region.name)}
              >
                <h3 className="text-lg font-semibold text-romio-black">{region.name}</h3>
                <ChevronDownIcon 
                  className={`h-5 w-5 text-cool-slate transition-transform ${
                    activeRegion === region.name ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              {activeRegion === region.name && (
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {region.countries.map((country) => (
                      <div key={country} className="flex items-center">
                        <span className="h-1.5 w-1.5 bg-signal-blue rounded-full mr-1.5"></span>
                        <span className="text-sm text-cool-slate">{country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop view: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                        className="text-signal-blue font-medium hover:text-signal-blue hover:underline transition-colors text-sm focus:outline-none"
                      >
                        {isExpanded 
                          ? '- Show less' 
                          : `+${region.countries.length - 8} ${t('coverage.moreCountries')}`
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