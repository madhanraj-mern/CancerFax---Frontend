import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { hideFallbacks } from '../../utils/config';
import { getSectionData, formatRichText } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';

// Custom hook for counter animation
const useCounterAnimation = (targetValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Parse the target value (e.g., "10,000k+" -> 10000)
  const parseNumber = (value) => {
    if (typeof value !== 'string') return value;
    
    // Remove commas
    let numStr = value.replace(/,/g, '');
    
    // Check for 'k' multiplier
    const hasK = numStr.toLowerCase().includes('k');
    numStr = numStr.replace(/k/i, '');
    
    // Remove % and + signs for parsing
    numStr = numStr.replace(/[%+]/g, '');
    
    const num = parseFloat(numStr);
    return hasK ? num * 1000 : num;
  };

  const formatNumber = (value, originalValue) => {
    // Preserve the original format
    const hasComma = originalValue.includes(',');
    const hasK = originalValue.toLowerCase().includes('k');
    const hasPercent = originalValue.includes('%');
    const hasPlus = originalValue.includes('+');
    
    let formatted = value.toString();
    
    // Add commas
    if (hasK) {
      const thousandsValue = Math.floor(value / 1000);
      formatted = thousandsValue.toLocaleString() + 'k';
    } else if (hasComma) {
      formatted = value.toLocaleString();
    } else {
      formatted = value.toString();
    }
    
    // Add % or +
    if (hasPercent) formatted += '%';
    if (hasPlus) formatted += '+';
    
    return formatted;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const targetNum = parseNumber(targetValue);
          let startTime;
          let animationFrame;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function for smooth animation (easeOutQuart)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(targetNum * easeOutQuart);
            setCount(currentCount);

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            } else {
              setCount(targetNum);
            }
          };

          animationFrame = requestAnimationFrame(animate);

          return () => {
            if (animationFrame) {
              cancelAnimationFrame(animationFrame);
            }
          };
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, targetValue, duration]);

  return { 
    displayValue: formatNumber(count, targetValue),
    ref 
  };
};

const Section = styled.section`
`;

const Container = styled.div`
`;

const AboutRow = styled.div`
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
`;

const Label = styled.p`
  color: ${props => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.primary};
`;

const CTAButton = styled.button`
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  max-width: 283px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 520px;
  height: 302px;
  border-radius: 48px;
  overflow: hidden;
  margin-top: 0;
  position: relative;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  video {
    display: block;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    height: 230px;
    border-radius: 20px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0;
  }
`;

const StatisticsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const StatCard = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid #D1D5DB;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  
  &:first-child {
    padding-top: 0;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    padding: 32px 0;
    gap: 10px;
    
    &:first-child {
      padding-top: 0;
    }
  }
`;

const StatNumber = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: ${props => props.$size === 'large' ? '108px' : '64px'};
  font-weight: 500;
  font-style: normal;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  line-height: 100%;
  letter-spacing: 0px;
  
  @media (max-width: 1024px) {
    font-size: ${props => props.$size === 'large' ? '80px' : '56px'};
  }
  
  @media (max-width: 768px) {
    font-size: ${props => props.$size === 'large' ? '64px' : '48px'};
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.$size === 'large' ? '52px' : '42px'};
  }
`;

const StatLabel = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: ${props => props.$labelSize === 'large' ? '24px' : '16px'};
  font-weight: 400;
  font-style: normal;
  color: ${props => props.theme.colors.primary};
  line-height: 100%;
  letter-spacing: 0px;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: ${props => props.$labelSize === 'large' ? '22px' : '15px'};
  }
  
  @media (max-width: 768px) {
    font-size: ${props => props.$labelSize === 'large' ? '20px' : '14px'};
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.$labelSize === 'large' ? '18px' : '13px'};
  }
