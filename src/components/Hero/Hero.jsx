import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchHeroContent, fetchSurvivorStory } from '../../store/slices/heroSlice';
import { getMediaUrl } from '../../services/api';

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 700px;
  max-height: 100vh;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.3) 70%, transparent 100%),
              radial-gradient(circle at 59% 40%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
              url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920') center/cover;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  /* Apply exact background sizing and positioning for the image layer */
  background-size: auto, auto, 1558px 977px;
  background-position: center, center, -13px -124px;
  background-repeat: no-repeat;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: auto;
    min-height: 500px;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920') center/cover;
    background-size: cover;
    background-position: center;
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
  const dispatch = useDispatch();
  const { heroContent, survivorStory } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(fetchHeroContent());
    dispatch(fetchSurvivorStory());
  }, [dispatch]);

  const backgroundImage = heroContent?.backgroundImage?.data?.attributes?.url 
    ? getMediaUrl(heroContent.backgroundImage.data.attributes.url)
    : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920';

  const storyData = survivorStory || {
    label: 'Survivor Stories',
    title: 'Andrea... A hero, a fighter..\nKnow her journey..',
    description: 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.',
    buttonText: "Read Andrea's Story"
  };

  return (
    <HeroSection style={{ backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.3) 70%, transparent 100%), radial-gradient(circle at 59% 40%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url('${backgroundImage}')` }}>
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
            <StoryButton>{storyData.buttonText || "Read Andrea's Story"}</StoryButton>
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

