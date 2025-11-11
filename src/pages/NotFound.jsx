import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { fetchGlobalData } from '../store/slices/globalSlice';
import store from '../store';

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  
  /* Ensure content appears before footer */
  > * {
    order: 1;
  }
  
  > main {
    order: 1;
  }
  
  > div:last-child {
    order: 2;
  }
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 140px 24px 80px;
  text-align: center;
  background: #FAF5F0;
  order: 1;
  min-height: calc(100vh - 200px);
  position: relative;
  z-index: 1;
`;

const ErrorImage = styled.img`
  max-width: 60%;
  height: auto;
  margin: 0 0 32px;
  display: block;

  @media (max-width: 768px) {
    max-width: 50%;
  }

  @media (max-width: 480px) {
    max-width: 45%;
  }
`;

const MainHeading = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const SubText = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #4B5563;
  max-width: 520px;
  margin: 0 0 32px;

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: #3B4A54;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 24px;

  &:hover {
    background: #2C3942;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SupportLink = styled.a`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  color: #FF69B4;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #FF1493;
    text-decoration: underline;
  }
`;

const FooterWrapper = styled.div`
  order: 2;
  width: 100%;
  margin-top: auto;
  position: relative;
  z-index: 0;
`;

const NotFound = ({ message = "The page you're looking for isn't available right now." }) => {
  const dispatch = useDispatch();
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);

  // Fetch global data for navbar and footer
  useEffect(() => {
    const currentState = store.getState();
    const existingData = currentState?.global?.data;
    
    if (!existingData) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch]);

  // Only render footer when data is ready
  const shouldShowFooter = !globalLoading && globalData;

  return (
    <PageWrapper>
      <Navigation darkText={true} />
      <Content>
        <ErrorImage 
          src="/images/Frame 1618873775.png" 
          alt="404 Not Found" 
        />
        <MainHeading>Oops! Page not found.</MainHeading>
        <SubText>Sorry, the page you're looking for doesn't exist or has been moved. Check the URL.</SubText>
        <ActionButton href="/">Return To Homepage</ActionButton>
        <SupportLink href="/contact">Contact Support if you need further assistance.</SupportLink>
      </Content>
      {shouldShowFooter && (
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )}
    </PageWrapper>
  );
};

export default NotFound;

