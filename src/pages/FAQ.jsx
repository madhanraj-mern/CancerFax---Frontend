import React, { useEffect } from 'react';
import styled from 'styled-components';
import ContactHeader from '../components/ContactHeader/ContactHeader';
import FAQHero from '../components/FAQHero/FAQHero';
import FAQSection from '../components/FAQSection/FAQSection';
import Footer from '../components/Footer/Footer';

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <FAQPage>
      <ContactHeader />
      <FAQHero />
      <FAQSection />
      <Footer />
    </FAQPage>
  );
};

const FAQPage = styled.div`
  width: 100%;
  background: #F7F8FA;
`;

export default FAQ;

