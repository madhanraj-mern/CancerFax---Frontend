import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchClinicalTrialsAboutSection } from '../../store/slices/clinicalTrialsAboutSlice';
import { getMediaUrl } from '../../services/api';

const Section = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  background: #F8F8F8;
  padding: 100px 0;
  box-sizing: border-box;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    padding: 80px 0;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    padding: 50px 0;
  }
`;

const Container = styled.div`
  width: 1440px;
  max-width: 100%;
  height: 658px;
  margin: 0 auto;
  padding: 0 60px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 40px;
  position: relative;
  opacity: 1;
  transform: rotate(0deg);
  
  @media (max-width: 1440px) {
    width: 100%;
    height: auto;
    min-height: 658px;
  }
  
  @media (max-width: 1024px) {
    padding: 0 40px;
    gap: 32px;
    min-height: auto;
  }
  
  @media (max-width: 768px) {
    padding: 0 40px;
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
    min-height: auto;
  }
  
  @media (max-width: 480px) {
    padding: 0 24px;
    gap: 32px;
    min-height: auto;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
  max-width: 100%;
  
  @media (max-width: 768px) {
    align-items: center;
    gap: 24px;
  }
`;

const Label = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 3px;
  line-height: 100%;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 11px;
    letter-spacing: 2.5px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
    letter-spacing: 2px;
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
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  
  @media (max-width: 1024px) {
    font-size: 38px;
    line-height: 48px;
    letter-spacing: -0.8px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 44px;
    letter-spacing: -0.7px;
  }
  
  @media (max-width: 480px) {
    font-size: 30px;
    line-height: 38px;
    letter-spacing: -0.5px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 425px;
  height: 518px;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    width: 350px;
    height: 450px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 425px;
    height: 518px;
    margin: 0 auto;
    order: -1;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    height: 450px;
  }
`;

const BackgroundImageHolder = styled.div`
  position: absolute;
  width: 425px;
  height: 418px;
  top: 120px;
  left: 0px;
  border-radius: 40px;
  opacity: 1;
  transform: rotate(0deg);
  overflow: hidden;
  background: #36454F;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 1024px) {
    width: 350px;
    height: 345px;
    top: 100px;
    left: 0;
    position: relative;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 425px;
    height: 418px;
    top: 120px;
    left: 0;
    position: relative;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    height: 350px;
    top: 100px;
    left: 0;
    position: relative;
  }
`;

const ForegroundImage = styled.div`
  position: absolute;
  width: 327px;
  height: 484px;
  top: 124px;
  left: 480px;
  opacity: 1;
  transform: rotate(0deg);
  overflow: hidden;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 1024px) {
    width: 270px;
    height: 400px;
    top: 45px;
    left: 40px;
    position: relative;
  }
  
  @media (max-width: 768px) {
    width: 327px;
    height: 484px;
    top: 54px;
    left: 50px;
    position: relative;
  }
  
  @media (max-width: 480px) {
    width: 280px;
    height: 415px;
    top: 45px;
    left: 40px;
    position: relative;
  }
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
  max-width: 100%;
  
  @media (max-width: 768px) {
    align-items: center;
    gap: 24px;
  }
`;

const Description = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  color: ${props => props.theme.colors.primary};
  line-height: 24px;
  letter-spacing: 0px;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  
  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 22px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const ExploreButton = styled.a`
  font-family: ${props => props.theme.fonts.body};
  padding: 18px 38px;
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 38px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;
  white-space: nowrap;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 15px;
    align-self: center;
  }
  
  @media (max-width: 480px) {
    padding: 14px 28px;
    font-size: 14px;
    width: 100%;
    text-align: center;
  }
`;

const ClinicalTrialsAbout = () => {
  const dispatch = useDispatch();
  const { sectionContent, loading, error } = useSelector((state) => state.clinicalTrialsAbout);

  useEffect(() => {
    dispatch(fetchClinicalTrialsAboutSection());
  }, [dispatch]);

  // Fallback data
  const fallbackContent = {
    label: 'ABOUT CANCERFAX',
    title: 'Connecting You to Global Trials',
    description: 'Discover and join advanced clinical trials from leading research centers worldwide. We connect patients with breakthrough treatments and innovative therapies beyond borders. Wherever you are, hope is within reach.',
    buttonText: 'Explore All Ongoing Trials',
    buttonUrl: '/clinical-trials',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800'
  };

  const content = sectionContent || fallbackContent;

  // Get image URLs from Strapi or use fallbacks
  const imageUrl = content?.image?.data?.attributes?.url 
    ? getMediaUrl(content.image.data.attributes.url)
    : (content?.image || fallbackContent.image);

  const backgroundImageUrl = content?.backgroundImage?.data?.attributes?.url 
    ? getMediaUrl(content.backgroundImage.data.attributes.url)
    : '/images/background.png';

  const foregroundImageUrl = content?.foregroundImage?.data?.attributes?.url 
    ? getMediaUrl(content.foregroundImage.data.attributes.url)
    : '/images/Attached_image.png';

  return (
    <Section>
      <Container>
        <LeftContent>
          <Label>{content.label}</Label>
          <Title>{content.title}</Title>
        </LeftContent>
        
        <ImageContainer>
          <BackgroundImageHolder>
            {backgroundImageUrl && (
              <img src={backgroundImageUrl} alt="Background" />
            )}
          </BackgroundImageHolder>
        </ImageContainer>
        <ForegroundImage>
          <img src={foregroundImageUrl} alt={content.title} />
        </ForegroundImage>
        
        <RightContent>
          <Description>
            {content.description}
          </Description>
          <ExploreButton href={content.buttonUrl || '#'}>
            {content.buttonText}
          </ExploreButton>
        </RightContent>
      </Container>
    </Section>
  );
};

export default ClinicalTrialsAbout;

