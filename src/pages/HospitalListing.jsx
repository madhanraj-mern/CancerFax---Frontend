import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchNavigation, fetchLogo, fetchLanguages, fetchButtons, setCurrentLanguage } from '../store/slices/navigationSlice';
import { fetchHospitalHeroSection, fetchHospitals } from '../store/slices/hospitalNetworkSlice';
import { getMediaUrl } from '../services/api';
import Footer from '../components/Footer/Footer';
import QuickFinds from '../components/QuickFinds/QuickFinds';
import HospitalGrid from '../components/HospitalGrid/HospitalGrid';
import InnovationInsights from '../components/InnovationInsights/InnovationInsights';
import KeyFactors from '../components/KeyFactors/KeyFactors';
import VideoTestimonials from '../components/VideoTestimonials/VideoTestimonials';

const PageWrapper = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
`;

const HeaderSection = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100vw;
  background: white;
  z-index: 100;
  padding: 24px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  overflow: visible;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 20px 0;
  }
  
  @media (max-width: 768px) {
    padding: 18px 0;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 73px;
  box-sizing: border-box;
  gap: 0;
  position: relative;

  @media (max-width: 1400px) {
    padding: 0 40px;
  }

  @media (max-width: 1200px) {
    padding: 0 32px;
  }

  @media (max-width: 1024px) {
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    justify-content: space-between;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: #36454F;
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
  
  &:hover {
    opacity: 0.8;
  }
  
  img {
    height: 29px;
    width: auto;
    object-fit: contain;
    margin-right: 12px;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 20px;
  color: white;
`;

