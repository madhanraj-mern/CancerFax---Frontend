import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSectionData, formatMedia } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';

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
    title: 'Andrea... A hero, a fighter..\n Know her journey..',
    description: 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.',
    buttonText: "Read Andrea's Story"
  });

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

