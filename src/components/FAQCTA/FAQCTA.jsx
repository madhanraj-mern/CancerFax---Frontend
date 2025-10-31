import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FAQCTA = () => {
  return (
    <CTAContainer>
      <ContentWrapper>
        <CTATitle>Still have questions?</CTATitle>
        <CTADescription>
          Our team is here to help. Get in touch with us for personalized support.
        </CTADescription>
        <CTAButton to="/contact">
          Contact Our Team
        </CTAButton>
      </ContentWrapper>
    </CTAContainer>
  );
};

const CTAContainer = styled.section`
  width: 100%;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  padding: 80px 20px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const CTATitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const CTADescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const CTAButton = styled(Link)`
  padding: 16px 40px;
  background: #FFFFFF;
  color: #FF69B4;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
    background: #FFF0F6;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 14px 32px;
    font-size: 15px;
  }
`;

export default memo(FAQCTA);

