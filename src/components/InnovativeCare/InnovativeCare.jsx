import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchInnovativeCare, fetchTherapies } from '../../store/slices/therapiesSlice';
import { getMediaUrl } from '../../services/api';
import { getDynamicZoneComponent } from '../../utils/strapiHelpers';

const Section = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  padding: 50px 0 80px 0;
  background: #F8F8F8;
  overflow: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 30px 0 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 60px;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    gap: 18px;
    margin-bottom: 28px;
  }
  
  @media (max-width: 768px) {
    gap: 16px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 20px;
  }
`;

const Label = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 10px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2.2px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 9px;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 8px;
    letter-spacing: 1.5px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 44px;
  font-weight: 600;
  font-style: normal;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  line-height: 56px;
  letter-spacing: -1px;
  margin: 0;
  max-width: 100%;
  padding: 0 20px;
  
  @media (max-width: 1024px) {
    font-size: 38px;
    line-height: 48px;
    padding: 0 16px;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 42px;
    padding: 0 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 36px;
    padding: 0 8px;
  }
`;

const Description = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  line-height: 1.65;
  max-width: 900px;
  margin: 0 auto 48px;
  padding: 0 20px;
  
  @media (max-width: 1024px) {
    max-width: 700px;
    margin-bottom: 40px;
    padding: 0 16px;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 32px;
    padding: 0 12px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 24px;
    padding: 0 8px;
    line-height: 1.7;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: visible;
  box-sizing: border-box;
  margin-top: 40px;
  min-height: 400px;
  
  @media (max-width: 1024px) {
    margin-top: 32px;
    min-height: 380px;
  }
  
  @media (max-width: 768px) {
    margin-top: 28px;
    min-height: 360px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 120px 80px 120px;
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
  min-width: 539px;
  width: 539px;
  height: 320px;
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
  
  @media (max-width: 1024px) {
    min-width: 450px;
    width: 450px;
    height: 280px;
    border-radius: 32px;
  }
  
  @media (max-width: 768px) {
    min-width: calc(100vw - 48px);
    width: calc(100vw - 48px);
    height: 280px;
    border-radius: 40px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 480px) {
    min-width: calc(100vw - 48px);
    width: calc(100vw - 48px);
    height: 260px;
    border-radius: 32px;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.image ? `url(${props.image})` : '#F5F5F5'} center/cover;
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
  position: absolute;
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
  padding-top: 24px;
  
  > * {
    pointer-events: auto;
  }
  
  @media (max-width: 1024px) {
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    padding-top: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
    padding-top: 16px;
  }
`;

const NavButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: #D4D4D4;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
  
  &:hover:not(:disabled) {
    background: #A1A1AA;
    color: #FFFFFF;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: #D4D4D4;
  }
  
  @media (max-width: 1024px) {
    width: 48px;
    height: 48px;
  }
  
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
  
  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    
    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }
    
    @media (max-width: 480px) {
      width: 16px;
      height: 16px;
    }
  }
`;

const InnovativeCare = () => {
  const dispatch = useDispatch();
  const { sectionContent, therapies, loading, error } = useSelector(state => state.therapies);
  
  // Also get data from global Strapi dynamic zone
  const globalData = useSelector(state => state.global?.data);
  const dynamicZoneData = getDynamicZoneComponent(globalData, 'dynamic-zone.therapy-section');
  
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fetch data from Strapi (legacy support)
  useEffect(() => {
    dispatch(fetchInnovativeCare());
    dispatch(fetchTherapies());
  }, [dispatch]);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    
    // Get all cards
    const cards = Array.from(container.children);
    if (cards.length === 0) return;
    
    // Get the first card to calculate scroll amount
    const firstCard = cards[0];
    if (!firstCard) return;
    
    const cardWidth = firstCard.offsetWidth || 539;
    
    // Get gap from computed styles or use default
    const containerStyles = window.getComputedStyle(container);
    const gapValue = containerStyles.gap || '24px';
    const gap = parseFloat(gapValue) || 24;
    
    // Calculate scroll amount: card width + gap
    const scrollAmount = cardWidth + gap;
    
    // Calculate new scroll position
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    let newScrollLeft;
    if (direction === 'left') {
      newScrollLeft = Math.max(0, currentScroll - scrollAmount);
    } else {
      newScrollLeft = Math.min(maxScroll, currentScroll + scrollAmount);
    }
    
    // Scroll to new position
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    
    // Update scroll state after animation completes
    setTimeout(() => {
      checkScroll();
    }, 400);
  };

  useEffect(() => {
    checkScroll();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      return () => carousel.removeEventListener('scroll', checkScroll);
    }
  }, [therapies]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      checkScroll();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fallback content if Strapi data is not available
  // Note: In Strapi, "heading" = "Innovative Care", "subheading" = "Explore Breakthrough Therapies"
  const defaultSectionContent = {
    label: 'INNOVATIVE CARE', // This will come from subheading in Strapi
    title: 'Explore Breakthrough Therapies', // This will come from heading in Strapi
    description: 'From revolutionary cell therapies to targeted immunotherapies, CancerFax helps you explore innovative options personalized to your diagnosis.',
  };

  const defaultTherapies = [
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
        label: (dynamicZoneData.heading || dynamicZoneData.label || defaultSectionContent.label).toUpperCase(),
        title: dynamicZoneData.subheading || dynamicZoneData.title || defaultSectionContent.title,
        description: dynamicZoneData.description || defaultSectionContent.description,
      }
    : (sectionContent || defaultSectionContent);
  
  // Get therapies from dynamic zone first, then legacy, then fallback
  // Strapi has Therapy array (capital T) with therapies
  const therapyList = dynamicZoneData?.Therapy && Array.isArray(dynamicZoneData.Therapy) && dynamicZoneData.Therapy.length > 0
    ? dynamicZoneData.Therapy
    : dynamicZoneData?.therapies && Array.isArray(dynamicZoneData.therapies) && dynamicZoneData.therapies.length > 0
    ? dynamicZoneData.therapies
    : (therapies && therapies.length > 0 ? therapies : defaultTherapies);
  
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

  return (
    <Section id="treatments">
      <Container>
        <Header>
          <Label>{section.label}</Label>
          <Title>{section.title}</Title>
        </Header>
        
        <Description>
          {section.description}
        </Description>
      </Container>
      
      <CarouselWrapper>
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
      </CarouselWrapper>
    </Section>
  );
};

export default InnovativeCare;

