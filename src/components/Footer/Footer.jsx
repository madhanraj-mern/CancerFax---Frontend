import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatMedia } from '../../utils/strapiHelpers';
import { getMediaUrl } from '../../services/api';

const FooterSection = styled.footer`
  width: 100%;
  background: #374151;
  padding: 120px 120px 0;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
  min-height: 1284px;
  
  @media (max-width: 1440px) {
    padding: 100px 80px 0;
  }
  
  @media (max-width: 1200px) {
    padding: 80px 60px 0;
    min-height: auto;
  }
  
  @media (max-width: 768px) {
    padding: 60px 40px 0;
  }
  
  @media (max-width: 480px) {
    padding: 40px 20px 0;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, auto);
  gap: 80px;
  margin-bottom: 0;
  align-items: flex-start;
  width: 100%;
  max-width: 100%;
  
  @media (max-width: 1200px) {
    gap: 60px;
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 50px;
    margin-bottom: 0;
  }
`;

const LeftTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 288px;
  height: 44px;
  position: relative;
  margin-bottom: 32px;
  
  img {
    display: block;
    height: 44px;
    width: auto;
    object-fit: contain;
    max-width: 200px;
  }
`;

// eslint-disable-next-line no-unused-vars
const LogoIcon = styled.div`
  width: 44px;
  height: 44px;
  background: #F472B6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
  position: relative;
`;

// eslint-disable-next-line no-unused-vars
const LogoText = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: white;
  margin: 0;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: white;
  line-height: 24px;
  margin: 0;
  width: 533px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 533px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 22px;
    width: 100%;
  }
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 80px;
  border-top: 1px solid #475569;
  border-bottom: 1px solid #475569;
  margin: 80px 0;
  padding: 0;
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 1200px;
    flex-wrap: wrap;
    height: auto;
    padding: 20px 0;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin: 40px 0;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const ContactInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
  }
`;

const IconBox = styled.div`
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  padding: 0;
  
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 18px;
    
    img {
      width: 18px;
      height: 18px;
    }
  }
`;

const ContactText = styled.span`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: white;
  white-space: nowrap;
  line-height: 24px;
  
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    gap: 10px;
  }
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
  
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
  
  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 14px;
    
    img {
      width: 18px;
      height: 18px;
    }
  }
`;

const RightTopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 30px;
  margin-top: -10px;
  max-width: 550px;
  width: 100%;
  
  @media (max-width: 1200px) {
    max-width: 500px;
  }
  
  @media (max-width: 900px) {
    align-items: flex-start;
    margin-top: 0;
    max-width: 100%;
  }
`;

const CTATitle = styled.h3`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: white;
  line-height: 48px;
  margin: 0 0 28px 0;
  text-align: right;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 484px;
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 484px;
    font-size: 32px;
    line-height: 42px;
  }
  
  @media (max-width: 900px) {
    text-align: left;
    margin-bottom: 24px;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 36px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const CTAButton = styled(Link)`
  padding: 16px 28px;
  background: #F472B6;
  color: white;
  border: none;
  border-radius: 20px;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
  max-width: 100%;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  
  @media (hover: hover) {
    &:hover {
      background: #EC4899;
      transform: translateY(-2px);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 900px) {
    align-self: flex-start;
  }
  
  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

// eslint-disable-next-line no-unused-vars
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.25);
  margin: 40px 0;
  
  @media (max-width: 768px) {
    margin: 35px 0;
  }
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 60px;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const LinksRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
  width: 100%;
  align-items: flex-start;
  flex-wrap: nowrap;
  
  @media (max-width: 1200px) {
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    flex-wrap: wrap;
  }
`;

// eslint-disable-next-line no-unused-vars
const TreatmentsHeaderWrapper = styled.div`
  display: flex;
  gap: 80px;
  width: 100%;
  align-items: flex-start;
  
  @media (max-width: 1200px) {
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

// eslint-disable-next-line no-unused-vars
const TreatmentsHeaderSpacer = styled.div`
  max-width: 384px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// eslint-disable-next-line no-unused-vars
const TreatmentsTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  
  &:first-child {
    max-width: 384px;
    flex-shrink: 0;
  }
  
  &:not(:first-child) {
    flex: 1;
    min-width: 200px;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    min-width: 100%;
  }
`;

const ColumnTitle = styled.h4`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  position: relative;
  
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #64748B;
    margin-left: 10px;
    min-width: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ExtendedColumnTitle = styled.h4`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  position: relative;
  text-align: left;
  justify-content: flex-start;
  
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #64748B;
    margin-left: 10px;
    min-width: 0;
    align-self: center;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 22px;
  }
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 32px;
`;

const FooterLink = styled.a`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #FAF5F0;
  line-height: 32px;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  
  @media (hover: hover) {
    &:hover {
      color: white;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 28px;
  }
`;

const LocationsWrapper = styled.div`
  width: 1200px;
  height: 288px;
  background: #374151;
  border-top: 1px solid #475569;
  border-bottom: 1px solid #475569;
  overflow: hidden;
  position: relative;
  margin-bottom: 60px;
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 1200px;
  }
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 200px;
  }
`;

const LocationsSection = styled.div`
  display: flex;
  gap: 48px;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 52px 0;
  
  @media (max-width: 1200px) {
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    gap: 32px;
    padding: 40px 0;
  }
`;

const LocationsTrack = styled.div`
  display: flex;
  gap: 48px;
  animation: scrollLeft 60s linear infinite;
  will-change: transform;
  
  &:hover {
    animation-play-state: paused;
  }
  
  @keyframes scrollLeft {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  @media (max-width: 1200px) {
    gap: 40px;
    animation-duration: 55s;
  }
  
  @media (max-width: 768px) {
    gap: 32px;
    animation-duration: 50s;
  }
`;

const LocationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  min-width: 320px;
  max-width: 320px;
  flex-shrink: 0;
  
  @media (max-width: 1200px) {
    min-width: 280px;
    max-width: 280px;
  }
  
  @media (max-width: 768px) {
    min-width: 240px;
    max-width: 240px;
  }
  
  @media (max-width: 480px) {
    min-width: 200px;
    max-width: 200px;
  }
`;

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FlagIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  position: relative;
`;

const CountryName = styled.h5`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: white;
  margin: 0;
  line-height: 24px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const LocationAddress = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: white;
  line-height: 24px;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

const LocationPhone = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
`;

const PhoneIcon = styled.div`
  width: 16px;
  height: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const PhoneNumber = styled.span`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: white;
  line-height: 24px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 40px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
    padding-bottom: 30px;
  }
