import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchDedicatedSupport } from '../../store/slices/dedicatedSupportSlice';
import { getMediaUrl } from '../../services/api';

// Default fallback data
const defaultData = {
  subtitle: 'CONTACT US',
  title: 'More Dedicated Support',
  cards: [
    {
      id: 1,
      title: 'Press Inquiry',
      description: 'For any press-related inquiry, please write to us on the below email directly.',
      email: 'pressinfo@email.com',
      icon: '📧', // Fallback emoji
    },
    {
      id: 2,
      title: 'Business Inquiry',
      description: 'For any press-related inquiry, please write to us on the below email directly.',
      email: 'business@email.com',
      icon: '🤝', // Fallback emoji
    },
  ],
};

const DedicatedSupport = () => {
  const dispatch = useDispatch();
  const { sectionData, cards } = useSelector((state) => state.dedicatedSupport);

  useEffect(() => {
    dispatch(fetchDedicatedSupport());
  }, [dispatch]);

  // Extract data with fallbacks
  const subtitle = sectionData?.attributes?.subtitle || defaultData.subtitle;
  const title = sectionData?.attributes?.title || defaultData.title;
  const supportCards = cards.length > 0 ? cards : defaultData.cards;

  return (
    <SectionContainer>
      <ContentWrapper>
        <HeaderSection>
          <Subtitle>{subtitle}</Subtitle>
          <Title>{title}</Title>
        </HeaderSection>

        <CardsGrid>
          {supportCards.map((card, index) => {
            const cardData = card.attributes || card;
            const cardTitle = cardData.title;
            const cardDescription = cardData.description;
            const cardEmail = cardData.email;
            const isRightAligned = index % 2 === 1; // Right-align every second card
            
            // Get icon/image URL
            let iconUrl = null;
            if (cardData.icon?.data?.attributes?.url) {
              iconUrl = getMediaUrl(cardData.icon.data.attributes.url);
            }

            const iconElement = (
              <IconContainer>
                {iconUrl ? (
                  <IconImage src={iconUrl} alt={cardTitle} />
                ) : (
                  <IconFallback>{cardData.icon || '📧'}</IconFallback>
                )}
              </IconContainer>
            );

            return (
              <Card key={card.id || index}>
                <CardContent isRightAligned={isRightAligned}>
                  {!isRightAligned && iconElement}
                  
                  <TextContent>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardDescription>{cardDescription}</CardDescription>
                    
                    <EmailButton href={`mailto:${cardEmail}`}>
                      {cardEmail}
                    </EmailButton>
                  </TextContent>
                  
                  {isRightAligned && iconElement}
                </CardContent>
              </Card>
            );
          })}
        </CardsGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  background: #F7F8FA;
  padding: 100px 20px;
  
  @media (max-width: 968px) {
    padding: 80px 20px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 120px;
  
  @media (max-width: 1200px) {
    padding: 0 60px;
  }
  
  @media (max-width: 968px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Subtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #475569;
  margin: 0 0 20px 0;
  
  @media (max-width: 768px) {
    font-size: 11px;
    letter-spacing: 3px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 45px;
  font-weight: 550;
  line-height: 1.2;
  color: #1e293b;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 42px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const CardsGrid = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: stretch;
  
  @media (max-width: 1200px) {
    gap: 30px;
    flex-wrap: wrap;
  }
  
  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  background: #FFFFFF;
  border-radius: 24px;
  padding: 30px 35px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  width: 520px;
  min-width: 520px;
  max-width: 520px;
  height: 185px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 1120px) {
    width: 100%;
    min-width: 300px;
    max-width: 520px;
    height: auto;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: 280px;
    max-width: 100%;
    height: auto;
    padding: 30px 25px;
  }
`;

const CardContent = styled.div`
  display: flex;
  gap: 25px;
  align-items: flex-start;
  height: 100%;
  flex-direction: ${props => props.isRightAligned ? 'row-reverse' : 'row'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const IconFallback = styled.div`
  font-size: 48px;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    gap: 15px;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const CardDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: #64748b;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const EmailButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 185px;
  height: 40px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF8EC5 100%);
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
  padding: 0 20px;
  box-sizing: border-box;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
    background: linear-gradient(135deg, #FF5FAB 0%, #FF7DB8 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
    max-width: 185px;
  }
`;

export default memo(DedicatedSupport);
