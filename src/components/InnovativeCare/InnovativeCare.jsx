import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData, getCollectionData, formatMedia, formatRichText } from '../../utils/strapiHelpers';

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

const CardsWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 20px 0;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 1024px) {
    gap: 20px;
    padding: 16px 0;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    padding: 16px 24px;
    scroll-snap-type: x mandatory;
  }
  
  @media (max-width: 600px) {
    gap: 24px;
    padding: 16px 24px;
  }
  
  @media (max-width: 480px) {
    gap: 24px;
    padding: 12px 24px;
  }
`;

const TherapyCard = styled.div`
  position: relative;
  width: 539px;
  min-width: 539px;
  height: 312px;
  border-radius: 40px;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  flex-shrink: 0;
  transform: rotate(0deg);
  
  &:hover .card-overlay {
    opacity: 0;
    visibility: hidden;
  }
  
  &:hover .card-hover-content {
    opacity: 1;
    visibility: visible;
  }
  
  @media (max-width: 1024px) {
    width: 450px;
    min-width: 450px;
    height: 280px;
    border-radius: 32px;
  }
  
  @media (max-width: 768px) {
    width: calc(100vw - 48px);
    min-width: calc(100vw - 48px);
    height: 280px;
    border-radius: 40px;
    scroll-snap-align: start;
  }
  
  @media (max-width: 600px) {
    width: calc(100vw - 48px);
    min-width: calc(100vw - 48px);
    height: 260px;
    border-radius: 40px;
    scroll-snap-align: start;
  }
  
  @media (max-width: 480px) {
    width: calc(100vw - 48px);
    min-width: calc(100vw - 48px);
    height: 240px;
    border-radius: 40px;
    scroll-snap-align: start;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 24px;
  box-sizing: border-box;
`;

const CardOverlay = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: 1;
  visibility: visible;
`;

const CardTitle = styled.h3`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #36454F;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const PlusIcon = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #36454F;
  line-height: 1;
  margin-left: 12px;
`;

const CardHoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  border-radius: 40px;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 28px 24px;
    border-radius: 32px;
  }
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    border-radius: 40px;
  }
  
  @media (max-width: 600px) {
    padding: 20px 18px;
  }
  
  @media (max-width: 480px) {
    padding: 18px 16px;
  }
