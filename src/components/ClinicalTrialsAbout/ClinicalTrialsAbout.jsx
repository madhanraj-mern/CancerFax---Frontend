import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSectionData, getDynamicZoneComponent, formatRichText, formatMedia } from '../../utils/strapiHelpers';

const Label = styled.p`
  color: ${props => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
`;

const BackgroundImageHolder = styled.div`
  border-radius: 40px;
  opacity: 1;
  transform: rotate(0deg);
  overflow: hidden;
  background: #36454F;
  @media (max-width: 575px) {
    border-radius: 24px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 40px;
  }
`;

const ForegroundImage = styled.div`
  position: absolute;
  width: 327px;
  height: 474px;
  top: -56px;
  left: 45px;
  opacity: 1;
  transform: rotate(0deg);
  overflow: hidden;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 1200px) {
    width: 280px;
    height: 410px;
    top: -56px;
    left: 40px;
  }
  @media (max-width: 768px) {
    width: auto;
    height: auto;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 270px;
    margin: 0 auto;
  } 
`;

const Description = styled.p`
  color: ${props => props.theme.colors.primary};
`;

const ExploreButton = styled.a`
    max-width: 259px;
    @media (max-width: 575px) {
     max-width: 100%;
    }
`;

const ClinicalTrialsAbout = ({ componentData, pageData }) => {
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent } = useSelector((state) => state.clinicalTrialsAbout);

  // Extract data from global Strapi response
  // ClinicalTrialsAbout might use statistics section or separate data
  const sourceData = pageData || globalData;
  const statisticsSection = componentData
    || getDynamicZoneComponent(sourceData, 'dynamic-zone.statistics')
    || getSectionData(sourceData, 'statistics');
  
  // Debug: Log to check if global data exists
  const globalLoading = useSelector(state => state.global?.loading);
  if (globalData && !globalLoading) {
    console.log('ClinicalTrialsAbout: globalData loaded', {
      hasDynamicZone: !!globalData.dynamicZone,
      statisticsSection: !!statisticsSection
    });
  }

  // Fallback data
  const fallbackContent = {
    label: 'ABOUT CANCERFAX',
    title: 'Connecting You to Global Trials',
    description: 'Discover and join advanced clinical trials from leading research centers worldwide. We connect patients with breakthrough treatments and innovative therapies beyond borders. Wherever you are, hope is within reach.',
    buttonText: 'Explore All Ongoing Trials',
    buttonUrl: '/clinical-trials',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800'
  };

  // Map Strapi data: heading -> label, sub_heading -> title
  const content = statisticsSection ? {
    label: statisticsSection.heading || fallbackContent.label,
    title: statisticsSection.sub_heading || fallbackContent.title,
    description: formatRichText(statisticsSection.description) || statisticsSection.description || fallbackContent.description,
    buttonText: statisticsSection.cta?.text || fallbackContent.buttonText,
    buttonUrl: statisticsSection.cta?.URL || fallbackContent.buttonUrl,
    image: formatMedia(statisticsSection.image) || fallbackContent.image,
    backgroundImage: formatMedia(statisticsSection.backgroundImage) || formatMedia(statisticsSection.image),
    foregroundImage: formatMedia(statisticsSection.foregroundImage) || formatMedia(statisticsSection.image),
  } : (sectionContent || fallbackContent);

  // Get image URLs from Strapi or use fallbacks
  const backgroundImageUrl = content.backgroundImage || formatMedia(statisticsSection?.backgroundImage) || '/images/background.png';
  const foregroundImageUrl = content.foregroundImage || formatMedia(statisticsSection?.foregroundImage) || '/images/Attached_image.png';

  return (
    <section className='aboutclinicalTrials_sec sec_bg_white py-120'>
      <div className='containerWrapper commContent_wrap'>
        <div className='clinical_row'>
          <div className='clinical_left'>
            <Label className='contentLabel'>{content.label}</Label>
            <Title className='title-3'>{content.title}</Title>
          </div>
          
          <div className='clinical_mid'>
            <BackgroundImageHolder>
              {backgroundImageUrl && (
                <img src={backgroundImageUrl} alt="Background" />
              )}
            </BackgroundImageHolder>
            <ForegroundImage>
              <img src={foregroundImageUrl} alt={content.title} />
            </ForegroundImage>
          </div>
          
          <div className='clinical_right'>
            <Description className='text-16'>
              {content.description}
            </Description>
            <ExploreButton className='btn btn-pink-solid' href={content.buttonUrl || '#'}>
              {content.buttonText}
            </ExploreButton>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ClinicalTrialsAbout;

