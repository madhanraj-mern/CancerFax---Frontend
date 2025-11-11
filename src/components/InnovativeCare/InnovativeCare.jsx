import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchInnovativeCare, fetchTherapies } from '../../store/slices/therapiesSlice';
import { getMediaUrl } from '../../services/api';
import { getDynamicZoneComponent } from '../../utils/strapiHelpers';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import { hideFallbacks } from '../../utils/config';

const Section = styled.section`
`;

const CommContent = styled.div`
  align-items: center;
`;

const Container = styled.div`
  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    margin-bottom: 28px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.p`
  color: ${props => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  max-width: 850px;
  margin: 0 auto 48px !important;
  
  @media (max-width: 1024px) {
    max-width: 700px;
    margin-bottom: 40px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
    line-height: 1.7;
  }
`;

// eslint-disable-next-line no-unused-vars
const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: visible;
  box-sizing: border-box;
  margin-top: 40px;
  min-height: 400px;
  position: relative;
  z-index: 1;
  @media (max-width: 1024px) {
    margin-top: 32px;
    min-height: 380px;
  }
  
  @media (max-width: 768px) {
    margin-top: 28px;
    min-height: 360px;
  }
`;

// eslint-disable-next-line no-unused-vars
const CardsContainer = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 1440px) {
    padding: 0 60px 80px 60px;
  }
  
  @media (max-width: 1024px) {
    padding: 0 40px 60px 40px;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    gap: 16px;
    padding: 0 24px 60px 24px;
    scroll-snap-type: x mandatory;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    padding: 0 16px 50px 16px;
  }
`;

const TherapyCard = styled.div`
  position: relative;
  width: 100%;
  height: 312px;
  background: #FFFFFF;
  border-radius: 40px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  scroll-snap-align: start;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  &:hover .card-overlay {
    opacity: 0;
  }
  
  &:hover .card-hover-content {
    opacity: 1;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.image ? `url(${props.image})` : 'rgba(255, 105, 180, 0.33)'} center/cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 20px;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 14px;
  }
`;

const CardOverlay = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.3s ease;
  
  @media (max-width: 1024px) {
    border-radius: 24px;
    padding: 16px 20px;
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 14px 18px;
  }
  
  @media (max-width: 480px) {
    border-radius: 16px;
    padding: 12px 16px;
  }
`;

const CardHoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(54, 69, 79, 0.92);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  ${TherapyCard}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
  
  @media (max-width: 1024px) {
    padding: 28px 24px;
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    gap: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 16px;
    gap: 12px;
  }
`;

const HoverTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 24px;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: 1024px) {
    font-size: 22px;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.35;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const HoverDescription = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 14px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1.6;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 13px;
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 1.65;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
    line-height: 1.7;
  }
`;

const ExploreButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  background: ${props => props.theme.colors.pink};
  color: #FFFFFF;
  border: none;
  border-radius: 38px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
  
  @media (max-width: 1024px) {
    padding: 12px 28px;
    font-size: 13px;
  }
  
  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 12px;
    border-radius: 32px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 11px;
    border-radius: 28px;
  }
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.body};
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  line-height: 1.4;
  
  @media (max-width: 1024px) {
    font-size: 16px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const PlusIcon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 300;
  color: ${props => props.theme.colors.primary};
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    width: 24px;
    height: 24px;
    font-size: 20px;
  }
  
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 16px;
  }
