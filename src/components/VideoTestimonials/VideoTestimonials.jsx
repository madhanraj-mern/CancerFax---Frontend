import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData, formatMedia } from '../../utils/strapiHelpers';


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
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(0deg, rgba(54, 69, 79, 0.63) 0%, rgba(54, 69, 79, 0) 100%);
    border-radius: 24px;
    backdrop-filter: blur(53px);
    -webkit-mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(50%, rgba(54, 69, 79, 0.7)), to(rgba(54, 69, 79, 0)));
    -webkit-mask-image: linear-gradient(to right, rgba(54, 69, 79, 0.7) 50%, rgba(54, 69, 79, 0) 100%);
    mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(50%, rgba(54, 69, 79, 0.7)), to(rgba(54, 69, 79, 0)));
    mask-image: linear-gradient(to right, rgba(54, 69, 79, 0.7) 50%, rgba(54, 69, 79, 0) 100%);
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
  justify-content: center;
  padding: 80px 80px;
  gap: 32px;
  max-width: 680px;
  @media (max-width: 768px) {
    padding: 60px 60px;
    align-items: center;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    padding: 32px 32px;
  }
`;

const Label = styled.p`
  color: rgba(255, 255, 255, 0.9);
`;

const Title = styled.h4`
  font-size: 36px !important;
  font-weight: 600;
  color: white;
  line-height: 48px !important;
  letter-spacing: -0.5px;
  margin: 0;
`;

const ExploreButton = styled.a`
    max-width: 178px;
    @media (max-width: 575px) {
     max-width: 100%;
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
  // Note: VideoTestimonials uses 'dynamic-zone.testimonials' (different from regular Testimonials)
  const videoTestimonialsSection = componentData || getSectionData(globalData, 'testimonials');

  // Fallback data
  const fallbackSection = {
    label: 'TESTIMONIALS',
    title: 'Watch Real Patient Stories in Our Video Testimonials',
    backgroundImage: '../images/video-testimonial-img.jpg',
    videoUrl: '#'
  };

  // Extract background image from featuredVideo field (actual structure from Strapi)
  // featuredVideo can be a direct media object with url field, or nested in data.attributes
  const getBackgroundImage = () => {
    if (!videoTestimonialsSection) return fallbackSection.backgroundImage;
    
    // Check featuredVideo first (this is the background image in Strapi)
    if (videoTestimonialsSection.featuredVideo) {
      // If featuredVideo has direct url field (from populate)
      if (videoTestimonialsSection.featuredVideo.url) {
        return getMediaUrl(videoTestimonialsSection.featuredVideo.url);
      }
      // If nested in data.attributes
      if (videoTestimonialsSection.featuredVideo.data?.attributes?.url) {
        return formatMedia(videoTestimonialsSection.featuredVideo);
      }
      // If it's already a URL string
      if (typeof videoTestimonialsSection.featuredVideo === 'string') {
        return getMediaUrl(videoTestimonialsSection.featuredVideo);
      }
    }
    
    // Fallback to backgroundImage field
    if (videoTestimonialsSection.backgroundImage) {
      return formatMedia(videoTestimonialsSection.backgroundImage);
    }
    
    // Final fallback
    return fallbackSection.backgroundImage;
  };

  // Map Strapi data: heading -> label, sub_heading -> title
  const section = videoTestimonialsSection ? {
    label: videoTestimonialsSection.heading || fallbackSection.label,
    title: videoTestimonialsSection.sub_heading || fallbackSection.title,
    backgroundImage: getBackgroundImage(),
    videoUrl: videoTestimonialsSection.videoUrl || videoTestimonialsSection.cta?.URL || fallbackSection.videoUrl,
  } : (sectionContent || fallbackSection);

  // Debug: Log to check if global data exists (moved after section is defined)
  const globalLoading = useSelector(state => state.global?.loading);
  if (globalData && !globalLoading) {
    console.log('VideoTestimonials: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      videoTestimonialsSection: !!videoTestimonialsSection,
      hasFeaturedVideo: !!videoTestimonialsSection?.featuredVideo,
      featuredVideoRaw: videoTestimonialsSection?.featuredVideo,
      backgroundImageUrl: videoTestimonialsSection?.featuredVideo?.url || videoTestimonialsSection?.featuredVideo?.data?.attributes?.url || null,
      finalBackgroundImage: section?.backgroundImage
    });
  }

  const handlePlayVideo = () => {
    // Handle video play functionality
    const videoUrl = section.videoUrl || '#';
    console.log('Play video:', videoUrl);
    // You can implement video modal/player here
  };

  return (
    <section className='videoTestimonials_sec' id="video-testimonials">
      <div className='containerWrapper'>
        <div className='videoTestimonials_wrap'>
        <BackgroundImage 
          image={section.backgroundImage || fallbackSection.backgroundImage}
        />
        
        <Content className='commContent_wrap'>
          <Label className='contentLabel'>{section.label}</Label>
          <Title>{section.title}</Title>
          <ExploreButton className='btn btn-pink-solid' href={section.buttonUrl || '#'}>
           View all Stories
          </ExploreButton>
        </Content>
        
        <PlayButtonWrapper>
          <PlayButton onClick={handlePlayVideo} aria-label="Play video testimonials" type="button">
            <PlayIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <path d="M8 5v14l11-7z" fill="#FF1493" />
            </PlayIcon>
          </PlayButton>
        </PlayButtonWrapper>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;

