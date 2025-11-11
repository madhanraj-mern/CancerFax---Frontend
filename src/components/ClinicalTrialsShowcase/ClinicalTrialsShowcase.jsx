import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSectionData, formatMedia, formatRichText } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';

const SlideContainer = styled.div`
  transform: translateX(${props => -props.activeIndex * 100}%);
`;

const Slide = styled.div`
  background-image: ${props => props.backgroundImage ? `url('${props.backgroundImage}')` : 'none'}; 
`;

const Content = styled.div`
  max-width: 750px;
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
  color: ${props => props.theme.colors.white};
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.white};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;

const Button = styled.button`
  background: ${props => props.theme.colors.primary || '#1E40AF'};
  color: ${props => props.theme.colors.white};
  max-width: 273px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
  &:hover {
    background: ${props => props.theme.colors.primaryDark || '#1E3A8A'};
  }
`;

const NavButton = styled.button`
  &:hover:not(:disabled) svg {
    transform: ${props => props['aria-label']?.includes('Previous') ? 'translateX(-2px)' : 'translateX(2px)'};
  }
`;

const ClinicalTrialsShowcase = ({ componentData, pageData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { slides } = useSelector((state) => state.clinicalTrialsShowcase || { slides: [], loading: false });

  // Default slides if no data from Strapi
  const defaultSlides = [
    {
      label: 'TREATMENTS',
      title: "CancerFax's Role In Clinical Trial Advancements",
      description: 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.',
      buttonText: 'Find Relevant Clinical Trials',
      buttonLink: '#clinical-trials',
      backgroundImage: '../images/about-banner-slider-img-1.jpg'
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

  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  const sliderSection = componentData || getSectionData(globalData, 'clinicalTrialsShowcase');
  
  // Extract slides from the Slide array in slider-section component
  const globalSlides = sliderSection?.Slide || [];
  
  // Debug: Log to check if global data exists
  const globalLoading = useSelector(state => state.global?.loading);
  if (globalData && !globalLoading) {
    console.log('ClinicalTrialsShowcase: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      dynamicZoneLength: globalData.dynamicZone?.length,
      sliderSection: !!sliderSection,
      slidesCount: globalSlides.length
    });
  }
  
  // Format global slides if available
  // Use Strapi data if section exists AND has slides, otherwise use fallback
  const formattedGlobalSlides = sliderSection && globalSlides.length > 0
    ? globalSlides.map((slide, index) => {
        // Handle nested structure - slide might be in attributes or direct
        const slideData = slide?.attributes || slide;
        return {
          label: slideData?.heading ?? slideData?.label ?? '',
          title: slideData?.subheading ?? slideData?.title ?? '',
          description: formatRichText(slideData?.description) ?? slideData?.description ?? '',
          buttonText: slideData?.cta?.text ?? slideData?.buttonText ?? '',
          buttonLink: slideData?.cta?.URL ?? slideData?.buttonLink ?? slideData?.cta?.link ?? '#',
          backgroundImage: formatMedia(slideData?.featuredImage) ?? formatMedia(slideData?.backgroundImage) ?? defaultSlides[index]?.backgroundImage ?? defaultSlides[0]?.backgroundImage
        };
      }).filter(slide => slide.title) // Filter out empty slides
    : [];

  // Use global data or fallback to existing data or defaults
  const slidesData = formattedGlobalSlides.length > 0 
    ? formattedGlobalSlides 
    : (slides && slides.length > 0 ? slides : defaultSlides);

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

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
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
    <section className='clinicalTrials_sec'>
      <SlideContainer className='clinicalTrials_sliderWrap' activeIndex={activeIndex}>
        {slidesData.map((slide, index) => {
          const backgroundImage = slide.backgroundImage || (defaultSlides[index]?.backgroundImage || defaultSlides[0]?.backgroundImage);
            return (
              <Slide 
                key={`slide-${index}-${slide.title || index}`} 
                backgroundImage={backgroundImage}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${slidesData.length}`}
                aria-hidden={index !== activeIndex}
                className='clinicalTrials_slide'
              >
              <div className='containerWrapper'>
                <div className='clinicalTrials_slide_content'>
                  <ScrollAnimationComponent animationVariants={fadeIn}>
                  <Content className='commContent_wrap content-gap-32'>
                    <Label className='contentLabel'>{slide.label || 'TREATMENTS'}</Label>
                    <Title className='title-2'>{slide.title}</Title>
                    <Description className='text-16'>{slide.description}</Description>
                    <Button className='btn btn-dark-solid' as="a" href={slide.buttonLink || '#clinical-trials'}>
                      {slide.buttonText || 'Find Relevant Clinical Trials'}
                    </Button>
                  </Content>
                  </ScrollAnimationComponent>
                </div>
                  <div className='slider-nav-wrap'>
                    <NavButton
                      className='slider-nav-button'
                      onClick={handlePrevious}
                      disabled={slidesData.length <= 1}
                      aria-label="Previous slide"
                      type="button"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                    <path d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z" fill="white"/>
                    </svg>
                    </NavButton>
                    <NavButton
                      className='slider-nav-button'
                      onClick={handleNext}
                      disabled={slidesData.length <= 1}
                      aria-label="Next slide"
                      type="button"
                    >
                    <svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z" fill="white"/>
                    </svg>
                    </NavButton>
                  </div>
                </div>
              </Slide>
            );
        })}
      </SlideContainer>
    </section>
  );
};

export default ClinicalTrialsShowcase;

