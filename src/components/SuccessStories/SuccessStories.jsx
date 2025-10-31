import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchSuccessStories } from '../../store/slices/successStoriesSlice';
import { getMediaUrl } from '../../services/api';

// Default fallback data
const defaultData = {
  subtitle: 'JOY OF SUCCESS',
  title: 'Stories of Strength and Healing',
  description: 'Discover the journeys of courage, resilience, and hope from patients and families whose lives have been touched by our care and innovative treatments',
  stories: [],
};

const SuccessStories = () => {
  const dispatch = useDispatch();
  const { sectionData, stories, loading } = useSelector((state) => state.successStories);

  useEffect(() => {
    dispatch(fetchSuccessStories());
  }, [dispatch]);

  // Extract data with fallbacks
  const subtitle = sectionData?.attributes?.subtitle || defaultData.subtitle;
  const title = sectionData?.attributes?.title || defaultData.title;
  const description = sectionData?.attributes?.description || defaultData.description;
  const displayStories = stories.length > 0 ? stories : defaultData.stories;

  return (
    <SectionContainer>
      <ContentWrapper>
        <HeaderSection>
          <LeftColumn>
            <Subtitle>{subtitle}</Subtitle>
            <Title>{title}</Title>
          </LeftColumn>
          <RightColumn>
            <Description>{description}</Description>
          </RightColumn>
        </HeaderSection>

        {displayStories.length > 0 && (
          <StoriesGrid>
            {displayStories.map((story, index) => {
              const storyData = story.attributes || story;
              const storyTitle = storyData.title;
              const storyExcerpt = storyData.excerpt;
              const patientName = storyData.patientName;
              const treatment = storyData.treatment;
              
              // Get image URL
              let imageUrl = null;
              if (storyData.image?.data?.attributes?.url) {
                imageUrl = getMediaUrl(storyData.image.data.attributes.url);
              }

              return (
                <StoryCard key={story.id || index}>
                  {imageUrl && (
                    <StoryImage>
                      <img src={imageUrl} alt={storyTitle} />
                    </StoryImage>
                  )}
                  <StoryContent>
                    <StoryHeader>
                      <StoryTitle>{storyTitle}</StoryTitle>
                      {treatment && <Treatment>{treatment}</Treatment>}
                    </StoryHeader>
                    <StoryExcerpt>{storyExcerpt}</StoryExcerpt>
                    {patientName && <PatientName>— {patientName}</PatientName>}
                  </StoryContent>
                </StoryCard>
              );
            })}
          </StoriesGrid>
        )}
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  background: #FFFFFF;
  padding: 100px 20px;
  
  @media (max-width: 968px) {
    padding: 80px 20px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 120px;
  
  @media (max-width: 1200px) {
    padding: 0 60px;
  }
  
  @media (max-width: 968px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeaderSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: start;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 40px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Subtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #475569;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 11px;
    letter-spacing: 3px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 550;
  line-height: 1.2;
  color: #1e293b;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 42px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  
  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 450;
  line-height: 1.7;
  color: #64748b;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const StoryCard = styled.div`
  background: #F7F8FA;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`;

const StoryImage = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${StoryCard}:hover & img {
    transform: scale(1.05);
  }
`;

const StoryContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const StoryHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StoryTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;
`;

const Treatment = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #FF69B4;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StoryExcerpt = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PatientName = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  font-style: italic;
  color: #475569;
  margin: 0;
`;

export default memo(SuccessStories);

