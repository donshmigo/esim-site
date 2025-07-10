import React, { useState, useRef, useEffect } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { useTranslation } from 'react-i18next';

// More reliable topojson source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface InteractiveWorldMapProps {
  regions: {
    name: string;
    countries: string[];
  }[];
}

// Map from country names to ISO codes for highlighting (partial mapping)
const countryNameToCode: Record<string, string> = {
  'Albania': 'ALB', 'Algeria': 'DZA', 'Andorra': 'AND', 'Armenia': 'ARM',
  'Australia': 'AUS', 'Austria': 'AUT', 'Azerbaijan': 'AZE', 'Bahrain': 'BHR',
  'Bangladesh': 'BGD', 'Belarus': 'BLR', 'Belgium': 'BEL', 'Bosnia and Herzegovina': 'BIH',
  'Bulgaria': 'BGR', 'Canada': 'CAN', 'China': 'CHN', 'Croatia': 'HRV',
  'Cyprus': 'CYP', 'Czech Republic': 'CZE', 'Denmark': 'DNK', 'Egypt': 'EGY',
  'Estonia': 'EST', 'Faroe Islands': 'FRO', 'Finland': 'FIN', 'France': 'FRA', 
  'Georgia': 'GEO', 'Germany': 'DEU', 'Ghana': 'GHA', 'Greece': 'GRC', 
  'Hong Kong': 'HKG', 'Hungary': 'HUN', 'Iceland': 'ISL', 'India': 'IND', 
  'Indonesia': 'IDN', 'Ireland': 'IRL', 'Israel': 'ISR', 'Italy': 'ITA',
  'Kazakhstan': 'KAZ', 'Kosovo': 'XKX', 'Kuwait': 'KWT', 'Kyrgyzstan': 'KGZ', 
  'Latvia': 'LVA', 'Liechtenstein': 'LIE', 'Lithuania': 'LTU', 'Luxembourg': 'LUX', 
  'Macao China': 'MAC', 'Macedonia': 'MKD', 'Malaysia': 'MYS', 'Malta': 'MLT', 
  'Moldova': 'MDA', 'Montenegro': 'MNE', 'Netherlands': 'NLD', 'New Zealand': 'NZL', 
  'Norway': 'NOR', 'Pakistan': 'PAK', 'Poland': 'POL', 'Portugal': 'PRT', 
  'Qatar': 'QAT', 'Reunion': 'REU', 'Romania': 'ROU', 'Serbia': 'SRB', 
  'Singapore': 'SGP', 'Slovakia': 'SVK', 'Slovenia': 'SVN', 'South Korea': 'KOR', 
  'Spain': 'ESP', 'Sri Lanka': 'LKA', 'Sweden': 'SWE', 'Switzerland': 'CHE', 
  'Taiwan': 'TWN', 'Thailand': 'THA', 'Tunisia': 'TUN', 'Turkey': 'TUR', 
  'Ukraine': 'UKR', 'United Arab Emirates': 'ARE', 'United Kingdom': 'GBR', 
  'United States': 'USA', 'Uzbekistan': 'UZB', 'Vietnam': 'VNM'
};

// Map ISO-3 codes to country names for reverse lookup
const iso3ToCountryName: Record<string, string> = {};
Object.entries(countryNameToCode).forEach(([name, code]) => {
  iso3ToCountryName[code] = name;
});

// Alternative names for some countries
const countryNameAliases: Record<string, string[]> = {
  'United States of America': ['United States'],
  'United Kingdom': ['UK', 'Great Britain'],
  'Russian Federation': ['Russia'],
  'Macedonia': ['North Macedonia'],
  'Czech Republic': ['Czechia'],
  'Republic of Korea': ['South Korea'],
  'Bosnia and Herz.': ['Bosnia and Herzegovina'],
  'United Arab Emirates': ['UAE'],
  'Dominican Rep.': ['Dominican Republic'],
  'Central African Rep.': ['Central African Republic'],
  'S. Sudan': ['South Sudan'],
  'Congo': ['Republic of Congo'],
  'Dem. Rep. Congo': ['Democratic Republic of Congo', 'DR Congo'],
  'Côte d\'Ivoire': ['Ivory Coast'],
  'eSwatini': ['Swaziland'],
  'Viet Nam': ['Vietnam'],
};

