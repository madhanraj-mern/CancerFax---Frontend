import React, { memo } from 'react';
import styled from 'styled-components';

const FAQHero = () => {
  return (
    <HeroContainer>
      <ContentWrapper>
        <SuperTitle>FAQ</SuperTitle>
        <MainTitle>Frequently Asked Questions</MainTitle>
        <Description>
          Find answers to common questions about our services, treatments, and processes
        </Description>
      </ContentWrapper>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  padding: 80px 120px 100px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

  @media (max-width: 1024px) {
    padding: 60px 60px 80px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px 60px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

const SuperTitle = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #FF69B4;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 56px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #36454F;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export default memo(FAQHero);
