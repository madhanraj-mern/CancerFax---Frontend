import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import FAQHero from '../components/FAQHero/FAQHero';
import FAQSection from '../components/FAQSection/FAQSection';
import Footer from '../components/Footer/Footer';

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <FAQPage>
      <FAQHero />
      <NavigationWrapper>
        <Navigation darkText={true} />
      </NavigationWrapper>
      <FAQSection />
      <Footer />
    </FAQPage>
  );
};

const FAQPage = styled.div`
  width: 100%;
  background: #FAF5F0;
  position: relative;
`;

const NavigationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
`;

export default FAQ;

