import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchInnovationInsightsSection, fetchInnovationImages, fetchStaticImages } from '../../store/slices/innovationInsightsSlice';
import { getMediaUrl } from '../../services/api';

const Section = styled.section`
  width: 100%;
  background: #F5F5F5;
  padding: 50px 120px;
  
  @media (max-width: 1400px) {
    padding: 50px 80px;
  }
  
  @media (max-width: 1200px) {
    padding: 45px 60px;
  }
  
  @media (max-width: 1024px) {
    padding: 40px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 35px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 16px;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Label = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 11px;
    letter-spacing: 2.5px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #36454F;
  line-height: 1.3;
  letter-spacing: -0.5px;
  margin: 0 0 28px 0;
  
  @media (max-width: 1200px) {
    font-size: 42px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 1024px) {
    font-size: 38px;
    margin-bottom: 22px;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 18px;
  }
`;

const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #36454F;
  line-height: 1.8;
  margin: 0 auto;
  max-width: 1200px;
  
  @media (max-width: 1024px) {
    font-size: 15px;
    line-height: 1.7;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.6;
  }
`;

const ScrollContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, #F5F5F5, transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, #F5F5F5, transparent);
  }
  
  @media (max-width: 768px) {
    &::before,
    &::after {
      width: 50px;
    }
  }
`;

const ImagesGrid = styled.div`
  display: flex;
  gap: 32px;
  animation: scroll 30s linear infinite;
  width: fit-content;
  
  &:hover {
    animation-play-state: paused;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  @media (max-width: 1024px) {
    gap: 28px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    animation: scroll 25s linear infinite;
  }
`;

const ImageCard = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 420px;
  height: 265px;
  overflow: hidden;
  background: #E0E0E0;
  transition: all 0.4s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  /* Different rounded shapes */
  &.rounded-left {
    border-radius: 40px;
  }
  
  &.rounded-center {
    border-radius: 134px 134px 134px 134px;
  }
  
  &.rounded-right {
    border-radius: 134px 134px 134px 134px;
  }
  
  /* 3D Hover Effect */
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 1200px) {
    width: 380px;
    height: 250px;
    
    &.rounded-left {
      border-radius: 36px;
    }
    
    &.rounded-center {
      border-radius: 125px;
    }
    
    &.rounded-right {
      border-radius: 125px;
    }
  }
  
  @media (max-width: 1024px) {
    width: 340px;
    height: 230px;
    
    &.rounded-left {
      border-radius: 32px;
    }
    
    &.rounded-center {
      border-radius: 115px;
    }
    
    &.rounded-right {
      border-radius: 115px;
    }
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18);
    }
  }
  
  @media (max-width: 768px) {
    width: 320px;
    height: 280px;
    
    &.rounded-left {
      border-radius: 28px;
    }
    
    &.rounded-center {
      border-radius: 140px;
    }
    
    &.rounded-right {
      border-radius: 140px;
    }
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
    }
  }
  
  @media (max-width: 480px) {
    width: 280px;
    height: 240px;
    
    &.rounded-left {
      border-radius: 24px;
    }
    
    &.rounded-center {
      border-radius: 120px;
    }
    
    &.rounded-right {
      border-radius: 120px;
    }
    
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.14);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #E0E0E0 0%, #C0C0C0 100%);
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #999;
`;

const StaticGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 80px;
  
  @media (max-width: 1024px) {
    gap: 28px;
    margin-top: 60px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 50px;
  }
`;

