import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchGetInTouchSection } from '../../store/slices/getInTouchSlice';
import { getMediaUrl } from '../../services/api';

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
    background: url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920') center/cover;
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

const GetInTouch = () => {
  const dispatch = useDispatch();
  const { sectionContent, loading, error } = useSelector((state) => state.getInTouch);

  useEffect(() => {
    dispatch(fetchGetInTouchSection());
  }, [dispatch]);

  // Fallback content for when Strapi data is not yet available
  const defaultContent = {
    label: 'GET IN TOUCH',
    title: 'When Every Decision Matters, Start with the Right Guidance',
    description: 'Our experts review your case, connect you to breakthrough therapies, and support you at every stage of your treatment journey.',
    buttonText: 'Submit Reports For Expert Review',
    buttonLink: '#submit-reports',
  };

  // Use Strapi data or fallback
  const content = sectionContent || defaultContent;

  return (
    <Section id="get-in-touch">
      <Container>
        <ContentWrapper>
          <LeftContent>
            <Label>{content.label || 'GET IN TOUCH'}</Label>
            <Title>{content.title || 'When Every Decision Matters, Start with the Right Guidance'}</Title>
          </LeftContent>
          
          <RightContent>
            <Description>
              {content.description || 'Our experts review your case, connect you to breakthrough therapies, and support you at every stage of your treatment journey.'}
            </Description>
            <CTAButton 
              as={content.buttonLink ? "a" : "button"} 
              href={content.buttonLink || undefined}
            >
              {content.buttonText || 'Submit Reports For Expert Review'}
            </CTAButton>
          </RightContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default GetInTouch;