`;

const HoverTitle = styled.h3`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 16px 0;
  line-height: 1.3;
  
  @media (max-width: 1024px) {
    font-size: 24px;
  }
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 600px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const HoverDescription = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1.6;
  margin: 0;
  flex: 1;
  
  @media (max-width: 1024px) {
    font-size: 15px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
  
  @media (max-width: 600px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ExploreButton = styled.button`
  background: #FF69B4;
  color: #FFFFFF;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 12px 32px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  align-self: center;
  margin-top: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #FF1493;
    transform: scale(1.05);
  }
  
  @media (max-width: 1024px) {
    font-size: 15px;
    padding: 11px 28px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 24px;
    margin-top: 16px;
  }
  
  @media (max-width: 600px) {
    font-size: 13px;
    padding: 9px 20px;
    margin-top: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 18px;
    margin-top: 12px;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 33px;
  
  @media (max-width: 768px) {
    margin-top: 24px;
    gap: 12px;
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

const InnovativeCare = () => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent } = useSelector(state => state.therapies);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position and update arrow states
  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll function with smooth animation
  const scroll = (direction) => {
    if (carouselRef.current) {
      const clientWidth = window.innerWidth;
      let cardWidth = 539; // Default desktop card width
      let gap = 30; // Default desktop gap

      if (clientWidth <= 480) {
        cardWidth = window.innerWidth - 48; // Full width minus padding
        gap = 24;
      } else if (clientWidth <= 600) {
        cardWidth = window.innerWidth - 48;
        gap = 24;
      } else if (clientWidth <= 768) {
        cardWidth = window.innerWidth - 48;
        gap = 24;
      } else if (clientWidth <= 1024) {
        cardWidth = 450;
        gap = 20;
      }
      
      const scrollAmount = cardWidth + gap;
      const newScrollLeft = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Update scroll state after animation
      setTimeout(checkScroll, 300);
    }
  };

  useEffect(() => {
    checkScroll();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        carousel.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  // Fallback content if Strapi data is not available
  const defaultSectionContent = {
    label: 'INNOVATIVE CARE',
    title: 'Explore Breakthrough Therapies',
    description: 'From revolutionary cell therapies to targeted immunotherapies, CancerFax helps you explore innovative options personalized to your diagnosis.',
  };

  const defaultCards = [
    {
      id: 1,
      name: 'CAR-T Cell Therapy',
      description: 'A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer. It offers new hope for patients with leukemia, lymphoma, and other hard-to-treat cancers.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
    },
    {
      id: 2,
      name: 'Gene Therapy',
      description: 'Cutting-edge treatment that modifies genes to fight cancer at the molecular level, offering personalized solutions for various cancer types.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800'
    },
    {
      id: 3,
      name: 'Immunotherapy',
      description: 'Harnesses the power of your immune system to target and eliminate cancer cells with precision and minimal side effects.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'
    }
  ];

  // Extract data from global Strapi response using helper functions
  const innovativeCareSection = getSectionData(globalData, 'innovativeCare'); // This gets 'dynamic-zone.therapy-section'
  
  // Extract Therapy array from therapy-section component
  const strapiTherapies = innovativeCareSection?.Therapy || [];
  
  // Debug: Log to check if global data exists
  const globalLoading = useSelector(state => state.global?.loading);
  if (globalData && !globalLoading) {
    console.log('InnovativeCare: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      dynamicZoneLength: globalData.dynamicZone?.length,
      innovativeCareSection: !!innovativeCareSection,
      therapiesCount: strapiTherapies.length,
      innovativeCareSectionData: innovativeCareSection ? {
        heading: innovativeCareSection.heading,
        subheading: innovativeCareSection.subheading,
        hasDescription: !!innovativeCareSection.description
      } : null
    });
  }

  // Map API fields: heading -> label, subheading -> title
  // Use Strapi data if section exists, only use fallback if section doesn't exist at all
  const section = innovativeCareSection
    ? {
        label: innovativeCareSection.heading || 'INNOVATIVE CARE',
        title: innovativeCareSection.subheading || 'Explore Breakthrough Therapies',
        description: formatRichText(innovativeCareSection.description) || innovativeCareSection.description || 'From revolutionary cell therapies to targeted immunotherapies, CancerFax helps you explore innovative options personalized to your diagnosis.',
      }
    : (sectionContent || defaultSectionContent);
  
  // Use Strapi data for cards if available, otherwise use fallback
  // Check if section exists AND has therapies, or use fallback
  const cards = (innovativeCareSection && strapiTherapies.length > 0)
    ? strapiTherapies.map((therapy, index) => {
        // Handle nested structure - therapy might be in attributes or direct
        const therapyData = therapy?.attributes || therapy;
        return {
          id: therapy?.id ?? index + 1,
          name: therapyData?.title ?? therapyData?.name ?? '',
          description: formatRichText(therapyData?.description) ?? therapyData?.description ?? '',
          image: formatMedia(therapyData?.featuredImage) ?? formatMedia(therapyData?.image) ?? defaultCards[index]?.image ?? ''
        };
      }).filter(card => card.name) // Filter out empty cards
    : defaultCards;

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
        
        <CardsWrapper>
          <CardsContainer ref={carouselRef}>
            {cards.map((card) => (
              <TherapyCard key={card.id}>
                <CardImage image={card.image}>
                  <CardOverlay className="card-overlay">
                    <CardTitle>{card.name}</CardTitle>
                    <PlusIcon>+</PlusIcon>
                  </CardOverlay>
                  <CardHoverContent className="card-hover-content">
                    <div>
                      <HoverTitle>{card.name}</HoverTitle>
                      <HoverDescription>
                        {card.description}
                      </HoverDescription>
                    </div>
                    <ExploreButton>Explore</ExploreButton>
                  </CardHoverContent>
                </CardImage>
              </TherapyCard>
            ))}
          </CardsContainer>
        </CardsWrapper>
        
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
      </Container>
    </Section>
  );
};

export default InnovativeCare;