`;

// Counter component that uses the animation hook
const AnimatedStat = ({ number, label, isLarge = false, labelSize = 'small' }) => {
  const { displayValue, ref } = useCounterAnimation(number, 2000);
  
  return (
    <StatCard ref={ref} className={isLarge ? 'content-large' : 'content-small'}>
      <StatNumber $size={isLarge ? 'large' : 'small'}>{displayValue}</StatNumber>
      <StatLabel $labelSize={labelSize}>{label}</StatLabel>
    </StatCard>
  );
};

const AboutSection = ({ componentData, pageData }) => {

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { content } = useSelector((state) => state.about);

  // IMPORTANT: Return null immediately while loading to prevent showing fallback data first
  // This check must come before computing any fallback data
  if (globalLoading) {
    return null;
  }

  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  // If componentData is provided, use it directly; otherwise get from globalData
  const aboutSection = componentData || getSectionData(globalData, 'about');
  const shouldHideMissingAbout = hideFallbacks && !aboutSection;
  
  // For statistics, if we have pageData, try to get statistics from page's dynamic zone
  // Otherwise fall back to global data
  let statisticsSection = null;
  if (pageData?.dynamicZone) {
    statisticsSection = pageData.dynamicZone.find(item => item.__component === 'dynamic-zone.statistics');
  }
  if (!statisticsSection) {
    statisticsSection = getSectionData(globalData, 'statistics');
  }
  
  // Debug: Log to check if global data exists
  if (globalData && !globalLoading) {
    console.log('AboutSection: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      dynamicZoneLength: globalData.dynamicZone?.length,
      aboutSection: !!aboutSection,
      statisticsSection: !!statisticsSection,
      aboutSectionData: aboutSection ? {
        heading: aboutSection.heading,
        sub_heading: aboutSection.sub_heading,
        hasImage: !!aboutSection.image,
        hasVideo: !!aboutSection.video || !!aboutSection.video_url,
        hasContent: !!aboutSection.content
      } : null
    });
  }
  
  // Extract statistics: prioritize values stored on the about section itself, then fall back to dedicated statistics component
  const aboutStats = Array.isArray(aboutSection?.statistic) && aboutSection.statistic.length > 0
    ? aboutSection.statistic
    : Array.isArray(aboutSection?.Statistics) && aboutSection.Statistics.length > 0
      ? aboutSection.Statistics
      : Array.isArray(aboutSection?.statistics) && aboutSection.statistics.length > 0
        ? aboutSection.statistics
        : [];

  const statisticsStats = Array.isArray(statisticsSection?.Statistics) && statisticsSection.Statistics.length > 0
    ? statisticsSection.Statistics
    : Array.isArray(statisticsSection?.statistic) && statisticsSection.statistic.length > 0
      ? statisticsSection.statistic
      : Array.isArray(statisticsSection?.statistics) && statisticsSection.statistics.length > 0
        ? statisticsSection.statistics
        : [];

  const globalStats = aboutStats.length > 0 ? aboutStats : statisticsStats;

  // Default statistics - don't show while loading
  const defaultStatistics = hideFallbacks ? [] : [
    { number: '10,000k+', label: 'Patients guided globally', isLarge: true, labelSize: 'large' },
    { number: '98%', label: 'Patient Satisfaction Rate', isLarge: false, labelSize: 'small' },
    { number: '250+', label: 'Clinical Trials Accessed', isLarge: false, labelSize: 'small' },
    { number: '100+', label: 'Partner Hospitals Globally', isLarge: false, labelSize: 'small' },
  ];

  // Format global statistics or use defaults - render ALL items dynamically
  const statistics = globalStats.length > 0
    ? globalStats.map((stat, index) => {
        const statData = stat?.attributes || stat;
        return {
          number: statData?.number || statData?.value || defaultStatistics[index]?.number || '',
          label: statData?.label || statData?.title || defaultStatistics[index]?.label || '',
          isLarge: statData?.isLarge !== undefined ? statData.isLarge : defaultStatistics[index]?.isLarge || false,
          labelSize: statData?.labelSize || defaultStatistics[index]?.labelSize || 'small'
        };
      }).filter(stat => stat.number) // Filter out empty stats
    : defaultStatistics;
  const shouldHideStatistics = hideFallbacks && statistics.length === 0;

  const resolveMediaUrl = (media) => {
    if (!media) return null;
    if (typeof media === 'string') return getMediaUrl(media);
    if (Array.isArray(media)) {
      const firstItem = media.find(Boolean);
      return firstItem ? resolveMediaUrl(firstItem) : null;
    }
    return (
      getMediaUrl(media?.url) ||
      getMediaUrl(media?.data?.attributes?.url) ||
      getMediaUrl(media?.attributes?.url) ||
      getMediaUrl(media?.file?.url) ||
      getMediaUrl(media?.video?.url) ||
      null
    );
  };

  // Get video and image from Strapi data or fallback
  // Prioritize video so that it replaces the static image when available
  const videoUrl =
    resolveMediaUrl(aboutSection?.video) ||
    resolveMediaUrl(aboutSection?.featuredVideo) ||
    resolveMediaUrl(aboutSection?.videoFile) ||
    resolveMediaUrl(aboutSection?.video_url) ||
    resolveMediaUrl(aboutSection?.videoUrl);
  
  const imageUrl =
    resolveMediaUrl(aboutSection?.image) ||
    resolveMediaUrl(content?.image) ||
    (hideFallbacks ? null : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800');
  const shouldHideMedia = hideFallbacks && !imageUrl && !videoUrl;

  // Map API fields: heading -> label, sub_heading -> title, content -> description
  // Extract button text from content (might be in content string or separate field)
  const contentText = formatRichText(aboutSection?.content) || aboutSection?.content || '';
  const buttonMatch = contentText.match(/Know more about Cancerfax/i);
  const descriptionText = contentText.replace(/Know more about Cancerfax/i, '').trim();
  
  // Use Strapi data if section exists, only use fallback if section doesn't exist at all
  // Strapi provides: heading, sub_heading, content, image, image_position, cta
  const sectionLabel = hideFallbacks ? aboutSection?.heading : (aboutSection?.heading || 'ABOUT CANCERFAX');
  const sectionTitle = hideFallbacks ? aboutSection?.sub_heading : (aboutSection?.sub_heading || 'Global Reach. Personal Care. Proven Results.');
  const sectionDescription = hideFallbacks
    ? (descriptionText || aboutSection?.description)
    : (aboutSection ? (descriptionText || aboutSection.description || "At CancerFax, we're transforming the way patients discover and receive life-saving therapies, simplifying global care with science, technology, and trust.") : "At CancerFax, we're transforming the way patients discover and receive life-saving therapies, simplifying global care with science, technology, and trust.");
  const buttonText = hideFallbacks
    ? (aboutSection?.cta?.text || (buttonMatch ? 'Know more about Cancerfax' : aboutSection?.button?.text))
    : (aboutSection ? (aboutSection.cta?.text || (buttonMatch ? 'Know more about Cancerfax' : aboutSection.button?.text || 'Know more about Cancerfax')) : 'Know more about Cancerfax');
  const shouldHideContent = hideFallbacks && (!sectionLabel || !sectionTitle);

  if (shouldHideMissingAbout || shouldHideStatistics || shouldHideMedia || shouldHideContent) {
    return null;
  }

  return (
    <Section id="about" className='about_sec py-120'>
      <Container className='containerWrapper'>
        <AboutRow className='about_row'>
          <LeftSection>
          <ScrollAnimationComponent animationVariants={slideLeft}>
            <ContentWrapper className='commContent_wrap about_left_content'>
              <Label className='contentLabel'>{sectionLabel}</Label>
              <Title className='title-3'>{sectionTitle}</Title>
              <Description className='text-16'>
                {sectionDescription}
              </Description>
              <CTAButton className='btn btn-pink-solid'>{buttonText}</CTAButton>
            </ContentWrapper>
            
            <ImageContainer>
              {videoUrl ? (
                <video 
                  src={videoUrl} 
                  preload="none" 
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={imageUrl}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={imageUrl} alt="CancerFax Care" />
              )}
            </ImageContainer>
          </ScrollAnimationComponent>
          </LeftSection>

          <RightSection>
            <ScrollAnimationComponent animationVariants={slideRight}>
            <StatisticsGrid>
              {statistics.map((stat, index) => (
                <AnimatedStat 
                  key={index}
                  number={stat.number}
                  label={stat.label}
                  isLarge={stat.isLarge}
                  labelSize={stat.labelSize}
                />
              ))}
            </StatisticsGrid>
            </ScrollAnimationComponent>
          </RightSection>
        </AboutRow>
      </Container>
    </Section>
  );
};

export default AboutSection;
