import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * SEO Component
 * Dynamically injects SEO meta tags from Strapi /api/global endpoint
 * Handles: title, description, meta tags, Open Graph, Twitter cards
 */
const SEO = () => {
  const globalData = useSelector(state => state.global?.data);
  const seo = globalData?.seo;

  // Default SEO values
  const defaultTitle = 'CancerFax - Advanced Cancer Treatments';
  const defaultDescription = 'CancerFax - Connecting You to Global Trials and Advanced Cancer Treatments';
  const defaultKeywords = 'cancer treatment, clinical trials, cancer care, medical tourism, advanced treatments';

  // Extract SEO data from Strapi
  const seoTitle = seo?.metaTitle || seo?.title || defaultTitle;
  const seoDescription = seo?.metaDescription || seo?.description || defaultDescription;
  const seoKeywords = seo?.keywords || defaultKeywords;
  const canonicalUrl = seo?.canonicalURL || seo?.url || window.location.href;
  const ogImage = seo?.metaImage?.url || seo?.metaImage?.data?.attributes?.url || seo?.ogImage?.url || null;
  const ogTitle = seo?.ogTitle || seo?.metaTitle || seoTitle;
  const ogDescription = seo?.ogDescription || seo?.metaDescription || seoDescription;
  const ogType = seo?.ogType || 'website';
  const twitterCard = seo?.twitterCard || 'summary_large_image';
  const twitterTitle = seo?.twitterTitle || seoTitle;
  const twitterDescription = seo?.twitterDescription || seoDescription;
  const twitterImage = seo?.twitterImage?.url || seo?.twitterImage?.data?.attributes?.url || ogImage;
  const robots = seo?.robots || 'index, follow';
  const structuredData = seo?.structuredData || null;

  // Update document head directly
  useEffect(() => {
    // Update title
    document.title = seoTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      if (!content) return;
      
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update or create link tags
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Basic Meta Tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);
    updateMetaTag('robots', robots);
    if (canonicalUrl) updateLinkTag('canonical', canonicalUrl);

    // Open Graph / Facebook
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:title', ogTitle, 'property');
    updateMetaTag('og:description', ogDescription, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    if (seo?.ogSiteName) updateMetaTag('og:site_name', seo.ogSiteName, 'property');

    // Twitter Card
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', twitterTitle);
    updateMetaTag('twitter:description', twitterDescription);
    updateMetaTag('twitter:image', twitterImage);

    // Additional Meta Tags
    if (seo?.author) updateMetaTag('author', seo.author);
    if (seo?.themeColor) updateMetaTag('theme-color', seo.themeColor);

    // Structured Data (JSON-LD)
    if (structuredData) {
      // Remove existing structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = typeof structuredData === 'string' ? structuredData : JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on unmount to avoid flickering
      // The component will update them if needed
    };
  }, [seo, seoTitle, seoDescription, seoKeywords, robots, canonicalUrl, ogType, ogTitle, ogDescription, ogImage, twitterCard, twitterTitle, twitterDescription, twitterImage, structuredData]);

  // This component doesn't render anything visible
  return null;
};

export default SEO;