`;

const NavigationContainer = styled.div`
  position: relative;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  z-index: 10;
  pointer-events: none;
  width: 100%;
  padding-top: 40px;
  
  > * {
    pointer-events: auto;
  }
  
  @media (max-width: 1024px) {
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    padding-top: 24px;
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

const InnovativeCare = ({ componentData, pageData }) => {
  const dispatch = useDispatch();
  const { sectionContent, therapies } = useSelector(state => state.therapies);
  
  // Also get data from global Strapi dynamic zone
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);
  
  // IMPORTANT: All hooks must be called before any early returns
  const carouselRef = useRef(null);
  
  const siteData = pageData || globalData;
  const dynamicZoneData = componentData || getDynamicZoneComponent(siteData, 'dynamic-zone.therapy-section');
  const hasSectionFallback = sectionContent && Object.keys(sectionContent || {}).length;
  const shouldHideMissingSection = hideFallbacks && !dynamicZoneData && !hasSectionFallback;

  // Fetch data from Strapi (legacy support)
  useEffect(() => {
    if (!dynamicZoneData) {
      dispatch(fetchInnovativeCare());
      dispatch(fetchTherapies());
    }
  }, [dispatch, dynamicZoneData]);

  // Fallback content if Strapi data is not available
  // Note: In Strapi, "heading" = "Innovative Care", "subheading" = "Explore Breakthrough Therapies"
  const defaultSectionContent = hideFallbacks ? null : {
    label: 'INNOVATIVE CARE', // This will come from subheading in Strapi
    title: 'Explore Breakthrough Therapies', // This will come from heading in Strapi
    description: 'From revolutionary cell therapies to targeted immunotherapies, CancerFax helps you explore innovative options personalized to your diagnosis.',
  };

  const defaultTherapies = hideFallbacks ? [] : [
    {
      id: 1,
      name: 'CAR-T Cell Therapy',
      description: 'A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer. It offers new hope for patients with leukemia, lymphoma, and other hard-to-treat cancers.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    },
    {
      id: 2,
      name: 'Gene Therapy',
      description: 'Cutting-edge treatment that modifies genes to fight cancer at the molecular level, offering personalized solutions for various cancer types.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800',
    },
    {
      id: 3,
      name: 'Immunotherapy',
      description: 'Harnesses the power of your immune system to target and eliminate cancer cells with precision and minimal side effects.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    },
  ];

  // Use Strapi data from global dynamic zone, then legacy, then fallback
  // Strapi structure: heading="Innovative Care", subheading="Explore Breakthrough Therapies", description, Therapy[]
  // Map: heading -> label (small uppercase), subheading -> title (large heading)
  const section = dynamicZoneData 
    ? {
        label: (dynamicZoneData.heading || dynamicZoneData.label || '').toUpperCase(),
        title: dynamicZoneData.subheading || dynamicZoneData.title,
        description: dynamicZoneData.description,
      }
    : (sectionContent || defaultSectionContent);

  const shouldHideSection = hideFallbacks && (!section?.label || !section?.title);
  
  // Get therapies from dynamic zone first, then legacy, then fallback
  // Strapi has Therapy array (capital T) with therapies
  const therapyList = dynamicZoneData?.Therapy && Array.isArray(dynamicZoneData.Therapy) && dynamicZoneData.Therapy.length > 0
    ? dynamicZoneData.Therapy
    : dynamicZoneData?.therapies && Array.isArray(dynamicZoneData.therapies) && dynamicZoneData.therapies.length > 0
    ? dynamicZoneData.therapies
    : (therapies && therapies.length > 0 ? therapies : defaultTherapies);

  const shouldHideTherapies = hideFallbacks && (!therapyList || therapyList.length === 0);
  
  // IMPORTANT: All hooks must be called before any early returns
  // Debug: Log when Strapi data is available
  useEffect(() => {
    if (dynamicZoneData) {
      console.log('InnovativeCare: Strapi data loaded', {
        hasHeading: !!dynamicZoneData.heading,
        heading: dynamicZoneData.heading,
        hasSubheading: !!dynamicZoneData.subheading,
        subheading: dynamicZoneData.subheading,
        hasDescription: !!dynamicZoneData.description,
        hasTherapy: !!dynamicZoneData.Therapy,
        therapyCount: dynamicZoneData.Therapy?.length || 0,
        therapyListLength: therapyList.length,
        therapyList: therapyList,
      });
    }
  }, [dynamicZoneData, therapyList]);
  
  // IMPORTANT: Return null immediately while loading to prevent showing fallback data first
  // This check must come after all hooks
  if (globalLoading) {
    return null;
  }
  
  if (shouldHideMissingSection || shouldHideSection || shouldHideTherapies) {
    return null;
  }

  return (
    <Section className='innovativeCare_sec py-120' id="treatments">
      <Container className='containerWrapper'>
        <CommContent className='commContent_wrap'>
          <Header>
            <Label className='contentLabel'>{section.label}</Label>
            <Title className='title-3'>{section.title}</Title>
          </Header>
          
          <Description className='text-16'>
            {section.description}
          </Description>
        </CommContent>
        <Swiper
              ref={carouselRef}
              spaceBetween={24}
              slidesPerView={1}
              // loop={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                767: { slidesPerView: 1.5 },
                992: { slidesPerView: 2.1 },
                1200: { slidesPerView: 2.17 },
                1920: { slidesPerView: 2.5 },
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".customNext",
                prevEl: ".customPrev",
              }}
              style={{ overflow: "visible" }}
            >
            {therapyList.map((therapy) => {
            // Get image URL from Strapi - handle multiple possible structures
            let imageUrl = null;
            if (therapy.featuredImage?.data?.attributes?.url) {
              imageUrl = getMediaUrl(therapy.featuredImage.data.attributes.url);
            } else if (therapy.image?.data?.attributes?.url) {
              imageUrl = getMediaUrl(therapy.image.data.attributes.url);
            } else if (therapy.featuredImage?.url) {
              imageUrl = getMediaUrl(therapy.featuredImage.url);
            } else if (therapy.image?.url) {
              imageUrl = getMediaUrl(therapy.image.url);
            } else if (typeof therapy.image === 'string' && therapy.image.trim()) {
              imageUrl = getMediaUrl(therapy.image);
            } else if (typeof therapy.featuredImage === 'string' && therapy.featuredImage.trim()) {
              imageUrl = getMediaUrl(therapy.featuredImage);
            }
            
            // Validate image URL - ensure it's not empty or invalid
            if (imageUrl && (imageUrl === 'null' || imageUrl === 'undefined' || !imageUrl.trim())) {
              imageUrl = null;
            }
            
            // Get therapy name and description
            const therapyName = therapy.name || therapy.title || 'Therapy';
            const therapyDescription = therapy.description || therapy.desc || "A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer. It offers new hope for patients with leukemia, lymphoma, and other hard-to-treat cancers.";
            
            return (
                <SwiperSlide key={therapy.id || therapy.documentId || Math.random()}>
                  <TherapyCard>
                    <CardImage image={imageUrl || null}>
                      <CardOverlay className="card-overlay">
                        <CardTitle>{therapyName}</CardTitle>
                        <PlusIcon>+</PlusIcon>
                      </CardOverlay>
                      <CardHoverContent className="card-hover-content">
                        <HoverTitle>{therapyName}</HoverTitle>
                        <HoverDescription>
                          {therapyDescription}
                        </HoverDescription>
                        <ExploreButton>Explore</ExploreButton>
                      </CardHoverContent>
                    </CardImage>
                  </TherapyCard>
                </SwiperSlide>
            );
          })}

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

        </Swiper>

        </Container>
      
      {/* <CarouselWrapper>
        <CardsContainer ref={carouselRef}>
          {therapyList.map((therapy) => {
            // Get image URL from Strapi - handle multiple possible structures
            let imageUrl = null;
            if (therapy.featuredImage?.data?.attributes?.url) {
              imageUrl = getMediaUrl(therapy.featuredImage.data.attributes.url);
            } else if (therapy.image?.data?.attributes?.url) {
              imageUrl = getMediaUrl(therapy.image.data.attributes.url);
            } else if (therapy.featuredImage?.url) {
              imageUrl = getMediaUrl(therapy.featuredImage.url);
            } else if (therapy.image?.url) {
              imageUrl = getMediaUrl(therapy.image.url);
            } else if (typeof therapy.image === 'string' && therapy.image.trim()) {
              imageUrl = getMediaUrl(therapy.image);
            } else if (typeof therapy.featuredImage === 'string' && therapy.featuredImage.trim()) {
              imageUrl = getMediaUrl(therapy.featuredImage);
            }
            
            // Validate image URL - ensure it's not empty or invalid
            if (imageUrl && (imageUrl === 'null' || imageUrl === 'undefined' || !imageUrl.trim())) {
              imageUrl = null;
            }
            
            // Get therapy name and description
            const therapyName = therapy.name || therapy.title || 'Therapy';
            const therapyDescription = therapy.description || therapy.desc || "A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer. It offers new hope for patients with leukemia, lymphoma, and other hard-to-treat cancers.";
            
            return (
              <TherapyCard key={therapy.id || therapy.documentId || Math.random()}>
                <CardImage image={imageUrl || null}>
                  <CardOverlay className="card-overlay">
                    <CardTitle>{therapyName}</CardTitle>
                    <PlusIcon>+</PlusIcon>
                  </CardOverlay>
                  <CardHoverContent className="card-hover-content">
                    <HoverTitle>{therapyName}</HoverTitle>
                    <HoverDescription>
                      {therapyDescription}
                    </HoverDescription>
                    <ExploreButton>Explore</ExploreButton>
                  </CardHoverContent>
                </CardImage>
              </TherapyCard>
            );
          })}
        </CardsContainer>
        
        <NavigationContainer>
          <NavButton 
            onClick={() => scroll('left')} 
            disabled={!canScrollLeft}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavButton>
          <NavButton 
            onClick={() => scroll('right')} 
            disabled={!canScrollRight}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavButton>
        </NavigationContainer>
      </CarouselWrapper> */}
    </Section>
  );
};

export default InnovativeCare;

