import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData, formatRichText } from '../../utils/strapiHelpers';

const Section = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  padding: 100px 0;
  background: ${props => props.theme.colors.background};
  overflow: hidden;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 80px 0;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    padding: 50px 0;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  position: relative;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 0 60px;
  }
  
  @media (max-width: 768px) {
    padding: 0 40px;
  }
  
  @media (max-width: 480px) {
    padding: 0 24px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Label = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 10px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 9px;
    letter-spacing: 2px;
  }
`;

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 48px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  line-height: 1.25;
  letter-spacing: -0.5px;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 42px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
  
  @media (max-width: 480px) {
    font-size: 30px;
    line-height: 1.3;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    gap: 12px;
    align-self: flex-end;
  }
`;

const NavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.primary};
  background: transparent;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primary};
    color: #FFFFFF;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  
  svg {
    width: 20px;
    height: 20px;
    
    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const TrialsGrid = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 20px;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const TrialCard = styled.div`
  min-width: 360px;
  width: 360px;
  min-height: 280px;
  background: ${props => props.theme.colors.white};
  border: 1px solid #E0E0E0;
  border-radius: 16px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-sizing: border-box;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
  
  @media (max-width: 768px) {
    min-width: 300px;
    width: 300px;
    min-height: 260px;
    padding: 32px 24px;
    gap: 24px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 480px) {
    min-width: calc(100vw - 80px);
    width: calc(100vw - 80px);
  }
`;

const TrialTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 22px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  line-height: 1.4;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ExploreButton = styled.button`
  font-family: ${props => props.theme.fonts.body};
  padding: 14px 32px;
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 38px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 12px 28px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 24px;
    font-size: 13px;
  }
`;

const ClinicalTrials = () => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent, trialTypes } = useSelector((state) => state.clinicalTrials);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 384; // Card width (360px) + gap (24px)
      const newScrollLeft = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScroll, 300);
    }
  };

  // Extract data from global Strapi response
  const trialsSection = getSectionData(globalData, 'clinicalTrials');
  
  // Extract trial types from Strapi (trialTypes array in trials-section component)
  const strapiTrialTypes = trialsSection?.trialTypes || [];
  
  // Debug: Log to check if global data exists
  const globalLoading = useSelector(state => state.global?.loading);
  if (globalData && !globalLoading) {
    console.log('ClinicalTrials: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      trialsSection: !!trialsSection,
      strapiTrialTypesCount: strapiTrialTypes.length
    });
  }
  
  // Fallback content for when Strapi data is not yet available
  const defaultSectionContent = {
    label: 'GLOBAL BREAKTHROUGHS',
    title: 'Join advanced clinical trials from leading research centers',
    description: 'Access cutting-edge clinical trials from top research centers worldwide.',
  };

  const defaultTrialTypes = [
    { id: 1, title: 'CAR T Cell therapy clinical trials', link: '#', order: 1 },
    { id: 2, title: 'Clinical trial for BALL CAR T-Cell therapy', link: '#', order: 2 },
    { id: 3, title: 'CAR T Cell therapy trials for multiple myeloma', link: '#', order: 3 },
    { id: 4, title: 'CAR T-Cell therapy clinical trials for Immune thrombocytopenia', link: '#', order: 4 },
  ];

  // Map Strapi data: heading -> label, subheading -> title
  const content = trialsSection ? {
    label: trialsSection.heading || defaultSectionContent.label,
    title: trialsSection.subheading || defaultSectionContent.title,
    description: formatRichText(trialsSection.description) || trialsSection.description || defaultSectionContent.description,
  } : (sectionContent || defaultSectionContent);
  
  // Extract and format trial types from Strapi - render ALL items dynamically
  const formattedStrapiTrials = strapiTrialTypes.length > 0
    ? strapiTrialTypes.map((trialType, index) => {
        const trialData = trialType?.attributes || trialType;
        return {
          id: trialType?.id || index + 1,
          title: trialData?.title || trialData?.name || '',
          link: trialData?.link || trialData?.url || '#',
          order: trialData?.order || index + 1,
        };
      }).filter(trial => trial.title) // Filter out empty items
    : [];
  
  // Use Strapi data or fallback - render ALL items from Strapi
  const trials = formattedStrapiTrials.length > 0 ? formattedStrapiTrials : (trialTypes && trialTypes.length > 0 ? trialTypes : defaultTrialTypes);

  // Sort trials by order if available
  const sortedTrials = [...trials].sort((a, b) => (a.order || 0) - (b.order || 0));

  // useEffect must come after trials is defined
  useEffect(() => {
    checkScroll();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      return () => carousel.removeEventListener('scroll', checkScroll);
    }
  }, [trials]);

  return (
    <Section id="trials">
      <Container>
        <HeaderWrapper>
          <Header>
            <Label>{content.label || 'GLOBAL BREAKTHROUGHS'}</Label>
            <Title>{content.title || 'Join advanced clinical trials from leading research centers'}</Title>
          </Header>
          
          <NavigationContainer>
            <NavButton 
              onClick={() => scroll('left')} 
              disabled={!canScrollLeft}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </NavButton>
            <NavButton 
              onClick={() => scroll('right')} 
              disabled={!canScrollRight}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </NavButton>
          </NavigationContainer>
        </HeaderWrapper>
        
        <CarouselWrapper>
          <TrialsGrid ref={carouselRef}>
            {sortedTrials.map((trial, index) => (
              <TrialCard key={trial.id || index}>
                <TrialTitle>{trial.title}</TrialTitle>
                <ExploreButton as={trial.link ? "a" : "button"} href={trial.link || undefined}>
                  Explore
                </ExploreButton>
              </TrialCard>
            ))}
          </TrialsGrid>
        </CarouselWrapper>
      </Container>
    </Section>
  );
};

export default ClinicalTrials;

