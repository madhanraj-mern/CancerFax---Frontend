import React, { useEffect, Suspense, lazy } from 'react';
import styled from 'styled-components';
import ContactHeader from '../components/ContactHeader/ContactHeader';
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
  background: #F7F8FA;
`;

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ContactPage>
      <ContactHeader />
      <ContactHero />
      
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
  background: #F7F8FA;
`;

export default Contact;

