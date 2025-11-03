import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  position: relative;
  min-height: 840px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  @media (max-width: 1024px) {
    min-height: 700px;
  }
  
  @media (max-width: 768px) {
    min-height: 600px;
  }
  
  @media (max-width: 480px) {
    min-height: 500px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 60px 120px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1400px) {
    padding: 60px 80px;
  }
  
  @media (max-width: 1024px) {
    padding: 50px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 16px;
  }
`;

const Tagline = styled.div`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.body};
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 40px;
`;

const HeroContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
`;

const HospitalName = styled.h1`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.heading};
  font-size: 52px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -2px;
  margin: 0;
  flex: 1;
  min-width: 300px;
  
  @media (max-width: 1024px) {
    font-size: 44px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
    letter-spacing: -1.5px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    letter-spacing: -1px;
    min-width: 200px;
  }
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 240px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const DirectionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.white};
  background: transparent;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    flex: 1;
    padding: 14px 16px;
    font-size: 15px;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  padding: 16px 20px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.white};
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  gap: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding-top: 30px;
    gap: 24px;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 240px;
  padding: 16px 20px;
  border-radius: 20px;
  background-color: ${props => props.theme.colors.pink};
  border: none;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 105, 180, 0.4);
  }
  
  @media (max-width: 768px) {
    min-width: 100%;
    padding: 14px 16px;
    font-size: 15px;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
  flex: 1;
  min-width: 300px;
  
  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 22px;
    min-width: 100%;
  }
`;

const HospitalDetailsHero = ({ 
  hospitalName = "Hospital name goes here",
  backgroundImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920",
  onGetDirections,
  onShare,
  onSubmitReports
}) => {
  return (
    <HeroContainer>
      <BackgroundImage
        src={backgroundImage}
        alt={hospitalName}
        loading="lazy"
      />
      
      <ContentWrapper>
        <Tagline>Way to cure your curiosity</Tagline>
        
        <HeroContentGrid>
          <TopRow>
            <HospitalName>{hospitalName}</HospitalName>
            
            <ActionButtonsGroup>
              <DirectionsButton onClick={onGetDirections}>
                <Icon 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M8 1C5.24 1 3 3.24 3 6c0 3.54 5 9 5 9s5-5.46 5-9c0-2.76-2.24-5-5-5zm0 6.75c-.97 0-1.75-.78-1.75-1.75S7.03 4.25 8 4.25s1.75.78 1.75 1.75S8.97 7.75 8 7.75z' fill='white'/%3E%3C/svg%3E"
                  alt=""
                />
                Get Directions
              </DirectionsButton>
              
              <IconButton onClick={onShare}>
                <Icon 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M12 10.5c-.7 0-1.32.28-1.77.73L6.45 9.05c.05-.17.05-.33.05-.5s0-.33-.05-.5l3.78-2.18c.45.45 1.07.73 1.77.73 1.38 0 2.5-1.12 2.5-2.5S13.38 2 12 2s-2.5 1.12-2.5 2.5c0 .17 0 .33.05.5L5.77 7.18C5.32 6.73 4.7 6.45 4 6.45c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.7 0 1.32-.28 1.77-.73l3.78 2.18c-.05.17-.05.33-.05.5 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z' fill='white'/%3E%3C/svg%3E"
                  alt=""
                />
              </IconButton>
            </ActionButtonsGroup>
          </TopRow>
          
          <BottomRow>
            <SubmitButton onClick={onSubmitReports}>
              Submit reports & check eligibility
            </SubmitButton>
            
            <Description>
              CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.
            </Description>
          </BottomRow>
        </HeroContentGrid>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HospitalDetailsHero;
