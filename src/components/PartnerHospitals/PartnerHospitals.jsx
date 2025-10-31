import React, { useEffect, useState, useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { fetchPartnerHospitals } from '../../store/slices/partnerHospitalsSlice';
import { getMediaUrl } from '../../services/api';

// Default fallback data (defined outside component to prevent recreating on each render)
const defaultSectionData = {
  subtitle: 'HAND IN HAND',
  title: 'Our Partner Hospitals',
  description: 'Dr. Wang is skilled in individualized targeted and immunotherapy for rare tumors and lung cancer, as well as multidisciplinary comprehensive treatment...',
};

const defaultPartners = [
  { 
    id: 1, 
    name: 'ABInBev',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ABInBev_logo.svg/320px-ABInBev_logo.svg.png',
    color: '#FFA500'
  },
  { 
    id: 2, 
    name: 'Nestlé Purina',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Nestl%C3%A9_Purina_PetCare_logo.svg/320px-Nestl%C3%A9_Purina_PetCare_logo.svg.png',
    color: '#ED1C24'
  },
  { 
    id: 3, 
    name: 'Colgate',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Colgate_2013_logo.svg/320px-Colgate_2013_logo.svg.png',
    color: '#DC143C'
  },
  { 
    id: 4, 
    name: 'Merck',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Merck_Logo.svg/320px-Merck_Logo.svg.png',
    color: '#0084BD'
  },
  { 
    id: 5, 
    name: 'Sanofi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Sanofi.svg/320px-Sanofi.svg.png',
    color: '#6F2C91'
  },
  { 
    id: 6, 
    name: 'Tata Steel',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Tata_Steel_Logo.svg/320px-Tata_Steel_Logo.svg.png',
    color: '#004B87'
  },
  { 
    id: 7, 
    name: 'Johnson & Johnson',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Johnson_and_Johnson_Logo.svg/320px-Johnson_and_Johnson_Logo.svg.png',
    color: '#CC0000'
  },
  { 
    id: 8, 
    name: 'Pfizer',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pfizer_logo.svg/320px-Pfizer_logo.svg.png',
    color: '#0093D0'
  },
];

const PartnerHospitals = () => {
  const dispatch = useDispatch();
  const { sectionData, partners, loading } = useSelector((state) => state.partnerHospitals);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    dispatch(fetchPartnerHospitals());
  }, [dispatch]);

  // Extract section data with fallbacks
  const sectionAttributes = sectionData?.attributes || {};
  const subtitle = sectionAttributes.subtitle || defaultSectionData.subtitle;
  const title = sectionAttributes.title || defaultSectionData.title;
  const description = sectionAttributes.description || defaultSectionData.description;
  
  // Animation settings from Strapi or defaults
  const animationSpeed = sectionAttributes.animationSpeed || 20; // seconds
  const showGrayscale = sectionAttributes.showGrayscale !== false; // default true
  const enableHoverPause = sectionAttributes.enableHoverPause !== false; // default true
  
  // Always use fallback data first, then switch to Strapi data when available
  const partnerLogos = partners.length > 0 ? partners : defaultPartners;

  // Memoize duplicated logos to prevent recreation
  const duplicatedLogos = useMemo(() => {
    return [...partnerLogos, ...partnerLogos, ...partnerLogos];
  }, [partnerLogos]);

  return (
    <SectionContainer>
      <ContentWrapper>
        <HeaderSection>
          <LeftColumn>
            <Subtitle>{subtitle}</Subtitle>
            <Title>{title}</Title>
          </LeftColumn>
          <RightColumn>
            <Description>{description}</Description>
          </RightColumn>
        </HeaderSection>

        <LogoScrollContainer
          onMouseEnter={enableHoverPause ? () => setIsPaused(true) : undefined}
          onMouseLeave={enableHoverPause ? () => setIsPaused(false) : undefined}
        >
          <LogoTrack isPaused={isPaused} animationSpeed={animationSpeed} showGrayscale={showGrayscale}>
            {duplicatedLogos.map((partner, index) => {
              const partnerData = partner.attributes || partner;
              const partnerName = partnerData.name || 'Partner';
              const partnerWebsite = partnerData.website || '#';
              const fallbackColor = partnerData.color || '#0066CC';
              
              // Determine logo URL - prioritize Strapi data, then default logo
              let logoUrl = null;
              
              if (partnerData.logo?.data?.attributes?.url) {
                // Strapi image
                logoUrl = getMediaUrl(partnerData.logo.data.attributes.url);
              } else if (typeof partnerData.logo === 'string') {
                // Default data with logo URL
                logoUrl = partnerData.logo;
              }
              
              const logoContent = logoUrl ? (
                <LogoImage 
                  src={logoUrl} 
                  alt={partnerName}
                  loading="eager"
                  decoding="sync"
                  showGrayscale={showGrayscale}
                  onError={(e) => {
                    // Fallback to colored placeholder if image fails to load
                    e.target.style.display = 'none';
                    const nextSibling = e.target.nextSibling;
                    if (nextSibling) {
                      nextSibling.style.display = 'flex';
                    }
                  }}
                />
              ) : null;
              
              const placeholderContent = (
                <LogoPlaceholder 
                  color={fallbackColor}
                  style={{ display: logoUrl ? 'none' : 'flex' }}
                >
                  {partnerName}
                </LogoPlaceholder>
              );
              
              return (
                <LogoItem key={`${partner.id}-${index}`}>
                  {partnerWebsite && partnerWebsite !== '#' ? (
                    <LogoLink href={partnerWebsite} target="_blank" rel="noopener noreferrer" title={partnerName}>
                      {logoContent}
                      {placeholderContent}
                    </LogoLink>
                  ) : (
                    <>
                      {logoContent}
                      {placeholderContent}
                    </>
                  )}
                </LogoItem>
              );
            })}
          </LogoTrack>
        </LogoScrollContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  background: #F7F8FA;
  padding: 100px 20px;
  min-height: 400px;
  
  @media (max-width: 968px) {
    padding: 80px 20px;
    min-height: 350px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
    min-height: 300px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 120px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  
  @media (max-width: 1200px) {
    padding: 0 60px;
  }
  
  @media (max-width: 968px) {
    gap: 40px;
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeaderSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: start;
  
  @media (max-width: 1024px) {
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Subtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #475569;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 11px;
    letter-spacing: 3px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 45px;
  font-weight: 550;
  line-height: 1.2;
  color: #1e293b;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 42px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  
  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 450;
  line-height: 1.4;
  color: #64748b;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const LogoScrollContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const floatLeftToRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
`;

const LogoTrack = styled.div`
  display: flex;
  gap: 80px;
  align-items: center;
  width: fit-content;
  animation: ${floatLeftToRight} ${props => props.animationSpeed || 20}s linear infinite;
  animation-play-state: ${props => props.isPaused ? 'paused' : 'running'};
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  @media (max-width: 1024px) {
    gap: 60px;
    animation-duration: ${props => (props.animationSpeed || 20) * 0.75}s;
  }
  
  @media (max-width: 768px) {
    gap: 40px;
    animation-duration: ${props => (props.animationSpeed || 20) * 0.5}s;
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const LogoItem = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  max-width: 180px;
  min-width: 100px;
  object-fit: contain;
  filter: ${props => props.showGrayscale ? 'grayscale(100%) opacity(0.7)' : 'none'};
  transition: all 0.3s ease;
  display: block;
  
  ${LogoItem}:hover & {
    filter: ${props => props.showGrayscale ? 'grayscale(0%) opacity(1)' : 'brightness(1.1)'};
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 50px;
    max-width: 150px;
    min-width: 80px;
  }
  
  @media (max-width: 480px) {
    height: 40px;
    max-width: 120px;
    min-width: 60px;
  }
`;

const LogoPlaceholder = styled.div`
  height: 60px;
  width: 180px;
  min-width: 180px;
  background: ${props => props.color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  ${LogoItem}:hover & {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    height: 50px;
    width: 150px;
    min-width: 150px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    height: 40px;
    width: 120px;
    min-width: 120px;
    font-size: 12px;
  }
`;

export default memo(PartnerHospitals);

