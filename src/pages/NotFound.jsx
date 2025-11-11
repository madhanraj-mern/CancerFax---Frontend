import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  text-align: center;
  background: #FAF5F0;
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 72px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px;

  @media (max-width: 768px) {
    font-size: 54px;
  }

  @media (max-width: 480px) {
    font-size: 42px;
  }
`;

const Message = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 18px;
  line-height: 28px;
  color: #4B5563;
  max-width: 520px;
  margin: 0 0 32px;

  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 105, 180, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NotFound = ({ message = "The page you're looking for isn't available right now." }) => {
  return (
    <PageWrapper>
      <Navigation />
      <Content>
        <Title>404</Title>
        <Message>{message}</Message>
        <ActionButton href="/">Back to Home</ActionButton>
      </Content>
      <Footer />
    </PageWrapper>
  );
};

export default NotFound;

