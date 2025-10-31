import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Hero from '../components/Hero/Hero';
import ClinicalTrialsShowcase from '../components/ClinicalTrialsShowcase/ClinicalTrialsShowcase';
import InnovativeCare from '../components/InnovativeCare/InnovativeCare';
import Testimonials from '../components/Testimonials/Testimonials';
import ClinicalTrialsAbout from '../components/ClinicalTrialsAbout/ClinicalTrialsAbout';
import AboutSection from '../components/AboutSection/AboutSection';
import ClinicalTrials from '../components/ClinicalTrials/ClinicalTrials';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import VideoTestimonials from '../components/VideoTestimonials/VideoTestimonials';
import Resources from '../components/Resources/Resources';
import GetInTouch from '../components/GetInTouch/GetInTouch';
import LocationNetwork from '../components/LocationNetwork/LocationNetwork';
import Footer from '../components/Footer/Footer';

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
`;

const LandingPage = () => {
  return (
    <PageWrapper>
      <Navigation />
      <Hero />
      <ClinicalTrialsShowcase />
      <AboutSection />
      <InnovativeCare />
      <Testimonials />
      <ClinicalTrialsAbout />
      <ClinicalTrials />
      <GetInTouch />
      <LocationNetwork showButtons={true} />
      <HowItWorks />
      <VideoTestimonials />
      <Resources />
      <Footer />
    </PageWrapper>
  );
};

export default LandingPage;

