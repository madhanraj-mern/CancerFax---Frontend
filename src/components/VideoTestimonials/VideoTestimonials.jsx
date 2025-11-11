import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData } from '../../utils/strapiHelpers';
import { hideFallbacks } from '../../utils/config';

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 106px 120px;
  background: white;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    padding: 90px 80px;
  }
  
  @media (max-width: 768px) {
    padding: 70px 32px;
  }
  
  @media (max-width: 480px) {
    padding: 50px 20px;
  }
`;

const Container = styled.div`
  position: relative;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  height: 442px;
  border-radius: 24px;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    height: 400px;
  }
  
  @media (max-width: 900px) {
    height: 360px;
  }
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 400px;
    border-radius: 20px;
    overflow: hidden;
    padding-bottom: 120px;
  }
  
  @media (max-width: 480px) {
    min-height: 420px;
    padding-bottom: 110px;
    border-radius: 16px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 24px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 100%);
    border-radius: 24px;
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
    
    &::before {
      border-radius: 20px;
    }
  }
  
  @media (max-width: 480px) {
    border-radius: 16px;
    
    &::before {
      border-radius: 16px;
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 105px 80px 80px 80px;
  
  @media (max-width: 1024px) {
    padding: 90px 60px 60px 60px;
  }
  
  @media (max-width: 768px) {
    padding: 70px 48px 48px 48px;
    align-items: center;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    padding: 50px 32px 32px 32px;
  }
`;

const Label = styled.p`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin: 0 0 24px 0;
  
  @media (max-width: 768px) {
    font-size: 10px;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 9px;
    letter-spacing: 1.5px;
    margin-bottom: 16px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', ${props => props.theme.fonts.heading};
  font-size: 36px;
  font-weight: 700;
  color: white;
  line-height: 1.3;
  letter-spacing: -0.5px;
  margin: 0 0 32px 0;
  max-width: 600px;
  
  @media (max-width: 1200px) {
    font-size: 32px;
    max-width: 550px;
    margin-bottom: 28px;
  }
  
  @media (max-width: 900px) {
    font-size: 30px;
    max-width: 500px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
    max-width: 100%;
    letter-spacing: -0.3px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 20px;
    letter-spacing: -0.2px;
  }
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 200px;
  transform: translateY(-50%);
  z-index: 10;
  
  @media (max-width: 1200px) {
    right: 150px;
  }
  
  @media (max-width: 900px) {
    right: 100px;
  }
  
  @media (max-width: 768px) {
    position: absolute;
    top: auto;
    bottom: 60px;
    right: 50%;
    transform: translateX(50%);
    margin: 0;
    display: flex;
    justify-content: center;
    z-index: 10;
  }
  
  @media (max-width: 480px) {
    bottom: 40px;
    right: 50%;
    transform: translateX(50%);
  }
`;

const PlayButton = styled.button`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: white;
  border: 4px dashed rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    border: 2px dashed rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    animation: rotate 20s linear infinite;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 1024px) {
    width: 110px;
    height: 110px;
    
    &::before {
      width: 130px;
      height: 130px;
    }
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    border-width: 3px;
    
    &::before {
      width: 120px;
      height: 120px;
    }
  }
  
  @media (max-width: 480px) {
    width: 90px;
    height: 90px;
    border-width: 3px;
    
    &::before {
      width: 110px;
      height: 110px;
    }
  }
  
  @media (max-width: 360px) {
    width: 80px;
    height: 80px;
    
    &::before {
      width: 100px;
      height: 100px;
    }
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const PlayIcon = styled.svg`
  width: 36px;
  height: 36px;
  margin-left: 4px;
  fill: #FF1493;
  display: block;
  z-index: 1;
  position: relative;
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
  
  @media (max-width: 360px) {
    width: 24px;
    height: 24px;
  }
`;

const VideoTestimonials = ({ componentData, pageData }) => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent } = useSelector((state) => state.videoTestimonials || {});

  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  // Note: VideoTestimonials uses 'testimonials' component type (which has featuredVideo field)
  const videoTestimonialsSection = componentData 
    || getSectionData(globalData, 'testimonials')
    || getSectionData(globalData, 'videoTestimonials');
  const hasSectionFallback = sectionContent && Object.keys(sectionContent || {}).length;
  const shouldHideMissingSection = hideFallbacks && !videoTestimonialsSection && !hasSectionFallback;

  // Fallback data - wrapped in useMemo to prevent recreation on every render
  const fallbackSection = useMemo(() => {
    return hideFallbacks ? null : {
      label: 'TESTIMONIALS',
      title: 'Watch Real Patient Stories in Our Video Testimonials',
      backgroundImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
      videoUrl: '#'
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper to resolve Strapi media (image/video) into a usable URL - wrapped in useCallback
  const resolveMediaUrl = useCallback((media) => {
    if (!media) return null;
    if (typeof media === 'string') return getMediaUrl(media);
    if (Array.isArray(media)) {
      const first = media.find(Boolean);
      return first ? resolveMediaUrl(first) : null;
    }

    return (
      getMediaUrl(media?.url) ||
      getMediaUrl(media?.data?.attributes?.url) ||
      getMediaUrl(media?.attributes?.url) ||
      getMediaUrl(media?.formats?.large?.url) ||
      getMediaUrl(media?.formats?.medium?.url) ||
      getMediaUrl(media?.formats?.small?.url) ||
      null
    );
  }, []);

  // Extract background image from Strapi (featuredVideo or backgroundImage)
  const getBackgroundImage = useCallback(() => {
    if (!videoTestimonialsSection) return fallbackSection?.backgroundImage || null;

    return (
      resolveMediaUrl(videoTestimonialsSection.featuredVideo) ||
      resolveMediaUrl(videoTestimonialsSection.backgroundImage) ||
      resolveMediaUrl(videoTestimonialsSection.image) ||
      fallbackSection?.backgroundImage || null
    );
  }, [videoTestimonialsSection, fallbackSection, resolveMediaUrl]);

  // Map Strapi data: heading -> label, sub_heading -> title
  const section = useMemo(() => {
    return videoTestimonialsSection ? {
      label: videoTestimonialsSection.heading || fallbackSection?.label,
      title: videoTestimonialsSection.sub_heading || fallbackSection?.title,
      backgroundImage: getBackgroundImage(),
      videoUrl: videoTestimonialsSection.videoUrl || videoTestimonialsSection.cta?.URL || fallbackSection?.videoUrl,
    } : (sectionContent || fallbackSection);
  }, [videoTestimonialsSection, fallbackSection, sectionContent, getBackgroundImage]);

  const shouldHideVideoTestimonials = hideFallbacks && (!section || !section.label || !section.title);

  // Debug: Log to check if global data exists (moved after section is defined)
  const globalLoading = useSelector(state => state.global?.loading);
  React.useEffect(() => {
    if (globalData && !globalLoading) {
      // Find all video testimonials-related components in dynamic zone
      const allVideoTestimonialComponents = globalData.dynamicZone?.filter(
        item => item.__component?.includes('testimonial') || item.__component?.includes('Testimonial') || item.__component?.includes('video')
      ) || [];
      
      console.log('📊 VideoTestimonials Section (id="Testimonials-Section-Testimonials"): Strapi Data Usage Report', {
        sectionId: 'Testimonials-Section-Testimonials',
        componentType: 'dynamic-zone.testimonials (with featuredVideo field)',
        hasDynamicZone: !!globalData.dynamicZone,
        dynamicZoneLength: globalData.dynamicZone?.length || 0,
        allVideoTestimonialComponents: allVideoTestimonialComponents.map(c => ({
          __component: c.__component,
          hasHeading: !!c.heading,
          hasSubHeading: !!c.sub_heading,
          hasFeaturedVideo: !!c.featuredVideo,
          hasBackgroundImage: !!c.backgroundImage,
          hasImage: !!c.image,
          hasVideoUrl: !!c.videoUrl,
          hasCta: !!c.cta,
          keys: Object.keys(c)
        })),
        videoTestimonialsSection: {
          found: !!videoTestimonialsSection,
          __component: videoTestimonialsSection?.__component,
          hasHeading: !!videoTestimonialsSection?.heading,
          heading: videoTestimonialsSection?.heading,
          hasSubHeading: !!videoTestimonialsSection?.sub_heading,
          subHeading: videoTestimonialsSection?.sub_heading,
          hasFeaturedVideo: !!videoTestimonialsSection?.featuredVideo,
          featuredVideoType: typeof videoTestimonialsSection?.featuredVideo,
          featuredVideoUrl: videoTestimonialsSection?.featuredVideo?.url || videoTestimonialsSection?.featuredVideo?.data?.attributes?.url || null,
          hasBackgroundImage: !!videoTestimonialsSection?.backgroundImage,
          backgroundImageUrl: videoTestimonialsSection?.backgroundImage?.url || videoTestimonialsSection?.backgroundImage?.data?.attributes?.url || null,
          hasImage: !!videoTestimonialsSection?.image,
          hasVideoUrl: !!videoTestimonialsSection?.videoUrl,
          videoUrl: videoTestimonialsSection?.videoUrl,
          hasCta: !!videoTestimonialsSection?.cta,
          ctaUrl: videoTestimonialsSection?.cta?.URL,
          keys: videoTestimonialsSection ? Object.keys(videoTestimonialsSection) : null
        },
        finalSection: {
          label: section?.label,
          title: section?.title,
          backgroundImage: section?.backgroundImage,
          videoUrl: section?.videoUrl
        },
        usingStrapi: !!videoTestimonialsSection,
        usingFallback: !videoTestimonialsSection
      });
    }
  }, [globalData, globalLoading, videoTestimonialsSection, section]);

  const handlePlayVideo = () => {
    // Handle video play functionality
    const videoUrl = section.videoUrl || '#';
    console.log('Play video:', videoUrl);
    // You can implement video modal/player here
  };

  if (shouldHideMissingSection || shouldHideVideoTestimonials) {
    return null;
  }

  return (
    <Section id="Testimonials-Section-Testimonials">
      <Container>
        <BackgroundImage 
          image={section.backgroundImage || fallbackSection.backgroundImage}
        />
        
        <Content>
          <Label>{section.label}</Label>
          <Title>{section.title}</Title>
        </Content>
        
        <PlayButtonWrapper>
          <PlayButton onClick={handlePlayVideo} aria-label="Play video testimonials" type="button">
            <PlayIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <path d="M8 5v14l11-7z" fill="#FF1493" />
            </PlayIcon>
          </PlayButton>
        </PlayButtonWrapper>
      </Container>
    </Section>
  );
};

export default VideoTestimonials;

