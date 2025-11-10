import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSectionData, formatRichText, formatMedia } from '../../utils/strapiHelpers';

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 100px 120px;
  background: white;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    padding: 80px 80px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 32px;
  }
  
  @media (max-width: 480px) {
    padding: 40px 20px;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

const Label = styled.p`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 10px;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 9px;
    letter-spacing: 1.5px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', ${props => props.theme.fonts.heading};
  font-size: 36px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1.3;
  letter-spacing: -0.5px;
  margin: 0;
  
  @media (max-width: 1200px) {
    font-size: 32px;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
    letter-spacing: -0.3px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    letter-spacing: -0.2px;
  }
`;

const CTAButton = styled.button`
  padding: 20px 40px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
  }
  
  @media (max-width: 1024px) {
    padding: 18px 36px;
    font-size: 15px;
  }
  
  @media (max-width: 768px) {
    align-self: stretch;
    padding: 16px 32px;
    font-size: 14px;
    border-radius: 40px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 28px;
    font-size: 13px;
    white-space: normal;
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 349px 1fr 1fr;
  grid-template-rows: 222px 212px;
  gap: 0;
  border: 1px solid #E5E7EB;
  border-radius: 24px;
  overflow: hidden;
  background: white;
  
  @media (max-width: 1200px) {
    grid-template-columns: 320px 1fr 1fr;
    grid-template-rows: 200px 190px;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 280px 1fr 1fr;
    grid-template-rows: 180px 170px;
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const ImageSection = styled.div`
  grid-row: 1;
  grid-column: 1;
  overflow: hidden;
  border-radius: 24px 0 0 24px;
  height: 222px;
  width: 349px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  @media (max-width: 1200px) {
    height: 200px;
    width: 320px;
  }
  
  @media (max-width: 1024px) {
    height: 180px;
    width: 280px;
  }
  
  @media (max-width: 900px) {
    grid-row: 1;
    grid-column: 1;
    height: auto;
    width: 100%;
    min-height: 300px;
    border-radius: 24px 24px 0 0;
  }
  
  @media (max-width: 480px) {
    min-height: 250px;
  }
`;

// Steps are placed directly in ContentWrapper grid, no wrapper needed

const StepCard = styled.div`
  padding: 45px 35px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  border-left: ${props => props.$showLeftBorder ? '1px solid #E5E7EB' : 'none'};
  border-right: ${props => props.$showRightBorder ? '1px solid #E5E7EB' : 'none'};
  border-bottom: ${props => props.$showBottomBorder ? '1px solid #E5E7EB' : 'none'};
  
  /* Row 1 cards (Steps 1, 2): 222px */
  /* Row 2 cards (Steps 3, 4, 5): 212px */
  height: ${props => props.$gridRow === '1' ? '222px' : '212px'};
  
  ${props => props.$gridRow && `grid-row: ${props.$gridRow};`}
  ${props => props.$gridColumn && `grid-column: ${props.$gridColumn};`}
  
  /* Top-right corner for Step 2 */
  ${props => props.$topRightCorner && `
    border-radius: 0 24px 0 0;
  `}
  
  /* Bottom-left corner for Step 3 */
  ${props => props.$bottomLeftCorner && `
    border-radius: 0 0 0 24px;
  `}
  
  /* Bottom-right corner for Step 5 */
  ${props => props.$bottomRightCorner && `
    border-radius: 0 0 24px 0;
  `}
  
  @media (max-width: 1200px) {
    padding: 40px 30px;
    height: ${props => props.$gridRow === '1' ? '200px' : '190px'};
  }
  
  @media (max-width: 1024px) {
    padding: 35px 25px;
    height: ${props => props.$gridRow === '1' ? '180px' : '170px'};
  }
  
  @media (max-width: 900px) {
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #E5E7EB;
    padding: 32px 24px;
    height: auto;
    grid-row: auto;
    grid-column: 1;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  @media (max-width: 480px) {
    padding: 28px 20px;
    gap: 16px;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #4B5563;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  svg {
    width: 28px;
    height: 28px;
    color: white;
    stroke-width: 2;
  }
  
  @media (max-width: 1024px) {
    width: 56px;
    height: 56px;
    
    svg {
      width: 26px;
      height: 26px;
    }
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
  
  @media (max-width: 480px) {
    width: 46px;
    height: 46px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const StepTitle = styled.h3`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  font-size: 22px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1.4;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 1.5;
  }
`;

const StepDescription = styled.p`
  font-family: 'Montserrat', ${props => props.theme.fonts.body};
  font-size: 15px;
  font-weight: 400;
  color: #9CA3AF;
  line-height: 1.65;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.55;
  }
`;

// Icon components
const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UserCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3 3L22 4" />
  </svg>
);

const HospitalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CoordinationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const HowItWorks = ({ componentData, pageData }) => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent, steps: strapiSteps } = useSelector((state) => state.howItWorks);
  
  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  const howItWorksSection = componentData || getSectionData(globalData, 'howItWorks');
  
  // Force re-render when globalData changes (ensures Strapi updates are reflected)
  // The component will automatically re-render when globalData changes because it's in the useSelector
  // This useEffect ensures we log when data updates
  useEffect(() => {
    if (globalData && !globalLoading && howItWorksSection) {
      const stepsCount = howItWorksSection?.steps?.length || 0;
      const stepTitles = howItWorksSection?.steps?.map(s => {
        const stepData = s?.attributes || s;
        return stepData?.title || '';
      }).filter(Boolean) || [];
      
      console.log('🔄 HowItWorks: Data refreshed, checking for updates...', {
        stepsCount,
        stepTitles,
        hasSteps: stepsCount > 0,
        timestamp: new Date().toISOString(),
        rawStepsData: howItWorksSection?.steps
      });
    }
  }, [globalData, globalLoading, howItWorksSection]);
  
  // Icon mapping for dynamic icon rendering
  const iconMap = {
    document: <DocumentIcon />,
    userCheck: <UserCheckIcon />,
    hospital: <HospitalIcon />,
    coordination: <CoordinationIcon />,
    support: <SupportIcon />
  };

  // Fallback data
  const fallbackSection = {
    label: 'HOW IT WORKS',
    title: 'Your Journey to Better Cancer Care, Simplified',
    buttonText: 'Connect with our Experts',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=640',
    imageAlt: 'Doctor consultation'
  };

  const fallbackSteps = [
    {
      id: 1,
      title: '1. Share Your Medical Reports',
      description: 'Upload your medical reports for quick evaluation.',
      iconType: 'document',
      order: 1
    },
    {
      id: 2,
      title: '2. Receive Expert Evaluation',
      description: 'Get expert analysis to guide your treatment decisions.',
      iconType: 'userCheck',
      order: 2
    },
    {
      id: 3,
      title: '3. Choose the Right Hospital or Trial',
      description: 'Select the best hospitals or trials that suit your needs.',
      iconType: 'hospital',
      order: 3
    },
    {
      id: 4,
      title: '4. Seamless Coordination',
      description: 'Enjoy smooth coordination with the healthcare providers globally.',
      iconType: 'coordination',
      order: 4
    },
    {
      id: 5,
      title: '5. Continuous Support',
      description: 'Receive continuous support throughout your treatment journey.',
      iconType: 'support',
      order: 5
    }
  ];

  // Map Strapi data: heading -> label, sub_heading -> title
  // Priority: featuredImage > image > fallback
  const getSectionImage = () => {
    if (howItWorksSection?.featuredImage) {
      return formatMedia(howItWorksSection.featuredImage);
    }
    if (howItWorksSection?.image) {
      return formatMedia(howItWorksSection.image);
    }
    return fallbackSection.image;
  };
  
  const section = howItWorksSection ? {
    label: howItWorksSection.heading || fallbackSection.label,
    title: howItWorksSection.sub_heading || fallbackSection.title,
    buttonText: howItWorksSection.cta?.text || fallbackSection.buttonText,
    image: getSectionImage(),
    imageAlt: fallbackSection.imageAlt,
  } : (sectionContent || fallbackSection);
  
  // Extract steps from Strapi (steps array in how-it-works component)
  // Handle multiple possible structures: steps, steps.data, or nested attributes
  // Use useMemo to ensure steps are recalculated when howItWorksSection changes
  const strapiStepsArray = React.useMemo(() => {
    if (!howItWorksSection) {
      console.log('⚠️ HowItWorks: No howItWorksSection found');
      return [];
    }
    
    // Try different possible structures for steps
    let steps = null;
    
    // Structure 1: Direct steps array
    if (Array.isArray(howItWorksSection.steps)) {
      console.log('✅ HowItWorks: Found steps as direct array', howItWorksSection.steps.length);
      steps = howItWorksSection.steps;
    }
    // Structure 2: steps.data (nested data structure)
    else if (howItWorksSection.steps?.data && Array.isArray(howItWorksSection.steps.data)) {
      console.log('✅ HowItWorks: Found steps in steps.data', howItWorksSection.steps.data.length);
      steps = howItWorksSection.steps.data;
    }
    // Structure 3: Check if steps exists but is not an array (might be object with nested structure)
    else if (howItWorksSection.steps && typeof howItWorksSection.steps === 'object') {
      // Try to extract array from object values
      const possibleArray = Object.values(howItWorksSection.steps).find(Array.isArray);
      if (possibleArray) {
        console.log('✅ HowItWorks: Found steps in object values', possibleArray.length);
        steps = possibleArray;
      } else {
        console.log('⚠️ HowItWorks: steps is an object but no array found', {
          stepsKeys: Object.keys(howItWorksSection.steps),
          stepsValue: howItWorksSection.steps
        });
      }
    }
    // Structure 4: Check if we need to look in globalData directly
    else if (globalData?.dynamicZone) {
      const component = globalData.dynamicZone.find(
        item => item.__component === 'dynamic-zone.how-it-works'
      );
      if (component && Array.isArray(component.steps)) {
        console.log('✅ HowItWorks: Found steps in dynamicZone component', component.steps.length);
        steps = component.steps;
      } else if (component?.steps?.data && Array.isArray(component.steps.data)) {
        console.log('✅ HowItWorks: Found steps in dynamicZone component.steps.data', component.steps.data.length);
        steps = component.steps.data;
      }
    }
    
    if (!steps || steps.length === 0) {
      console.log('⚠️ HowItWorks: No steps found. howItWorksSection structure:', {
        hasSteps: !!howItWorksSection.steps,
        stepsType: typeof howItWorksSection.steps,
        stepsValue: howItWorksSection.steps,
        allKeys: Object.keys(howItWorksSection || {})
      });
    }
    
    return steps || [];
  }, [howItWorksSection, globalData]);
  const steps = useMemo(() => {
    if (strapiStepsArray && strapiStepsArray.length > 0) {
      return strapiStepsArray
        .map((step, index) => {
          const stepData = step?.attributes || step;
          
          // Map iconType from Strapi - check both iconType field and icon field
          // If iconType exists, use it; otherwise try to infer from icon name or use fallback
          let iconType = stepData?.iconType;
          if (!iconType && stepData?.icon) {
            // If icon is a media object, try to infer iconType from filename
            const iconName = stepData.icon?.name || stepData.icon?.url || '';
            if (iconName.includes('document') || iconName.includes('file')) iconType = 'document';
            else if (iconName.includes('user') || iconName.includes('check')) iconType = 'userCheck';
            else if (iconName.includes('hospital') || iconName.includes('building')) iconType = 'hospital';
            else if (iconName.includes('coordination') || iconName.includes('gear') || iconName.includes('cog')) iconType = 'coordination';
            else if (iconName.includes('support') || iconName.includes('heart')) iconType = 'support';
          }
          // Use fallback iconType based on order if still not found
          if (!iconType) {
            const stepOrder = stepData?.order !== undefined ? stepData.order : (step?.order !== undefined ? step.order : index + 1);
            const fallbackIconTypes = ['document', 'userCheck', 'hospital', 'coordination', 'support'];
            iconType = fallbackIconTypes[stepOrder - 1] || fallbackSteps[index]?.iconType || 'document';
          }
          
          return {
            id: step?.id || stepData?.id || index + 1,
            title: stepData?.title || fallbackSteps[index]?.title || '',
            description: formatRichText(stepData?.description) || stepData?.description || fallbackSteps[index]?.description || '',
            iconType: iconType,
            order: stepData?.order !== undefined ? stepData.order : (step?.order !== undefined ? step.order : index + 1),
          };
        })
        .filter(step => step.title)
        .sort((a, b) => {
          // Sort by order field if available, otherwise maintain original order
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          return 0;
        });
    }
    return (strapiSteps && strapiSteps.length > 0) ? strapiSteps : fallbackSteps;
  }, [strapiStepsArray, strapiSteps, fallbackSteps]);

  // Debug: Log to check if global data exists (moved after section and steps are defined)
  useEffect(() => {
    if (globalData && !globalLoading) {
      // Find all how-it-works related components in dynamic zone
      const allHowItWorksComponents = globalData.dynamicZone?.filter(
        item => item.__component?.includes('how-it-works') || item.__component?.includes('HowItWorks')
      ) || [];
      
      console.log('📊 How It Works Section: Strapi Data Usage Report', {
        sectionId: 'how-it-works',
        componentType: 'dynamic-zone.how-it-works',
        hasDynamicZone: !!globalData.dynamicZone,
        dynamicZoneLength: globalData.dynamicZone?.length || 0,
        allHowItWorksComponents: allHowItWorksComponents.map(c => ({
          __component: c.__component,
          hasHeading: !!c.heading,
          heading: c.heading,
          hasSubHeading: !!c.sub_heading,
          subHeading: c.sub_heading,
          hasFeaturedImage: !!c.featuredImage,
          featuredImageUrl: c.featuredImage?.url || c.featuredImage?.data?.attributes?.url || null,
          hasImage: !!c.image,
          imageUrl: c.image?.url || c.image?.data?.attributes?.url || null,
          hasCta: !!c.cta,
          ctaText: c.cta?.text,
          ctaUrl: c.cta?.URL,
          hasSteps: !!c.steps,
          stepsCount: c.steps?.length || 0,
          stepsData: c.steps?.map((step, idx) => {
            const stepData = step?.attributes || step;
            return {
              id: step?.id,
              title: stepData?.title,
              description: stepData?.description,
              iconType: stepData?.iconType,
              hasIcon: !!stepData?.icon,
              iconName: stepData?.icon?.name || stepData?.icon?.url || null,
              order: stepData?.order !== undefined ? stepData.order : (step?.order !== undefined ? step.order : null),
              rawStep: step,
              stepKeys: stepData ? Object.keys(stepData) : null
            };
          }) || [],
          keys: Object.keys(c)
        })),
        howItWorksSection: {
          found: !!howItWorksSection,
          __component: howItWorksSection?.__component,
          hasHeading: !!howItWorksSection?.heading,
          heading: howItWorksSection?.heading,
          hasSubHeading: !!howItWorksSection?.sub_heading,
          subHeading: howItWorksSection?.sub_heading,
          hasFeaturedImage: !!howItWorksSection?.featuredImage,
          featuredImageUrl: howItWorksSection?.featuredImage?.url || howItWorksSection?.featuredImage?.data?.attributes?.url || null,
          hasImage: !!howItWorksSection?.image,
          imageUrl: howItWorksSection?.image?.url || howItWorksSection?.image?.data?.attributes?.url || null,
          hasCta: !!howItWorksSection?.cta,
          ctaText: howItWorksSection?.cta?.text,
          ctaUrl: howItWorksSection?.cta?.URL,
          hasSteps: !!howItWorksSection?.steps,
          stepsCount: howItWorksSection?.steps?.length || 0,
          stepsData: howItWorksSection?.steps?.map((step, idx) => {
            const stepData = step?.attributes || step;
            return {
              id: step?.id,
              title: stepData?.title,
              description: stepData?.description,
              iconType: stepData?.iconType,
              hasIcon: !!stepData?.icon,
              iconName: stepData?.icon?.name || stepData?.icon?.url || null,
              order: stepData?.order !== undefined ? stepData.order : (step?.order !== undefined ? step.order : null),
              rawStep: step,
              stepKeys: stepData ? Object.keys(stepData) : null
            };
          }) || [],
          keys: howItWorksSection ? Object.keys(howItWorksSection) : null
        },
        finalSection: {
          label: section?.label,
          title: section?.title,
          buttonText: section?.buttonText,
          image: section?.image
        },
        finalSteps: {
          count: steps.length,
          steps: steps.map(s => ({ id: s.id, title: s.title, iconType: s.iconType }))
        },
        usingStrapi: !!howItWorksSection,
        usingFallback: !howItWorksSection
      });
    }
  }, [globalData, globalLoading, howItWorksSection, section, steps]);

  // Calculate grid positioning for each step dynamically
  const getStepPositioning = (index, total) => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    
    // For 2x3 grid layout (image in row 1, col 1)
    let gridRow, gridColumn;
    
    if (index === 0 || index === 1) {
      // First row cards (positions 1,2)
      gridRow = '1';
      gridColumn = (index + 2).toString(); // columns 2, 3
    } else {
      // Second row cards (positions 3,4,5)
      gridRow = '2';
      gridColumn = ((index - 2) + 1).toString(); // columns 1, 2, 3
    }

    return {
      gridRow,
      gridColumn,
      showLeftBorder: gridColumn === '2' || (gridRow === '2' && gridColumn === '1'),
      showRightBorder: gridColumn === '2',
      showBottomBorder: gridRow === '1',
      topRightCorner: index === 1, // Step 2
      bottomLeftCorner: index === 2, // Step 3
      bottomRightCorner: index === total - 1 && gridRow === '2' && gridColumn === '3' // Last step in row 2, col 3
    };
  };

  // Create a unique key based on steps data to force re-render when data changes
  // This ensures the component updates when Strapi data changes
  const sectionKey = useMemo(() => {
    if (howItWorksSection?.steps && howItWorksSection.steps.length > 0) {
      // Create key from step IDs and titles to detect changes
      const stepSignature = howItWorksSection.steps
        .map(s => {
          const stepData = s?.attributes || s;
          return `${stepData?.id || ''}-${stepData?.title || ''}-${stepData?.order || ''}`;
        })
        .join('|');
      return `how-it-works-${stepSignature}`;
    }
    return `how-it-works-fallback-${steps.length}`;
  }, [howItWorksSection?.steps, steps.length]);

  return (
    <Section id="how-it-works" key={sectionKey}>
      <Container>
        <Header>
          <Label>{section.label}</Label>
          <TopHeader>
            <Title>{section.title}</Title>
            <CTAButton>{section.buttonText}</CTAButton>
          </TopHeader>
        </Header>
        
        <ContentWrapper>
          <ImageSection>
            <img 
              src={section.image} 
              alt={section.imageAlt || 'Doctor consultation'} 
            />
          </ImageSection>
          
          {steps.map((step, index) => {
            const positioning = getStepPositioning(index, steps.length);
            const icon = iconMap[step.iconType] || iconMap.document;
            
            // Ensure step number is displayed (use order if available, otherwise index + 1)
            const stepNumber = step.order !== undefined ? step.order : index + 1;
            // If title doesn't start with a number, prepend it
            const displayTitle = step.title && /^\d+\./.test(step.title.trim()) 
              ? step.title 
              : `${stepNumber}. ${step.title}`;
            
            return (
              <StepCard 
                key={step.id}
                $gridRow={positioning.gridRow}
                $gridColumn={positioning.gridColumn}
                $showLeftBorder={positioning.showLeftBorder}
                $showRightBorder={positioning.showRightBorder}
                $showBottomBorder={positioning.showBottomBorder}
                $topRightCorner={positioning.topRightCorner}
                $bottomLeftCorner={positioning.bottomLeftCorner}
                $bottomRightCorner={positioning.bottomRightCorner}
              >
                <IconWrapper>
                  {icon}
                </IconWrapper>
                <StepContent>
                  <StepTitle>{displayTitle}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </StepCard>
            );
          })}
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default HowItWorks;

