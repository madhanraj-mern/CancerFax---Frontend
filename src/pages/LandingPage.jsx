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

const SectionWrapper = styled.section`
  width: 100%;
  position: relative;
`;

const sanitizeSectionId = (value) => {
  if (!value || typeof value !== 'string') {
    return undefined;
  }

  return value
    .toLowerCase()
    .replace(/[^a-z0-9-\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const LandingPage = () => {
  const dispatch = useDispatch();
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);

  useEffect(() => {
    // Fetch global Strapi data for all sections from /api/global and /api/pages
    dispatch(fetchGlobalData());
  }, [dispatch]);

  // Add refresh mechanism: refetch data when page becomes visible (user switches back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Refetch data when user returns to the page (in case Strapi was updated)
        console.log('🔄 Page became visible, refreshing Strapi data...');
        dispatch(fetchGlobalData());
      }
    };

    // Add keyboard shortcut: Ctrl/Cmd + Shift + R to force refresh
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        console.log('🔄 Force refreshing Strapi data...');
        dispatch(fetchGlobalData());
      }
    };

    // Expose refresh function to window for easy debugging
    window.refreshStrapiData = () => {
      console.log('🔄 Manual refresh triggered via window.refreshStrapiData()');
      dispatch(fetchGlobalData());
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('keydown', handleKeyPress);
      delete window.refreshStrapiData;
    };
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

  // Canonical mapping between Strapi component keys and React sections + human-readable labels
  const componentMetadata = {
    'dynamic-zone.hero': {
      Component: Hero,
      label: 'Survivor Stories',
      sectionId: 'survivor-stories',
    },
    'dynamic-zone.slider-section': {
      Component: ClinicalTrialsShowcase,
      label: 'Clinical Trials Slider',
      sectionId: 'clinical-trials-slider',
    },
    'dynamic-zone.about': {
      Component: AboutSection,
      label: 'About CancerFax',
      sectionId: 'about-cancerfax',
    },
    'dynamic-zone.therapy-section': {
      Component: InnovativeCare,
      label: 'Innovative Care',
      sectionId: 'innovative-care',
    },
    'dynamic-zone.testimonial-slider': {
      Component: Testimonials,
      label: 'Testimonials',
      sectionId: 'patient-testimonials',
    },
    'dynamic-zone.statistics': {
      Component: ClinicalTrialsAbout,
      label: 'Connecting You to Global Trials',
      sectionId: 'clinical-trials-about',
    },
    'dynamic-zone.trials-section': {
      Component: ClinicalTrials,
      label: 'Global Breakthroughs',
      sectionId: 'global-breakthroughs',
    },
    'dynamic-zone.get-in-touch': {
      Component: GetInTouch,
      label: 'Get in Touch',
      sectionId: 'get-in-touch',
    },
    'dynamic-zone.location': {
      Component: LocationNetwork,
      label: 'Location Network',
      sectionId: 'location-network',
      extraProps: { showButtons: true },
    },
    'dynamic-zone.testimonials': {
      Component: VideoTestimonials,
      label: 'Video Testimonials',
      sectionId: 'video-testimonials',
    },
    'dynamic-zone.how-it-works': {
      Component: HowItWorks,
      label: 'How It Works',
      sectionId: 'how-it-works',
    },
    'dynamic-zone.resources': {
      Component: Resources,
      label: 'Resources & Insights',
      sectionId: 'resources',
    },
    // Alternate keys seen in Strapi data
    'dynamic-zone.video-testimonials': {
      Component: VideoTestimonials,
      label: 'Video Testimonials',
      sectionId: 'video-testimonials',
    },
    'dynamic-zone.clinical-trials-showcase': {
      Component: ClinicalTrialsShowcase,
      label: 'Clinical Trials Slider',
      sectionId: 'clinical-trials-slider',
    },
    'dynamic-zone.innovative-care': {
      Component: InnovativeCare,
      label: 'Innovative Care',
      sectionId: 'innovative-care',
    },
  };

  const defaultComponentOrder = [
    'dynamic-zone.hero',
    'dynamic-zone.slider-section',
    'dynamic-zone.about',
    'dynamic-zone.therapy-section',
    'dynamic-zone.testimonial-slider',
    'dynamic-zone.statistics',
    'dynamic-zone.trials-section',
    'dynamic-zone.get-in-touch',
    'dynamic-zone.location',
    'dynamic-zone.testimonials',
    'dynamic-zone.how-it-works',
    'dynamic-zone.resources',
  ];
  
  // Components that don't have a Strapi mapping (render in default position if not in dynamic zone)
  // Render components dynamically based on Strapi dynamic zone order
  const renderDynamicComponents = () => {
    // Show loading state or nothing while data is being fetched
    // This prevents showing fallback data before Strapi data loads
    if (globalLoading || !globalData) {
      return null; // Or return a loading spinner if desired
    }

    const dynamicZone = globalData?.dynamicZone;

    if (!dynamicZone || dynamicZone.length === 0) {
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

    // Render components in the order they appear in Strapi dynamic zone
    // Filter out Statistics section if needed (component type: 'dynamic-zone.statistics')
    const dynamicComponents = dynamicZone
      .filter(item => item?.__component)
      .filter(item => item?.isActive !== false)
      .map((item, index) => {
        const metadata = componentMetadata[item.__component];

        if (!metadata) {
          console.warn(`LandingPage: Unknown component type "${item.__component}" at index ${index}`, {
            componentType: item.__component,
            availableTypes: Object.keys(componentMetadata)
          });
          return null;
        }

        const { Component, extraProps, sectionId, label } = metadata;
        const safeSectionId = sanitizeSectionId(sectionId);

        // Pass props based on component type
        const props = {
          componentData: item,
          pageData: globalData,
          sectionMeta: {
            id: sectionId,
            label,
          },
          ...(extraProps || {}),
        };

        return (
          <SectionWrapper
            key={`${safeSectionId || item.__component}-${index}`}
            id={safeSectionId}
            data-section-key={item.__component}
            data-section-label={label || undefined}
            className={`landing-section ${safeSectionId || ''}`.trim()}
          >
            <Component {...props} />
          </SectionWrapper>
        );
      })
      .filter(component => component !== null); // Remove null components

    // Add components that don't have Strapi mapping (render after dynamic components)
    if (dynamicComponents.length > 0) {
      return dynamicComponents;
    }

    const fallbackComponents = defaultComponentOrder
      .map((componentKey, index) => {
        const metadata = componentMetadata[componentKey];
        if (!metadata) {
          return null;
        }
        const { Component, extraProps, sectionId, label } = metadata;
        const safeSectionId = sanitizeSectionId(sectionId);

        return (
          <SectionWrapper
            key={`fallback-${safeSectionId || componentKey}-${index}`}
            id={safeSectionId}
            data-section-key={componentKey}
            data-section-label={label || undefined}
            className={`landing-section ${safeSectionId || ''}`.trim()}
          >
            <Component {...(extraProps || {})} />
          </SectionWrapper>
        );
      })
      .filter(Boolean);

    return fallbackComponents;
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
          label: componentMetadata[item.__component]?.label || null,
          hasMapping: !!componentMetadata[item.__component],
        })),
        // Log all available components with their data status
        availableComponents: globalData.dynamicZone.map(item => ({
          component: item.__component,
          label: componentMetadata[item.__component]?.label || null,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

