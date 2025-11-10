import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SEO from '../components/SEO/SEO';
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
import { fetchGlobalData } from '../store/slices/globalSlice';

const PageWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  
  @media (max-width: 1440px) {
    max-width: 100%;
  }
`;

const LandingPage = () => {
  const dispatch = useDispatch();
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);

  useEffect(() => {
    // Fetch global Strapi data for all sections from /api/global and /api/pages
    dispatch(fetchGlobalData());
  }, [dispatch]);

  // Debug: Log global data structure when it loads
  useEffect(() => {
    if (globalData && !globalLoading) {
      console.log('LandingPage: Global data loaded successfully', {
        hasDynamicZone: !!globalData.dynamicZone,
        dynamicZoneLength: globalData.dynamicZone?.length || 0,
        hasNavbar: !!globalData.navbar,
        hasFooter: !!globalData.footer,
        hasLogo: !!globalData.logo,
        hasContact: !!globalData.contact,
        hasSocialMediaLinks: !!globalData.social_media_links,
        allKeys: Object.keys(globalData),
      });
    }
  }, [globalData, globalLoading]);

  // Component mapping: Maps Strapi component types to React components
  const componentMap = {
    'dynamic-zone.hero': Hero,
    'dynamic-zone.slider-section': ClinicalTrialsShowcase,
    'dynamic-zone.about': AboutSection,
    'dynamic-zone.therapy-section': InnovativeCare,
    'dynamic-zone.testimonials': Testimonials,
    'dynamic-zone.testimonial-slider': VideoTestimonials,
    'dynamic-zone.trials-section': ClinicalTrials,
    'dynamic-zone.get-in-touch': GetInTouch,
    'dynamic-zone.location': LocationNetwork,
    'dynamic-zone.how-it-works': HowItWorks,
    'dynamic-zone.resources': Resources,
    // Additional mappings if component names differ
    'dynamic-zone.clinical-trials-showcase': ClinicalTrialsShowcase,
    'dynamic-zone.innovative-care': InnovativeCare,
    'dynamic-zone.video-testimonials': VideoTestimonials,
    'dynamic-zone.statistics': AboutSection, // Statistics might be part of AboutSection
  };
  
  // Components that don't have a Strapi mapping (render in default position if not in dynamic zone)
  const componentsWithoutStrapiMapping = [
    ClinicalTrialsAbout,
  ];

  // Render components dynamically based on Strapi dynamic zone order
  const renderDynamicComponents = () => {
    if (!globalData || !globalData.dynamicZone || globalLoading) {
      // Fallback: render in default order if no dynamic zone data
      return (
        <>
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
        </>
      );
    }

    // Track which components from Strapi have been rendered
    const renderedComponents = new Set();
    
    // Render components in the order they appear in Strapi dynamic zone
    // Filter out Statistics section if needed (component type: 'dynamic-zone.statistics')
    const dynamicComponents = globalData.dynamicZone
      .filter((item, index) => {
        // Skip Statistics section (heading "About CancerFax") - remove if you want it back
        if (item.__component === 'dynamic-zone.statistics') {
          console.log('LandingPage: Skipping Statistics section at index', index);
          return false;
        }
        return true;
      })
      .map((item, index) => {
        const Component = componentMap[item.__component];
        
        if (!Component) {
          console.warn(`LandingPage: Unknown component type "${item.__component}" at index ${index}`, {
            componentType: item.__component,
            availableTypes: Object.keys(componentMap)
          });
          return null;
        }

        // Mark this component as rendered
        renderedComponents.add(item.__component);

        // Pass props based on component type
        const props = {};
        if (item.__component === 'dynamic-zone.location') {
          props.showButtons = true;
        }

        return <Component key={`${item.__component}-${index}`} {...props} />;
      })
      .filter(component => component !== null); // Remove null components

    // Add components that don't have Strapi mapping (render after dynamic components)
    const additionalComponents = componentsWithoutStrapiMapping.map((Component, index) => (
      <Component key={`additional-${index}`} />
    ));

    return [...dynamicComponents, ...additionalComponents];
  };

  // Debug: Log when global data loads
  useEffect(() => {
    if (globalData && !globalLoading && globalData.dynamicZone) {
      console.log('LandingPage: Global data loaded', {
        hasDynamicZone: !!globalData.dynamicZone,
        dynamicZoneLength: globalData.dynamicZone?.length || 0,
        hasNavbar: !!globalData.navbar,
        hasFooter: !!globalData.footer,
        // Log component order from Strapi
        componentOrder: globalData.dynamicZone.map((item, index) => ({
          index,
          componentType: item.__component,
          hasMapping: !!componentMap[item.__component],
        })),
        // Log all available components with their data status
        availableComponents: globalData.dynamicZone.map(item => ({
          component: item.__component,
          hasHeading: !!item.heading,
          hasSubheading: !!item.subheading || !!item.sub_heading,
          hasTherapy: !!item.Therapy && Array.isArray(item.Therapy),
          therapyCount: item.Therapy?.length || 0,
          hasSlide: !!item.Slide && Array.isArray(item.Slide),
          slideCount: item.Slide?.length || 0,
          hasTestimonials: !!item.Testimonials && Array.isArray(item.Testimonials),
          testimonialsCount: item.Testimonials?.length || 0,
          hasResources: !!item.resources && Array.isArray(item.resources),
          resourcesCount: item.resources?.length || 0,
        }))
      });
    }
  }, [globalData, globalLoading]);

  return (
    <PageWrapper>
      <SEO />
      <Navigation />
      {renderDynamicComponents()}
      <Footer />
    </PageWrapper>
  );
};

export default LandingPage;

