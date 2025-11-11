import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO/SEO';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { fetchGlobalData } from '../store/slices/globalSlice';
import store from '../store';

// Lazy load components for code splitting and better performance
const Hero = lazy(() => import('../components/Hero/Hero'));
const ClinicalTrialsShowcase = lazy(() => import('../components/ClinicalTrialsShowcase/ClinicalTrialsShowcase'));
const InnovativeCare = lazy(() => import('../components/InnovativeCare/InnovativeCare'));
const Testimonials = lazy(() => import('../components/Testimonials/Testimonials'));
const ClinicalTrialsAbout = lazy(() => import('../components/ClinicalTrialsAbout/ClinicalTrialsAbout'));
const AboutSection = lazy(() => import('../components/AboutSection/AboutSection'));
const ClinicalTrials = lazy(() => import('../components/ClinicalTrials/ClinicalTrials'));
const HowItWorks = lazy(() => import('../components/HowItWorks/HowItWorks'));
const VideoTestimonials = lazy(() => import('../components/VideoTestimonials/VideoTestimonials'));
const Resources = lazy(() => import('../components/Resources/Resources'));
const GetInTouch = lazy(() => import('../components/GetInTouch/GetInTouch'));
const LocationNetwork = lazy(() => import('../components/LocationNetwork/LocationNetwork'));

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

// Loading placeholder component
const ComponentLoader = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// Memoized component metadata - only created once
const COMPONENT_METADATA = {
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
  // Alternate keys for compatibility
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


// Memoized sanitize function
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

  // Fetch global Strapi data on mount - only if not already loaded
  useEffect(() => {
    const currentState = store.getState();
    const existingData = currentState?.global?.data;
    
    if (!existingData) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch]);

  // Manual refresh mechanism (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const handleKeyPress = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
          e.preventDefault();
          dispatch(fetchGlobalData());
        }
      };

      window.refreshStrapiData = () => {
        dispatch(fetchGlobalData());
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        delete window.refreshStrapiData;
      };
    }
  }, [dispatch]);

  // Memoize fallback components to prevent re-creation
  const fallbackComponents = useMemo(() => (
    <>
      <Suspense fallback={<ComponentLoader />}>
        <Hero componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <ClinicalTrialsShowcase componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <AboutSection componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <InnovativeCare componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Testimonials componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <ClinicalTrialsAbout componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <ClinicalTrials componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <GetInTouch componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <LocationNetwork showButtons={true} componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <HowItWorks componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <VideoTestimonials componentData={null} pageData={globalData} />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Resources componentData={null} pageData={globalData} />
      </Suspense>
    </>
  ), [globalData]);

  // Memoize dynamic components rendering
  const renderDynamicComponents = useCallback(() => {
    if (globalLoading) {
      return null;
    }
    
    if (!globalData) {
      return fallbackComponents;
    }

    const dynamicZone = globalData?.dynamicZone;

    if (!dynamicZone || dynamicZone.length === 0) {
      return fallbackComponents;
    }

    // Filter and map components in one pass for better performance
    const dynamicComponents = dynamicZone
      .filter(item => item?.__component && item?.isActive !== false)
      .map((item, index) => {
        const metadata = COMPONENT_METADATA[item.__component];

        if (!metadata) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Unknown component type: ${item.__component}`);
          }
          return null;
        }

        const { Component, extraProps, sectionId, label } = metadata;
        const safeSectionId = sanitizeSectionId(sectionId);

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
            key={`${safeSectionId || item.__component}-${item.id || index}`}
            id={safeSectionId}
            data-section-key={item.__component}
            data-section-label={label || undefined}
            className={`landing-section ${safeSectionId || ''}`.trim()}
          >
            <Suspense fallback={<ComponentLoader />}>
              <Component {...props} />
            </Suspense>
          </SectionWrapper>
        );
      })
      .filter(Boolean);

    return dynamicComponents.length > 0 ? dynamicComponents : fallbackComponents;
  }, [globalData, globalLoading, fallbackComponents]);

  // Memoize the rendered components
  const renderedComponents = useMemo(() => renderDynamicComponents(), [renderDynamicComponents]);

  return (
    <PageWrapper>
      <SEO />
      <Navigation />
      {renderedComponents}
      <Footer />
    </PageWrapper>
  );
};

export default LandingPage;
