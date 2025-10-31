import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchHospitals } from '../../store/slices/hospitalNetworkSlice';
import { getMediaUrl } from '../../services/api';

const Section = styled.section`
  width: 100%;
  background: white;
  padding: 50px 105px;
  
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  
  @media (max-width: 1400px) {
    gap: 22px;
  }
  
  @media (max-width: 1200px) {
    gap: 22px;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled.div`
  position: relative;
  width: 340px;
  height: 230px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 1200px) {
    width: 320px;
    height: 220px;
    border-radius: 18px;
  }
  
  @media (max-width: 1024px) {
    width: 300px;
    height: 210px;
    border-radius: 16px;
  }
  
  @media (max-width: 768px) {
    width: 280px;
    height: 200px;
    border-radius: 14px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 260px;
    height: 190px;
    border-radius: 12px;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 1;
  }
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 315px;
  height: 56px;
  padding: 0 24px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: white;
  border-radius: 12px;
  transition: all 0.4s ease;
  
  ${Card}:hover & {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 460px;
    height: 115px;
    padding: 14px 18px;
    background: rgba(71, 91, 107, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 6px;
    overflow: hidden;
  }
  
  @media (max-width: 1200px) {
    width: 300px;
    height: 54px;
    padding: 0 22px;
    bottom: 18px;
    border-radius: 11px;
    
    ${Card}:hover & {
      bottom: 18px;
      max-width: 440px;
      height: 110px;
      padding: 13px 16px;
      border-radius: 14px;
      overflow: hidden;
      justify-content: space-between;
      gap: 5px;
    }
  }
  
  @media (max-width: 1024px) {
    width: 280px;
    height: 52px;
    padding: 0 20px;
    bottom: 16px;
    border-radius: 10px;
    
    ${Card}:hover & {
      bottom: 16px;
      max-width: 420px;
      height: 105px;
      padding: 12px 14px;
      border-radius: 12px;
      overflow: hidden;
      justify-content: space-between;
      gap: 5px;
    }
  }
  
  @media (max-width: 768px) {
    width: 260px;
    height: 50px;
    padding: 0 18px;
    bottom: 14px;
    border-radius: 9px;
    
    ${Card}:hover & {
      bottom: 14px;
      max-width: 400px;
      height: 100px;
      padding: 10px 12px;
      border-radius: 10px;
      overflow: hidden;
      justify-content: space-between;
      gap: 4px;
    }
  }
  
  @media (max-width: 480px) {
    width: 240px;
    height: 48px;
    padding: 0 16px;
    bottom: 12px;
    border-radius: 8px;
    
    ${Card}:hover & {
      bottom: 12px;
      max-width: 380px;
      height: 95px;
      padding: 8px 10px;
      border-radius: 8px;
      overflow: hidden;
      justify-content: space-between;
      gap: 3px;
    }
  }
`;

const HoverContent = styled.div`
  display: none;
  width: 100%;
  
  ${Card}:hover & {
    display: block;
  }
`;

const HospitalName = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #36454F;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  transition: all 0.3s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  ${Card}:hover & {
    color: white;
    font-size: 15px;
    font-weight: 700;
    flex: none;
    width: 100%;
    line-height: 1.25;
  }
  
  @media (max-width: 1024px) {
    font-size: 17px;
    
    ${Card}:hover & {
      font-size: 14px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    
    ${Card}:hover & {
      font-size: 13px;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 15px;
    
    ${Card}:hover & {
      font-size: 12px;
    }
  }
`;

const HospitalAddress = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 8px 0;
  line-height: 1.35;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    font-size: 10px;
    line-height: 1.3;
    margin: 0 0 7px 0;
  }
  
  @media (max-width: 768px) {
    font-size: 9px;
    line-height: 1.3;
    margin: 0 0 6px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 8px;
    line-height: 1.25;
    margin: 0 0 5px 0;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  width: 100%;
  flex-shrink: 0;
  margin-top: auto;
  
  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const CallButton = styled.button`
  flex: 1;
  padding: 6px 12px;
  background: #E91E63;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;
  min-height: 28px;
  
  &:hover {
    background: #C2185B;
    transform: scale(1.02);
  }
  
  svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }
  
  @media (max-width: 1024px) {
    padding: 5px 10px;
    font-size: 10px;
    min-height: 26px;
  }
  
  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 9px;
    min-height: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 3px 6px;
    font-size: 8px;
    min-height: 22px;
  }
`;

const IconButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  svg {
    width: 14px;
    height: 14px;
    stroke: white;
    fill: none;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: white;
    transform: scale(1.05);
  }
  
  @media (max-width: 1024px) {
    width: 26px;
    height: 26px;
    
    svg {
      width: 13px;
      height: 13px;
    }
  }
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    
    svg {
      width: 12px;
      height: 12px;
    }
  }
  
  @media (max-width: 480px) {
    width: 22px;
    height: 22px;
    
    svg {
      width: 11px;
      height: 11px;
    }
  }
