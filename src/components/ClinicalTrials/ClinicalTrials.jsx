import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSectionData, formatRichText } from '../../utils/strapiHelpers';
<<<<<<< HEAD
import { hideFallbacks } from '../../utils/config';
=======
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
>>>>>>> eea4f14276cdf59bc3dad53c926a253e23d69ad6

const Section = styled.section`
  background: ${props => props.theme.colors.background};
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const CommContent = styled.div`
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 950px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Label = styled.p`
  color: ${props => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
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
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
  
  
  svg {
    width: 46px;
    height: 32px;   
    @media (max-width: 768px) {
      width: 32px;
      height: 24px;
    }
    
  }
`;

const TrialCard = styled.div`
  width: 100%;
  height: 356px;
  position: relative;
  background-color: transparent;
  border-left: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  border-radius: 0 24px;
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  flex-shrink: 0;
  box-sizing: border-box;
  cursor: pointer;
  
  &:hover {
    background-color: #36454F !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-radius: 24px;
    h5 {
      color: #FFFFFF !important;
    }
  }
  
  @media (max-width: 768px) {
    padding: 32px 32px;
    gap: 24px;
  }
`;

const TrialTitle = styled.h5`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const ExploreButton = styled.button`
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  align-self: flex-start; 
`;

const ClinicalTrials = ({ componentData, pageData }) => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent, trialTypes } = useSelector((state) => state.clinicalTrials);
  const carouselRef = useRef(null);

  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  const trialsSection = componentData || getSectionData(globalData, 'clinicalTrials');
  const hasSectionContentFallback = sectionContent && Object.keys(sectionContent || {}).length;
  const shouldHideMissingTrialsSection = hideFallbacks && !trialsSection && !hasSectionContentFallback;
  
  // Extract trial types from Strapi (trialTypes array in trials-section component)
  const strapiTrialTypes = trialsSection?.trialTypes || [];
  
  // Debug: Log to check if global data exists
  if (globalData && !globalLoading) {
    console.log('ClinicalTrials: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      trialsSection: !!trialsSection,
      strapiTrialTypesCount: strapiTrialTypes.length
    });
  }
  
  // Fallback content for when Strapi data is not yet available
  const defaultSectionContent = hideFallbacks ? null : {
    label: 'GLOBAL BREAKTHROUGHS',
    title: 'Join advanced clinical trials from leading research centers',
    description: 'Access cutting-edge clinical trials from top research centers worldwide.',
  };

  const defaultTrialTypes = hideFallbacks ? [] : [
    { id: 1, title: 'CAR T Cell therapy clinical trials', link: '#', order: 1 },
    { id: 2, title: 'Clinical trial for BALL CAR T-Cell therapy', link: '#', order: 2 },
    { id: 3, title: 'CAR T Cell therapy trials for multiple myeloma', link: '#', order: 3 },
    { id: 4, title: 'CAR T-Cell therapy clinical trials for Immune thrombocytopenia', link: '#', order: 4 },
  ];

  // Map Strapi data: heading -> label, subheading -> title
  const content = trialsSection ? {
    label: trialsSection.heading || defaultSectionContent?.label,
    title: trialsSection.subheading || defaultSectionContent?.title,
    description: formatRichText(trialsSection.description) || trialsSection.description || defaultSectionContent?.description,
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

  const shouldHideClinicalTrials = hideFallbacks && (!content?.label || !content?.title || !trials || trials.length === 0);

  // Sort trials by order if available
  const sortedTrials = [...trials].sort((a, b) => (a.order || 0) - (b.order || 0));

  // IMPORTANT: All hooks must be called before any early returns
  // useEffect must come after trials is defined
<<<<<<< HEAD
  useEffect(() => {
    if (shouldHideMissingTrialsSection || shouldHideClinicalTrials) {
      return;
    }
    checkScroll();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      return () => carousel.removeEventListener('scroll', checkScroll);
    }
  }, [trials, shouldHideClinicalTrials, shouldHideMissingTrialsSection]);
  
  // IMPORTANT: Return null immediately while loading to prevent showing fallback data first
  // This check must come after all hooks
  if (globalLoading) {
    return null;
  }

  if (shouldHideMissingTrialsSection || shouldHideClinicalTrials) {
    return null;
  }
=======
>>>>>>> eea4f14276cdf59bc3dad53c926a253e23d69ad6

  return (
    <Section className='globalBreakthroughs_sec py-120' id="trials">
      <Container className='containerWrapper'>
        <HeaderWrapper>
        <CommContent className='commContent_wrap'>
          <Header>
            <Label className='contentLabel'>{content.label || 'GLOBAL BREAKTHROUGHS'}</Label>
            <Title className='title-3'>{content.title || 'Join advanced clinical trials from leading research centers'}</Title>
          </Header>
        </CommContent>  
          
        <NavigationContainer className='customNavigation'>
          <NavButton className='customPrev'>
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
            <path d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z" fill="#727B81"/>
            </svg>          
          </NavButton>
          <NavButton className="customNext">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
            <path d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z" fill="#727B81"/>
            </svg>          
          </NavButton>
        </NavigationContainer>
        </HeaderWrapper>
          <Swiper
            ref={carouselRef}
            spaceBetween={24}
            slidesPerView={1}
            // loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1.2 },
              767: { slidesPerView: 1.5 },
              992: { slidesPerView: 2.1 },
              1200: { slidesPerView: 3.4 },
              1920: { slidesPerView: 3.5 },
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: ".customNext",
              prevEl: ".customPrev",
            }}
            style={{ overflow: "visible" }}
          >
          {sortedTrials.map((trial, index) => (
          <SwiperSlide key={trial.id || index}>
            <TrialCard>
              <TrialTitle>{trial.title}</TrialTitle>
              <ExploreButton className='btn btn-pink-solid' as={trial.link ? "a" : "button"} href={trial.link || undefined}>
                Explore
              </ExploreButton>
            </TrialCard>
          </SwiperSlide>
        ))}
        </Swiper>
      </Container>

        {/* <CarouselWrapper>
          <TrialsGrid >
            {sortedTrials.map((trial, index) => (
              <TrialCard key={trial.id || index}>
                <TrialTitle>{trial.title}</TrialTitle>
                <ExploreButton as={trial.link ? "a" : "button"} href={trial.link || undefined}>
                  Explore
                </ExploreButton>
              </TrialCard>
            ))}
          </TrialsGrid>
        </CarouselWrapper> */}

    </Section>
  );
};

export default ClinicalTrials;

