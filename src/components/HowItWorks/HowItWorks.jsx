import React from 'react';
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
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent, steps: strapiSteps } = useSelector((state) => state.howItWorks);
  
  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  const howItWorksSection = componentData || getSectionData(globalData, 'howItWorks');
  
  // Debug: Log to check if global data exists
  const globalLoading = useSelector(state => state.global?.loading);
  if (globalData && !globalLoading) {
    console.log('HowItWorks: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      howItWorksSection: !!howItWorksSection,
      sectionData: howItWorksSection ? {
        heading: howItWorksSection.heading,
        sub_heading: howItWorksSection.sub_heading
      } : null
    });
  }

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
  const section = howItWorksSection ? {
    label: howItWorksSection.heading || fallbackSection.label,
    title: howItWorksSection.sub_heading || fallbackSection.title,
    buttonText: howItWorksSection.cta?.text || fallbackSection.buttonText,
    image: formatMedia(howItWorksSection.image) || fallbackSection.image,
    imageAlt: fallbackSection.imageAlt,
  } : (sectionContent || fallbackSection);
  
  // Extract steps from Strapi (steps array in how-it-works component)
  const strapiStepsArray = howItWorksSection?.steps || [];
  const steps = strapiStepsArray.length > 0 
    ? strapiStepsArray.map((step, index) => {
        const stepData = step?.attributes || step;
        return {
          id: step?.id || index + 1,
          title: stepData?.title || fallbackSteps[index]?.title || '',
          description: formatRichText(stepData?.description) || stepData?.description || fallbackSteps[index]?.description || '',
          iconType: stepData?.iconType || fallbackSteps[index]?.iconType || 'document',
          order: stepData?.order || stepData?.order || index + 1,
        };
      }).filter(step => step.title)
    : ((strapiSteps && strapiSteps.length > 0) ? strapiSteps : fallbackSteps);

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

  return (
    <Section id="how-it-works">
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
                  <StepTitle>{step.title}</StepTitle>
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

