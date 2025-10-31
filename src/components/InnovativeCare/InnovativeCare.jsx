import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchInnovativeCare, fetchTherapies } from '../../store/slices/therapiesSlice';
import { getMediaUrl } from '../../services/api';

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
  overflow: hidden;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    margin: 0;
    padding: 0;
  }
  
  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 20px 60px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 1024px) {
    padding: 16px 40px;
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    gap: 12px;
    padding: 16px 24px;
    scroll-snap-type: x mandatory;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    padding: 12px 16px;
  }
`;

const TherapyCard = styled.div`
  position: relative;
  min-width: 450px;
  width: 450px;
  height: 260px;
  background: #FFFFFF;
  border-radius: 32px;
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
    min-width: 380px;
    width: 380px;
    height: 240px;
    border-radius: 28px;
  }
  
  @media (max-width: 768px) {
    min-width: 300px;
    width: 300px;
    height: 220px;
    border-radius: 24px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 480px) {
    min-width: calc(100vw - 80px);
    width: calc(100vw - 80px);
    height: 200px;
    border-radius: 20px;
  }
  
  @media (max-width: 360px) {
    min-width: calc(100vw - 60px);
    width: calc(100vw - 60px);
    height: 180px;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: url(${props => props.image}) center/cover;
  background-size: cover;
  background-position: center;
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
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 33px;
  
  @media (max-width: 1024px) {
    margin-top: 28px;
    gap: 14px;
  }
  
  @media (max-width: 768px) {
    margin-top: 24px;
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    margin-top: 20px;
    gap: 10px;
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
  
  @media (max-width: 1024px) {
    width: 44px;
    height: 44px;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
  
  svg {
    width: 20px;
    height: 20px;
    
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
  
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fetch data from Strapi
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
    if (carouselRef.current) {
      // Dynamically calculate scroll amount based on screen width
      const getScrollAmount = () => {
        const width = window.innerWidth;
        if (width <= 480) {
          return width - 60; // Full card width on small mobile
        } else if (width <= 768) {
          return 312; // Card width (300px) + gap (12px)
        } else if (width <= 1024) {
          return 396; // Card width (380px) + gap (16px)
        }
        return 470; // Card width (450px) + gap (20px)
      };
      
      const scrollAmount = getScrollAmount();
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
  const defaultSectionContent = {
    label: 'INNOVATIVE CARE',
    title: 'Explore Breakthrough Therapies',
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

  // Use Strapi data or fallback
  const section = sectionContent || defaultSectionContent;
  const therapyList = therapies && therapies.length > 0 ? therapies : defaultTherapies;

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
            // Get image URL from Strapi or use direct URL
            const imageUrl = therapy.image?.data?.attributes?.url 
              ? getMediaUrl(therapy.image.data.attributes.url) 
              : therapy.image;
            
            return (
              <TherapyCard key={therapy.id}>
                <CardImage image={imageUrl}>
                  <CardOverlay className="card-overlay">
                    <CardTitle>{therapy.name}</CardTitle>
                    <PlusIcon>+</PlusIcon>
                  </CardOverlay>
                  <CardHoverContent className="card-hover-content">
                    <HoverTitle>{therapy.name}</HoverTitle>
                    <HoverDescription>
                      {therapy.description || "A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer. It offers new hope for patients with leukemia, lymphoma, and other hard-to-treat cancers."}
                    </HoverDescription>
                    <ExploreButton>Explore</ExploreButton>
                  </CardHoverContent>
                </CardImage>
              </TherapyCard>
            );
          })}
        </CardsContainer>
      </CarouselWrapper>
      
      <Container>
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

