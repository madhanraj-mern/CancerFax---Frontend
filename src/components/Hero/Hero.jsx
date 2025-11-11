import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSectionData, formatMedia } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { hideFallbacks } from '../../utils/config';

const SurvivorLabel = styled.div`
  color: ${props => props.theme.colors.white};
`;

const StoryTitle = styled.h1`
  color: ${props => props.theme.colors.white};
  max-width: 680px;
`;

const StoryTitleBold = styled.span`
  font-weight: 600;
  display: block;
`;

const StoryTitleRegular = styled.span`
  font-weight: 400;
  display: block;
`;

const StoryButton = styled.button`
  background-color: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
`;

const StoryDescription = styled.p`
  color: ${props => props.theme.colors.white};
`;

const Hero = ({ componentData, pageData }) => {
  // Get hero data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);
  
  // Legacy Redux state (kept for fallback, but not actively used)
  const { heroContent, survivorStory } = useSelector((state) => state.hero);
  
<<<<<<< HEAD
  // Build background style with dynamic image - hooks must be called before early returns
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // IMPORTANT: Return null immediately while loading to prevent showing fallback data first
  // This check must come before computing any fallback data
  if (globalLoading) {
    return null;
  }
  
  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
=======
>>>>>>> eea4f14276cdf59bc3dad53c926a253e23d69ad6
  // If componentData is provided, use it directly; otherwise get from globalData
  const heroSection = componentData || getSectionData(globalData, 'hero');
  
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

  // Don't show fallback data while loading - wait for Strapi data
  const fallbackStory = {
    label: 'Survivor Stories',
    title: 'Andrea... A hero, a fighter..\n Know her journey..',
    description: 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.',
    buttonText: "Read Andrea's Story",
    buttonUrl: '#'
  };

  // Map Strapi API fields to component fields
  // Don't use fallback while loading - wait for Strapi data to load first
  const storyData = heroSection ? {
    label: heroSection.heading,
    title: heroSection.sub_heading,
    description: heroSection.description,
    buttonText: heroSection.CTAs?.[0]?.text,
    buttonUrl: heroSection.CTAs?.[0]?.URL
  } : (survivorStory || (hideFallbacks ? null : fallbackStory));

<<<<<<< HEAD
  // Get background image from global data or fallback
  // Don't use fallback image while loading
  const backgroundImage = formatMedia(heroSection?.image) 
    || formatMedia(heroContent?.backgroundImage)
    || (hideFallbacks ? null : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920');

  const shouldHideHero = hideFallbacks && (!storyData || !storyData.title || !backgroundImage);

  if (shouldHideHero) {
    return null;
  }

  const backgroundStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(54, 69, 79, 0.57) 40%, rgba(54, 69, 79, 0) 70%, transparent 100%), radial-gradient(circle at 59% 40%, rgba(54, 69, 79, 0.26) 0%, rgba(54, 69, 79, 0) 100%), url('${backgroundImage}')`,
    // background: linear-gradient(0deg, rgba(54, 69, 79, 0.26) 0%, rgba(54, 69, 79, 0) 100%);

    backgroundSize: isMobile ? 'cover' : 'auto, auto, 1558px 977px',
    backgroundPosition: isMobile ? 'center' : 'center, center, -13px -124px',
    backgroundRepeat: 'no-repeat',
  };

=======
>>>>>>> eea4f14276cdf59bc3dad53c926a253e23d69ad6
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='homeHero_sec'>
      <div className='home-hero-banner'>
        <div className='ratio'>
            <img src="../images/home-hero.jpg" alt="" />
        </div>
      </div>
      <div className='heroContent_wrap'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className='containerWrapper'>
            <div className='commContent_wrap'>
            <SurvivorLabel className='contentLabel'>
              {storyData.label || 'SURVIVOR STORIES'}
            </SurvivorLabel>
            
            <StoryTitle className='title-1'>
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

            <div className='storyCard_wrap'>
              <StoryButton className='btn btn-pink-solid' as="a" href={storyData.buttonUrl || '#'}>{storyData.buttonText || "Read Andrea's Story"}</StoryButton>
              <StoryDescription className='text-16'>
                {storyData.description || 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.'}
              </StoryDescription>
            </div>
            </div>
          </div>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};

export default Hero;

