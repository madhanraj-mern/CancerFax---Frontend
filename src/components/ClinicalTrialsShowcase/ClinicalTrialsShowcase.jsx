import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchClinicalTrialsShowcase } from '../../store/slices/clinicalTrialsShowcaseSlice';
import { getMediaUrl } from '../../services/api';

const ShowcaseSection = styled.section`
  position: relative;
  width: 1440px;
  max-width: 100%;
  height: 751px;
  margin: 0 auto;
  opacity: 1;
  transform: rotate(0deg);
  overflow: hidden;
  box-sizing: border-box;
  isolation: isolate;

  @media (max-width: 1440px) {
    width: 100%;
  }

  @media (max-width: 1024px) {
    height: 650px;
  }

  @media (max-width: 768px) {
    height: 600px;
    min-height: 600px;
    max-height: 600px;
    overflow: hidden;
    position: relative;
  }

  @media (max-width: 480px) {
    height: 550px;
    min-height: 550px;
    max-height: 550px;
    overflow: hidden;
    position: relative;
  }

  @media (max-width: 360px) {
    height: 520px;
    min-height: 520px;
    max-height: 520px;
    overflow: hidden;
    position: relative;
  }
`;

const SlideContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${props => -props.activeIndex * 100}%);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  z-index: 1;
`;

const Slide = styled.div`
  min-width: 100%;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #1a1a1a;
  background-image: ${props => props.backgroundImage ? `url('${props.backgroundImage}')` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 100%;
  opacity: 1;
  box-sizing: border-box;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 70%, transparent 100%);
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    &::before {
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
    }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px 80px 120px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: flex-end;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    padding: 0 60px 60px 60px;
  }

  @media (max-width: 768px) {
    padding: 0 24px 70px 24px;
  }

  @media (max-width: 480px) {
    padding: 0 20px 65px 20px;
  }

  @media (max-width: 360px) {
    padding: 0 16px 60px 16px;
  }
`;

const Content = styled.div`
  max-width: 950px;
  position: relative;
  z-index: 3;
  animation: fadeInUp 0.8s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Label = styled.div`
  font-family: ${props => props.theme.fonts.body};
  font-size: 11px;
  font-weight: 500;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin-bottom: 20px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 10px;
    margin-bottom: 14px;
    letter-spacing: 2px;
  }

  @media (max-width: 480px) {
    font-size: 9px;
    margin-bottom: 12px;
    letter-spacing: 1.5px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 52px;
  font-weight: 600;
  font-style: normal;
  color: ${props => props.theme.colors.white};
  line-height: 60px;
  letter-spacing: -2px;
  margin: 0 0 20px 0;
  max-width: 800px;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 50px;
    max-width: 700px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 16px;
    line-height: 40px;
    letter-spacing: -1.5px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -1px;
    margin-bottom: 12px;
  }

  @media (max-width: 360px) {
    font-size: 22px;
    line-height: 28px;
  }
`;

const Description = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  line-height: 1.6;
  margin: 0 0 32px 0;
  max-width: 700px;
  opacity: 0.95;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 1024px) {
    max-width: 600px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 24px;
    line-height: 1.65;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  @media (max-width: 360px) {
    font-size: 13px;
    margin-bottom: 18px;
  }
`;

const Button = styled.button`
  font-family: 'Be Vietnam Pro', sans-serif;
  width: 273px;
  height: 52px;
  padding: 18px 28px;
  background: ${props => props.theme.colors.primary || '#1E40AF'};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  gap: 8px;
  opacity: 1;
  transform: rotate(0deg);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-sizing: border-box;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${props => props.theme.colors.primaryDark || '#1E3A8A'};
    transform: translateY(-2px) rotate(0deg);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    opacity: 1;
  }

  &:active {
    transform: translateY(0) rotate(0deg);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 273px;
    height: 48px;
    padding: 14px 26px;
    font-size: 15px;
    line-height: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    height: 46px;
    padding: 14px 24px;
    font-size: 14px;
    line-height: 14px;
    border-radius: 16px;
  }

  @media (max-width: 360px) {
    height: 44px;
    padding: 12px 20px;
    font-size: 13px;
  }
`;

const NavigationContainer = styled.div`
  position: absolute;
  right: 120px;
  bottom: 100px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  z-index: 100;
  pointer-events: none;

  button {
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    right: 60px;
    bottom: 80px;
  }

  @media (max-width: 768px) {
    right: 24px;
    bottom: 20px;
    gap: 12px;
    left: auto;
    width: auto;
    height: auto;
    position: absolute;
  }

  @media (max-width: 480px) {
    right: 16px;
    bottom: 15px;
    gap: 10px;
    left: auto;
    width: auto;
    height: auto;
    position: absolute;
  }

  @media (max-width: 360px) {
    right: 12px;
    bottom: 12px;
    gap: 8px;
    left: auto;
    width: auto;
    height: auto;
    position: absolute;
  }
