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
  padding: 60px 120px 80px;
  background: #F7F8FA;

  @media (max-width: 968px) {
    padding: 40px 20px 60px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const SuperTitle = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.20em;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #36454F;
  margin: 0;
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 1.05em;
  letter-spacing: -0.04em;
  color: #36454F;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 56px;
  }

  @media (max-width: 768px) {
    font-size: 42px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export default memo(ContactHero);