`;

const Copyright = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: #D1D5DB;
  margin: 0;
  line-height: 24px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 6px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LegalLink = styled.a`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: #D1D5DB;
  text-decoration: none;
  transition: color 0.3s ease;
  line-height: 24px;
  
  @media (hover: hover) {
    &:hover {
      color: white;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Separator = styled.span`
  color: #D1D5DB;
  font-size: 14px;
  margin: 0 4px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Footer = () => {
  // Import hideFallbacks config (must be at top level)
  const hideFallbacks = (process.env.REACT_APP_HIDE_FALLBACKS || '').toLowerCase() === 'true';

  // Get footer data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);
  
  // Legacy Redux state (kept for fallback, but not actively used)
  const { contactInfo, socialLinks, locations: strapiLocations, linkColumns } = useSelector((state) => state.footer);
  
  // Extract footer data from global API (/api/global)
  // Footer data is in global endpoint, not pages
  const navbarDataRaw = globalData?.navbar;
  const navbarData = navbarDataRaw?.data?.attributes || navbarDataRaw || null;
  const globalFooterRaw = globalData?.footer;
  const globalFooter = globalFooterRaw?.data?.attributes || globalFooterRaw || null;
  const navbarLogo = navbarData?.logo?.data?.attributes || navbarData?.logo || null;
  const globalLogo = globalData?.logo?.data?.attributes || globalData?.logo || null;
  const navbarLogoUrlFromStore = globalData?.navbarLogoUrl || null;
  const globalLogoUrlFromStore = globalData?.globalLogoUrl || null;
  const footerLogoUrlFromStore = globalData?.footerLogoUrl || null;

  // Debug: Log when data changes to verify structure
  useEffect(() => {
    if (!globalLoading && globalData) {
      console.log('Footer: Redux globalData structure', {
        hasGlobalData: !!globalData,
        globalDataKeys: Object.keys(globalData),
        hasFooter: !!globalData.footer,
        footerKeys: globalData.footer ? Object.keys(globalData.footer) : null,
        hasLogo: !!globalData.footer?.logo,
        logoStructure: globalData.footer?.logo ? {
          hasUrl: !!globalData.footer.logo.url,
          url: globalData.footer.logo.url,
          keys: Object.keys(globalData.footer.logo)
        } : null,
        // Debug locations specifically
        hasLocations: !!globalData.footer?.locations,
        locationsType: typeof globalData.footer?.locations,
        locationsValue: globalData.footer?.locations,
        locationsIsArray: Array.isArray(globalData.footer?.locations),
        // Check globalFooter structure
        hasGlobalFooter: !!globalFooter,
        globalFooterKeys: globalFooter ? Object.keys(globalFooter) : null,
        globalFooterLocations: globalFooter?.locations,
        globalFooterLocationsType: typeof globalFooter?.locations
      });
    }
  }, [globalData, globalLoading, globalFooter]);

  // Extract contact info from Strapi (from social_media_links which contains contact info)
  // Actual API structure: social_media_links has { image: { url, ... }, link: { text, URL, ... } }
  // Filter items that contain email (@) or phone (+) symbols
  const strapiContactInfo = useMemo(() => {
    return globalFooter?.social_media_links
    ?.filter(item => {
      const linkText = item.link?.text || '';
      return item.link && (linkText.includes('@') || linkText.includes('+'));
    })
    ?.map(item => {
      const linkText = item.link?.text || '';
      const isEmail = linkText.includes('@');
      
      // Get icon URL - handle direct url field from populated API
      let iconUrl = null;
      if (item.image?.url) {
        iconUrl = getMediaUrl(item.image.url);
      } else if (item.image?.data?.attributes?.url) {
        iconUrl = formatMedia(item.image);
      }
      
      return {
        icon: iconUrl || (isEmail ? '✉' : '📞'),
        text: linkText,
        type: isEmail ? 'email' : 'phone',
        url: item.link?.URL || linkText || '#'
      };
    }) || [];
  }, [globalFooter?.social_media_links]);
  
  // Debug: Log contact info extraction
  useEffect(() => {
    if (globalFooter?.social_media_links) {
      console.log('Footer: Contact info extraction', {
        totalSocialMediaLinks: globalFooter.social_media_links.length,
        strapiContactInfoCount: strapiContactInfo.length,
        strapiContactInfo: strapiContactInfo,
        rawSocialMediaLinks: globalFooter.social_media_links.map(item => ({
          text: item.link?.text,
          hasAt: item.link?.text?.includes('@'),
          hasPlus: item.link?.text?.includes('+'),
          imageUrl: item.image?.url
        }))
      });
    }
  }, [globalFooter, strapiContactInfo]);

  // Extract social media links from Strapi (social links, not contact info)
  // Filter out contact info (email/phone) from social media links
  const strapiSocialLinks = useMemo(() => {
    return globalFooter?.social_media_links
    ?.filter(item => item.link && !item.link.text?.includes('@') && !item.link.text?.includes('+'))
    ?.map(item => ({
      icon: item.image?.url 
        ? getMediaUrl(item.image.url) 
        : (item.image?.data?.attributes?.url 
          ? formatMedia(item.image) 
          : ''),
      label: item.link?.text || '',
      url: item.link?.URL || '#'
    })) || [];
  }, [globalFooter?.social_media_links]);

  // Extract link columns from Strapi
  const strapiLinkColumns = useMemo(() => {
    return (globalFooter?.footer_columns || [])
      .map(column => ({
        title: column?.title || '',
        links: Array.isArray(column?.links)
          ? column.links.map(link => ({
              text: link?.text || '',
              url: link?.URL || '#',
              target: link?.target || '_self',
            }))
          : [],
      }))
      .filter(column => column.links.length > 0);
  }, [globalFooter?.footer_columns]);

  // Extract locations from Strapi
  // Actual API structure: locations have phone_country_code and phone_number separately
  // Handle multiple possible structures: direct array, nested data, or attributes
  const globalStrapiLocations = React.useMemo(() => {
    if (!globalFooter) {
      console.log('⚠️ Footer: No globalFooter found');
      return [];
    }
    
    // Also check globalData.footer directly in case it's not in globalFooter
    const footerFromGlobalData = globalData?.footer;
    const locationsFromGlobalData = footerFromGlobalData?.data?.attributes?.locations || footerFromGlobalData?.locations;
    
    // Try different possible structures for locations
    let locationsArray = null;
    
    // Structure 1: Direct locations array in globalFooter
    if (Array.isArray(globalFooter.locations)) {
      console.log('✅ Footer: Found locations as direct array in globalFooter', globalFooter.locations.length);
      locationsArray = globalFooter.locations;
    }
    // Structure 2: locations.data (nested data structure)
    else if (globalFooter.locations?.data && Array.isArray(globalFooter.locations.data)) {
      console.log('✅ Footer: Found locations in globalFooter.locations.data', globalFooter.locations.data.length);
      locationsArray = globalFooter.locations.data;
    }
    // Structure 3: Check globalData.footer.locations directly
    else if (Array.isArray(locationsFromGlobalData)) {
      console.log('✅ Footer: Found locations in globalData.footer.locations', locationsFromGlobalData.length);
      locationsArray = locationsFromGlobalData;
    }
    // Structure 4: Check if locations is an object with nested structure
    else if (globalFooter.locations && typeof globalFooter.locations === 'object') {
      // Try to extract array from object values
      const possibleArray = Object.values(globalFooter.locations).find(Array.isArray);
      if (possibleArray) {
        console.log('✅ Footer: Found locations in globalFooter.locations object values', possibleArray.length);
        locationsArray = possibleArray;
      }
    }
    // Structure 5: Check locationsFromGlobalData.data
    else if (locationsFromGlobalData?.data && Array.isArray(locationsFromGlobalData.data)) {
      console.log('✅ Footer: Found locations in globalData.footer.locations.data', locationsFromGlobalData.data.length);
      locationsArray = locationsFromGlobalData.data;
    }
    
    if (!locationsArray || locationsArray.length === 0) {
      console.log('⚠️ Footer: No locations found in Strapi data', {
        hasGlobalFooter: !!globalFooter,
        hasLocations: !!globalFooter?.locations,
        locationsType: typeof globalFooter?.locations,
        locationsValue: globalFooter?.locations,
        footerKeys: Object.keys(globalFooter || {}),
        hasGlobalDataFooter: !!globalData?.footer,
        globalDataFooterLocations: globalData?.footer?.locations,
        locationsFromGlobalData: locationsFromGlobalData
      });
      return [];
    }
    
    // Map locations to the expected format
    const resolveFlagIcon = (flagInput, countryCode) => {
      if (!flagInput && countryCode) {
        return countryCode;
      }

      if (typeof flagInput === 'string') {
        const trimmed = flagInput.trim();
        if (trimmed) return trimmed;
      }

      if (flagInput?.url) {
        return getMediaUrl(flagInput.url);
      }

      if (flagInput?.data?.attributes?.url) {
        return getMediaUrl(flagInput.data.attributes.url);
      }

      if (flagInput?.attributes?.url) {
        return getMediaUrl(flagInput.attributes.url);
      }

      if (Array.isArray(flagInput) && flagInput.length > 0) {
        return resolveFlagIcon(flagInput[0], countryCode);
      }

      return countryCode || '📍';
    };

    const mappedLocations = locationsArray
      .map(location => {
        // Handle both direct attributes and nested data.attributes
        const locationData = location?.attributes || location || {};
        const countryCode = locationData?.country_code || locationData?.countryCode;

        const phoneCountryCode = locationData?.phone_country_code || locationData?.phoneCountryCode;
        const primaryPhone =
          locationData?.phone ||
          locationData?.phone_number ||
          locationData?.whatsapp_number ||
          '';

        return {
          flag: resolveFlagIcon(locationData?.flag, countryCode),
          country: locationData?.country || locationData?.country_name || '',
          address: locationData?.address || locationData?.full_address || '',
          phone: phoneCountryCode && primaryPhone
            ? `(${phoneCountryCode}) ${primaryPhone}`
            : (primaryPhone || ''),
        };
      })
      .filter(location => location.country);
    
    console.log('✅ Footer: Extracted locations from Strapi', {
      rawLocationsCount: locationsArray.length,
      mappedLocationsCount: mappedLocations.length,
      locations: mappedLocations.map(loc => ({
        country: loc.country,
        hasAddress: !!loc.address,
        hasPhone: !!loc.phone
      }))
    });
    
    return mappedLocations;
  }, [globalFooter, globalData?.footer]);

  // Fallback data (only used if Strapi data is not available)
  const fallbackLocations = React.useMemo(() => [
    {
      flag: '🇨🇳',
      country: 'China (Beijing)',
      address: '12th Floor, Gobroad Healthcare, Leeza Soho, Bei Jing Shi, Fengtai Distt. Li Ze Lu, Beijing - 100070,',
      phone: '(+86) 182 1759 2149'
    },
    {
      flag: '🇮🇳',
      country: 'India (Hyderabad)',
      address: 'Dr Bharat Patodiya, 4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429'
    },
    {
      flag: '🇨🇳',
      country: 'China (Shanghai)',
      address: 'Tina Qian, 1st Floor, No. 373, Lane 1555, Jinshajiang, Shanghai, 201803',
      phone: '(+86) 182 1759 2149'
    },
    {
      flag: '🇭🇰',
      country: 'Hong Kong',
      address: 'Tower 1, 2/F, Tern Centre, 237 Queen\'s Road Central, Sheung Wan, Hong Kong',
      phone: '(+852) 6428 1793'
    },
    {
      flag: '🇷🇴',
      country: 'Romania',
      address: 'Andreea Milca\nBulevardul Lascăr Catargiu, Nr. 30, București',
      phone: '(+40) 745 040 622'
    },
    {
      flag: '🇰🇭',
      country: 'Cambodia',
      address: 'Dr Pheng Bora (Oncologist and Hematologist), #55B, rue 225, Sangkat Dépo II, Khan Toulkok, Phnom Penh, Cambodia',
      phone: '(+40) 745 040 622'
    }
  ], []);

  const fallbackContactInfo = React.useMemo(() => [
    { icon: '✉', text: 'info@cancerfax.com', type: 'email' },
    { icon: '📞', text: '(+1) 213 789 56 55', type: 'phone' },
    { icon: '📞', text: '(+91) 96 1588 1588', type: 'phone' }
  ], []);

  const fallbackSocialLinks = React.useMemo(() => [
    { icon: 'f', label: 'Facebook', url: '#' },
    { icon: '▶', label: 'YouTube', url: '#' },
    { icon: 'in', label: 'LinkedIn', url: '#' },
    { icon: '📷', label: 'Instagram', url: '#' },
    { icon: '𝕏', label: 'Twitter', url: '#' }
  ], []);

  const fallbackLinkColumns = React.useMemo(() => [
    {
      title: 'Quick Links',
      links: [
        { text: 'About Us', url: '#about' },
        { text: 'Blog', url: '#blog' },
        { text: 'Hospitals', url: '#hospitals' },
        { text: 'Doctors', url: '#doctors' },
        { text: 'Cancer Updates', url: '#updates' },
        { text: 'Contact Us', url: '#contact' },
        { text: 'FAQ\'s', url: '#faq' },
        { text: 'Stories', url: '#stories' }
      ]
    },
    {
      title: 'Treatments',
      links: [
        { text: 'Liver Cancer', url: '#liver' },
        { text: 'Lung Cancer', url: '#lung' },
        { text: 'Stomach Cancer', url: '#stomach' },
        { text: 'Throat Cancer', url: '#throat' },
        { text: 'Thyroid Cancer', url: '#thyroid' },
        { text: 'Anal Cancer', url: '#anal' },
        { text: 'Blood Cancer', url: '#blood' },
        { text: 'Breast Cancer', url: '#breast' },
        { text: 'Cervical Cancer', url: '#cervical' },
        { text: 'Colorectal Cancer', url: '#colorectal' }
      ]
    },
    {
      title: '',
      links: [
        { text: 'Cancer Treatment In The USA', url: '#' },
        { text: 'Proton Therapy In Singapore', url: '#' },
        { text: 'CAR T-Cell Therapy In Israel', url: '#' },
        { text: 'CAR T-Cell Therapy In China', url: '#' },
        { text: 'CAR T-Cell Therapy In India', url: '#' },
        { text: 'CAR T-Cell Therapy In Malaysia', url: '#' },
        { text: 'CAR T-Cell Therapy In Korea', url: '#' },
        { text: 'CAR T-Cell Therapy In Singapore', url: '#' },
        { text: 'Cancer Treatment In India', url: '#' },
        { text: 'CAR T-Cell Therapy In Autoimmune Disorders', url: '#' }
      ]
    },
    {
      title: '',
      links: [
        { text: 'Cancer Treatment In South-Korea', url: '#' },
        { text: 'Clinical Trials', url: '#' },
        { text: 'Lymphoma Treatment In India', url: '#' },
        { text: 'Leukemia Treatment In India', url: '#' },
        { text: 'Cancer Treatment Abroad', url: '#' },
        { text: 'Blood Cancer Treatment In India', url: '#' },
        { text: 'FUCASO Treatment For Multiple Myeloma', url: '#' },
        { text: 'CAR T-Cell Therapy Clinical Trials In China', url: '#' },
        { text: 'Cancer Treatment In China', url: '#' },
        { text: 'Free Cancer Treatment In China', url: '#' }
      ]
    }
  ], []);

  // Use Strapi data with fallback (hide fallback if hideFallbacks is enabled)
  const locations = useMemo(() => {
    return globalStrapiLocations.length > 0 
    ? globalStrapiLocations 
      : (hideFallbacks ? [] : (Array.isArray(strapiLocations) && strapiLocations.length > 0 ? strapiLocations : fallbackLocations));
  }, [globalStrapiLocations, hideFallbacks, strapiLocations, fallbackLocations]);

  const contacts = useMemo(() => {
    return strapiContactInfo.length > 0
    ? strapiContactInfo
      : (hideFallbacks ? [] : (Array.isArray(contactInfo) && contactInfo.length > 0 ? contactInfo : fallbackContactInfo));
  }, [strapiContactInfo, hideFallbacks, contactInfo, fallbackContactInfo]);

  const columns = useMemo(() => {
    return strapiLinkColumns.length > 0
    ? strapiLinkColumns
      : (hideFallbacks ? [] : (Array.isArray(linkColumns) && linkColumns.length > 0 ? linkColumns : fallbackLinkColumns));
  }, [strapiLinkColumns, hideFallbacks, linkColumns, fallbackLinkColumns]);

  // Map global footer data or use fallback
  // Actual API structure: footer.logo has direct { url, name, ... } fields
  // Extract logo URL - handle multiple possible structures
  const resolveLogoUrl = (logoObj) => {
    if (!logoObj) return null;

    if (typeof logoObj === 'string') {
      const trimmed = logoObj.trim();
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }
    
    // Handle Strapi v4 media structure: { id, name, hash, url, ... }
    // When populated, logo has: { id, documentId, name, hash, url, ... }
    if (logoObj.url) {
      const trimmed = typeof logoObj.url === 'string' ? logoObj.url.trim() : logoObj.url;
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    if (logoObj.data?.attributes?.url) {
      const trimmed = logoObj.data.attributes.url?.trim?.() ?? logoObj.data.attributes.url;
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    if (logoObj.attributes?.url) {
      const trimmed = logoObj.attributes.url?.trim?.() ?? logoObj.attributes.url;
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    if (Array.isArray(logoObj.data) && logoObj.data.length > 0) {
      const nestedUrl = logoObj.data[0]?.attributes?.url;
      if (nestedUrl) {
        return getMediaUrl(nestedUrl);
      }
    }
    
    // Handle hash-based URL construction (Strapi v4 pattern)
    // If we have hash and name, construct URL: /uploads/{hash}_{name}
    if (logoObj.hash && logoObj.name) {
      const hash = logoObj.hash.trim();
      const name = logoObj.name.trim();
      return getMediaUrl(`/uploads/${hash}_${name}`);
    }
    
    if (logoObj.logo && logoObj.logo !== logoObj) {
      return resolveLogoUrl(logoObj.logo);
    }

    if (logoObj.src) {
      return getMediaUrl(logoObj.src);
    }

    return null;
  };

  const getFooterLogoUrl = () => {
    const resolved =
      navbarLogoUrlFromStore ||
      resolveLogoUrl(navbarLogo) ||
      globalLogoUrlFromStore ||
      resolveLogoUrl(globalLogo) ||
      footerLogoUrlFromStore ||
      resolveLogoUrl(globalFooter?.logo || null);
    console.log('Footer logo debug', {
      navbarLogo,
      navbarLogoUrlFromStore,
      resolved
    });
    return resolved;
  };
  
  // Extract logo URL - prioritize Strapi data
  // Only extract logo if data is loaded and globalFooter exists
  const footerLogoUrlRaw = (!globalLoading && globalData)
    ? getFooterLogoUrl() 
    : null;
  const footerLogoUrl = footerLogoUrlRaw ? footerLogoUrlRaw.trim() : '';
  
  // Build footer content - prioritize Strapi logo URL over fallback
  // Show emoji fallback only if logo URL is not available
  const strapiPolicyLinks = useMemo(() => {
    return (globalFooter?.policy_links || []).map(link => {
      const trimmedUrl = typeof link?.URL === 'string' ? link.URL.trim() : '';
      // Always use /404 if URL is empty, '/', '#', or not a valid URL
      const safeUrl = trimmedUrl && trimmedUrl !== '/' && trimmedUrl !== '#' && trimmedUrl.length > 0 ? trimmedUrl : '/404';

      return {
        text: link?.text || '',
        url: safeUrl,
        target: link?.target || '_self',
      };
    });
  }, [globalFooter?.policy_links]);

  const footerContent = globalFooter ? {
    logoIcon: footerLogoUrl ? null : null,
    logoText: globalFooter.logo?.name || '',
    logo: footerLogoUrl, // This will be null if logo extraction failed, triggering fallback
    description: globalFooter.description || (hideFallbacks ? '' : 'Empowering patients with global access to advanced treatments, trials, and expert healthcare support for a healthier future. CancerFax connects patients with advanced global treatments, clinical trials, expert evaluations.'),
    ctaTitle: globalFooter.footer_bottom_text || (hideFallbacks ? '' : 'Explore the Latest Insights in Cancer Research'),
    ctaButtonText: globalFooter.cta?.text || (hideFallbacks ? '' : 'Connect with Our Experts'),
    copyrightText: globalFooter.copyright || (hideFallbacks ? '' : 'Copyright © 2025 CancerFax'),
    legalLinks: strapiPolicyLinks.length > 0 ? strapiPolicyLinks : (hideFallbacks ? [] : [
      { text: 'Terms of Service', url: '/404', target: '_self' },
      { text: 'Privacy Policy', url: '/404', target: '_self' },
      { text: 'Refund Policy', url: '/404', target: '_self' },
      { text: 'Cookies', url: '/404', target: '_self' }
    ]),
    socialMediaLinks: strapiSocialLinks.length > 0 ? strapiSocialLinks : [],
  } : (hideFallbacks ? {
    logoIcon: null,
    logoText: '',
    description: '',
    ctaTitle: '',
    ctaButtonText: '',
    copyrightText: '',
    legalLinks: [],
    socialMediaLinks: []
  } : {
    logoIcon: null,
    logoText: '',
    description: 'Empowering patients with global access to advanced treatments, trials, and expert healthcare support for a healthier future. CancerFax connects patients with advanced global treatments, clinical trials, expert evaluations.',
    ctaTitle: 'Explore the Latest Insights in Cancer Research',
    ctaButtonText: 'Connect with Our Experts',
    copyrightText: 'Copyright © 2025 CancerFax',
    legalLinks: [
      { text: 'Terms of Service', url: '/404', target: '_self' },
      { text: 'Privacy Policy', url: '/404', target: '_self' },
      { text: 'Refund Policy', url: '/404', target: '_self' },
      { text: 'Cookies', url: '/404', target: '_self' }
    ],
    socialMediaLinks: []
  });
  
  // Use Strapi social links (separated from contact info) - defined after footerContent
  const socials = useMemo(() => {
    return strapiSocialLinks.length > 0
    ? strapiSocialLinks
      : (hideFallbacks ? [] : (footerContent.socialMediaLinks && footerContent.socialMediaLinks.length > 0
      ? footerContent.socialMediaLinks
        : (Array.isArray(socialLinks) && socialLinks.length > 0 ? socialLinks : fallbackSocialLinks)));
  }, [strapiSocialLinks, hideFallbacks, footerContent.socialMediaLinks, socialLinks, fallbackSocialLinks]);

  // Debug: Log to verify Strapi data usage (moved after footerContent is defined)
  useEffect(() => {
    if (globalData && !globalLoading) {
      console.log('📊 Footer: Strapi Data Usage Report', {
        // Logo
        logo: {
          hasStrapiLogo: !!globalFooter?.logo,
          logoUrl: footerLogoUrl,
          usingStrapi: !!footerLogoUrl,
          usingFallback: !footerLogoUrl
        },
        // Description
        description: {
          hasStrapi: !!globalFooter?.description,
          strapiValue: globalFooter?.description?.substring(0, 50) + '...',
          usingStrapi: !!globalFooter?.description,
          usingFallback: !globalFooter?.description
        },
        // CTA
        cta: {
          hasStrapiTitle: !!globalFooter?.footer_bottom_text,
          hasStrapiButton: !!globalFooter?.cta?.text,
          usingStrapi: !!(globalFooter?.footer_bottom_text || globalFooter?.cta?.text),
          usingFallback: !globalFooter?.footer_bottom_text && !globalFooter?.cta?.text
        },
        // Copyright
        copyright: {
          hasStrapi: !!globalFooter?.copyright,
          usingStrapi: !!globalFooter?.copyright,
          usingFallback: !globalFooter?.copyright
        },
        // Contact Info
        contactInfo: {
          strapiCount: strapiContactInfo.length,
          usingStrapi: strapiContactInfo.length > 0,
          usingFallback: strapiContactInfo.length === 0 && contacts.length > 0
        },
        // Social Links
        socialLinks: {
          strapiCount: strapiSocialLinks.length,
          usingStrapi: strapiSocialLinks.length > 0,
          usingFallback: strapiSocialLinks.length === 0 && socials.length > 0
        },
        // Link Columns
        linkColumns: {
          strapiCount: strapiLinkColumns.length,
          strapiTotalLinks: strapiLinkColumns.reduce((sum, col) => sum + (col.links?.length || 0), 0),
          usingStrapi: strapiLinkColumns.length > 0,
          usingFallback: strapiLinkColumns.length === 0 && columns.length > 0
        },
        // Locations
        locations: {
          strapiCount: globalStrapiLocations.length,
          usingStrapi: globalStrapiLocations.length > 0,
          usingFallback: globalStrapiLocations.length === 0 && locations.length > 0,
          rawLocationsData: globalFooter?.locations,
          extractedLocations: globalStrapiLocations.map(loc => ({
            country: loc.country,
            hasAddress: !!loc.address,
            addressPreview: loc.address?.substring(0, 50) + '...',
            hasPhone: !!loc.phone,
            phone: loc.phone
          }))
        },
        // Policy Links
        policyLinks: {
          hasStrapi: !!(globalFooter?.policy_links && globalFooter.policy_links.length > 0),
          strapiCount: globalFooter?.policy_links?.length || 0,
          usingStrapi: !!(globalFooter?.policy_links && globalFooter.policy_links.length > 0),
          usingFallback: !globalFooter?.policy_links || globalFooter.policy_links.length === 0
        },
        // Raw Strapi Data Available
        availableStrapiFields: {
          logo: !!globalFooter?.logo,
          description: !!globalFooter?.description,
          footer_bottom_text: !!globalFooter?.footer_bottom_text,
          copyright: !!globalFooter?.copyright,
          cta: !!globalFooter?.cta,
          social_media_links: !!(globalFooter?.social_media_links && globalFooter.social_media_links.length > 0),
          footer_columns: !!(globalFooter?.footer_columns && globalFooter.footer_columns.length > 0),
          locations: !!(globalFooter?.locations && globalFooter.locations.length > 0),
          policy_links: !!(globalFooter?.policy_links && globalFooter.policy_links.length > 0)
        }
      });
    }
  }, [globalData, globalFooter, footerLogoUrl, globalLoading, strapiContactInfo, strapiSocialLinks, strapiLinkColumns, globalStrapiLocations, contacts, socials, columns, locations]);

  // Don't render footer until global data is loaded to prevent showing before other content
  // Also check if we're on a page that needs footer (not just loading state)
  if (globalLoading || !globalData) {
    return null;
  }

  return (
    <FooterSection>
      <Container>
        {/* Top Section */}
        <TopSection>
          <LeftTopSection>
            <LogoSection>
                <img 
                src={footerLogoUrl || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='} 
                alt={globalFooter?.logo?.name || 'CancerFax logo'} 
                  style={{ 
                    height: '50px', 
                    width: 'auto', 
                    objectFit: 'contain', 
                    maxWidth: '200px',
                  display: 'block',
                  visibility: footerLogoUrl ? 'visible' : 'hidden'
                  }} 
                  onError={(e) => {
                    console.error('Footer logo failed to load from Strapi:', {
                      logoUrl: footerLogoUrl,
                      globalFooterLogo: globalFooter?.logo,
                      logoUrlFromAPI: globalFooter?.logo?.url,
                      expectedFullUrl: globalFooter?.logo?.url 
                        ? `${process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com'}${globalFooter.logo.url}`
                        : null,
                      error: 'Image load failed'
                    });
                  e.target.style.visibility = 'hidden';
                  }}
                  onLoad={() => {
                  if (footerLogoUrl) {
                    console.log('✅ Footer logo loaded successfully from Strapi:', footerLogoUrl);
                  }
                  }}
                />
            </LogoSection>
            
            <Description>
              {footerContent.description}
            </Description>
          </LeftTopSection>
          
          <RightTopSection>
            <CTATitle>{footerContent.ctaTitle}</CTATitle>
            <CTAButton to="/contact">{footerContent.ctaButtonText}</CTAButton>
          </RightTopSection>
        </TopSection>
        
        {/* Contact Row */}
        <ContactRow>
          <ContactInfoWrapper>
            {contacts.map((contact, index) => (
              <ContactItem key={index}>
                <IconBox>
                  {contact.icon && typeof contact.icon === 'string' ? (
                    // If icon is a URL (http or path starting with /), render as image
                    (contact.icon.startsWith('http') || contact.icon.startsWith('/')) ? (
                      <img src={contact.icon} alt={contact.type || 'contact'} />
                    ) : (
                      // Otherwise render as text/emoji
                      contact.icon
                    )
                  ) : null}
                </IconBox>
                <ContactText as={contact.url && contact.url !== '#' ? 'a' : 'span'} href={contact.url && contact.url !== '#' ? (contact.type === 'email' ? `mailto:${contact.url}` : `tel:${contact.url}`) : undefined}>
                  {contact.text}
                </ContactText>
              </ContactItem>
            ))}
          </ContactInfoWrapper>
          
          <SocialLinks>
            {socials.map((social, index) => (
              <SocialIcon 
                key={index} 
                href={social.url || '#'} 
                aria-label={social.label || social.text}
              >
                {social.icon && typeof social.icon === 'string' ? (
                  // If icon is a URL (http or path starting with /), render as image
                  (social.icon.startsWith('http') || social.icon.startsWith('/')) ? (
                    <img src={social.icon} alt={social.label || social.text || 'social'} />
                  ) : (
                    // Otherwise render as text/emoji
                    social.icon
                  )
                ) : null}
              </SocialIcon>
            ))}
          </SocialLinks>
        </ContactRow>
        
        {/* Links Section */}
        <LinksSection>
          <LinksRow>
            {/* Quick Links Column */}
            {columns.length > 0 && (
              <LinkColumn>
                {columns[0].title && <ColumnTitle>{columns[0].title}</ColumnTitle>}
                <LinkList>
                  {columns[0].links && columns[0].links.map((link, linkIndex) => (
                    <FooterLink key={linkIndex} href={link.url || '#'}>
                      {link.text}
                    </FooterLink>
                  ))}
                </LinkList>
              </LinkColumn>
            )}
            
            {/* Treatments Section - Right Side */}
            {columns.length > 1 && columns[1]?.title === 'Treatments' && (
              <LinkColumn style={{ flex: 1 }}>
                <ExtendedColumnTitle>Treatments</ExtendedColumnTitle>
                <LinksRow style={{ gap: '60px', marginTop: '32px' }}>
                  {columns.slice(1).map((column, columnIndex) => (
                    <LinkColumn key={columnIndex + 1} style={{ flex: 1, maxWidth: 'none' }}>
                      <LinkList>
                        {column.links && column.links.map((link, linkIndex) => (
                          <FooterLink key={linkIndex} href={link.url || '#'}>
                            {link.text}
                          </FooterLink>
                        ))}
                      </LinkList>
                    </LinkColumn>
                  ))}
                </LinksRow>
              </LinkColumn>
            )}
            
            {/* Fallback: If no "Treatments" title, render all columns normally */}
            {(!columns[1] || columns[1]?.title !== 'Treatments') && (
              <>
                {columns.slice(1).map((column, columnIndex) => (
                  <LinkColumn key={columnIndex + 1}>
                    {column.title && <ColumnTitle>{column.title}</ColumnTitle>}
                    <LinkList>
                      {column.links && column.links.map((link, linkIndex) => (
                        <FooterLink key={linkIndex} href={link.url || '#'}>
                          {link.text}
                        </FooterLink>
                      ))}
                    </LinkList>
                  </LinkColumn>
                ))}
              </>
            )}
          </LinksRow>
        </LinksSection>
        
        {/* Locations Section */}
        <LocationsWrapper>
          <LocationsSection>
            <LocationsTrack>
              {[...locations, ...locations].map((location, index) => (
                <LocationCard key={index}>
                  <LocationHeader>
                    <FlagIcon>{location.flag}</FlagIcon>
                    <CountryName>{location.country}</CountryName>
                  </LocationHeader>
                  <LocationAddress style={{ whiteSpace: 'pre-line' }}>{location.address}</LocationAddress>
                  <LocationPhone>
                    <PhoneIcon>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5 11.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5C5.04416 14.5 -1.5 7.95584 -1.5 -0.5C-1.5 -1.05228 -1.05228 -1.5 -0.5 -1.5H2.5C3.05228 -1.5 3.5 -1.05228 3.5 -0.5C3.5 1.05228 4.44772 2 5.5 2H7.5C8.55228 2 9.5 1.05228 9.5 0C9.5 -0.552285 9.94772 -1 10.5 -1H13.5C14.0523 -1 14.5 -0.552285 14.5 0V3C14.5 3.55228 14.0523 4 13.5 4C12.4477 4 11.5 4.94772 11.5 6V8C11.5 9.05228 12.4477 10 13.5 10C14.0523 10 14.5 10.4477 14.5 11V11.5Z" fill="currentColor"/>
                      </svg>
                    </PhoneIcon>
                    <PhoneNumber>{location.phone}</PhoneNumber>
                  </LocationPhone>
                </LocationCard>
              ))}
            </LocationsTrack>
          </LocationsSection>
        </LocationsWrapper>
        
        {/* Bottom Section */}
        <BottomSection>
          <Copyright>{footerContent.copyrightText}</Copyright>
          <LegalLinks>
            {footerContent.legalLinks && footerContent.legalLinks.map((link, index) => (
              <React.Fragment key={index}>
                <LegalLink href={link.url || '#'} target={link.target || '_self'}>{link.text}</LegalLink>
                {index < footerContent.legalLinks.length - 1 && <Separator>|</Separator>}
              </React.Fragment>
            ))}
          </LegalLinks>
        </BottomSection>
      </Container>
    </FooterSection>
  );
};

export default Footer;


