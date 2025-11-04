import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatMedia } from '../../utils/strapiHelpers';
import { getMediaUrl } from '../../services/api';

const FooterSection = styled.footer`
  width: 100%;
  background: #475B6B;
  padding: 50px 120px 50px 120px;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    padding: 45px 80px 45px 80px;
  }
  
  @media (max-width: 768px) {
    padding: 35px 32px 35px 32px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 20px 30px 20px;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
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
  
  img {
    height: 50px;
    width: auto;
    object-fit: contain;
  }
`;

const LogoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
`;

const LogoText = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: white;
  line-height: 1.6;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: nowrap;
  width: 100%;
  
  @media (max-width: 1400px) {
    gap: 20px;
  }
  
  @media (max-width: 1200px) {
    gap: 16px;
  }
  
  @media (max-width: 900px) {
    flex-wrap: wrap;
    gap: 14px;
  }
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    gap: 7px;
  }
`;

const IconBox = styled.div`
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  
  @media (max-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    font-size: 16px;
  }
`;

const ContactText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: white;
  white-space: nowrap;
  
  @media (max-width: 1200px) {
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    justify-content: flex-start;
    gap: 8px;
  }
`;

const SocialIcon = styled.a`
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  transition: all 0.3s ease;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
  
  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    font-size: 16px;
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
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: white;
  line-height: 1.3;
  letter-spacing: -0.5px;
  margin: 0;
  text-align: right;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
  
  @media (max-width: 900px) {
    text-align: left;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const CTAButton = styled(Link)`
  padding: 18px 40px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 20, 147, 0.3);
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
  max-width: 100%;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 20, 147, 0.4);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 900px) {
    align-self: flex-start;
  }
  
  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

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
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
  gap: 80px;
  margin-bottom: 80px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ColumnTitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FooterLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  
  @media (hover: hover) {
    &:hover {
      color: white;
      padding-left: 4px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const LocationsSection = styled.div`
  display: flex;
  gap: 60px;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
  
  @media (max-width: 1200px) {
    gap: 50px;
  }
  
  @media (max-width: 768px) {
    gap: 40px;
  }
`;

const LocationsTrack = styled.div`
  display: flex;
  gap: 60px;
  animation: scrollLeft 45s linear infinite;
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
    gap: 50px;
    animation-duration: 40s;
  }
  
  @media (max-width: 768px) {
    gap: 40px;
    animation-duration: 35s;
  }
`;

const LocationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  min-width: 360px;
  max-width: 360px;
  flex-shrink: 0;
  
  @media (max-width: 1200px) {
    min-width: 340px;
    max-width: 340px;
  }
  
  @media (max-width: 768px) {
    min-width: 320px;
    max-width: 320px;
  }
  
  @media (max-width: 480px) {
    min-width: 280px;
    max-width: 280px;
  }
`;

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FlagIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.08);
`;

const CountryName = styled.h5`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const LocationAddress = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

const LocationPhone = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
`;

const PhoneIcon = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
`;

const PhoneNumber = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const BottomDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin: 60px 0 50px 0;
  
  @media (max-width: 768px) {
    margin: 50px 0 40px 0;
  }
`;

const LocationsWrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
    padding-top: 30px;
  }
`;

