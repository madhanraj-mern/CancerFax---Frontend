import React, { memo } from 'react';
import styled from 'styled-components';

const FAQHero = () => {
  return (
    <HeroContainer>
      <GradientLayer1 />
      <GradientLayer2 />
      <RotatedGradient />
      <ContentWrapper>
        <MainTitle>Frequently Asked Questions</MainTitle>
        <Description>High on Questions? We've Got Higher Answers.</Description>
      </ContentWrapper>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 350px;
  }
`;

const GradientLayer1 = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0e7490 0%, #022c22 100%);
  z-index: 1;
`;

const GradientLayer2 = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, #0e7490 0%, #374151 100%);
  z-index: 2;
`;

const RotatedGradient = styled.div`
  position: absolute;
  left: 275px;
  top: 281.46px;
  width: 1440px;
  height: 639.19px;
  background: linear-gradient(to bottom left, #a5f3fc 0%, rgba(165, 243, 252, 0.2) 50%, rgba(165, 243, 252, 0) 100%);
  transform: rotate(-21.23deg);
  transform-origin: top left;
  z-index: 3;
  
  @media (max-width: 1400px) {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 272px;
  width: 100%;
  padding: 56px 112px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  z-index: 4;
  
  @media (max-width: 1200px) {
    padding: 40px 60px;
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
    gap: 24px;
    top: 200px;
  }
  
  @media (max-width: 480px) {
    padding: 32px 20px;
    gap: 20px;
    top: 150px;
  }
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  color: #FFFFFF;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 40px;
    line-height: 50px;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 42px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 36px;
  }
`;

const Description = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #FFFFFF;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

export default memo(FAQHero);
