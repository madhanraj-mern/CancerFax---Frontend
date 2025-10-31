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

  @media (max-width: 1440px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    height: 600px;
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${props => -props.activeIndex * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 70%, transparent 100%),
              url('${props => props.backgroundImage}') center/cover;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;

  @media (max-width: 768px) {
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                url('${props => props.backgroundImage}') center/cover;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px 80px 120px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 60px 60px 60px;
  }

  @media (max-width: 768px) {
    padding: 0 24px 50px 24px;
  }
`;

const Content = styled.div`
  max-width: 950px;
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
    margin-bottom: 16px;
    letter-spacing: 2px;
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

  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 50px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 16px;
    line-height: 40px;
    letter-spacing: -1.5px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
    line-height: 32px;
    letter-spacing: -1px;
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

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 28px;
    line-height: 1.65;
  }

  @media (max-width: 480px) {
    font-size: 14px;
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
`;

const NavigationContainer = styled.div`
  position: absolute;
  right: 120px;
  bottom: 100px;
  display: flex;
  gap: 16px;
  z-index: 10;

  @media (max-width: 1024px) {
    right: 60px;
    bottom: 80px;
  }

  @media (max-width: 768px) {
    right: 24px;
    bottom: 70px;
    gap: 12px;
  }
`;

const NavButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;

    svg {
      width: 20px;
      height: 20px;
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
    bottom: 25px;
    gap: 8px;
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
    }
  ];

  const slidesData = slides && slides.length > 0 ? slides : defaultSlides;

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  const handleNext = () => {
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
            : slide.backgroundImage || defaultSlides[0].backgroundImage;

          return (
            <Slide key={index} backgroundImage={backgroundImage}>
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
        <>
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

          <NavigationContainer>
            <NavButton
              onClick={handlePrevious}
              disabled={slidesData.length <= 1}
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </NavButton>
            <NavButton
              onClick={handleNext}
              disabled={slidesData.length <= 1}
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </NavButton>
          </NavigationContainer>
        </>
      )}
    </ShowcaseSection>
  );
};

export default ClinicalTrialsShowcase;

