import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData, formatRichText, formatMedia } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';

const ContentWrapper = styled.div`
  display: flex;
  gap: 92px;
  align-items: center;
  
  @media (max-width: 1200px) {
    gap: 60px;
  }
  
  @media (max-width: 992px) {
    gap: 50px;
    flex-wrap: wrap;
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
  flex: 0 0 648px;
  @media (max-width: 992px) {
    flex: 0 0 100%;
  }
`;

const CommContent = styled.div`
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
  color: ${props => props.theme.colors.white};
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.white};
`;

const RightContent = styled.div`
    flex: 1 1 auto;
`;

const CommContentRight = styled.div`
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
  color: ${props => props.theme.colors.white};
`;

const CTAButton = styled.button`
  max-width: 324px;
    @media (max-width: 575px) {
      max-width: 100%;
    }
`;

const GetInTouch = ({ componentData, pageData }) => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent } = useSelector((state) => state.getInTouch);

  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  const getInTouchSection = componentData || getSectionData(globalData, 'getInTouch');
  
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
  const defaultContent = {
    label: 'GET IN TOUCH',
    title: 'When Every Decision Matters, Start with the Right Guidance',
    description: 'Our experts review your case, connect you to breakthrough therapies, and support you at every stage of your treatment journey.',
    buttonText: 'Submit Reports For Expert Review',
    buttonLink: '#submit-reports',
  };

  // Map Strapi data: heading -> label, subheading -> title
  const content = getInTouchSection ? {
    label: getInTouchSection.heading || defaultContent.label,
    title: getInTouchSection.subheading || defaultContent.title,
    description: formatRichText(getInTouchSection.description) || getInTouchSection.description || defaultContent.description,
    buttonText: getInTouchSection.cta?.text || defaultContent.buttonText,
    buttonLink: getInTouchSection.cta?.URL || defaultContent.buttonLink,
    backgroundColor: getInTouchSection.backgroundColor,
  } : (sectionContent || defaultContent);
  
  // Extract background image from Strapi
  const backgroundImage = formatMedia(getInTouchSection?.backgroundImage) || formatMedia(getInTouchSection?.image);
  
  
  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <section className='getInTouch_sec py-120' id="get-in-touch">
      <div className='containerWrapper z-2 position-relative'>
        <ContentWrapper>
          <LeftContent>
          <ScrollAnimationComponent animationVariants={slideLeft}>
            <CommContent className='commContent_wrap'>
              <Label className='contentLabel'>{content.label || 'GET IN TOUCH'}</Label>
              <Title className='title-3'>{content.title || 'When Every Decision Matters, Start with the Right Guidance'}</Title>
            </CommContent>
          </ScrollAnimationComponent>
          </LeftContent>
          
          <RightContent>
            <ScrollAnimationComponent animationVariants={slideRight}>
            <CommContentRight className='commContent_wrap'>
            <Description className='text-16'>
              {content.description || 'Our experts review your case, connect you to breakthrough therapies, and support you at every stage of your treatment journey.'}
            </Description>
            <CTAButton 
              className='btn btn-pink-solid'
              as={content.buttonLink ? "a" : "button"} 
              href={content.buttonLink || undefined}
            >
              {content.buttonText || 'Submit Reports For Expert Review'}
            </CTAButton>
            </CommContentRight>
            </ScrollAnimationComponent>
          </RightContent>
        </ContentWrapper>
      </div>
    </section>
  );
};

export default GetInTouch;

