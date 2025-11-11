/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';

const HospitalDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <NavigationWrapper>
        <Navigation darkText={true} />
      </NavigationWrapper>
      
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 56px;
  background: #FAF5F0;
  overflow-x: hidden;
  min-height: 100vh;
`;

const NavigationWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 840px;
  position: relative;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const HeroOverlay = styled.div`
  width: 100%;
  padding: 56px 112px;
  background: linear-gradient(to left, rgba(55, 65, 81, 0.25), rgba(55, 65, 81, 0));
  backdrop-filter: blur(24px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  z-index: 2;
`;

const HeroContent = styled.div`
  width: 1172px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
`;

const HeroLabel = styled.div`
  width: 1172px;
  height: 8px;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Be Vietnam Pro', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const HeroMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeroTitle = styled.h1`
  flex: 1;
  color: #FFFFFF;
  font-size: 48px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  line-height: 60px;
`;

const HeroButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const HeroButton = styled.button`
  padding: 16px 20px;
  border-radius: 20px;
  border: 1px solid #FFFFFF;
  border-offset: -1px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #FFFFFF;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ButtonIcon = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  overflow: hidden;
`;

const IconPath = styled.div`
  width: 10px;
  height: 14px;
  position: absolute;
  left: 2.83px;
  top: 1.33px;
  background: #FFFFFF;
`;

const ShareIcon = styled.div`
  width: 14px;
  height: 12px;
  position: absolute;
  left: 1.40px;
  top: 2.48px;
  background: #FFFFFF;
`;

const ButtonText = styled.span`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const HeroBottom = styled.div`
  width: 100%;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
`;

const HeroCTAButton = styled.button`
  padding: 16px 28px;
  background: #F472B6;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #EC4899;
  }
`;

const HeroDescription = styled.p`
  flex: 1;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const NavigationOverlay = styled.div`
  width: 100%;
  height: 96px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
`;

const AboutSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const AboutSidebar = styled.aside`
  padding: 56px 112px 56px 112px;
  background: #FAF5F0;
  border-top-left-radius: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;
`;

const SidebarTitleWrapper = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SidebarTitle = styled.h2`
  width: 100%;
  height: 16px;
  color: #374151;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 36px;
`;

const SidebarTitleUnderline = styled.div`
  width: 28px;
  height: 0;
  outline: 3px solid #F472B6;
  outline-offset: -1.5px;
`;

const SidebarMenu = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
`;

const SidebarMenuItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const MenuItemIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  overflow: hidden;
`;

const LocationIcon = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 1.75px;
  top: 1.75px;
  background: #374151;
`;

const DirectionIcon = styled.div`
  width: 14px;
  height: 20px;
  position: absolute;
  left: 5.24px;
  top: 1.53px;
  background: #374151;
`;

const InfrastructureIcon = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 1.12px;
  top: 1.13px;
  background: #374151;
`;

const TeamIcon = styled.div`
  width: 20px;
  height: 16px;
  position: absolute;
  left: 1px;
  top: 4px;
  background: #374151;
`;

const FacilitiesIcon = styled.div`
  width: 20px;
  height: 16px;
  position: absolute;
  left: 1.31px;
  top: 3.05px;
  background: #374151;
`;

const MediaIcon = styled.div`
  width: 20px;
  height: 16px;
  position: absolute;
  left: 1.31px;
  top: 3.05px;
  background: #374151;
`;

const MenuItemText = styled.span`
  flex: 1;
  color: #374151;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const AboutContent = styled.div`
  flex: 1;
  padding: 56px 112px 56px 0;
  background: #FAF5F0;
  border-top-right-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  overflow: hidden;
`;

const AboutTitle = styled.h1`
  width: 100%;
  color: #374151;
  font-size: 48px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  line-height: 56px;
`;

const AboutImage = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 30px;
  object-fit: cover;
`;

const AboutTextSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
`;

const AboutText = styled.p`
  width: 100%;
  color: #374151;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const AboutLink = styled.a`
  color: #374151;
  text-decoration: underline;
  
  &:hover {
    color: #F472B6;
  }
`;

const AboutList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const AboutListItem = styled.div`
  width: 100%;
  color: #374151;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const OverviewSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
`;

const OverviewTitle = styled.h3`
  width: 100%;
  color: #374151;
  font-size: 20px;
  font-weight: 500;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 32px;
`;

const OverviewContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const OverviewLabel = styled.div`
  width: 100%;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const OverviewText = styled.div`
  color: #374151;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const OverviewList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const OverviewListItem = styled.div`
  width: 100%;
  color: #374151;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const StoriesSection = styled.section`
  width: 100%;
  padding: 112px 112px 0;
  background: #FAF5F0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`;

const StoriesHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const StoriesLabel = styled.div`
  width: 1172px;
  height: 8px;
  color: #374151;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Be Vietnam Pro', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const StoriesTitleRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StoriesTitle = styled.h2`
  flex: 1;
  color: #374151;
  font-size: 48px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  line-height: 56px;
`;

const StoriesDescription = styled.p`
  width: 524px;
  color: #374151;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const StoriesVideoCard = styled.div`
  width: 1202px;
  height: 527px;
  position: relative;
  background: #0C4A6E;
  border-radius: 40px;
  overflow: hidden;
`;

const VideoBackground = styled.div`
  width: 1234.35px;
  height: 823px;
  position: absolute;
  left: 0;
  top: -16px;
  background: rgba(12, 74, 110, 0.2);
`;

const VideoOverlay = styled.div`
  width: 653px;
  height: 637px;
  position: absolute;
  left: 626px;
  top: -46px;
  transform: rotate(90deg);
  transform-origin: top left;
  background: linear-gradient(to left, rgba(55, 65, 81, 0.6), rgba(55, 65, 81, 0));
  backdrop-filter: blur(24px);
`;

const VideoContent = styled.div`
  width: 476px;
  position: absolute;
  left: 72px;
  top: 146px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 44px;
`;

const VideoLabelWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const VideoLabelDot = styled.div`
  width: 16px;
  height: 16px;
  background: #F472B6;
`;

const VideoLabel = styled.div`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Be Vietnam Pro', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const VideoTitle = styled.h3`
  width: 100%;
  color: #FFFFFF;
  font-size: 36px;
  font-weight: 600;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 48px;
`;

const VideoButton = styled.button`
  padding: 16px 28px;
  background: #F472B6;
  border-radius: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 16px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #EC4899;
  }
