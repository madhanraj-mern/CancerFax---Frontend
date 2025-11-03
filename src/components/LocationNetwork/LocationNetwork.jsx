import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { setSelectedHospital } from '../../store/slices/locationNetworkSlice';
import { getMediaUrl } from '../../services/api';
import { getSectionData, formatRichText } from '../../utils/strapiHelpers';

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

const Section = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  padding: 100px 0 70px 0;
  background: #F8F8F8;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    padding: 90px 0 60px 0;
  }
  
  @media (max-width: 1024px) {
    padding: 70px 0 40px 0;
  }
  
  @media (max-width: 768px) {
    padding: 50px 0 20px 0;
  }
  
  @media (max-width: 480px) {
    padding: 40px 0 10px 0;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  box-sizing: border-box;
  overflow-x: hidden;
  
  @media (max-width: 1200px) {
    padding: 0 80px;
  }
  
  @media (max-width: 1024px) {
    padding: 0 60px;
  }
  
  @media (max-width: 768px) {
    padding: 0 32px;
  }
  
  @media (max-width: 480px) {
    padding: 0 20px;
  }
  
  @media (max-width: 360px) {
    padding: 0 16px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 60px;
  text-align: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
    gap: 16px;
  }
`;

const Label = styled.p`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', ${props => props.theme.fonts.heading};
  font-size: 48px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  line-height: 1.2;
  letter-spacing: -0.5px;
  margin: 0;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 1024px) {
    font-size: 42px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
  
  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

const Description = styled.p`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.primary};
  line-height: 1.7;
  margin: 0;
  max-width: 900px;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 15px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 80px;
  align-items: flex-start;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    gap: 60px;
  }
  
  @media (max-width: 1024px) {
    gap: 50px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 500px;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(26, 83, 101, 0.15);
  animation: mapFadeIn 1s ease-out;
  transition: all 0.3s ease;
  margin-bottom: 0;
  
  @keyframes mapFadeIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  &:hover {
    box-shadow: 0 8px 30px rgba(26, 83, 101, 0.25);
  }
  
  .leaflet-container {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    z-index: 1;
    font-family: 'Be Vietnam Pro', sans-serif;
  }
  
  /* Smooth tile transitions */
  .leaflet-tile-container {
    transition: opacity 0.3s ease;
  }
  
  /* Animated zoom controls */
  .leaflet-control-zoom a {
    transition: all 0.2s ease;
    
    &:hover {
      background: #FF69B4 !important;
      color: white !important;
    }
  }
  
  /* Popup animations */
  .leaflet-popup {
    animation: popupBounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  @keyframes popupBounce {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(20px);
    }
    50% {
      transform: scale(1.05) translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @media (max-width: 1024px) {
    height: 400px;
  }
  
  @media (max-width: 768px) {
    height: 350px;
    border-radius: 20px;
    
    .leaflet-container {
      border-radius: 20px;
    }
  }
  
  @media (max-width: 480px) {
    height: 300px;
    border-radius: 16px;
    
    .leaflet-container {
      border-radius: 16px;
    }
  }
`;

const HospitalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const HospitalCard = styled.button`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  padding: 18px 24px;
  background: ${props => props.isActive ? '#FFFFFF' : 'transparent'};
  border: 2px solid ${props => props.isActive ? props.theme.colors.pink : '#E0E0E0'};
  border-radius: 12px;
  text-align: left;
  font-size: 16px;
  font-weight: ${props => props.isActive ? '600' : '500'};
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 12px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  position: relative;
  
  /* Staggered entrance animation */
  animation: slideInRight 0.6s ease-out backwards;
  animation-delay: ${props => (props.$index || 0) * 0.1}s;
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Glowing effect for active card */
  ${props => props.isActive && `
    box-shadow: 0 4px 16px rgba(255, 105, 180, 0.25);
    
    &::before {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #FF69B4, #FF1493);
      border-radius: 12px;
      opacity: 0;
      z-index: -1;
      animation: glow 2s ease-in-out infinite;
    }
    
    @keyframes glow {
      0%, 100% { opacity: 0; }
      50% { opacity: 0.3; }
    }
  `}
  
  &:hover {
    background: #FFFFFF;
    border-color: ${props => props.theme.colors.pink};
    transform: translateX(8px);
    box-shadow: 0 4px 12px rgba(255, 105, 180, 0.2);
  }
  
  &:active {
    transform: translateX(4px) scale(0.98);
  }
  
  @media (max-width: 1200px) {
    padding: 16px 22px;
    font-size: 15px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 1024px) {
    padding: 15px 20px;
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 14px;
    
    &:hover {
      transform: none;
      box-shadow: 0 2px 8px rgba(255, 105, 180, 0.15);
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 13px;
    margin-bottom: 8px;
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

const LocationNetwork = ({ showButtons = true }) => {
  const dispatch = useDispatch();
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent, hospitals, selectedHospitalId } = useSelector((state) => state.locationNetwork);
  
  // Extract data from global Strapi response
  const locationSection = getSectionData(globalData, 'location');
  
  // Extract hospitals from Strapi (hospitals array in location component)
  const strapiHospitals = locationSection?.hospitals || [];
  
  // Debug: Log to check if global data exists
  const globalLoading = useSelector(state => state.global?.loading);
  if (globalData && !globalLoading) {
    console.log('LocationNetwork: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      locationSection: !!locationSection,
      strapiHospitalsCount: strapiHospitals.length
    });
  }

  // Fallback data for when Strapi data is not yet available
  const defaultSectionContent = {
    label: 'LOCATION',
    title: 'Global Network of Leading Doctors & Partner Hospitals',
    description: 'CancerFax collaborates with globally acclaimed oncologists and accredited medical institutions to ensure every patient receives scientifically guided, world-class treatment. From consultation to recovery, you\'re supported by the best minds in modern cancer care.',
    mapBackground: null,
  };

  // Default hospitals with real coordinates (approximate locations in China)
  const defaultHospitals = [
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
    label: locationSection.heading || defaultSectionContent.label,
    title: locationSection.subheading || defaultSectionContent.title,
    description: formatRichText(locationSection.description) || locationSection.description || defaultSectionContent.description,
  } : (sectionContent || defaultSectionContent);
  
  // Extract and format hospitals from Strapi - render ALL items dynamically
  const formattedStrapiHospitals = strapiHospitals.length > 0
    ? strapiHospitals.map((hospital, index) => {
        const hospitalData = hospital?.attributes || hospital;
        return {
          id: hospital?.id || index + 1,
          name: hospitalData?.name || hospitalData?.title || '',
          latitude: parseFloat(hospitalData?.latitude) || 0,
          longitude: parseFloat(hospitalData?.longitude) || 0,
          order: hospitalData?.order || index + 1,
        };
      }).filter(hospital => hospital.name && hospital.latitude && hospital.longitude) // Filter out invalid items
    : [];
  
  // Use Strapi data or fallback - render ALL items from Strapi
  const hospitalsList = formattedStrapiHospitals.length > 0 
    ? formattedStrapiHospitals 
    : (hospitals && hospitals.length > 0 ? hospitals : defaultHospitals);
  
  // Find selected hospital
  const selectedHospital = hospitalsList.find(h => h.id === selectedHospitalId) || hospitalsList[0];
  
  // Get map center and zoom
  const mapCenter = [selectedHospital.latitude || 35.0, selectedHospital.longitude || 115.0];
  const mapZoom = 10;

  const handleHospitalClick = (hospitalId) => {
    dispatch(setSelectedHospital(hospitalId));
  };

  return (
    <Section id="location-network">
      <Container>
        <Header>
          <Label>{content.label || 'LOCATION'}</Label>
          <Title>{content.title || 'Global Network of Leading Doctors & Partner Hospitals'}</Title>
          <Description>
            {content.description || 'CancerFax collaborates with globally acclaimed oncologists and accredited medical institutions to ensure every patient receives scientifically guided, world-class treatment. From consultation to recovery, you\'re supported by the best minds in modern cancer care.'}
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
                isActive={selectedHospital.id === hospital.id}
                onClick={() => handleHospitalClick(hospital.id)}
              >
                {hospital.name}
              </HospitalCard>
            ))}
          </HospitalsList>
        </ContentWrapper>

        {showButtons && (
          <ButtonsWrapper>
            <PrimaryButton onClick={() => window.location.href = '/hospitals'}>
              Explore Our Partner Hospitals
          </PrimaryButton>
            <SecondaryButton onClick={() => window.location.href = '/hospitals'}>
              Find the Right Doctors
          </SecondaryButton>
          </ButtonsWrapper>
        )}
      </Container>
    </Section>
  );
};

export default LocationNetwork;