`;

const IconButtonsGroup = styled.div`
  display: flex;
  gap: 5px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    gap: 4px;
  }
  
  @media (max-width: 480px) {
    gap: 3px;
  }
`;

const ArrowIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
  cursor: pointer;
  
  svg {
    width: 20px;
    height: 20px;
    stroke: #36454F;
    transition: all 0.3s ease;
  }
  
  ${Card}:hover & {
    display: none;
  }
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const HospitalGrid = () => {
  const dispatch = useDispatch();
  const { hospitals: strapiHospitals } = useSelector((state) => state.hospitalNetwork);

  useEffect(() => {
    dispatch(fetchHospitals());
  }, [dispatch]);

  // Fallback hospital data for demonstration
  const defaultHospitals = [
    {
      id: 1,
      name: 'Hospital name',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800' } } },
    },
    {
      id: 2,
      name: 'Hospital name',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800' } } },
    },
    {
      id: 3,
      name: 'Hospital name',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800' } } },
    },
    {
      id: 4,
      name: 'Hospital name',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800' } } },
    },
    {
      id: 5,
      name: 'Hospital name',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800' } } },
    },
    {
      id: 6,
      name: 'Hospital name',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1519167758481-83f29da8c9d0?w=800' } } },
    },
    {
      id: 7,
      name: 'Hospital name',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=800' } } },
    },
    {
      id: 8,
      name: 'Hospital name',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800' } } },
    },
    {
      id: 9,
      name: 'Hospital name',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800' } } },
    },
  ];

  const hospitals = Array.isArray(strapiHospitals) && strapiHospitals.length > 0 
    ? strapiHospitals 
    : defaultHospitals;

  const handleCardClick = (hospital) => {
    // Navigate to hospital details page or open modal
    console.log('Hospital clicked:', hospital);
  };

  const handleCallClick = (e, phone) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleShareClick = (e, hospital) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: hospital.name,
        text: `Check out ${hospital.name}`,
        url: window.location.href,
      });
    }
  };

  return (
    <Section>
      <Container>
        <Grid>
          {hospitals.map((hospital) => {
            const hospitalImage = hospital?.image?.data?.attributes?.url 
              ? getMediaUrl(hospital.image.data.attributes.url) 
              : hospital?.image;
            const hospitalName = hospital?.name || 'Hospital name';
            const doctorName = hospital?.doctor || 'Dr Bharat Patodiya';
            const address = hospital?.address || '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India';
            const phone = hospital?.phone || '(+91) 83741 90429';

            return (
              <Card key={hospital.id}>
                <CardImage bgImage={hospitalImage} />
                <CardContent>
                  <HospitalName>{hospitalName}</HospitalName>
                  <ArrowIcon>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </ArrowIcon>
                  <HoverContent>
                    <HospitalAddress>
                      {doctorName}, {address}
                    </HospitalAddress>
                    <ActionsRow>
                      <CallButton onClick={(e) => handleCallClick(e, phone)}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                        {phone}
                      </CallButton>
                      <IconButtonsGroup>
                        <IconButton onClick={(e) => handleShareClick(e, hospital)}>
                          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                            <polyline points="16 6 12 2 8 6"/>
                            <line x1="12" y1="2" x2="12" y2="15"/>
                          </svg>
                        </IconButton>
                        <IconButton onClick={() => handleCardClick(hospital)}>
                          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </IconButton>
                      </IconButtonsGroup>
                    </ActionsRow>
                  </HoverContent>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};

export default HospitalGrid;

