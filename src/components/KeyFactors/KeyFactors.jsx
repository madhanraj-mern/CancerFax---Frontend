import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchKeyFactorsSection, fetchKeyFactors } from '../../store/slices/keyFactorsSlice';
import { getMediaUrl } from '../../services/api';

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 160px 120px 50px 120px;
  background: #F5F5F5;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    padding: 140px 80px 45px 80px;
  }
  
  @media (max-width: 768px) {
    padding: 110px 32px 35px 32px;
  }
  
  @media (max-width: 480px) {
    padding: 90px 20px 30px 20px;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 40px;
    gap: 24px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.p`
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #2D3748;
  line-height: 1.2;
  letter-spacing: -0.6px;
  margin: 0;
  max-width: 750px;
  
  @media (max-width: 1200px) {
    font-size: 38px;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

const CTAButton = styled.button`
  padding: 20px 40px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
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
  background: #F3F4F6;
  
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

const StepCard = styled.div`
  padding: 40px 32px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start;
  justify-content: center;
  border-left: ${props => props.showLeftBorder ? '1px solid #E5E7EB' : 'none'};
  border-right: ${props => props.showRightBorder ? '1px solid #E5E7EB' : 'none'};
  border-bottom: ${props => props.showBottomBorder ? '1px solid #E5E7EB' : 'none'};
  
  height: ${props => props.gridRow === '1' ? '222px' : '212px'};
  
  ${props => props.gridRow && `grid-row: ${props.gridRow};`}
  ${props => props.gridColumn && `grid-column: ${props.gridColumn};`}
  
  ${props => props.topRightCorner && `border-radius: 0 24px 0 0;`}
  ${props => props.bottomLeftCorner && `border-radius: 0 0 0 24px;`}
  ${props => props.bottomRightCorner && `border-radius: 0 0 24px 0;`}
  
  @media (max-width: 1200px) {
    padding: 36px 28px;
    height: ${props => props.gridRow === '1' ? '200px' : '190px'};
  }
  
  @media (max-width: 1024px) {
    padding: 32px 24px;
    gap: 16px;
    height: ${props => props.gridRow === '1' ? '180px' : '170px'};
  }
  
  @media (max-width: 900px) {
    grid-row: auto !important;
    grid-column: 1 !important;
    height: auto !important;
    min-height: 200px;
    border: none !important;
    border-bottom: 1px solid #E5E7EB !important;
    border-radius: 0 !important;
    padding: 32px 24px;
    
    &:last-child {
      border-bottom: none !important;
      border-radius: 0 0 24px 24px !important;
    }
  }
  
  @media (max-width: 480px) {
    padding: 28px 20px;
    min-height: 180px;
    gap: 14px;
  }
`;

const IconWrapper = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #556B7F;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 32px;
    height: 32px;
    color: white;
  }
  
  @media (max-width: 1024px) {
    width: 60px;
    height: 60px;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
  
  @media (max-width: 900px) {
    width: 56px;
    height: 56px;
    
    svg {
      width: 26px;
      height: 26px;
    }
  }
  
  @media (max-width: 480px) {
    width: 52px;
    height: 52px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const StepTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #36454F;
  margin: 0;
  line-height: 1.4;
  
  @media (max-width: 1200px) {
    font-size: 20px;
  }
  
  @media (max-width: 1024px) {
    font-size: 19px;
  }
  
  @media (max-width: 900px) {
    font-size: 21px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const StepDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #6B7280;
  margin: 0;
  line-height: 1.6;
  
  @media (max-width: 1200px) {
    font-size: 14px;
  }
  
  @media (max-width: 1024px) {
    font-size: 13px;
    line-height: 1.5;
  }
  
  @media (max-width: 900px) {
    font-size: 15px;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const KeyFactors = () => {
  const dispatch = useDispatch();
  const { sectionContent, factors, loading, error } = useSelector((state) => state.keyFactors);

  useEffect(() => {
    dispatch(fetchKeyFactorsSection());
    dispatch(fetchKeyFactors());
  }, [dispatch]);

  const defaultContent = {
    label: 'KEY FACTORS',
    title: 'Our Criteria for Partner Hospital Selection',
    buttonText: 'Connect with our Experts',
    factors: [
      {
        id: 1,
        title: 'International accreditation and certifications (JCI, NCI, etc.)',
        description: '',
        icon: 'certificate',
      },
      {
        id: 2,
        title: 'Specialized cancer / oncology departments & advanced therapy capability',
        description: '',
        icon: 'brain',
      },
      {
        id: 3,
        title: 'Experience with clinical trials & research infrastructure',
        description: '',
        icon: 'research',
      },
      {
        id: 4,
        title: 'Strong patient outcome metrics & ethical practices',
        description: '',
        icon: 'chart',
      },
      {
        id: 5,
        title: 'Multidisciplinary teams and language / logistical support',
        description: '',
        icon: 'team',
      },
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
      alt: 'Healthcare partnership handshake',
    },
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'certificate':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M7 7h10M7 12h10M7 17h6" />
            <circle cx="17" cy="17" r="3" />
            <path d="M17 14v6" />
          </svg>
        );
      case 'brain':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a3 3 0 0 0-3 3c0 1.657-1.343 3-3 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2c1.657 0 3 1.343 3 3a3 3 0 0 0 6 0c0-1.657 1.343-3 3-3h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2c-1.657 0-3-1.343-3-3a3 3 0 0 0-3-3z" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        );
      case 'research':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 3v18M9 3a3 3 0 0 1 6 0M9 3a3 3 0 0 0-6 0v18a3 3 0 0 0 6 0M9 21a3 3 0 0 0 6 0M9 21a3 3 0 0 1-6 0M15 3a3 3 0 0 1 6 0v18a3 3 0 0 1-6 0" />
            <path d="M3 9h18M3 15h18" />
          </svg>
        );
      case 'chart':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M18 17V9M13 17v-6M8 17v-4" />
            <circle cx="18" cy="7" r="2" />
            <path d="M18 9l-5 4-3-3-4 4" />
          </svg>
        );
      case 'team':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Use Strapi data or fallback
  const content = sectionContent || defaultContent;
  const factorsList = Array.isArray(factors) && factors.length > 0 ? factors : defaultContent.factors;
  
  // Handle image URL - getMediaUrl now handles all cases
  const imageUrl = content.image ? getMediaUrl(content.image) : defaultContent.image.url;
  const imageAlt = content.imageAlt || defaultContent.image.alt;

  return (
    <Section>
      <Container>
        <Header>
          <HeaderContent>
            <Label>{content.label || defaultContent.label}</Label>
            <Title>{content.title || defaultContent.title}</Title>
          </HeaderContent>
          <CTAButton onClick={() => console.log('Connect with experts')}>
            {content.buttonText || defaultContent.buttonText}
          </CTAButton>
        </Header>

        <ContentWrapper>
          <ImageSection>
            <img src={imageUrl} alt={imageAlt} />
          </ImageSection>

          {factorsList.map((factor, index) => {
            // Factor 1: Grid row 1, column 2
            // Factor 2: Grid row 1, column 3 (top-right corner)
            // Factor 3: Grid row 2, column 1 (bottom-left corner)
            // Factor 4: Grid row 2, column 2
            // Factor 5: Grid row 2, column 3 (bottom-right corner)
            
            const gridPosition = {
              1: { row: '1', column: '2', showLeftBorder: true },
              2: { row: '1', column: '3', showLeftBorder: true, topRightCorner: true },
              3: { row: '2', column: '1', showRightBorder: true, bottomLeftCorner: true },
              4: { row: '2', column: '2', showLeftBorder: true },
              5: { row: '2', column: '3', showLeftBorder: true, bottomRightCorner: true },
            };

            const position = factor.order || factor.id || (index + 1);
            const posConfig = gridPosition[position] || gridPosition[1];

            return (
              <StepCard
                key={factor.id || index}
                gridRow={posConfig.row}
                gridColumn={posConfig.column}
                showLeftBorder={posConfig.showLeftBorder}
                showRightBorder={posConfig.showRightBorder}
                showBottomBorder={posConfig.showBottomBorder}
                topRightCorner={posConfig.topRightCorner}
                bottomLeftCorner={posConfig.bottomLeftCorner}
                bottomRightCorner={posConfig.bottomRightCorner}
              >
                <IconWrapper>{getIcon(factor.icon)}</IconWrapper>
                <StepTitle>{factor.title}</StepTitle>
                {factor.description && <StepDescription>{factor.description}</StepDescription>}
              </StepCard>
            );
          })}
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default KeyFactors;

    