const StaticCard = styled.div`
  position: relative;
  width: 100%;
  height: 265px;
  overflow: hidden;
  background: #E0E0E0;
  transition: all 0.4s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  /* Different rounded shapes */
  &.rounded-left {
    border-radius: 40px;
  }
  
  &.rounded-center {
    border-radius: 134px 134px 134px 134px;
  }
  
  &.rounded-right {
    border-radius: 134px 134px 134px 134px;
  }
  
  /* 3D Hover Effect */
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 1200px) {
    height: 250px;
    
    &.rounded-left {
      border-radius: 36px;
    }
    
    &.rounded-center {
      border-radius: 125px;
    }
    
    &.rounded-right {
      border-radius: 125px;
    }
  }
  
  @media (max-width: 1024px) {
    height: 230px;
    
    &.rounded-left {
      border-radius: 32px;
    }
    
    &.rounded-center {
      border-radius: 115px;
    }
    
    &.rounded-right {
      border-radius: 115px;
    }
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18);
    }
  }
  
  @media (max-width: 768px) {
    height: 280px;
    
    &.rounded-left {
      border-radius: 28px;
    }
    
    &.rounded-center {
      border-radius: 140px;
    }
    
    &.rounded-right {
      border-radius: 140px;
    }
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
    }
  }
  
  @media (max-width: 480px) {
    height: 240px;
    
    &.rounded-left {
      border-radius: 24px;
    }
    
    &.rounded-center {
      border-radius: 120px;
    }
    
    &.rounded-right {
      border-radius: 120px;
    }
    
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.14);
    }
  }
`;

const InnovationInsights = () => {
  const dispatch = useDispatch();
  const { sectionContent, images, staticImages, loading, error } = useSelector((state) => state.innovationInsights);

  useEffect(() => {
    dispatch(fetchInnovationInsightsSection());
    dispatch(fetchInnovationImages());
    dispatch(fetchStaticImages());
  }, [dispatch]);

  // Fallback content
  const defaultContent = {
    label: 'INNOVATION & INSIGHTS',
    title: 'Why Our Hospital Network Matters',
    description: 'At CancerFax, our strength lies not just in what we recommend, but with whom we partner. We carefully vet and collaborate with leading cancer hospitals and research institutions around the globe, ensuring your care is built on credibility, safety, and excellence.',
    images: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800',
        alt: 'Patient consultation',
        shape: 'rounded-left',
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
        alt: 'Medical team',
        shape: 'rounded-center',
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
        alt: 'Doctor with patient',
        shape: 'rounded-right',
      },
    ],
    staticImages: [
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        alt: 'Healthcare professionals',
        shape: 'rounded-left',
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800',
        alt: 'Patient care',
        shape: 'rounded-center',
      },
      {
        id: 6,
        url: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=800',
        alt: 'Medical consultation',
        shape: 'rounded-right',
      },
    ],
  };

  // Use Strapi data or fallback
  const content = sectionContent || defaultContent;
  const imagesList = Array.isArray(images) && images.length > 0 ? images : defaultContent.images;
  const staticImagesList = Array.isArray(staticImages) && staticImages.length > 0 ? staticImages : defaultContent.staticImages || [];

  const getImageUrl = (image) => {
    if (!image) return null;
    // Check if image is nested in an 'image' property (common Strapi pattern)
    if (image?.image) return getMediaUrl(image.image);
    // Otherwise pass directly to getMediaUrl which handles all cases
    return getMediaUrl(image);
  };

  // Duplicate images for infinite scroll effect
  const duplicatedImages = [...imagesList, ...imagesList];

  return (
    <Section>
      <Container>
        <Header>
          <Label>{content.label}</Label>
          <Title>{content.title}</Title>
          <Description>{content.description}</Description>
        </Header>

        <ScrollContainer>
          <ImagesGrid>
            {duplicatedImages.map((image, index) => {
              const imageUrl = getImageUrl(image);
              const shapeClass = image.shape || 'rounded-center';
              return (
                <ImageCard key={`${image.id}-${index}`} className={shapeClass}>
                  {imageUrl ? (
                    <Image src={imageUrl} alt={image.alt || 'Hospital network'} />
                  ) : (
                    <ImagePlaceholder>Image Placeholder</ImagePlaceholder>
                  )}
                </ImageCard>
              );
            })}
          </ImagesGrid>
        </ScrollContainer>

        {staticImagesList.length > 0 && (
          <StaticGrid>
            {staticImagesList.map((image) => {
              const imageUrl = getImageUrl(image);
              const shapeClass = image.shape || 'rounded-center';
              return (
                <StaticCard key={image.id} className={shapeClass}>
                  {imageUrl ? (
                    <Image src={imageUrl} alt={image.alt || 'Hospital network'} />
                  ) : (
                    <ImagePlaceholder>Image Placeholder</ImagePlaceholder>
                  )}
                </StaticCard>
              );
            })}
          </StaticGrid>
        )}
      </Container>
    </Section>
  );
};

export default InnovationInsights;

