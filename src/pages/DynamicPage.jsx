import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
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
import { fetchPageBySlug, clearPageData } from '../store/slices/globalSlice';
import { fetchGlobalData } from '../store/slices/globalSlice';

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  padding: 40px;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px 0;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: #6B7280;
  margin: 0 0 32px 0;
`;

const BackButton = styled.button`
  padding: 14px 32px;
  background: #3B4A54;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2C3942;
    transform: translateY(-2px);
  }
`;

// Reserved routes that should use their own components (not dynamic pages)
// These routes are handled by specific components in App.js
const RESERVED_ROUTES = ['home', 'hospitals', 'contact', 'faq'];

const DynamicPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.global?.pageData);
  const pageLoading = useSelector(state => state.global?.pageLoading);
  const pageError = useSelector(state => state.global?.pageError);
  
  // Also fetch global data for navbar/footer
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);

  useEffect(() => {
    // Fetch global data if not already loaded (for navbar/footer)
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch, globalData, globalLoading]);

  useEffect(() => {
    // Normalize slug: trim whitespace and handle URL encoding
    const normalizedSlug = slug ? decodeURIComponent(slug.trim()) : null;
    
    if (normalizedSlug && !RESERVED_ROUTES.includes(normalizedSlug.toLowerCase())) {
      // Fetch page data by slug - this automatically works for ANY slug from Strapi
      console.log('DynamicPage: Fetching page for slug:', normalizedSlug);
      dispatch(fetchPageBySlug(normalizedSlug));
      
      // Cleanup: clear page data when component unmounts or slug changes
      return () => {
        dispatch(clearPageData());
      };
    } else if (normalizedSlug && RESERVED_ROUTES.includes(normalizedSlug.toLowerCase())) {
      console.log('DynamicPage: Slug is reserved route:', normalizedSlug);
    }
  }, [slug, dispatch]);

  // Component mapping: Supports ALL dynamic zone components from Strapi
  // Users can create pages in Strapi using any combination of these components
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
    // Alternative naming conventions
    'dynamic-zone.clinical-trials-showcase': ClinicalTrialsShowcase,
    'dynamic-zone.innovative-care': InnovativeCare,
    'dynamic-zone.video-testimonials': VideoTestimonials,
    'dynamic-zone.statistics': AboutSection,
    'dynamic-zone.testimony': Testimonials,
    'dynamic-zone.get-in-touch-section': GetInTouch,
    'dynamic-zone.location-section': LocationNetwork,
    'dynamic-zone.how-it-works-section': HowItWorks,
    'dynamic-zone.resources-section': Resources,
    'dynamic-zone.hero-section': Hero,
    'dynamic-zone.testimonials-section': Testimonials,
    'dynamic-zone.about-section': AboutSection,
    'dynamic-zone.form_next_to_section': null, // Add component if needed
    'dynamic-zone.featured': null, // Add component if needed
  };

  // Debug logging - must be before any early returns
  useEffect(() => {
    console.log('DynamicPage: Component state', {
      slug: slug,
      pageLoading: pageLoading,
      hasPageData: !!pageData,
      hasPageError: !!pageError,
      pageError: pageError,
      dynamicZoneLength: pageData?.dynamicZone?.length || 0,
      reservedRoute: RESERVED_ROUTES.includes(slug)
    });
    
    if (pageData && !pageLoading) {
      console.log('DynamicPage: Page data loaded successfully', {
        slug: slug,
        pageId: pageData.pageId,
        hasDynamicZone: !!pageData.dynamicZone,
        dynamicZoneLength: pageData.dynamicZone?.length || 0,
        hasSeo: !!pageData.seo,
        seoTitle: pageData.seo?.metaTitle,
        componentOrder: pageData.dynamicZone?.map(item => item.__component) || [],
        componentDetails: pageData.dynamicZone?.map(item => ({
          type: item.__component,
          id: item.id,
          hasMapping: !!componentMap[item.__component]
        })) || []
      });
    }
    
    if (pageError) {
      console.error('DynamicPage: Error loading page', {
        slug: slug,
        error: pageError,
        errorStatus: pageError.status,
        errorMessage: pageError.message
      });
    }
  }, [pageData, pageLoading, pageError, slug]);

  // Redirect reserved routes
  if (slug && RESERVED_ROUTES.includes(slug)) {
    if (slug === 'home') {
      return <Navigate to="/" replace />;
    }
    // Other reserved routes are handled by App.js routes
    return null;
  }

  // Loading state
  if (pageLoading) {
    return (
      <PageWrapper>
        <Navigation />
        <LoadingContainer>
          <div>Loading page...</div>
        </LoadingContainer>
        <Footer />
      </PageWrapper>
    );
  }

  // Error state - 404 or redirect to home
  if (pageError) {
    const is404 = pageError.status === 404 || (pageError.message && pageError.message.includes('not found'));
    
    if (is404) {
      // Option 1: Show 404 page (current behavior)
      return (
        <PageWrapper>
          <Navigation />
          <ErrorContainer>
            <ErrorTitle>404</ErrorTitle>
            <ErrorMessage>Page not found</ErrorMessage>
            <ErrorMessage>The page "{slug}" doesn't exist in Strapi.</ErrorMessage>
            <ErrorMessage style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '8px' }}>
              Make sure the page is published in Strapi and the slug matches the URL.
            </ErrorMessage>
            <BackButton onClick={() => window.location.href = '/'}>
              Go to Home
            </BackButton>
          </ErrorContainer>
          <Footer />
        </PageWrapper>
      );
      
      // Option 2: Uncomment below to redirect to home instead of showing 404
      // return <Navigate to="/" replace />;
    }
    
    // For other errors, also redirect to home or show error
    return <Navigate to="/" replace />;
  }

  // No page data available after loading completes
  // Check if page exists but has no components (empty dynamic zone is valid)
  if (!pageLoading && !pageError && (!pageData || !pageData.dynamicZone)) {
    // Page might exist but have no dynamic zone components
    // Show 404 or redirect based on preference
    return (
      <PageWrapper>
        <Navigation />
        <ErrorContainer>
          <ErrorTitle>404</ErrorTitle>
          <ErrorMessage>Page not found</ErrorMessage>
          <ErrorMessage>The page "{slug}" doesn't exist or has no content.</ErrorMessage>
          <BackButton onClick={() => window.location.href = '/'}>
            Go to Home
          </BackButton>
        </ErrorContainer>
        <Footer />
      </PageWrapper>
    );
    
    // Alternative: Uncomment to redirect to home instead of showing 404
    // return <Navigate to="/" replace />;
  }

  // Render components dynamically based on Strapi dynamic zone order
  // This allows users to create pages in Strapi with any combination of components
  const renderDynamicComponents = () => {
    if (!pageData || !pageData.dynamicZone || pageLoading) {
      return null;
    }

    // Filter out null components (unmapped component types)
    const validComponents = pageData.dynamicZone.filter(item => {
      const Component = componentMap[item.__component];
      if (!Component) {
        console.warn(`DynamicPage: Unknown component type "${item.__component}"`, {
          componentType: item.__component,
          availableTypes: Object.keys(componentMap).filter(k => componentMap[k] !== null),
          slug: slug
        });
        return false;
      }
      return true;
    });

    // Render components in the order they appear in Strapi dynamic zone
    // Filter out Statistics section if needed (component type: 'dynamic-zone.statistics')
    return validComponents
      .filter((item) => {
        // Skip Statistics section - remove if you want it back
        if (item.__component === 'dynamic-zone.statistics') {
          console.log('DynamicPage: Skipping Statistics section');
          return false;
        }
        return true;
      })
      .map((item, index) => {
        const Component = componentMap[item.__component];

        // Pass props based on component type
        const props = {};
        if (item.__component === 'dynamic-zone.location' || item.__component === 'dynamic-zone.location-section') {
          props.showButtons = true;
        }

        return <Component key={`${item.__component}-${index}-${item.id || index}`} {...props} />;
      });
  };

  return (
    <PageWrapper>
      <SEO />
      <Navigation />
      {renderDynamicComponents()}
      <Footer />
    </PageWrapper>
  );
};

export default DynamicPage;

