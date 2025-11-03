import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData, getCollectionData, formatMedia, formatRichText } from '../../utils/strapiHelpers';

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
    if (hasComma && !hasK) {
      formatted = value.toLocaleString();
    }
    
    // Add 'k' suffix
    if (hasK) {
      formatted = (value / 1000).toFixed(0) + 'k';
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated, targetValue, duration]);

  return { 
    displayValue: formatNumber(count, targetValue),
    ref 
  };
};

const Section = styled.section`
  padding: 100px 120px;
  background: #F8F8F8;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 80px 60px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 24px;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 100px;
  
  @media (max-width: 1024px) {
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 60px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 20px;
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
    letter-spacing: 1.8px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 44px;
  font-weight: 600;
  font-style: normal;
  color: ${props => props.theme.colors.primary};
  line-height: 56px;
  letter-spacing: -1px;
  margin: 0;
  max-width: 550px;
  
  @media (max-width: 1024px) {
    font-size: 38px;
    line-height: 48px;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -0.8px;
    max-width: 100%;
  }
`;

const Description = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.colors.primary};
  line-height: 1.65;
  margin: 0;
  max-width: 550px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    max-width: 100%;
  }
`;

const CTAButton = styled.button`
  font-family: ${props => props.theme.fonts.body};
  padding: 14px 28px;
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 38px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 24px;
    font-size: 12px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 480px;
  height: 250px;
  border-radius: 28px;
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
    <StatCard ref={ref}>
      <StatNumber $size={isLarge ? 'large' : 'small'}>{displayValue}</StatNumber>
      <StatLabel $labelSize={labelSize}>{label}</StatLabel>
    </StatCard>
  );
};

const AboutSection = () => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { content } = useSelector((state) => state.about);

  // Extract data from global Strapi response
  const aboutSection = getSectionData(globalData, 'about');
  const statisticsSection = getSectionData(globalData, 'statistics');
  
  // Debug: Log to check if global data exists
  const globalLoading = useSelector(state => state.global?.loading);
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
  
  // Extract statistics from statistics component
  const globalStats = statisticsSection?.Statistics || [];

  // Default statistics
  const defaultStatistics = [
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

  // Get video and image from global data or fallback
  // Check for video first (video takes precedence over image)
  const videoUrl = aboutSection?.video?.url 
    ? getMediaUrl(aboutSection.video.url)
    : (aboutSection?.video?.data?.attributes?.url
      ? formatMedia(aboutSection.video)
      : (aboutSection?.video_url || null));
  
  const imageUrl = formatMedia(aboutSection?.image) 
    || formatMedia(content?.image)
    || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800';

  // Map API fields: heading -> label, sub_heading -> title, content -> description
  // Extract button text from content (might be in content string or separate field)
  const contentText = formatRichText(aboutSection?.content) || aboutSection?.content || '';
  const buttonMatch = contentText.match(/Know more about Cancerfax/i);
  const descriptionText = contentText.replace(/Know more about Cancerfax/i, '').trim();
  
  // Use Strapi data if section exists, only use fallback if section doesn't exist at all
  // Strapi provides: heading, sub_heading, content, image, image_position, cta
  const sectionLabel = aboutSection?.heading || 'ABOUT CANCERFAX';
  const sectionTitle = aboutSection?.sub_heading || 'Global Reach. Personal Care. Proven Results.';
  // Use content text (from content field) or description, with fallback
  const sectionDescription = aboutSection ? (descriptionText || aboutSection.description || "At CancerFax, we're transforming the way patients discover and receive life-saving therapies, simplifying global care with science, technology, and trust.") : "At CancerFax, we're transforming the way patients discover and receive life-saving therapies, simplifying global care with science, technology, and trust.";
  const buttonText = aboutSection ? (aboutSection.cta?.text || (buttonMatch ? 'Know more about Cancerfax' : aboutSection.button?.text || 'Know more about Cancerfax')) : 'Know more about Cancerfax';

  return (
    <Section id="about">
      <Container>
        <LeftSection>
          <ContentWrapper>
            <Label>{sectionLabel}</Label>
            <Title>{sectionTitle}</Title>
            <Description>
              {sectionDescription}
            </Description>
            <CTAButton>{buttonText}</CTAButton>
          </ContentWrapper>
          
          <ImageContainer>
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                poster={imageUrl}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={imageUrl} alt="CancerFax Care" />
            )}
          </ImageContainer>
        </LeftSection>
        
        <RightSection>
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
        </RightSection>
      </Container>
    </Section>
  );
};

export default AboutSection;