// Predefined positions for different regions
const mapPositions = {
  world: { coordinates: [0, 10], zoom: 1 },
  europe: { coordinates: [15, 50], zoom: 4 },
  americas: { coordinates: [-80, 0], zoom: 2 },
  asia: { coordinates: [100, 30], zoom: 2 },
  africa: { coordinates: [20, 0], zoom: 2 },
};

const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({ regions }) => {
  const { t } = useTranslation();
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState(mapPositions.world);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [pulseState, setPulseState] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  // Add Vietnam and Japan to the regions
  useEffect(() => {
    const asiaRegion = regions.find(r => r.name === t('coverage.regions.asiaPacific'));
    if (asiaRegion) {
      if (!asiaRegion.countries.includes('Vietnam')) {
        asiaRegion.countries.push('Vietnam');
      }
      if (!asiaRegion.countries.includes('Japan')) {
        asiaRegion.countries.push('Japan');
      }
    }
  }, [regions, t]);

  // Create a set of unique countries
  const uniqueCountries = new Set<string>();
  regions.forEach(region => {
    region.countries.forEach(country => {
      uniqueCountries.add(country);
    });
  });
  
  // Create a set of all covered country codes for faster lookup
  const coveredCountryCodes = new Set(
    Array.from(uniqueCountries)
      .map(country => countryNameToCode[country])
      .filter(Boolean)
  );

  // Function to check if a country is covered
  const isCountryCovered = (geoName: string, geoISO: string): boolean => {
    // Direct match by ISO code
    if (coveredCountryCodes.has(geoISO)) {
      return true;
    }

    // Direct match by name
    if (uniqueCountries.has(geoName)) {
      return true;
    }

    // Check aliases
    for (const [mapName, aliases] of Object.entries(countryNameAliases)) {
      if (aliases.includes(geoName) && uniqueCountries.has(mapName)) {
        return true;
      }
    }

    // Check reverse
    for (const [officialName, aliasArray] of Object.entries(countryNameAliases)) {
      if (geoName === officialName) {
        for (const alias of aliasArray) {
          if (uniqueCountries.has(alias)) {
            return true;
          }
        }
      }
    }

    return false;
  };

  // Add pulse animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseState((prev) => (prev + 1) % 100);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 40
      });
    }
  };

  // Handle zoom in
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(prev => ({
      ...prev,
      zoom: prev.zoom + 0.5
    }));
  };

  // Handle zoom out
  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(prev => ({
      ...prev,
      zoom: prev.zoom - 0.5
    }));
  };

  // Handle reset view
  const resetMapPosition = () => {
    setPosition(mapPositions.world);
  };

  // Handle focus on regions
  const focusRegion = (region: keyof typeof mapPositions) => {
    setPosition(mapPositions[region]);
  };

  // Pulse effect calculation
  const pulseOpacity = 0.2 + (Math.sin(pulseState / 15) + 1) / 10;

  return (
    <div 
      className="relative"
      ref={mapRef}
      onMouseMove={handleMouseMove}
      style={{ 
        width: "100%", 
        height: "500px",
        touchAction: "manipulation"
      }}
    >
      <div 
        className="world-map-container rounded-xl overflow-hidden shadow-sm bg-white"
        style={{ 
          height: "100%", 
          width: "100%"
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100,
            center: [0, 0]
          }}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates as [number, number]}
            // Disable panning
            onMoveStart={undefined}
            onMoveEnd={undefined}
            // Fixed zoom settings
            minZoom={1}
            maxZoom={4}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter(geo => {
                    // Filter out Antarctica by code, name or coordinates
                    const geoISO = geo.properties.ISO_A3 || geo.properties.iso_a3;
                    const geoName = geo.properties.NAME || geo.properties.name;
                    
                    if (geoISO === 'ATA' || geoName === 'Antarctica') {
                      return false;
                    }
                    
                    return true;
                  })
                  .map((geo) => {
                    const geoName = geo.properties.NAME || geo.properties.name;
                    const geoISO = geo.properties.ISO_A3 || geo.properties.iso_a3;
                    const isHighlighted = isCountryCovered(geoName, geoISO);
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          setTooltipContent(isHighlighted ? `${geoName} - ${t('coverage.covered')}` : geoName);
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                        style={{
                          default: {
                            fill: isHighlighted ? `rgba(36, 35, 35, ${pulseOpacity + 0.6})` : "#D6D6DA",
                            outline: "none",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.5,
                          },
                          hover: {
                            fill: isHighlighted ? "#4a4a4a" : "#F53",
                            outline: "none",
                            cursor: "pointer",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.75,
                          },
                          pressed: {
                            fill: isHighlighted ? "#3a3939" : "#E42",
                            outline: "none",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.75,
                          },
                        }}
                      />
                    );
                  })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      
      {tooltipContent && (
        <div 
          className="absolute bg-white text-cool-slate text-sm px-2 py-1 rounded shadow-md pointer-events-none z-10"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          {tooltipContent}
        </div>
      )}

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col items-center space-y-2 z-10">
        <button
          onClick={handleZoomIn}
          className="bg-white rounded-md shadow-md p-2 text-xs text-cool-slate hover:bg-gray-100 transition-colors"
          title={t('coverage.zoomIn')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white rounded-md shadow-md p-2 text-xs text-cool-slate hover:bg-gray-100 transition-colors"
          title={t('coverage.zoomOut')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          onClick={resetMapPosition}
          className="bg-white rounded-md shadow-md p-2 text-xs text-cool-slate hover:bg-gray-100 transition-colors"
          title={t('coverage.resetMap')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </button>
      </div>

      {/* Region focus controls */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
        <button
          onClick={() => focusRegion('world')}
          className="bg-white rounded-md shadow-md py-1 px-2 text-xs text-cool-slate hover:bg-gray-100 transition-colors"
        >
          {t('coverage.world')}
        </button>
        <button
          onClick={() => focusRegion('europe')}
          className="bg-white rounded-md shadow-md py-1 px-2 text-xs text-cool-slate hover:bg-gray-100 transition-colors"
        >
          {t('coverage.regions.europe')}
        </button>
        <button
          onClick={() => focusRegion('americas')}
          className="bg-white rounded-md shadow-md py-1 px-2 text-xs text-cool-slate hover:bg-gray-100 transition-colors"
        >
          {t('coverage.regions.americas')}
        </button>
        <button
          onClick={() => focusRegion('asia')}
          className="bg-white rounded-md shadow-md py-1 px-2 text-xs text-cool-slate hover:bg-gray-100 transition-colors"
        >
          {t('coverage.regions.asiaPacific')}
        </button>
        <button
          onClick={() => focusRegion('africa')}
          className="bg-white rounded-md shadow-md py-1 px-2 text-xs text-cool-slate hover:bg-gray-100 transition-colors"
        >
          {t('coverage.regions.middleEastAfrica')}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 bg-white rounded-md shadow-md p-2 z-10 text-xs text-cool-slate">
        <p className="flex items-center">
          <span className="inline-block w-3 h-3 bg-gray-400 mr-2 rounded-sm"></span>
          {t('coverage.notCovered')}
        </p>
        <p className="flex items-center mt-1">
          <span className="inline-block w-3 h-3 bg-dark-theme mr-2 rounded-sm"></span>
          {t('coverage.covered')}
        </p>
      </div>
    </div>
  );
};

export default InteractiveWorldMap; 