const Copyright = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const LegalLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  
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
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Footer = () => {
  // Get footer data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);
  
  // Legacy Redux state (kept for fallback, but not actively used)
  const { contactInfo, socialLinks, locations: strapiLocations, linkColumns } = useSelector((state) => state.footer);
  
  // Extract footer data from global API (/api/global)
  // Footer data is in global endpoint, not pages
  const globalFooter = globalData?.footer;
  
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
        } : null
      });
    }
  }, [globalData, globalLoading]);

  // Extract contact info from Strapi (from social_media_links which contains contact info)
  // Actual API structure: social_media_links has { image: { url, ... }, link: { text, URL, ... } }
  // Filter items that contain email (@) or phone (+) symbols
  const strapiContactInfo = globalFooter?.social_media_links
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
  const strapiSocialLinks = globalFooter?.social_media_links
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

  // Extract link columns from Strapi
  const strapiLinkColumns = globalFooter?.footer_columns
    ?.map(column => ({
      title: column.title || '',
      links: Array.isArray(column.links)
        ? column.links.map(link => ({
            text: link.text || '',
            url: link.URL || '#'
          }))
        : []
    }))
    .filter(column => column.links.length > 0) || [];

  // Extract locations from Strapi
  // Actual API structure: locations have phone_country_code and phone_number separately
  const globalStrapiLocations = globalFooter?.locations
    ?.map(location => ({
      flag: location.flag || '📍',
      country: location.country || '',
      address: location.address || '',
      phone: location.phone_country_code && location.phone_number 
        ? `(${location.phone_country_code}) ${location.phone_number}`
        : (location.phone || location.whatsapp_number || '')
    }))
    .filter(location => location.country) || [];

  // Fallback data (only used if Strapi data is not available)
  const fallbackLocations = [
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
      address: 'Andreea Milca Bulevardul Lascăr Catargiu, Nr. 30, București',
      phone: '(+40) 745 040 622'
    }
  ];

  const fallbackContactInfo = [
    { icon: '✉', text: 'info@cancerfax.com', type: 'email' },
    { icon: '📞', text: '(+1) 213 789 56 55', type: 'phone' },
    { icon: '📞', text: '(+91) 96 1588 1588', type: 'phone' }
  ];

  const fallbackSocialLinks = [
    { icon: 'f', label: 'Facebook', url: '#' },
    { icon: '▶', label: 'YouTube', url: '#' },
    { icon: 'in', label: 'LinkedIn', url: '#' },
    { icon: '📷', label: 'Instagram', url: '#' },
    { icon: '𝕏', label: 'Twitter', url: '#' }
  ];

  const fallbackLinkColumns = [
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
  ];

  // Use Strapi data with fallback
  const locations = globalStrapiLocations.length > 0 
    ? globalStrapiLocations 
    : (Array.isArray(strapiLocations) && strapiLocations.length > 0 ? strapiLocations : fallbackLocations);

  const contacts = strapiContactInfo.length > 0
    ? strapiContactInfo
    : (Array.isArray(contactInfo) && contactInfo.length > 0 ? contactInfo : fallbackContactInfo);

  const columns = strapiLinkColumns.length > 0
    ? strapiLinkColumns
    : (Array.isArray(linkColumns) && linkColumns.length > 0 ? linkColumns : fallbackLinkColumns);

  // Map global footer data or use fallback
  // Actual API structure: footer.logo has direct { url, name, ... } fields
  // Extract logo URL - handle multiple possible structures
  const getFooterLogoUrl = () => {
    // Check if globalFooter exists first
    if (!globalFooter) {
      console.warn('Footer: globalFooter is null/undefined');
      return null;
    }
    
    // Check if logo exists
    if (!globalFooter.logo) {
      console.warn('Footer: No logo found in globalFooter', {
        globalFooterKeys: Object.keys(globalFooter || {}),
        globalFooter: globalFooter
      });
      return null;
    }
    
    // Check if logo has direct url field (from populated API)
    // API returns: { id: 7, url: "/uploads/logo_851ef64fcb.png", name: "logo.png", ... }
    if (globalFooter.logo.url) {
      const fullUrl = getMediaUrl(globalFooter.logo.url);
      console.log('Footer: Logo URL extracted (direct):', {
        original: globalFooter.logo.url,
        converted: fullUrl,
        logoStructure: globalFooter.logo
      });
      return fullUrl;
    }
    
    // Check if nested in data.attributes
    if (globalFooter.logo.data?.attributes?.url) {
      const fullUrl = formatMedia(globalFooter.logo);
      console.log('Footer: Logo URL extracted (nested):', fullUrl);
      return fullUrl;
    }
    
    // If it's already a URL string
    if (typeof globalFooter.logo === 'string') {
      const fullUrl = getMediaUrl(globalFooter.logo);
      console.log('Footer: Logo URL extracted (string):', fullUrl);
      return fullUrl;
    }
    
    console.warn('Footer: Could not extract logo URL from structure:', globalFooter.logo);
    return null;
  };
  
  // Extract logo URL - prioritize Strapi data
  // Only extract logo if data is loaded and globalFooter exists
  const footerLogoUrl = (!globalLoading && globalFooter && globalFooter.logo) 
    ? getFooterLogoUrl() 
    : null;
  
  // Build footer content - prioritize Strapi logo URL over fallback
  // Show emoji fallback only if logo URL is not available
  const footerContent = globalFooter ? {
    logoIcon: footerLogoUrl ? null : '🎗', // Show emoji only if no logo URL
    logoText: globalFooter.logo?.name || 'CancerFax',
    logo: footerLogoUrl, // This will be null if logo extraction failed, triggering fallback
    description: globalFooter.description || 'Empowering patients with global access to advanced treatments, trials, and expert healthcare support for a healthier future. CancerFax connects patients with advanced global treatments, clinical trials, expert evaluations.',
    ctaTitle: globalFooter.footer_bottom_text || 'Explore the Latest Insights in Cancer Research',
    ctaButtonText: globalFooter.cta?.text || 'Connect with Our Experts',
    copyrightText: globalFooter.copyright || 'Copyright © 2025 CancerFax',
    legalLinks: globalFooter.policy_links?.map(link => ({
      text: link.text || '',
      url: link.URL || '#'
    })) || [
      { text: 'Terms of Service', url: '#' },
      { text: 'Privacy Policy', url: '#' },
      { text: 'Refund Policy', url: '#' },
      { text: 'Cookies', url: '#' }
    ],
    socialMediaLinks: strapiSocialLinks.length > 0 ? strapiSocialLinks : [],
  } : {
    logoIcon: '🎗',
    logoText: 'CancerFax',
    description: 'Empowering patients with global access to advanced treatments, trials, and expert healthcare support for a healthier future. CancerFax connects patients with advanced global treatments, clinical trials, expert evaluations.',
    ctaTitle: 'Explore the Latest Insights in Cancer Research',
    ctaButtonText: 'Connect with Our Experts',
    copyrightText: 'Copyright © 2025 CancerFax',
    legalLinks: [
      { text: 'Terms of Service', url: '#' },
      { text: 'Privacy Policy', url: '#' },
      { text: 'Refund Policy', url: '#' },
      { text: 'Cookies', url: '#' }
    ],
    socialMediaLinks: []
  };
  
  // Use Strapi social links (separated from contact info) - defined after footerContent
  const socials = strapiSocialLinks.length > 0
    ? strapiSocialLinks
    : (footerContent.socialMediaLinks && footerContent.socialMediaLinks.length > 0
      ? footerContent.socialMediaLinks
      : (Array.isArray(socialLinks) && socialLinks.length > 0 ? socialLinks : fallbackSocialLinks));

  // Debug: Log to verify Strapi data usage (moved after footerContent is defined)
  useEffect(() => {
    if (globalData && !globalLoading) {
      console.log('Footer: Strapi Logo Debug', {
        hasGlobalData: !!globalData,
        hasFooter: !!globalFooter,
        hasLogo: !!globalFooter?.logo,
        logoRaw: globalFooter?.logo,
        logoUrlFromAPI: globalFooter?.logo?.url, // Should be "/uploads/logo_851ef64fcb.png"
        logoUrlConverted: footerLogoUrl, // Should be "https://cancerfax.unifiedinfotechonline.com/uploads/logo_851ef64fcb.png"
        willRenderLogo: !!(footerLogoUrl && typeof footerLogoUrl === 'string' && footerLogoUrl.trim() !== ''),
        expectedFullUrl: globalFooter?.logo?.url 
          ? `${process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com'}${globalFooter.logo.url}`
          : null,
        getMediaUrlTest: globalFooter?.logo?.url ? getMediaUrl(globalFooter.logo.url) : null
      });
    }
  }, [globalData, globalFooter, footerLogoUrl, globalLoading]);

  return (
    <FooterSection>
      <Container>
        {/* Top Section */}
        <TopSection>
          <LeftTopSection>
            <LogoSection>
              {/* Always try to render Strapi logo first if available */}
              {/* Logo URL from Strapi */}
              {footerLogoUrl && typeof footerLogoUrl === 'string' && footerLogoUrl.trim() !== '' ? (
                <img 
                  src={footerLogoUrl} 
                  alt={globalFooter?.logo?.name || footerContent.logoText || 'CancerFax'} 
                  style={{ 
                    height: '50px', 
                    width: 'auto', 
                    objectFit: 'contain', 
                    maxWidth: '200px',
                    display: 'block'
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
                    // Hide the image and show fallback
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('✅ Footer logo loaded successfully from Strapi:', footerLogoUrl);
                  }}
                />
              ) : (
                // Show emoji/text fallback only if logo URL is not available
                footerContent.logoIcon && (
                  <>
                    <LogoIcon>{footerContent.logoIcon}</LogoIcon>
                    {footerContent.logoText && <LogoText>{footerContent.logoText}</LogoText>}
                  </>
                )
              )}
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
        
        <Divider />
        
        {/* Contact Row */}
        <ContactRow>
          {contacts.map((contact, index) => (
            <ContactItem key={index}>
              <IconBox>
                {contact.icon && typeof contact.icon === 'string' ? (
                  // If icon is a URL (http or path starting with /), render as image
                  (contact.icon.startsWith('http') || contact.icon.startsWith('/')) ? (
                    <img src={contact.icon} alt={contact.type || 'contact'} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
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
                    <img src={social.icon} alt={social.label || social.text || 'social'} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                  ) : (
                    // Otherwise render as text/emoji
                    social.icon
                  )
                ) : null}
              </SocialIcon>
            ))}
          </SocialLinks>
        </ContactRow>
        
        <Divider />
        
        {/* Links Section */}
        <LinksSection>
          {columns.map((column, columnIndex) => (
            <LinkColumn key={columnIndex}>
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
        </LinksSection>
        
        <BottomDivider />
        
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
                  <LocationAddress>{location.address}</LocationAddress>
                  <LocationPhone>
                    <PhoneIcon>📞</PhoneIcon>
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
                <LegalLink href={link.url || '#'}>{link.text}</LegalLink>
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