const LogoText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #36454F;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  margin-left: 60px;
  flex-shrink: 1;
  min-width: 0;
  
  @media (max-width: 1400px) {
    gap: 32px;
    margin-left: 40px;
  }
  
  @media (max-width: 1200px) {
    gap: 24px;
    margin-left: 30px;
  }
  
  @media (max-width: 1024px) {
    gap: 20px;
    margin-left: 24px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #36454F;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  padding: 8px 0;
  
  &:hover {
    color: #FF69B4;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #FF69B4;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
  margin-left: auto;
  flex-shrink: 0;
  
  @media (max-width: 1400px) {
    gap: 24px;
  }
  
  @media (max-width: 1024px) {
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const LanguageWrapper = styled.div`
  position: relative;
`;

const LanguageButton = styled.button`
  background: transparent;
  border: 1px solid #E0E0E0;
  border-radius: 50%;
  width: 34px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  overflow: hidden;
  
  &:hover {
    border-color: #FF69B4;
    transform: scale(1.05);
  }
  
  img {
    width: 22px;
    height: 22px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 30px;
    
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const LanguageDropdown = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 8px;
  min-width: 180px;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    min-width: 160px;
    right: -10px;
  }
`;

const LanguageOption = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  background: ${props => props.isActive ? '#FFF0F6' : 'transparent'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: ${props => props.isActive ? '600' : '500'};
  color: ${props => props.isActive ? '#FF69B4' : '#36454F'};
  text-align: left;
  
  &:hover {
    background: ${props => props.isActive ? '#FFF0F6' : '#F8F8F8'};
    color: #FF69B4;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const LanguageFlag = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  opacity: 1;
  transform: rotate(0deg);
`;

const LanguageLabel = styled.span`
  flex: 1;
`;

const ConnectButton = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  min-width: 152px;
  height: 42px;
  padding: 0 24px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.3);
    background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 1400px) {
    min-width: 140px;
    padding: 0 20px;
  }
  
  @media (max-width: 1024px) {
    min-width: 130px;
    height: 40px;
    padding: 0 18px;
    font-size: 13px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 22px;
  cursor: pointer;
  padding: 0;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    width: 28px;
    height: 3px;
    background: #36454F;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
    
    &:nth-child(1) {
      transform: ${props => props.isOpen ? 'rotate(45deg) translateY(9px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg) translateY(-9px)' : 'none'};
    }
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 24px;
    gap: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 100%;
    animation: slideDown 0.3s ease;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const MobileMenuItem = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #36454F;
  text-decoration: none;
  padding: 14px 0;
  border-bottom: 1px solid #F0F0F0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  
  &:hover {
    color: #FF69B4;
    padding-left: 8px;
  }
  
  &:active {
    color: #FF1493;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const MobileConnectButton = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  height: 44px;
  padding: 0 24px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.2);
  margin-top: 12px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.3);
    background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MobileLanguageSection = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F0F0F0;
`;

const MobileLanguageLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const MobileLanguageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const MobileLanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: ${props => props.isActive ? '#FFF0F6' : '#F8F8F8'};
  border: 1px solid ${props => props.isActive ? '#FF69B4' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: ${props => props.isActive ? '600' : '500'};
  color: ${props => props.isActive ? '#FF69B4' : '#36454F'};
  
  &:active {
    transform: scale(0.98);
  }
  
  span {
    font-size: 16px;
  }
`;

const HeroSection = styled.section`
  background: #F5F5F5;
  padding-top: 30px;
  padding-bottom: 50px;
  padding-left: 120px;
  padding-right: 120px;
  min-height: 520px;
  display: flex;
  align-items: center;
  
  @media (max-width: 1200px) {
    padding-left: 60px;
    padding-right: 60px;
    padding-bottom: 45px;
    min-height: 480px;
  }
  
  @media (max-width: 1024px) {
    padding: 30px 40px 40px 40px;
    min-height: 450px;
  }
  
  @media (max-width: 768px) {
    padding: 30px 24px 35px 24px;
    min-height: auto;
  }
  
  @media (max-width: 480px) {
    padding: 24px 16px 30px 16px;
  }
`;

const HeroContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  
  @media (max-width: 1200px) {
    gap: 70px;
  }
  
  @media (max-width: 1024px) {
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  @media (max-width: 480px) {
    gap: 32px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const HeroTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #36454F;
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.8px;
  max-width: 580px;
  
  @media (max-width: 1200px) {
    font-size: 44px;
    max-width: 100%;
  }
  
  @media (max-width: 1024px) {
    font-size: 40px;
  }
  
  @media (max-width: 768px) {
    font-size: 34px;
    letter-spacing: -0.5px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;
  
  @media (max-width: 1024px) {
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    gap: 28px;
  }
  
  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #36454F;
  line-height: 1.7;
  margin: 0;
  max-width: 416px;
  
  @media (max-width: 1024px) {
    font-size: 15px;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 100%;
    line-height: 1.65;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.6;
  }
`;

const ExploreButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  padding: 18px 44px;
  background: #FF69B4;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.2);
  min-width: 247px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    background: #FF1493;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 1024px) {
    padding: 17px 40px;
    font-size: 15.5px;
    min-width: 230px;
  }
  
  @media (max-width: 768px) {
    padding: 16px 36px;
    font-size: 15px;
    width: 100%;
    min-width: auto;
  }
  
  @media (max-width: 480px) {
    padding: 14px 32px;
    font-size: 14px;
  }
`;

// Hospital Carousel Section
const HospitalCarouselSection = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  padding: 50px 0 50px 0;
  background: #F5F5F5;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    padding: 45px 0 45px 0;
  }
  
  @media (max-width: 1024px) {
    padding: 40px 0 40px 0;
  }
  
  @media (max-width: 768px) {
    padding: 35px 0 35px 0;
  }
  
  @media (max-width: 480px) {
    padding: 30px 0 30px 0;
  }
`;

const CarouselContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 73px;
  position: relative;
  box-sizing: border-box;
  
  @media (max-width: 1400px) {
    padding: 0 40px;
  }
  
  @media (max-width: 1024px) {
    padding: 0 24px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

const HospitalSlide = styled.div`
  position: relative;
  width: 100%;
  height: 534px;
  border-radius: 24px;
  overflow: hidden;
  background-image: url(${props => props.bgImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920'});
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.6) 70%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
  }
  
  @media (max-width: 1200px) {
    height: 500px;
    border-radius: 20px;
  }
  
  @media (max-width: 1024px) {
    height: 450px;
    border-radius: 18px;
  }
  
  @media (max-width: 768px) {
    height: 400px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    height: 350px;
    border-radius: 14px;
  }
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 102px;
  padding-bottom: 60px;
  
  @media (max-width: 1200px) {
    padding: 80px;
    padding-bottom: 50px;
  }
  
  @media (max-width: 1024px) {
    padding: 60px;
    padding-bottom: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 40px;
    padding-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    padding: 30px;
    padding-bottom: 35px;
  }
`;

const HospitalTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 550;
  color: white;
  margin: 0 0 24px 0;
  line-height: 1.2;
  
  @media (max-width: 1200px) {
    font-size: 38px;
    margin-bottom: 22px;
  }
  
  @media (max-width: 1024px) {
    font-size: 34px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 14px;
  }
`;

const HospitalDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 380;
  color: white;
  line-height: 1.7;
  margin: 0 0 32px 0;
  max-width: 800px;
  opacity: 0.95;
  
  @media (max-width: 1200px) {
    font-size: 15px;
    margin-bottom: 30px;
    max-width: 700px;
  }
  
  @media (max-width: 1024px) {
    font-size: 14px;
    margin-bottom: 28px;
    max-width: 600px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 24px;
    max-width: 100%;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
`;

const ViewDetailsButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  width: 135px;
  height: 44px;
  padding: 0 24px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
    background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 1024px) {
    width: 130px;
    height: 43px;
    font-size: 13.5px;
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 42px;
    font-size: 13px;
    padding: 0 20px;
  }
  
  @media (max-width: 480px) {
    width: 110px;
    height: 40px;
    font-size: 12px;
    padding: 0 18px;
  }
`;

const CarouselNavigation = styled.div`
  position: absolute;
  bottom: 40px;
  right: 102px;
  display: flex;
  gap: 16px;
  align-items: center;
  z-index: 3;
  
  @media (max-width: 1200px) {
    bottom: 30px;
    right: 80px;
    gap: 14px;
  }
  
  @media (max-width: 1024px) {
    bottom: 25px;
    right: 60px;
    gap: 12px;
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 40px;
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    bottom: 18px;
    right: 30px;
    gap: 8px;
  }
`;

const NavButton = styled.button`
  width: 126px;
  height: 50px;
  background: rgba(150, 150, 150, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: 300;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    background: rgba(180, 180, 180, 0.7);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  @media (max-width: 1200px) {
    width: 110px;
    height: 48px;
    font-size: 26px;
  }
  
  @media (max-width: 1024px) {
    width: 100px;
    height: 45px;
    font-size: 24px;
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    font-size: 18px;
  }
`;

const HospitalListing = () => {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { menuItems, logo, languages, currentLanguage, buttons } = useSelector((state) => state.navigation);
  const { heroSection, hospitals: strapiHospitals } = useSelector((state) => state.hospitalNetwork);
  
  // Fallback hospital data
  const defaultHospitals = [
    {
      id: 1,
      name: 'Hospital name',
      description: 'CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, we guide you every step of the way.',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920' } } },
      buttonText: 'View Details',
    },
    {
      id: 2,
      name: 'Medical Research Center',
      description: 'Leading innovation in cancer research and treatment. We provide world-class care with cutting-edge technology and compassionate support.',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1920' } } },
      buttonText: 'View Details',
    },
    {
      id: 3,
      name: 'Advanced Cancer Institute',
      description: 'Specialized in advanced oncology treatments with a focus on personalized care and innovative clinical trials for better patient outcomes.',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920' } } },
      buttonText: 'View Details',
    },
  ];
  
  const hospitals = Array.isArray(strapiHospitals) && strapiHospitals.length > 0 ? strapiHospitals : defaultHospitals;
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % hospitals.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + hospitals.length) % hospitals.length);
  };

  useEffect(() => {
    dispatch(fetchNavigation());
    dispatch(fetchLogo());
    dispatch(fetchLanguages());
    dispatch(fetchButtons());
    dispatch(fetchHospitalHeroSection());
    dispatch(fetchHospitals());
  }, [dispatch]);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuOpen && !event.target.closest('[data-language-menu]')) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [languageMenuOpen]);

  const handleLanguageToggle = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const handleLanguageSelect = (language) => {
    dispatch(setCurrentLanguage(language));
    setLanguageMenuOpen(false);
  };

  // Default languages if not loaded from Strapi
  const defaultLanguages = [
    { id: 1, name: 'English', code: 'en', flag: '🇬🇧' },
    { id: 2, name: 'Spanish', code: 'es', flag: '🇪🇸' },
    { id: 3, name: 'French', code: 'fr', flag: '🇫🇷' },
    { id: 4, name: 'German', code: 'de', flag: '🇩🇪' },
    { id: 5, name: 'Chinese', code: 'zh', flag: '🇨🇳' },
  ];

  // Fallback data
  const defaultMenuItems = [
    { label: 'About', link: '#about' },
    { label: 'Hospitals & Doctors', link: '/hospitals' },
    { label: 'Treatments', link: '#treatments' },
    { label: 'Clinical Trials', link: '#trials' },
    { label: 'Survivor Stories', link: '#stories' },
    { label: 'Resources', link: '#resources' },
  ];

  const navigationLinks = menuItems && menuItems.length > 0 ? menuItems : defaultMenuItems;
  const logoText = logo?.text || 'CancerFax';
  const availableLanguages = languages && languages.length > 0 ? languages : defaultLanguages;
  const selectedLanguage = currentLanguage || availableLanguages[0];

  // Hero Section Fallback Data
  const defaultHeroContent = {
    title: 'Our Global Network of Leading Cancer Hospitals And Research Centre',
    description: 'We partner with world-renowned oncology centres to bring you access to advanced treatment, clinical trials, and medical expertise, wherever you are.',
    buttonText: 'Explore Hospitals by Region',
    buttonLink: '#hospitals',
  };

  const heroContent = heroSection || defaultHeroContent;
  
  // Get current hospital data
  const currentHospital = hospitals[currentSlide];
  const hospitalImage = currentHospital?.image?.data?.attributes?.url 
    ? getMediaUrl(currentHospital.image.data.attributes.url) 
    : currentHospital?.image;
  const hospitalName = currentHospital?.name || 'Hospital name';
  const hospitalDescription = currentHospital?.description || 'Description not available';
  const hospitalButtonText = currentHospital?.buttonText || 'View Details';

  return (
    <PageWrapper>
      <HeaderSection>
        <NavContent>
          <Logo to="/">
            <LogoIcon>🎗️</LogoIcon>
            <LogoText>{logoText}</LogoText>
          </Logo>

          <MenuItems>
            {navigationLinks.map((item, index) => (
              <MenuItem key={index} href={item.link}>
                {item.label}
              </MenuItem>
            ))}
          </MenuItems>

          <RightSection>
            <LanguageWrapper data-language-menu>
              <LanguageButton onClick={handleLanguageToggle} aria-label="Change Language">
                {selectedLanguage?.flag || '🇬🇧'}
              </LanguageButton>
              <LanguageDropdown isOpen={languageMenuOpen}>
                {availableLanguages.map((lang) => (
                  <LanguageOption
                    key={lang.id}
                    isActive={selectedLanguage?.id === lang.id}
                    onClick={() => handleLanguageSelect(lang)}
                  >
                    <LanguageFlag>{lang.flag}</LanguageFlag>
                    <LanguageLabel>{lang.name}</LanguageLabel>
                  </LanguageOption>
                ))}
              </LanguageDropdown>
            </LanguageWrapper>
            <ConnectButton to="/contact">Connect With Us</ConnectButton>
            <HamburgerButton 
              isOpen={mobileMenuOpen} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span />
              <span />
              <span />
            </HamburgerButton>
          </RightSection>
        </NavContent>

        <MobileMenu isOpen={mobileMenuOpen}>
          {navigationLinks.map((item, index) => (
            <MobileMenuItem key={index} href={item.link} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </MobileMenuItem>
          ))}
          
          <MobileLanguageSection>
            <MobileLanguageLabel>Language</MobileLanguageLabel>
            <MobileLanguageGrid>
              {availableLanguages.map((lang) => (
                <MobileLanguageButton
                  key={lang.id}
                  isActive={selectedLanguage?.id === lang.id}
                  onClick={() => {
                    handleLanguageSelect(lang);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>{lang.flag}</span>
                  {lang.name}
                </MobileLanguageButton>
              ))}
            </MobileLanguageGrid>
          </MobileLanguageSection>
          
          <MobileConnectButton to="/contact" onClick={() => setMobileMenuOpen(false)}>
            Connect With Us
          </MobileConnectButton>
        </MobileMenu>
      </HeaderSection>
      
      <HeroSection>
        <HeroContainer>
          <LeftContent>
            <HeroTitle>
              {heroContent.title}
            </HeroTitle>
          </LeftContent>
          
          <RightContent>
            <Description>
              {heroContent.description}
            </Description>
            <ExploreButton as={heroContent.buttonLink ? 'a' : 'button'} href={heroContent.buttonLink}>
              {heroContent.buttonText}
            </ExploreButton>
          </RightContent>
        </HeroContainer>
      </HeroSection>

      <HospitalCarouselSection>
        <CarouselContainer>
          <HospitalSlide bgImage={hospitalImage}>
            <SlideContent>
              <HospitalTitle>{hospitalName}</HospitalTitle>
              <HospitalDescription>
                {hospitalDescription}
              </HospitalDescription>
              <ViewDetailsButton>{hospitalButtonText}</ViewDetailsButton>
            </SlideContent>
            
            <CarouselNavigation>
              <NavButton onClick={prevSlide} aria-label="Previous hospital" disabled={hospitals.length <= 1}>
                ←
              </NavButton>
              <NavButton onClick={nextSlide} aria-label="Next hospital" disabled={hospitals.length <= 1}>
                →
              </NavButton>
            </CarouselNavigation>
          </HospitalSlide>
        </CarouselContainer>
      </HospitalCarouselSection>

      <QuickFinds />

      <HospitalGrid />

      <InnovationInsights />

      <KeyFactors />

      <VideoTestimonials />

      <Footer />
    </PageWrapper>
  );
};

export default HospitalListing;

