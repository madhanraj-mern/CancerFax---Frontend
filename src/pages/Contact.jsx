import React, { useEffect, Suspense, lazy } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import ContactHero from '../components/ContactHero/ContactHero';
import DedicatedSupport from '../components/DedicatedSupport/DedicatedSupport';
import PartnerHospitals from '../components/PartnerHospitals/PartnerHospitals';
import LocationNetwork from '../components/LocationNetwork/LocationNetwork';
import SuccessStories from '../components/SuccessStories/SuccessStories';
import VideoTestimonials from '../components/VideoTestimonials/VideoTestimonials';
import Footer from '../components/Footer/Footer';

// Lazy load only the heavy form component
const ContactFormSection = lazy(() => import('../components/ContactFormSection/ContactFormSection'));

// Loading placeholder component
const LoadingSection = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FAF5F0;
`;

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ContactPage>
      <ContactHero />
      <NavigationWrapper>
        <Navigation darkText={true} />
      </NavigationWrapper>
      
      <Suspense fallback={<LoadingSection>Loading...</LoadingSection>}>
        <ContactFormSection />
      </Suspense>
      
      <PartnerHospitals />
      <DedicatedSupport />
      <LocationNetwork showButtons={false} />
      <SuccessStories />
      <VideoTestimonials />
      <Footer />
    </ContactPage>
  );
};

const ContactPage = styled.div`
  width: 100%;
  background: #FAF5F0;
  min-height: 100vh;
  position: relative;
`;

const NavigationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
`;

export default Contact;

