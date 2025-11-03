import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData, formatMedia } from '../../utils/strapiHelpers';

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 700px;
  max-height: 100vh;
  padding-top: 80px; /* 16px (padding-top) + 48px (height) + 16px (padding-bottom) */
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  box-sizing: border-box;
  /* Background will be applied dynamically via style prop */

  @media (max-width: 1200px) {
    padding-top: 72px; /* 14px + 44px + 14px */
  }

  @media (max-width: 1024px) {
    padding-top: 72px; /* 14px + 44px + 14px */
  }

  @media (max-width: 768px) {
    padding-top: 64px; /* 12px + 40px + 12px */
    height: auto;
    min-height: 500px;
  }
  
  @media (max-width: 480px) {
    padding-top: 58px; /* 10px + 38px + 10px */
  }
  
  @media (max-width: 360px) {
    padding-top: 52px; /* 8px + 36px + 8px */
  }
`;

const HeroContent = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px 60px 120px;
  position: relative;
  z-index: 10;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 60px 40px 60px;
  }

  @media (max-width: 768px) {
    padding: 0 24px 40px 24px;
  }
`;

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const SurvivorLabel = styled.div`
  font-family: ${props => props.theme.fonts.body};
  font-size: 11px;
  font-weight: 500;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 2.5px;
  max-width: 100%;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 10px;
    letter-spacing: 2px;
  }
`;

const StoryTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 52px;
  font-weight: 600;
  font-style: normal;
  color: ${props => props.theme.colors.white};
  line-height: 64px;
  margin: 0;
  letter-spacing: -2.63px;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 52px;
    letter-spacing: -2px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -1.5px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
    line-height: 32px;
    letter-spacing: -1px;
  }
`;

const StoryTitleBold = styled.span`
  font-weight: 600;
  display: block;
`;

const StoryTitleRegular = styled.span`
  font-weight: 400;
  display: block;
`;

const Separator = styled.hr`
  width: 100%;
  max-width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  margin: 0;
  box-sizing: border-box;
`;

const StoryCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  padding: 20px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 16px 0 0;
  }
`;

const StoryButton = styled.button`
  font-family: ${props => props.theme.fonts.body};
  padding: 16px 28px;
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 24px;
    font-size: 14px;
  }
`;

const StoryDescription = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 16px;
  color: ${props => props.theme.colors.white};
  line-height: 1.6;
  margin: 0;
  flex: 1;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.65;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Hero = () => {
  // Get hero data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);
  
  // Legacy Redux state (kept for fallback, but not actively used)
  const { heroContent, survivorStory } = useSelector((state) => state.hero);
  
  // Extract data from global Strapi response
  const heroSection = getSectionData(globalData, 'hero');
  
  // Debug: Log to check if global data exists
  if (globalData && !globalLoading) {
    console.log('Hero: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      heroSection: !!heroSection,
      heroSectionData: heroSection ? {
        heading: heroSection.heading,
        sub_heading: heroSection.sub_heading,
        description: heroSection.description?.substring(0, 50) + '...',
        hasImage: !!heroSection.image,
        hasCTAs: !!heroSection.CTAs
      } : null
    });
  }

  // Map Strapi API fields to component fields
  // API provides: heading, sub_heading, description, image, CTAs
  // Only use fallback if heroSection doesn't exist at all
  const storyData = heroSection ? {
    label: heroSection.heading ?? 'SURVIVOR STORIES',
    title: heroSection.sub_heading ?? 'Andrea... A hero, a fighter..\nKnow her journey..',
    description: heroSection.description ?? 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.',
    buttonText: heroSection.CTAs?.[0]?.text ?? "Read Andrea's Story",
    buttonUrl: heroSection.CTAs?.[0]?.URL ?? '#'
  } : (survivorStory || {
    label: 'Survivor Stories',
    title: 'Andrea... A hero, a fighter..\nKnow her journey..',
    description: 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.',
    buttonText: "Read Andrea's Story"
  });

  // Get background image from global data or fallback
  const backgroundImage = formatMedia(heroSection?.image) 
    || formatMedia(heroContent?.backgroundImage)
    || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920';

  // Build background style with dynamic image
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.3) 70%, transparent 100%), radial-gradient(circle at 59% 40%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url('${backgroundImage}')`,
    backgroundSize: isMobile ? 'cover' : 'auto, auto, 1558px 977px',
    backgroundPosition: isMobile ? 'center' : 'center, center, -13px -124px',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <HeroSection style={backgroundStyle}>
      <HeroContent>
        <StoryContainer>
          <SurvivorLabel>
            {storyData.label || 'SURVIVOR STORIES'}
          </SurvivorLabel>
          
          <StoryTitle>
            {storyData.title?.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i === 0 ? (
                  <StoryTitleBold>{line}</StoryTitleBold>
                ) : (
                  <StoryTitleRegular>{line}</StoryTitleRegular>
                )}
              </React.Fragment>
            )) || (
              <>
                <StoryTitleBold>Andrea... A hero, a fighter..</StoryTitleBold>
                <StoryTitleRegular>Know her journey..</StoryTitleRegular>
              </>
            )}
          </StoryTitle>
          
          <StoryCard>
            <StoryButton as="a" href={storyData.buttonUrl || '#'}>{storyData.buttonText || "Read Andrea's Story"}</StoryButton>
            <StoryDescription>
              {storyData.description || 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.'}
            </StoryDescription>
          </StoryCard>
        </StoryContainer>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

