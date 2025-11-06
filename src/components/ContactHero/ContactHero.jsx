import React, { memo } from 'react';
import styled from 'styled-components';

const ContactHero = () => {
  return (
    <HeroContainer>
      <ContentWrapper>
        <SuperTitle>Contact us</SuperTitle>
        <MainTitle>Get in touch with our team</MainTitle>
      </ContentWrapper>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  padding: 56px 112px 80px;
  background: linear-gradient(to bottom, #FAF5F0 0%, #E5E7EB 100%);
  border-top: 1px solid #E5E7EB;

  @media (max-width: 1200px) {
    padding: 48px 60px 70px;
  }

  @media (max-width: 968px) {
    padding: 40px 40px 60px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px 60px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const SuperTitle = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.2em;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #374151;
  margin: 0;
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  letter-spacing: -0.02em;
  color: #374151;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 52px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 46px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    line-height: 42px;
  }
`;

export default memo(ContactHero);


