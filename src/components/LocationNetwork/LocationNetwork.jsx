import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { setSelectedHospital } from '../../store/slices/locationNetworkSlice';
import { getSectionData, formatRichText } from '../../utils/strapiHelpers';
import { hideFallbacks } from '../../utils/config';

// Import marker images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom pink marker icon with pulsing animation
const pinkIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="25" cy="25" r="22" fill="rgba(255, 105, 180, 0.15)" stroke="white" stroke-width="2">
        <animate attributeName="r" values="22;26;22" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="25" cy="25" r="10" fill="#FF69B4" filter="url(#glow)">
        <animate attributeName="r" values="10;12;10" dur="1.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `),
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
});

const Container = styled.div`
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  text-align: center;
  width: 100%;
  max-width: 889px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
    gap: 24px;
    max-width: 100%;
  }
`;

const Label = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 11px;
    letter-spacing: 2px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 48px;
  font-weight: 600;
  color: #374151;
  line-height: 56px;
  letter-spacing: -0.02em;
  margin: 0;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 50px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 44px;
  }
  
  @media (max-width: 480px) {
    font-size: 32px;
    line-height: 40px;
  }
`;

const Description = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #374151;
  line-height: 24px;
  margin: 0;
  max-width: 100%;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 22px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    gap: 32px;
  }
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const MapWrapper = styled.div`
  position: relative;
  width: 713px;
  height: 511px;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 5px solid #FFFFFF;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  
  .leaflet-container {
    width: 100%;
    height: 100%;
    border-radius: 19px;
    z-index: 1;
    font-family: 'Be Vietnam Pro', sans-serif;
  }
  
  .leaflet-tile-container {
    transition: opacity 0.3s ease;
  }
  
  .leaflet-control-zoom a {
    transition: all 0.2s ease;
    
    &:hover {
      background: #FF69B4 !important;
      color: white !important;
    }
  }
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 600px;
    height: 450px;
  }
  
  @media (max-width: 968px) {
    width: 100%;
    height: 400px;
  }
  
  @media (max-width: 768px) {
    height: 350px;
    border-radius: 20px;
    border-width: 3px;
    
    .leaflet-container {
      border-radius: 17px;
    }
  }
  
  @media (max-width: 480px) {
    height: 300px;
    border-radius: 16px;
    border-width: 2px;
    
    .leaflet-container {
      border-radius: 14px;
    }
  }
`;

const HospitalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 460px;
  flex-shrink: 0;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 400px;
  }
  
  @media (max-width: 968px) {
    width: 100%;
    max-width: 100%;
  }
`;

const HospitalCard = styled.button`
  font-family: 'Montserrat', sans-serif;
  padding: 40px;
  height: 128px;
  background: ${props => props.$index === 0 ? '#FFFFFF' : '#FFFFFF'};
  border: ${props => props.$index === 0 ? '2px solid #FF69B4' : 'none'};
  border-bottom: ${props => props.$index === 0 ? 'none' : '1px solid #D4D4D4'};
  border-radius: ${props => props.$index === 0 ? '24px' : '0'};
  text-align: left;
  font-size: 20px;
  font-weight: ${props => props.$index === 0 ? '600' : '500'};
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  position: relative;
  display: flex;
  align-items: center;
  
  &:hover {
    background: ${props => props.$index === 0 ? '#FFFFFF' : '#FAFAFA'};
  }
  
  &:first-child {
    border-radius: 24px;
    border: 2px solid #FF69B4;
  }
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    height: auto;
    min-height: 100px;
    font-size: 18px;
    
    &:first-child {
      border-radius: 20px;
    }
  }
  
  @media (max-width: 480px) {
    padding: 20px 16px;
    font-size: 16px;
    min-height: 90px;
    
    &:first-child {
      border-radius: 16px;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 60px;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    margin-top: 40px;
  }
`;

const PrimaryButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  padding: 16px 40px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
  white-space: nowrap;
  
  &:hover {
    background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    padding: 14px 32px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 28px;
    font-size: 14px;
  }
`;

const SecondaryButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  padding: 16px 40px;
  background: #36454F;
  color: #FFFFFF;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(54, 69, 79, 0.3);
  white-space: nowrap;
  
  &:hover {
    background: #2a363f;
    box-shadow: 0 6px 20px rgba(54, 69, 79, 0.4);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    padding: 14px 32px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 28px;
    font-size: 14px;
  }
`;

// Component to handle map animations with smooth transitions
function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      // Smooth animated flyTo with easing
      map.flyTo(center, zoom, {
        duration: 2, // 2 seconds for smooth animation
        easeLinearity: 0.1, // More curved easing for natural feel
        animate: true
      });
    }
  }, [center, zoom, map]);
  
  return null;
}

