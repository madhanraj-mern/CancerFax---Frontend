import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData, formatRichText, formatMedia } from '../../utils/strapiHelpers';
import { hideFallbacks } from '../../utils/config';

const Section = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  padding: 100px 0;
  background: transparent;
  overflow: hidden;
  box-sizing: border-box;
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: calc(100% - 40px);
    background: linear-gradient(135deg, #3D4F5C 0%, #2C3E50 100%);
    z-index: 0;
    pointer-events: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: calc(100% - 40px);
    background-image: ${props => props.bgImage ? `url('${props.bgImage}')` : 'none'};
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    z-index: 1;
    pointer-events: none;
  }
  
  @media (max-width: 1200px) {
    padding: 90px 0;
  }
  
  @media (max-width: 1024px) {
    padding: 70px 0;
  }
  
  @media (max-width: 768px) {
    padding: 50px 0;
    
    &::after,
    &::before {
      top: 15px;
      height: calc(100% - 30px);
    }
    
    &::before {
      width: 100%;
      opacity: 0.12;
    }
  }
  
  @media (max-width: 480px) {
    padding: 40px 0;
    
    &::after,
    &::before {
      top: 10px;
      height: calc(100% - 20px);
    }
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    padding: 0 80px;
  }
  
  @media (max-width: 1024px) {
    padding: 0 60px;
  }
  
  @media (max-width: 768px) {
    padding: 0 32px;
  }
  
  @media (max-width: 480px) {
    padding: 0 20px;
  }
  
  @media (max-width: 360px) {
    padding: 0 16px;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  
  @media (max-width: 1200px) {
    gap: 60px;
  }
  
  @media (max-width: 1024px) {
    gap: 50px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (max-width: 480px) {
    gap: 28px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 1024px) {
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    gap: 18px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const Label = styled.p`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 11px;
    letter-spacing: 1.9px;
  }
  
  @media (max-width: 768px) {
    font-size: 10px;
    letter-spacing: 1.8px;
  }
  
  @media (max-width: 480px) {
    font-size: 9px;
    letter-spacing: 1.6px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', ${props => props.theme.fonts.heading};
  font-size: 40px;
  font-weight: 520;
  color: ${props => props.theme.colors.white};
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin: 0;
  
  @media (max-width: 1200px) {
    font-size: 38px;
  }
  
  @media (max-width: 1024px) {
    font-size: 36px;
    line-height: 1.2;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 1.25;
    letter-spacing: -0.3px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 1.3;
  }
  
  @media (max-width: 360px) {
    font-size: 24px;
  }
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  
  @media (max-width: 1024px) {
    gap: 28px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const Description = styled.p`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.65;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 15px;
    line-height: 1.7;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.75;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.8;
  }
  
  @media (max-width: 360px) {
    font-size: 12px;
  }
`;

const CTAButton = styled.button`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  padding: 18px 40px;
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 40px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  white-space: nowrap;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 4px 14px rgba(255, 105, 180, 0.3);
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 1024px) {
    padding: 16px 36px;
    font-size: 15px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 16px 32px;
    font-size: 14px;
    text-align: center;
    justify-content: center;
    align-self: stretch;
    white-space: normal;
  }
  
  @media (max-width: 480px) {
    padding: 14px 28px;
    font-size: 13px;
    border-radius: 30px;
  }
  
  @media (max-width: 360px) {
    padding: 12px 24px;
    font-size: 12px;
  }
`;

const GetInTouch = ({ componentData, pageData }) => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent } = useSelector((state) => state.getInTouch);

  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  const getInTouchSection = componentData || getSectionData(globalData, 'getInTouch');
  const hasSectionFallback = sectionContent && Object.keys(sectionContent || {}).length;
  const shouldHideMissingSection = hideFallbacks && !getInTouchSection && !hasSectionFallback;
  
  // Debug: Log to check if global data exists
  const globalLoading = useSelector(state => state.global?.loading);
  if (globalData && !globalLoading) {
    console.log('GetInTouch: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      getInTouchSection: !!getInTouchSection,
      sectionData: getInTouchSection ? {
        heading: getInTouchSection.heading,
        subheading: getInTouchSection.subheading
      } : null
    });
  }

  // Fallback content for when Strapi data is not yet available
  const defaultContent = hideFallbacks ? null : {
    label: 'GET IN TOUCH',
    title: 'When Every Decision Matters, Start with the Right Guidance',
    description: 'Our experts review your case, connect you to breakthrough therapies, and support you at every stage of your treatment journey.',
    buttonText: 'Submit Reports For Expert Review',
    buttonLink: '#submit-reports',
  };

  // Map Strapi data: heading -> label, subheading -> title
  const content = getInTouchSection ? {
    label: getInTouchSection.heading || defaultContent?.label,
    title: getInTouchSection.subheading || defaultContent?.title,
    description: formatRichText(getInTouchSection.description) || getInTouchSection.description || defaultContent?.description,
    buttonText: getInTouchSection.cta?.text || defaultContent?.buttonText,
    buttonLink: getInTouchSection.cta?.URL || defaultContent?.buttonLink,
    backgroundColor: getInTouchSection.backgroundColor,
  } : (sectionContent || defaultContent);
  
  // Extract background image from Strapi
  const backgroundImage = formatMedia(getInTouchSection?.backgroundImage) || formatMedia(getInTouchSection?.image);
  const shouldHideGetInTouch = hideFallbacks && (!content?.label || !content?.title || (!backgroundImage && !content?.description));
  
  if (shouldHideMissingSection || shouldHideGetInTouch) {
    return null;
  }
  
  // Apply background color if provided
  const sectionStyle = content.backgroundColor ? { backgroundColor: content.backgroundColor } : {};

  return (
    <Section id="get-in-touch" bgImage={backgroundImage} style={sectionStyle}>
      <Container>
        <ContentWrapper>
          <LeftContent>
            <Label>{content.label || (hideFallbacks ? '' : 'GET IN TOUCH')}</Label>
            <Title>{content.title || (hideFallbacks ? '' : 'When Every Decision Matters, Start with the Right Guidance')}</Title>
          </LeftContent>
          
          <RightContent>
            <Description>
              {content.description || (hideFallbacks ? '' : 'Our experts review your case, connect you to breakthrough therapies, and support you at every stage of your treatment journey.')}
            </Description>
            {(content.buttonText || content.buttonLink || !hideFallbacks) && (
              <CTAButton 
                as={content.buttonLink ? "a" : "button"} 
                href={content.buttonLink || undefined}
              >
                {content.buttonText || (hideFallbacks ? '' : 'Submit Reports For Expert Review')}
              </CTAButton>
            )}
          </RightContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default GetInTouch;

