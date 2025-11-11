import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData, formatMedia, formatRichText } from '../../utils/strapiHelpers';
import { hideFallbacks } from '../../utils/config';

const Section = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 654px;
  background: ${props => props.bgImage 
    ? `linear-gradient(270deg, rgba(54, 69, 79, 0) 30%, rgba(54, 69, 79, 1) 80%), url('${props.bgImage}')`
    : 'linear-gradient(270deg, rgba(54, 69, 79, 0) 30%, rgba(54, 69, 79, 1) 80%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    height: 580px;
  }
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 500px;
    background: ${props => props.bgImage 
      ? `linear-gradient(rgba(54, 69, 79, 0.85), rgba(54, 69, 79, 0.85)), url('${props.bgImage}')`
      : 'linear-gradient(rgba(54, 69, 79, 0.85), rgba(54, 69, 79, 0.85))'};
    background-size: cover;
    background-position: center;
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    min-height: 450px;
    padding: 50px 0;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 140px;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 0 80px;
  }
  
  @media (max-width: 768px) {
    padding: 0 40px;
  }
  
  @media (max-width: 480px) {
    padding: 0 24px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 483px;
  
  @media (max-width: 1024px) {
    gap: 40px;
    max-width: 450px;
  }
  
  @media (max-width: 768px) {
    gap: 32px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    gap: 28px;
  }
`;

const Label = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 9px;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 8px;
    letter-spacing: 1.8px;
  }
`;

const TestimonialsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const Quote = styled.blockquote`
  font-family: ${props => props.theme.fonts.body};
  font-size: 30px;
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  line-height: 1.0;
  letter-spacing: -0.9px;
  margin: 0;
  min-height: auto;
  
  @media (max-width: 1024px) {
    font-size: 30px;
    line-height: 1.55;
  }
  
  @media (max-width: 768px) {
    font-size: 26px;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 22px;
    line-height: 1.65;
  }
`;

const Author = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  line-height: 1.6;
  margin: 0;
  opacity: 0.95;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ReadButton = styled.a`
  font-family: ${props => props.theme.fonts.body};
  padding: 16px 32px;
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 38px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 14px;
    border-radius: 32px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 13px;
    width: 100%;
    text-align: center;
  }
`;

const Testimonials = ({ componentData, pageData }) => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { testimonials } = useSelector((state) => state.testimonials);

  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  // Extract data from global Strapi response
  // Testimonials section uses 'testimonial-slider' component type
  const testimonialSlider = componentData || getSectionData(globalData, 'testimonialSlider');
  const testimonialsSection = componentData || getSectionData(globalData, 'testimonialSlider');
  const hasFallbackTestimonials = testimonials && testimonials.length > 0;
  const shouldHideMissingTestimonials = hideFallbacks && !testimonialSlider && !testimonialsSection && !hasFallbackTestimonials;
  
  // Extract testimonials - check for array or survivor_story relation
  // Structure 1: Testimonials array (legacy)
  const globalTestimonialsArray = useMemo(() => {
    return testimonialSlider?.Testimonials || testimonialsSection?.Testimonials || [];
  }, [testimonialSlider?.Testimonials, testimonialsSection?.Testimonials]);
  
  // Structure 2: survivor_story relation (new structure - Elena, etc.)
  // Handle both direct relation and data wrapper structure
  const survivorStoryRaw = testimonialsSection?.survivor_story || testimonialSlider?.survivor_story || null;
  const survivorStory = survivorStoryRaw?.data || survivorStoryRaw?.data?.attributes || survivorStoryRaw;
  
  // Combine both - prioritize survivor_story if available
  const globalTestimonials = useMemo(() => {
    return survivorStory 
      ? [survivorStory] 
      : globalTestimonialsArray;
  }, [survivorStory, globalTestimonialsArray]);
  
  // Extract survivor story background image separately for priority
  const survivorStoryBackgroundImage = survivorStory ? (() => {
    const storyData = survivorStory?.attributes || survivorStory;
    if (storyData?.backgroundImage) {
      if (storyData.backgroundImage.url) {
        return getMediaUrl(storyData.backgroundImage.url);
      }
      if (storyData.backgroundImage.data?.attributes?.url) {
        return formatMedia(storyData.backgroundImage);
      }
      if (typeof storyData.backgroundImage === 'string') {
        return getMediaUrl(storyData.backgroundImage);
      }
    }
    if (storyData?.image) {
      if (storyData.image.url) {
        return getMediaUrl(storyData.image.url);
      }
      if (storyData.image.data?.attributes?.url) {
        return formatMedia(storyData.image);
      }
      if (typeof storyData.image === 'string') {
        return getMediaUrl(storyData.image);
      }
    }
    return null;
  })() : null;
  
  // Debug: Log to check if global data exists
  const globalLoading = useSelector(state => state.global?.loading);
  useEffect(() => {
    if (globalData && !globalLoading) {
      // Find all testimonials-related components in dynamic zone
      const allTestimonialComponents = globalData.dynamicZone?.filter(
        item => item.__component?.includes('testimonial') || item.__component?.includes('Testimonial')
      ) || [];
      
      console.log('📊 Testimonials Section (id="Testimony-Testimonials"): Strapi Data Usage Report', {
        sectionId: 'Testimony-Testimonials',
        componentType: 'dynamic-zone.testimonial-slider',
        hasDynamicZone: !!globalData.dynamicZone,
        dynamicZoneLength: globalData.dynamicZone?.length || 0,
        allTestimonialComponents: allTestimonialComponents.map(c => ({
          __component: c.__component,
          hasHeading: !!c.heading,
          hasSubHeading: !!c.sub_heading,
          hasTestimonials: !!c.Testimonials,
          testimonialsCount: c.Testimonials?.length || 0,
          hasSurvivorStory: !!c.survivor_story,
          hasBackgroundImage: !!c.backgroundImage,
          hasImage: !!c.image,
          hasCta: !!c.cta,
          keys: Object.keys(c)
        })),
        testimonialSlider: {
          found: !!testimonialSlider,
          __component: testimonialSlider?.__component,
          hasHeading: !!testimonialSlider?.heading,
          hasTestimonials: !!testimonialSlider?.Testimonials,
          testimonialsCount: testimonialSlider?.Testimonials?.length || 0,
          hasSurvivorStory: !!testimonialSlider?.survivor_story,
          keys: testimonialSlider ? Object.keys(testimonialSlider) : null
        },
        testimonialsSection: {
          found: !!testimonialsSection,
          __component: testimonialsSection?.__component,
          hasHeading: !!testimonialsSection?.heading,
          hasTestimonials: !!testimonialsSection?.Testimonials,
          testimonialsCount: testimonialsSection?.Testimonials?.length || 0,
          hasSurvivorStory: !!testimonialsSection?.survivor_story,
          keys: testimonialsSection ? Object.keys(testimonialsSection) : null
        },
        hasSurvivorStory: !!survivorStory,
        survivorStoryData: survivorStory ? {
          hasQuote: !!survivorStory?.quote,
          hasAuthor: !!survivorStory?.author,
          hasBackgroundImage: !!survivorStory?.backgroundImage,
          hasImage: !!survivorStory?.image,
          keys: Object.keys(survivorStory)
        } : null,
        testimonialsArrayCount: globalTestimonialsArray.length,
        finalTestimonialsCount: globalTestimonials.length,
        usingStrapi: !!(testimonialSlider || testimonialsSection),
        usingFallback: !testimonialSlider && !testimonialsSection
      });
    }
  }, [globalData, globalLoading, testimonialSlider, testimonialsSection, survivorStory, globalTestimonialsArray, globalTestimonials]);
  
  // Fallback data - wrapped in useMemo to prevent recreation on every render
  const fallbackTestimonial = useMemo(() => {
    return hideFallbacks ? null : {
      label: 'Testimonials',
      quote: "After exhausting options at home, CancerFax connected me to a CAR-T trial in the US. Today, I'm in complete remission. Their team guided my entire journey, from medical coordination to travel logistics.",
      author: 'Elena, Spain',
      buttonText: 'Read Full Story',
      buttonUrl: '/testimonials',
      backgroundImage: 'https://images.unsplash.com/photo-1579154204845-e59e40d2c79f?w=1920'
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get featured testimonial from global data or fallback
  // Use Strapi section data if section exists, even if testimonials array is empty
  const sectionData = testimonialSlider || testimonialsSection;
  const getSectionBackgroundImage = () => {
    if (sectionData?.backgroundImage) {
      if (sectionData.backgroundImage.url) {
        return getMediaUrl(sectionData.backgroundImage.url);
      }
      if (sectionData.backgroundImage.data?.attributes?.url) {
        return formatMedia(sectionData.backgroundImage);
      }
      if (typeof sectionData.backgroundImage === 'string') {
        return getMediaUrl(sectionData.backgroundImage);
      }
    }
    if (sectionData?.image) {
      if (sectionData.image.url) {
        return getMediaUrl(sectionData.image.url);
      }
      return formatMedia(sectionData.image);
    }
    return null;
  };

  const sectionBgImage = sectionData ? getSectionBackgroundImage() : null;
  const testimonial = useMemo(() => {
    let result = fallbackTestimonial ? { ...fallbackTestimonial } : null;
    
    // If Strapi section exists, use section-level data (heading, cta, backgroundImage)
    if (sectionData) {
      // Priority: survivor_story backgroundImage > section-level backgroundImage > fallback
      const finalSectionBgImage = survivorStoryBackgroundImage || sectionBgImage || result?.backgroundImage || null;
      
      result = {
        ...(result || {}),
        label: sectionData.heading || result?.label,
        buttonText: sectionData.cta?.text || result?.buttonText,
        buttonUrl: sectionData.cta?.URL || result?.buttonUrl,
        backgroundImage: finalSectionBgImage
      };
      
      // If testimonials array has data, use it
      // Handle both array structure and survivor_story relation
      if (globalTestimonials.length > 0) {
        const globalTestimonial = globalTestimonials[0];
        
        // Handle both attributes wrapper and direct object
        const testimonialData = globalTestimonial?.attributes || globalTestimonial;
      
      // Extract quote from various possible fields
      const quoteText = formatRichText(testimonialData?.quote) 
        || formatRichText(testimonialData?.testimonial) 
        || formatRichText(testimonialData?.text)
        || formatRichText(testimonialData?.story)
        || formatRichText(testimonialData?.content)
        || testimonialData?.quote
        || testimonialData?.testimonial
        || testimonialData?.text
        || testimonialData?.story
        || testimonialData?.content
        || result?.quote;
      
      // Extract author from various possible fields
      const authorText = testimonialData?.author 
        || testimonialData?.name
        || testimonialData?.patient_name
        || testimonialData?.survivor_name
        || result?.author;
      
      // Extract background image from various possible fields
      // Handle direct url field (from populated API) and nested structures
      const getBackgroundImage = () => {
        // Check backgroundImage field first
        if (testimonialData?.backgroundImage) {
          if (testimonialData.backgroundImage.url) {
            return getMediaUrl(testimonialData.backgroundImage.url);
          }
          if (testimonialData.backgroundImage.data?.attributes?.url) {
            return formatMedia(testimonialData.backgroundImage);
          }
          if (typeof testimonialData.backgroundImage === 'string') {
            return getMediaUrl(testimonialData.backgroundImage);
          }
        }
        
        // Check image field
        if (testimonialData?.image) {
          if (testimonialData.image.url) {
            return getMediaUrl(testimonialData.image.url);
          }
          if (testimonialData.image.data?.attributes?.url) {
            return formatMedia(testimonialData.image);
          }
          if (typeof testimonialData.image === 'string') {
            return getMediaUrl(testimonialData.image);
          }
        }
        
        // Check featuredImage field
        if (testimonialData?.featuredImage) {
          if (testimonialData.featuredImage.url) {
            return getMediaUrl(testimonialData.featuredImage.url);
          }
          return formatMedia(testimonialData.featuredImage);
        }
        
        // Check photo field
        if (testimonialData?.photo) {
          if (testimonialData.photo.url) {
            return getMediaUrl(testimonialData.photo.url);
          }
          return formatMedia(testimonialData.photo);
        }
        
        return null;
      };
      
      const bgImage = getBackgroundImage() || result.backgroundImage;
      
      result = {
        ...result,
        quote: quoteText,
        author: authorText,
        // Priority: survivor_story backgroundImage > extracted bgImage > current testimonial.backgroundImage
        backgroundImage: survivorStoryBackgroundImage || bgImage || result.backgroundImage
      };
      }
    } else if (Array.isArray(testimonials) && testimonials.length > 0) {
      result = { ...(result || {}), ...testimonials[0] };
      // If we have survivor_story background image, use it
      if (survivorStoryBackgroundImage) {
        result.backgroundImage = survivorStoryBackgroundImage;
      }
    }

    if (!result && sectionData) {
      result = {
        label: sectionData.heading || null,
        quote: sectionData.sub_heading || null,
        author: null,
        buttonText: sectionData.cta?.text || null,
        buttonUrl: sectionData.cta?.URL || null,
        backgroundImage: survivorStoryBackgroundImage || sectionBgImage || null
      };
    }
    
    return result;
  }, [sectionData, fallbackTestimonial, survivorStoryBackgroundImage, sectionBgImage, globalTestimonials, testimonials]);

  // Get final background image with fallback
  // Priority: survivor_story > testimonial > fallback
  const finalBackgroundImage = survivorStoryBackgroundImage || testimonial.backgroundImage || fallbackTestimonial?.backgroundImage || null;
  
  // Ensure background image is a full URL
  const backgroundImageUrl = finalBackgroundImage && typeof finalBackgroundImage === 'string' && !finalBackgroundImage.startsWith('http')
    ? getMediaUrl(finalBackgroundImage)
    : finalBackgroundImage;

  const hasPrimaryContent = Boolean(
    sectionData?.heading ||
    testimonial?.quote ||
    testimonial?.buttonText ||
    sectionData?.cta?.text
  );
  const shouldHideTestimonials = hideFallbacks && (!testimonial || !hasPrimaryContent);

  // Debug: Log background image extraction details
  useEffect(() => {
    if (!testimonial) {
      return;
    }
    console.log('Testimonials: Background image extraction', {
      hasSurvivorStory: !!survivorStory,
      survivorStoryBackgroundImage,
      sectionBgImage: sectionData ? (() => {
        if (sectionData?.backgroundImage) {
          if (sectionData.backgroundImage.url) return getMediaUrl(sectionData.backgroundImage.url);
          if (sectionData.backgroundImage.data?.attributes?.url) return formatMedia(sectionData.backgroundImage);
          if (typeof sectionData.backgroundImage === 'string') return getMediaUrl(sectionData.backgroundImage);
        }
        if (sectionData?.image) {
          if (sectionData.image.url) return getMediaUrl(sectionData.image.url);
          return formatMedia(sectionData.image);
        }
        return null;
      })() : null,
      testimonialBackgroundImage: testimonial.backgroundImage,
      finalBackgroundImage,
      backgroundImageUrl,
      survivorStoryKeys: survivorStory ? Object.keys(survivorStory) : null,
      testimonialKeys: Object.keys(testimonial)
    });
  }, [backgroundImageUrl, finalBackgroundImage, testimonial, survivorStory, survivorStoryBackgroundImage, sectionData]);

  if (shouldHideMissingTestimonials || !testimonial || shouldHideTestimonials) {
    return null;
  }

  return (
    <Section id='Testimony-Testimonials' bgImage={backgroundImageUrl}>
      <Container>
        <Content>
          <Label>{testimonial.label || (hideFallbacks ? '' : 'Testimonials')}</Label>
          
          {(testimonial.quote || sectionData?.sub_heading) && (
            <TestimonialsBox>
              {testimonial.quote && (
                <Quote>
                  {testimonial.quote}
                </Quote>
              )}
              {!testimonial.quote && sectionData?.sub_heading && (
                <Quote>
                  {sectionData.sub_heading}
                </Quote>
              )}
              {testimonial.author && (
                <Author>- {testimonial.author}</Author>
              )}
            </TestimonialsBox>
          )}
          
          {(testimonial.buttonUrl || testimonial.buttonText || !hideFallbacks) && (
            <ReadButton href={testimonial.buttonUrl || (hideFallbacks ? undefined : '#')}>
              {testimonial.buttonText || (hideFallbacks ? '' : 'Read Full Story')}
            </ReadButton>
          )}
        </Content>
      </Container>
    </Section>
  );
};

export default Testimonials;