`;

const NavButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 100;
  position: relative;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.9);
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  svg {
    width: 28px;
    height: 28px;
    transition: transform 0.2s ease;
    stroke: #FFFFFF;
    fill: none;
    stroke-width: 3;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  &:hover:not(:disabled) svg {
    transform: ${props => props['aria-label']?.includes('Previous') ? 'translateX(-2px)' : 'translateX(2px)'};
    stroke-width: 3.5;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    flex-shrink: 0;

    svg {
      width: 24px;
      height: 24px;
      stroke-width: 2.5;
    }
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    flex-shrink: 0;

    svg {
      width: 22px;
      height: 22px;
      stroke-width: 2.5;
    }
  }

  @media (max-width: 360px) {
    width: 40px;
    height: 40px;
    flex-shrink: 0;

    svg {
      width: 20px;
      height: 20px;
      stroke-width: 2;
    }
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 120px;
  display: flex;
  gap: 12px;
  z-index: 10;

  @media (max-width: 1024px) {
    left: 60px;
    bottom: 30px;
  }

  @media (max-width: 768px) {
    left: 24px;
    bottom: 20px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    left: 20px;
    bottom: 15px;
    gap: 6px;
  }

  @media (max-width: 360px) {
    left: 16px;
    bottom: 12px;
    gap: 5px;
  }
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }

  @media (max-width: 360px) {
    width: 7px;
    height: 7px;
  }
`;

const ClinicalTrialsShowcase = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const { slides, loading } = useSelector((state) => state.clinicalTrialsShowcase || { slides: [], loading: false });

  useEffect(() => {
    dispatch(fetchClinicalTrialsShowcase());
  }, [dispatch]);

  // Default slides if no data from Strapi
  const defaultSlides = [
    {
      label: 'TREATMENTS',
      title: "CancerFax's Role In Clinical Trial Advancements",
      description: 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.',
      buttonText: 'Find Relevant Clinical Trials',
      buttonLink: '#clinical-trials',
      backgroundImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80'
    },
    {
      label: 'INNOVATION',
      title: "Advanced Treatment Options Available Worldwide",
      description: 'Discover breakthrough therapies and cutting-edge treatments from leading medical institutions. Our network connects you with the best care options globally.',
      buttonText: 'Explore Treatments',
      buttonLink: '#treatments',
      backgroundImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1920&q=80'
    }
  ];

  const slidesData = slides && slides.length > 0 ? slides : defaultSlides;

  const handlePrevious = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (slidesData.length <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (slidesData.length <= 1) return;
    setActiveIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  // Auto-play slider
  useEffect(() => {
    if (slidesData.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
      }, 6000); // Change slide every 6 seconds

      return () => clearInterval(interval);
    }
  }, [slidesData.length]);

  return (
    <ShowcaseSection>
      <SlideContainer activeIndex={activeIndex}>
        {slidesData.map((slide, index) => {
          const backgroundImage = slide.backgroundImage?.data?.attributes?.url 
            ? getMediaUrl(slide.backgroundImage.data.attributes.url)
            : slide.backgroundImage || (defaultSlides[index]?.backgroundImage || defaultSlides[0]?.backgroundImage);

          return (
            <Slide 
              key={`slide-${index}-${slide.title || index}`} 
              backgroundImage={backgroundImage}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slidesData.length}`}
              aria-hidden={index !== activeIndex}
            >
              <ContentWrapper>
                <Content>
                  <Label>{slide.label || 'TREATMENTS'}</Label>
                  <Title>{slide.title}</Title>
                  <Description>{slide.description}</Description>
                  <Button as="a" href={slide.buttonLink || '#clinical-trials'}>
                    {slide.buttonText || 'Find Relevant Clinical Trials'}
                  </Button>
                </Content>
              </ContentWrapper>
            </Slide>
          );
        })}
      </SlideContainer>

      {slidesData.length > 1 && (
        <DotsContainer>
          {slidesData.map((_, index) => (
            <Dot
              key={index}
              active={index === activeIndex}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </DotsContainer>
      )}

      <NavigationContainer>
        <NavButton
          onClick={handlePrevious}
          disabled={slidesData.length <= 1}
          aria-label="Previous slide"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28" style={{ display: 'block' }}>
            <polyline points="15 18 9 12 15 6" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </NavButton>
        <NavButton
          onClick={handleNext}
          disabled={slidesData.length <= 1}
          aria-label="Next slide"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28" style={{ display: 'block' }}>
            <polyline points="9 18 15 12 9 6" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </NavButton>
      </NavigationContainer>
    </ShowcaseSection>
  );
};

export default ClinicalTrialsShowcase;