`;

const PlayButton = styled.div`
  width: 144px;
  height: 144px;
  padding: 10px;
  position: absolute;
  left: 813px;
  top: 191px;
  border-radius: 90px;
  border: 2px solid #FFFFFF;
  border-offset: -2px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PlayIcon = styled.div`
  width: 96px;
  height: 96px;
  padding: 24px;
  background: #FFFFFF;
  border-radius: 72.28px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  
  &::after {
    content: '';
    width: 28px;
    height: 36px;
    background: #F472B6;
    clip-path: polygon(0 0, 0 100%, 100% 50%);
  }
`;

const FlagshipSection = styled.section`
  width: 100%;
  height: 875px;
  position: relative;
  background: #FAF5F0;
  overflow: hidden;
`;

const FlagshipBackground = styled.img`
  width: 1537.75px;
  height: 1207.91px;
  position: absolute;
  left: 182.63px;
  top: -365px;
  transform: rotate(15deg);
  transform-origin: top left;
  opacity: 0.1;
  src: url('https://placehold.co/1538x1208');
`;

const FlagshipLabel = styled.div`
  position: absolute;
  left: 618px;
  top: 120px;
  color: #374151;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Be Vietnam Pro', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const FlagshipTitle = styled.h2`
  position: absolute;
  left: 389px;
  top: 177px;
  text-align: center;
  color: #374151;
  font-size: 48px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  line-height: 56px;
`;

const FlagshipDescription = styled.p`
  width: 836px;
  position: absolute;
  left: 302px;
  top: 255px;
  text-align: center;
  color: #374151;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 24px;
`;

const FlagshipCarousel = styled.div`
  width: 100%;
  height: 384px;
  position: absolute;
  left: 0;
  top: 339px;
`;

const CarouselImages = styled.div`
  position: absolute;
  left: 120px;
  top: 0;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselImage = styled.img`
  width: 539px;
  height: 320px;
  border-radius: 40px;
  object-fit: cover;
  flex-shrink: 0;
  scroll-snap-align: start;
`;

const CarouselControls = styled.div`
  position: absolute;
  left: 640px;
  top: 356px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
`;

const CarouselArrowLeft = styled.div`
  width: 56px;
  height: 56px;
  background: #D4D4D8;
  cursor: pointer;
  
  &:hover {
    background: #A1A1AA;
  }
  
  &::after {
    content: '←';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #374151;
    font-size: 24px;
  }
`;

const CarouselDot = styled.div`
  width: 44px;
  height: 32px;
  background: #6B7280;
  border-radius: 4px;
`;

const CarouselArrowRight = styled.div`
  width: 56px;
  height: 56px;
  background: #D4D4D8;
  cursor: pointer;
  
  &:hover {
    background: #A1A1AA;
  }
  
  &::after {
    content: '→';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #374151;
    font-size: 24px;
  }
`;

export default HospitalDetails;