const LocationNetwork = ({ showButtons = true, componentData, pageData }) => {
  const dispatch = useDispatch();
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent, hospitals, selectedHospitalId } = useSelector((state) => state.locationNetwork);
  
  // IMPORTANT: Return null immediately while loading to prevent showing fallback data first
  // This check must come before computing any fallback data
  if (globalLoading) {
    return null;
  }
  
  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  const locationSection = componentData || getSectionData(globalData, 'location');
  const hasSectionFallback = sectionContent && Object.keys(sectionContent || {}).length;
  const shouldHideMissingSection = hideFallbacks && !locationSection && !hasSectionFallback;
  
  // Extract hospitals from Strapi (hospitals array in location component)
  const strapiHospitals = Array.isArray(locationSection?.hospitals)
    ? locationSection.hospitals
    : [];
  
  // Debug: Log to check if global data exists
  if (globalData && !globalLoading) {
    console.log('LocationNetwork: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      locationSection: !!locationSection,
      strapiHospitalsCount: strapiHospitals.length
    });
  }

  // Fallback data for when Strapi data is not yet available
  const defaultSectionContent = hideFallbacks ? null : {
    label: 'LOCATION',
    title: 'Global Network of Leading Doctors & Partner Hospitals',
    description: 'CancerFax collaborates with globally acclaimed oncologists and accredited medical institutions to ensure every patient receives scientifically guided, world-class treatment. From consultation to recovery, you\'re supported by the best minds in modern cancer care.',
    mapBackground: null,
  };

  // Default hospitals with real coordinates (approximate locations in China)
  const defaultHospitals = hideFallbacks ? [] : [
    {
      id: 1,
      name: 'Cancer Hospital, Chinese Academy of Medical Sciences, Beijing',
      latitude: 39.9042,
      longitude: 116.4074,
      order: 1
    },
    {
      id: 2,
      name: "Children's Hospital of Nanjing Medical University (DPNJMU)",
      latitude: 32.0603,
      longitude: 118.7969,
      order: 2
    },
    {
      id: 3,
      name: 'Hong Kong University Shenzhen Hospital',
      latitude: 22.5431,
      longitude: 114.0579,
      order: 3
    },
    {
      id: 4,
      name: 'Beijing Tiantan Hospital',
      latitude: 39.8817,
      longitude: 116.4134,
      order: 4
    },
    {
      id: 5,
      name: 'The First Affiliated Hospital, Zhejiang University School of Medicine, Hangzhou',
      latitude: 30.2741,
      longitude: 120.1551,
      order: 5
    },
    {
      id: 6,
      name: 'Anhui provincial hospital',
      latitude: 31.8206,
      longitude: 117.2272,
      order: 6
    }
  ];

  // Map Strapi data: heading -> label, subheading -> title
  const content = locationSection ? {
    label: locationSection.heading || defaultSectionContent?.label,
    title: locationSection.subheading || defaultSectionContent?.title,
    description: formatRichText(locationSection.description) || locationSection.description || defaultSectionContent?.description,
  } : (sectionContent || defaultSectionContent);
  const shouldHideSection = hideFallbacks && (!content?.label || !content?.title);

  if (hideFallbacks && (!content?.label || !content?.title)) {
    return null;
  }
  
  // Extract and format hospitals from Strapi - render ALL items dynamically
  const parseCoordinate = (value) => {
    if (value === null || value === undefined || value === '') return null;
    const numeric = typeof value === 'string' ? parseFloat(value) : value;
    return Number.isFinite(numeric) ? numeric : null;
  };

  const formattedStrapiHospitals = strapiHospitals.length > 0
    ? strapiHospitals.map((hospital, index) => {
        const hospitalData = hospital?.attributes || hospital;
        const fallbackHospital = defaultHospitals[index] || defaultHospitals[0] || {};
        const latitude = parseCoordinate(hospitalData?.latitude) ?? fallbackHospital.latitude ?? 35.0;
        const longitude = parseCoordinate(hospitalData?.longitude) ?? fallbackHospital.longitude ?? 115.0;

        return {
          id: hospital?.id || hospitalData?.id || index + 1,
          name: hospitalData?.name || hospitalData?.title || fallbackHospital.name || '',
          latitude,
          longitude,
          order: hospitalData?.order || index + 1,
          address: hospitalData?.address || fallbackHospital.address || '',
          phone: hospitalData?.phone || fallbackHospital.phone || '',
        };
      }).filter(hospital => hospital.name) // Keep entries with at least a name
    : [];
  
  // Use Strapi data or fallback - render ALL items from Strapi
  const hospitalsList = formattedStrapiHospitals.length > 0 
    ? formattedStrapiHospitals 
    : (hospitals && hospitals.length > 0 ? hospitals : defaultHospitals);
  const shouldHideHospitals = hideFallbacks && (!hospitalsList || hospitalsList.length === 0);
  
  // Find selected hospital
  const selectedHospital = hospitalsList.find(h => h.id === selectedHospitalId) || hospitalsList[0];
  
  // Get map center and zoom
  const mapCenter = [selectedHospital.latitude || 35.0, selectedHospital.longitude || 115.0];
  const mapZoom = 10;

  const handleHospitalClick = (hospitalId) => {
    dispatch(setSelectedHospital(hospitalId));
  };

  if (shouldHideMissingSection || shouldHideSection || shouldHideHospitals) {
    return null;
  }

  return (
    <section className='location_sec' id="location-network">
      <Container className='containerWrapper'>
        <Header>
          <Label>{content.label || (hideFallbacks ? '' : 'LOCATION')}</Label>
          <Title>{content.title || (hideFallbacks ? '' : 'Global Network of Leading Doctors & Partner Hospitals')}</Title>
          <Description>
            {content.description || (hideFallbacks ? '' : 'CancerFax collaborates with globally acclaimed oncologists and accredited medical institutions to ensure every patient receives scientifically guided, world-class treatment. From consultation to recovery, you\'re supported by the best minds in modern cancer care.')}
          </Description>
        </Header>

        <ContentWrapper>
          <MapWrapper>
            <MapContainer 
              center={[35.0, 110.0]} 
              zoom={5} 
              scrollWheelZoom={true}
              zoomControl={true}
              attributionControl={false}
              style={{ height: '100%', width: '100%' }}
              zoomAnimation={true}
              fadeAnimation={true}
              markerZoomAnimation={true}
            >
              {/* 
                TILE LAYER OPTIONS (Uncomment preferred option):
                
                Option 1: Esri WorldStreetMap (Current - Best for English labels)
              */}
              <TileLayer
                attribution=''
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
              
              {/* Option 2: CartoDB Positron Light (Clean, minimal design)
              <TileLayer
                attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={19}
              />
              */}
              
              {/* Option 3: Stamen Terrain (Terrain with English labels)
              <TileLayer
                attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
                subdomains={['a', 'b', 'c', 'd']}
                maxZoom={18}
              />
              */}
              
              {/* Option 4: OpenStreetMap Standard
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                subdomains={['a', 'b', 'c']}
                maxZoom={19}
              />
              */}
              
              {/* Map controller for smooth animations */}
              <MapController center={mapCenter} zoom={mapZoom} />
              
              {/* Markers for all hospitals with animations */}
              {hospitalsList.map((hospital) => (
                <Marker 
                  key={hospital.id}
                  position={[hospital.latitude || 35.0, hospital.longitude || 115.0]}
                  icon={hospital.id === selectedHospital.id ? pinkIcon : new L.Icon.Default()}
                  riseOnHover={true}
                >
                  <Popup
                    closeButton={true}
                    autoClose={false}
                    autoPan={true}
                  >
                    <div style={{ 
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      padding: '8px',
                      minWidth: '200px'
                    }}>
                      <strong style={{ 
                        fontSize: '16px', 
                        color: '#36454F',
                        display: 'block',
                        marginBottom: '8px'
                      }}>
                        {hospital.name}
                      </strong>
                      {hospital.address && (
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#666',
                          margin: '4px 0'
                        }}>
                          📍 {hospital.address}
                        </p>
                      )}
                      {hospital.phone && (
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#666',
                          margin: '4px 0'
                        }}>
                          📞 {hospital.phone}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </MapWrapper>

          <HospitalsList>
            {hospitalsList.map((hospital, index) => (
              <HospitalCard
                key={hospital.id}
                $index={index}
                onClick={() => handleHospitalClick(hospital.id)}
              >
                {hospital.name}
              </HospitalCard>
            ))}
          </HospitalsList>
        </ContentWrapper>

        {showButtons && (
          <ButtonsWrapper>
            {(() => {
              const primaryCta = locationSection?.first;
              const secondaryCta = locationSection?.second;
              const fallbackPrimary = hideFallbacks ? null : { text: 'Explore Our Partner Hospitals', URL: '/hospitals', target: '_self' };
              const fallbackSecondary = hideFallbacks ? null : { text: 'Find the Right Doctors', URL: '/hospitals', target: '_self' };
              const resolvedPrimary = primaryCta?.text ? primaryCta : fallbackPrimary;
              const resolvedSecondary = secondaryCta?.text ? secondaryCta : fallbackSecondary;

              return (
                <>
                  {resolvedPrimary?.text && (
                    <PrimaryButton
                      as={resolvedPrimary?.URL ? 'a' : 'button'}
                      href={resolvedPrimary?.URL || undefined}
                      target={resolvedPrimary?.target || '_self'}
                      onClick={!resolvedPrimary?.URL ? () => window.location.href = '/hospitals' : undefined}
                    >
                      {resolvedPrimary.text}
                    </PrimaryButton>
                  )}
                  {resolvedSecondary?.text && (
                    <SecondaryButton
                      as={resolvedSecondary?.URL ? 'a' : 'button'}
                      href={resolvedSecondary?.URL || undefined}
                      target={resolvedSecondary?.target || '_self'}
                      onClick={!resolvedSecondary?.URL ? () => window.location.href = '/hospitals' : undefined}
                    >
                      {resolvedSecondary.text}
                    </SecondaryButton>
                  )}
                </>
              );
            })()}
          </ButtonsWrapper>
        )}
      </Container>
    </section>
  );
};

export default LocationNetwork;
