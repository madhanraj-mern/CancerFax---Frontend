import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { setCurrentLanguage } from '../../store/slices/navigationSlice';
import { getMediaUrl } from '../../services/api';
import { formatMedia } from '../../utils/strapiHelpers';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 100;
  padding: 22px 0;
  box-sizing: border-box;
  overflow: visible;
  pointer-events: none;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  &.header-fixed {
    background: #36454F;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  > * {
    pointer-events: auto;
  }
  
  @media (max-width: 1024px) {
    padding: 14px 0;
  }
  
  @media (max-width: 768px) {
    padding: 12px 0;
  }
  
  @media (max-width: 480px) {
    padding: 10px 0;
  }
  
  @media (max-width: 360px) {
    padding: 8px 0;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  height: 48px;
  min-height: 48px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  
  @media (max-width: 1200px) {
    padding: 0 28px;
    height: 44px;
    min-height: 44px;
  }

  @media (max-width: 1024px) {
    padding: 0 24px;
    height: 44px;
    min-height: 44px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    height: 40px;
    min-height: 40px;
  }
  
  @media (max-width: 480px) {
    padding: 0 16px;
    height: 38px;
    min-height: 38px;
  }
  
  @media (max-width: 360px) {
    padding: 0 12px;
    height: 36px;
    min-height: 36px;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
  z-index: 1;
  min-width: 176px;
  
  &:hover {
    opacity: 0.8;
  }
  
  img {
    transition: all 0.3s ease;
  }

  svg {
    width: 176px;
    height: 29px;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 1200px) {
    img {
      height: 26px;
      max-width: 160px;
    }
    
    svg {
      width: 160px;
      height: 26px;
    }
  }
  
  @media (max-width: 1024px) {
    img {
      height: 24px;
      max-width: 140px;
    }
    
    svg {
      width: 140px;
      height: 24px;
    }
  }
  
  @media (max-width: 768px) {
    img {
      height: 22px;
      max-width: 120px;
    }
    
    svg {
      width: 120px;
      height: 22px;
    }
  }
  
  @media (max-width: 480px) {
    img {
      height: 20px;
      max-width: 100px;
    }
    
    svg {
      width: 100px;
      height: 20px;
    }
  }
  
  @media (max-width: 360px) {
    img {
      height: 18px;
      max-width: 90px;
    }
    
    svg {
      width: 90px;
      height: 18px;
    }
  }
`;

const LogoImage = styled.img`
  height: 36px;
  width: auto;
  display: block;
  object-fit: contain;
`;

const LogoFallbackIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: #ff4fa3;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
`;

const LogoFallbackText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  max-width: 900px;
  width: auto;
  height: 48px;
  padding: 0 24px;
  border-radius: 20px;
  background: ${props => props.$darkText ? 'rgba(255, 255, 255, 0.8)' : '#FFFFFF2B'}; /* rgba(255,255,255,0.17) */
  backdrop-filter: blur(126.4px);
  opacity: 1;
  transform: rotate(0deg);
  flex-shrink: 1;
  overflow: visible;

  @media (max-width: 1400px) {
    min-width: 720px;
    max-width: 800px;
    gap: 24px;
  }

  @media (max-width: 1200px) {
    min-width: 600px;
    max-width: 680px;
    gap: 16px;
    height: 44px;
    padding: 0 20px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.$darkText ? '#36454F' : props.theme.colors.white};
  font-family: ${props => props.$darkText ? "'Be Vietnam Pro', sans-serif" : 'inherit'};
  font-weight: 400;
  font-style: normal;
  font-size: ${props => props.$darkText ? '15px' : '15px'};
  line-height: ${props => props.$darkText ? '100%' : 'normal'};
  letter-spacing: ${props => props.$darkText ? '0px' : 'normal'};
  vertical-align: ${props => props.$darkText ? 'middle' : 'baseline'};
  transition: opacity 0.3s;
  white-space: nowrap;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1200px) {
    font-size: ${props => props.$darkText ? '14px' : '14px'};
  }

  @media (max-width: 1024px) {
    font-size: ${props => props.$darkText ? '14px' : '14px'};
  }
`;

const NavLinkWrapper = styled.div`
  position: relative;
  display: inline-block;
  
  @media (min-width: 769px) {
    &:hover > div {
      pointer-events: auto;
    }
  }
`;

const AboutDropdown = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 12px;
  min-width: 280px;
  z-index: 1000;
  animation: fadeInDown 0.2s ease;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: -50px;
    right: -50px;
    height: 16px;
    background: transparent;
    pointer-events: auto;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    min-width: 240px;
    left: 0;
    right: auto;
    pointer-events: auto;
    top: calc(100% + 12px);
  }
  
  @media (max-width: 480px) {
    min-width: 220px;
  }
`;

const TreatmentsDropdown = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 12px;
  min-width: 600px;
  z-index: 1000;
  animation: fadeInDown 0.2s ease;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: -50px;
    right: -50px;
    height: 16px;
    background: transparent;
    pointer-events: auto;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  @media (max-width: 1024px) {
    min-width: 500px;
  }
  
  @media (max-width: 768px) {
    min-width: 280px;
    left: 0;
    right: auto;
    pointer-events: auto;
    top: calc(100% + 12px);
  }
  
  @media (max-width: 480px) {
    min-width: 260px;
  }
`;

const TreatmentsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 1024px) {
    gap: 12px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const TreatmentsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TreatmentCategoryItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 200px;
  height: 52px;
  padding: 20px 16px 20px 16px;
  border-radius: 16px;
  background: ${props => props.active ? 'transparent' : 'white'};
  border: ${props => props.active ? '1px solid' : '1px solid transparent'};
  border-color: ${props => props.active ? props.theme.colors.pink : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;
  opacity: 1;
  transform: rotate(0deg);
  margin-bottom: 4px;
  box-sizing: border-box;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #36454F;
  text-align: left;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: ${props => props.active ? 'transparent' : '#F8F8F8'};
    border-color: ${props => props.active ? props.theme.colors.pink : 'rgba(255, 20, 147, 0.3)'};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: 180px;
    padding: 18px 14px;
    height: auto;
    min-height: 48px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 12px;
    min-height: 44px;
    font-size: 15px;
  }
`;

const TreatmentSubItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px 12px 8px;
  border-bottom: 1px solid #E5E5E5;
  margin-bottom: 8px;
`;

const DropdownHeaderIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.pink};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &::after {
    content: ${props => props.hasIcon ? 'none' : `'${props.icon || 'i'}'`};
    font-family: 'Be Vietnam Pro', sans-serif;
    font-size: ${props => props.iconSize || '14px'};
    font-weight: 600;
    color: ${props => props.theme.colors.pink};
    line-height: 1;
  }
  
  svg {
    width: 16px;
    height: 16px;
    fill: ${props => props.theme.colors.pink};
    stroke: ${props => props.theme.colors.pink};
    display: ${props => props.hasIcon ? 'block' : 'none'};
  }
`;

const DropdownHeaderText = styled.div`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #36454F;
`;

const DropdownMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  width: 252px;
  max-width: 100%;
  height: 52px;
  padding: 20px 16px 20px 16px;
  border-radius: 16px;
  background: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;
  opacity: 1;
  transform: rotate(0deg);
  margin-bottom: 4px;
  box-sizing: border-box;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: #F8F8F8;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: 220px;
    padding: 18px 14px;
    height: auto;
    min-height: 48px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 12px;
    min-height: 44px;
  }
`;

const MenuItemIndicator = styled.div`
  width: 3px;
  height: 100%;
  background: ${props => props.theme.colors.pink};
  border-radius: 2px;
  margin-right: 12px;
  flex-shrink: 0;
`;

const MenuItemText = styled.span`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #36454F;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
  }
  
  @media (max-width: 360px) {
    gap: 4px;
  }
`;

const LanguageWrapper = styled.div`
  position: relative;
`;

const LanguageButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 20px;
  border: 1px solid #A1A1A1;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s ease;
  padding: 0;
  flex-shrink: 0;
  color: #fff;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    transition: all 0.3s ease;
  }
  
  svg {
    width: 35px;
    height: 35px;
    transition: all 0.3s ease;
  }

  @media (max-width: 1024px) {
    width: 44px;
    height: 44px;
    padding: 9px;
    
    img {
      width: 32px;
      height: 32px;
    }
    
    svg {
      width: 32px;
      height: 32px;
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    padding: 8px;
    
    img {
      width: 28px;
      height: 28px;
    }
    
    svg {
      width: 28px !important;
      height: 28px !important;
    }
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    padding: 6px;
    border-radius: 18px;
    
    img {
      width: 24px;
      height: 24px;
    }
    
    svg {
      width: 24px !important;
      height: 24px !important;
    }
  }
  
  @media (max-width: 360px) {
    width: 32px;
    height: 32px;
    padding: 5px;
    border-radius: 16px;
    
    img {
      width: 22px;
      height: 22px;
    }
    
    svg {
      width: 22px !important;
      height: 22px !important;
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
  width: 173px;
  height: 48px;
  padding: 16px 20px;
  gap: 8px;
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s, transform 0.2s ease, background 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transform: rotate(0deg);
  box-sizing: border-box;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 1200px) {
    width: 160px;
    height: 44px;
    padding: 14px 18px;
    font-size: 15px;
  }

  @media (max-width: 1024px) {
    width: 140px;
    height: 42px;
    padding: 12px 16px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: auto;
    height: 40px;
    padding: 10px 14px;
    font-size: 13px;
    border-radius: 18px;
  }
  
  @media (max-width: 480px) {
    height: 36px;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 16px;
  }
  
  @media (max-width: 360px) {
    height: 32px;
    padding: 6px 10px;
    font-size: 11px;
    border-radius: 14px;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  background: ${props => props.$darkText ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.18)'};
  border: 1px solid ${props => props.$darkText ? '#E0E0E0' : '#A1A1A1'};
  border-radius: 20px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 8px;
  transition: background 0.3s, transform 0.2s ease, border-color 0.3s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  &:hover {
    background: ${props => props.$darkText ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)'};
    border-color: ${props => props.$darkText ? '#D0D0D0' : '#A1A1A1'};
  }
  
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 1024px) {
    display: flex;
    width: 38px;
    height: 38px;
    padding: 7px;
  }

  @media (max-width: 768px) {
    display: flex;
    width: 36px;
    height: 36px;
    padding: 6px;
    gap: 4px;
    border-radius: 18px;
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    padding: 5px;
    gap: 3px;
    border-radius: 16px;
  }
  
  @media (max-width: 360px) {
    width: 28px;
    height: 28px;
    padding: 4px;
    gap: 2px;
    border-radius: 14px;
  }

  span {
    width: 20px;
    height: 2px;
    background: ${props => props.$darkText ? '#36454F' : 'white'};
    transition: all 0.3s ease;
    border-radius: 2px;
    display: block;

    @media (max-width: 480px) {
      width: 18px;
      height: 2px;
    }
    
    @media (max-width: 360px) {
      width: 16px;
      height: 1.5px;
    }

    ${props => props.isOpen && `
      &:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      &:nth-child(2) {
        opacity: 0;
        transform: translateX(-10px);
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translate(3px, -4px);
      }
    `}
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 72px; /* 14px + 44px + 14px */
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 24px;
    gap: 20px;
    z-index: 99;
    animation: slideDown 0.3s ease-out;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;

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
  
  @media (max-width: 768px) {
    top: 64px; /* 12px + 40px + 12px */
    padding: 20px;
    gap: 18px;
  }
  
  @media (max-width: 480px) {
    top: 58px; /* 10px + 38px + 10px */
    padding: 16px;
    gap: 16px;
  }
  
  @media (max-width: 360px) {
    top: 52px; /* 8px + 36px + 8px */
    padding: 12px;
    gap: 14px;
  }
`;

const MobileNavLink = styled.a`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-weight: 400;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: opacity 0.3s;
  text-decoration: none;
  display: block;
  
  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const MobileNavItem = styled.div`
  width: 100%;
`;

const MobileNavItemHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-weight: 400;
  padding: 12px 0;
  border: none;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: opacity 0.3s;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    opacity: 0.8;
  }
  
  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    width: 16px;
    height: 16px;
    stroke: ${props => props.theme.colors.white};
    flex-shrink: 0;
  }
`;

const MobileSubMenu = styled.div`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: rgba(0, 0, 0, 0.3);
  margin-left: 16px;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  padding-left: 16px;
`;

const MobileTreatmentCategoryItem = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 400;
  padding: 10px 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 12px;
    background: ${props => props.theme.colors.pink};
    border-radius: 2px;
  }
  
  &:hover {
    opacity: 0.8;
  }
  
  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    width: 14px;
    height: 14px;
    stroke: rgba(255, 255, 255, 0.9);
    flex-shrink: 0;
  }
`;

const MobileTreatmentSubMenu = styled.div`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: rgba(0, 0, 0, 0.2);
  margin-left: 20px;
  margin-top: 8px;
  border-left: 2px solid rgba(255, 255, 255, 0.15);
  padding-left: 12px;
`;

const MobileSubMenuItem = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 400;
  padding: 10px 0;
  text-decoration: none;
  transition: opacity 0.3s;
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 12px;
    background: ${props => props.theme.colors.pink};
    border-radius: 2px;
  }
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.6;
  }
`;

const Navigation = ({ darkText = false }) => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [hospitalsDropdownOpen, setHospitalsDropdownOpen] = useState(false);
  const [treatmentsDropdownOpen, setTreatmentsDropdownOpen] = useState(false);
  const [selectedTreatmentCategory, setSelectedTreatmentCategory] = useState('car-t-cell');
  const [clinicalTrialsDropdownOpen, setClinicalTrialsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [hoverTimeouts, setHoverTimeouts] = useState({});
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({
    about: false,
    hospitals: false,
    treatments: false,
    clinicalTrials: false,
    resources: false
  });
  const [mobileTreatmentCategory, setMobileTreatmentCategory] = useState(null);
  
  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for currentLanguage and fallbacks)
  const { currentLanguage } = useSelector((state) => state.navigation);
  
  // Extract data from global Strapi response (new structure from menu guide)
  // Global has: logo, cta_label, cta_url, header_menu (relation to Menu)
  // Menu has: items (relation to Menu Item[])
  // Menu Item has: label, type (link/category/mega), is_clickable, order, internal_path, external_url, parent, children
  
  // Use new structure first, fallback to legacy navbar structure
  const headerMenuRaw = globalData?.headerMenu;
  const headerMenu = headerMenuRaw?.data?.attributes || headerMenuRaw;
  const globalLogo = globalData?.logo?.data?.attributes || globalData?.logo || null;
  const globalLogoUrlFromStore = globalData?.globalLogoUrl || null;
  const globalCtaLabel = globalData?.ctaLabel;
  const globalCtaUrl = globalData?.ctaUrl;
  
  // Extract from actual API structure (from https://cancerfax.unifiedinfotechonline.com/api/global)
  // Navbar has: logo, menu (relation), cta
  const navbarDataRaw = globalData?.navbar;
  const navbarData = navbarDataRaw?.data?.attributes || navbarDataRaw || null;
  const navbarMenu = navbarData?.menu;
  const navbarLogo = navbarData?.logo?.data?.attributes || navbarData?.logo || null;
  const navbarLogoUrlFromStore = globalData?.navbarLogoUrl || null;
  const navbarCta = navbarData?.cta || null;
  
  // Legacy navbar structure (fallback - check for menuItems directly)
  const legacyMenuItems = navbarData?.menuItems || [];
  const legacyLogo = navbarLogo;
  const languages = navbarData?.languages || [];
  const buttons = navbarData?.buttons || null;
  
  // Transform Strapi menu structure to component format
  const transformMenuItems = (menu) => {
    if (!menu || !menu.items) return [];
    
    // Get top-level items (no parent)
    const topLevelItems = menu.items.filter(item => !item.parent || !item.parent.id);
    
    // Sort by order
    topLevelItems.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    // Transform to component format
    return topLevelItems.map(item => ({
      id: item.id,
      label: item.label || '',
      link: item.external_url || item.internal_path || '#',
      type: item.type || 'link',
      isClickable: item.is_clickable !== false,
      order: item.order || 0,
      children: item.children ? transformMenuItems({ items: item.children }) : null,
      links: item.links || null, // For mega menu component links
      icon: item.icon || null
    }));
  };
  
  // Extract menu items from new structure (headerMenu) or navbar.menu or legacy
  const strapiMenuItems = headerMenu 
    ? transformMenuItems(headerMenu) 
    : (navbarMenu ? transformMenuItems(navbarMenu) : []);
  const menuItems = strapiMenuItems.length > 0 ? strapiMenuItems : legacyMenuItems;
  
  // Logo: prioritize new structure (global.logo), then navbar.logo, then legacy
  // Actual API structure: navbar.logo is a direct Media object with url field
  const logo = globalLogo || navbarLogo || legacyLogo;
  
  // CTA: prioritize new structure (globalCtaLabel/globalCtaUrl), then navbar.cta, then legacy buttons
  // Actual API structure: navbar.cta has { text, URL, target, variant }
  const actualCtaLabel = globalCtaLabel || navbarCta?.text || null;
  const actualCtaUrl = globalCtaUrl || navbarCta?.URL || null;
  
  // Debug: Log to verify Strapi data usage
  if (globalData) {
    console.log('Navigation: Strapi data loaded', {
      hasNavbar: !!navbarData,
      hasLogo: !!logo,
      logoUrl: logo?.url,
      hasCta: !!navbarCta,
      ctaText: actualCtaLabel,
      ctaUrl: actualCtaUrl,
      hasMenu: !!navbarMenu,
      menuItemsCount: menuItems.length
    });
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuOpen && !event.target.closest('[data-language-menu]')) {
        setLanguageMenuOpen(false);
      }
      if (aboutDropdownOpen && !event.target.closest('[data-about-dropdown]')) {
        setAboutDropdownOpen(false);
      }
      if (hospitalsDropdownOpen && !event.target.closest('[data-hospitals-dropdown]')) {
        setHospitalsDropdownOpen(false);
      }
      if (treatmentsDropdownOpen && !event.target.closest('[data-treatments-dropdown]')) {
        setTreatmentsDropdownOpen(false);
      }
      if (clinicalTrialsDropdownOpen && !event.target.closest('[data-clinical-trials-dropdown]')) {
        setClinicalTrialsDropdownOpen(false);
      }
      if (resourcesDropdownOpen && !event.target.closest('[data-resources-dropdown]')) {
        setResourcesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [languageMenuOpen, aboutDropdownOpen, hospitalsDropdownOpen, treatmentsDropdownOpen, clinicalTrialsDropdownOpen, resourcesDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLanguageToggle = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const handleLanguageSelect = (language) => {
    dispatch(setCurrentLanguage(language));
    setLanguageMenuOpen(false);
  };

  const handleAboutToggle = (e) => {
    e.preventDefault();
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  const clearHoverTimeout = (key) => {
    if (hoverTimeouts[key]) {
      clearTimeout(hoverTimeouts[key]);
      setHoverTimeouts(prev => {
        const newTimeouts = { ...prev };
        delete newTimeouts[key];
        return newTimeouts;
      });
    }
  };

  const setHoverTimeout = (key, callback, delay = 300) => {
    clearHoverTimeout(key);
    const timeout = setTimeout(callback, delay);
    setHoverTimeouts(prev => ({
      ...prev,
      [key]: timeout
    }));
  };

  const handleAboutMouseEnter = () => {
    if (window.innerWidth > 768) {
      // Close all other dropdowns
      setHospitalsDropdownOpen(false);
      setTreatmentsDropdownOpen(false);
      setClinicalTrialsDropdownOpen(false);
      setResourcesDropdownOpen(false);
      // Clear all timeouts
      Object.keys(hoverTimeouts).forEach(key => clearHoverTimeout(key));
      clearHoverTimeout('about');
      setAboutDropdownOpen(true);
    }
  };

  const handleAboutMouseLeave = (e) => {
    if (window.innerWidth > 768) {
      const relatedTarget = e.relatedTarget;
      const wrapper = e.currentTarget;
      
      // Check if mouse is moving to another nav item or its dropdown
      if (relatedTarget && relatedTarget.closest) {
        const isMovingToNavItem = relatedTarget.closest('[data-about-dropdown]') || 
                                   relatedTarget.closest('[data-hospitals-dropdown]') ||
                                   relatedTarget.closest('[data-treatments-dropdown]') ||
                                   relatedTarget.closest('[data-clinical-trials-dropdown]') ||
                                   relatedTarget.closest('[data-resources-dropdown]');
        if (isMovingToNavItem) {
          return;
        }
        if (wrapper.contains(relatedTarget)) {
          return;
        }
      }
      
      setHoverTimeout('about', () => {
        setAboutDropdownOpen(false);
      }, 250);
    }
  };

  const handleAboutMenuClose = () => {
    setAboutDropdownOpen(false);
  };

  const handleHospitalsToggle = (e) => {
    e.preventDefault();
    setHospitalsDropdownOpen(!hospitalsDropdownOpen);
  };

  const handleHospitalsMouseEnter = () => {
    if (window.innerWidth > 768) {
      // Close all other dropdowns
      setAboutDropdownOpen(false);
      setTreatmentsDropdownOpen(false);
      setClinicalTrialsDropdownOpen(false);
      setResourcesDropdownOpen(false);
      // Clear all timeouts
      Object.keys(hoverTimeouts).forEach(key => clearHoverTimeout(key));
      clearHoverTimeout('hospitals');
      setHospitalsDropdownOpen(true);
    }
  };

  const handleHospitalsMouseLeave = (e) => {
    if (window.innerWidth > 768) {
      const relatedTarget = e.relatedTarget;
      const wrapper = e.currentTarget;
      
      // Check if mouse is moving to another nav item or its dropdown
      if (relatedTarget && relatedTarget.closest) {
        const isMovingToNavItem = relatedTarget.closest('[data-about-dropdown]') || 
                                   relatedTarget.closest('[data-hospitals-dropdown]') ||
                                   relatedTarget.closest('[data-treatments-dropdown]') ||
                                   relatedTarget.closest('[data-clinical-trials-dropdown]') ||
                                   relatedTarget.closest('[data-resources-dropdown]');
        if (isMovingToNavItem) {
          return;
        }
        if (wrapper.contains(relatedTarget)) {
          return;
        }
      }
      
      setHoverTimeout('hospitals', () => {
        setHospitalsDropdownOpen(false);
      }, 250);
    }
  };

  const handleHospitalsMenuClose = () => {
    setHospitalsDropdownOpen(false);
  };

  const handleTreatmentsToggle = (e) => {
    e.preventDefault();
    setTreatmentsDropdownOpen(!treatmentsDropdownOpen);
  };

  const handleTreatmentsMouseEnter = () => {
    if (window.innerWidth > 768) {
      // Close all other dropdowns
      setAboutDropdownOpen(false);
      setHospitalsDropdownOpen(false);
      setClinicalTrialsDropdownOpen(false);
      setResourcesDropdownOpen(false);
      // Clear all timeouts
      Object.keys(hoverTimeouts).forEach(key => clearHoverTimeout(key));
      clearHoverTimeout('treatments');
      setTreatmentsDropdownOpen(true);
    }
  };

  const handleTreatmentsMouseLeave = (e) => {
    if (window.innerWidth > 768) {
      const relatedTarget = e.relatedTarget;
      const wrapper = e.currentTarget;
      
      // Check if mouse is moving to another nav item or its dropdown
      if (relatedTarget && relatedTarget.closest) {
        const isMovingToNavItem = relatedTarget.closest('[data-about-dropdown]') || 
                                   relatedTarget.closest('[data-hospitals-dropdown]') ||
                                   relatedTarget.closest('[data-treatments-dropdown]') ||
                                   relatedTarget.closest('[data-clinical-trials-dropdown]') ||
                                   relatedTarget.closest('[data-resources-dropdown]');
        if (isMovingToNavItem) {
          return;
        }
        if (wrapper.contains(relatedTarget)) {
          return;
        }
      }
      
      setHoverTimeout('treatments', () => {
        setTreatmentsDropdownOpen(false);
      }, 250);
    }
  };

  const handleTreatmentsMenuClose = () => {
    setTreatmentsDropdownOpen(false);
  };

  const handleClinicalTrialsToggle = (e) => {
    e.preventDefault();
    setClinicalTrialsDropdownOpen(!clinicalTrialsDropdownOpen);
  };

  const handleClinicalTrialsMouseEnter = () => {
    if (window.innerWidth > 768) {
      // Close all other dropdowns
      setAboutDropdownOpen(false);
      setHospitalsDropdownOpen(false);
      setTreatmentsDropdownOpen(false);
      setResourcesDropdownOpen(false);
      // Clear all timeouts
      Object.keys(hoverTimeouts).forEach(key => clearHoverTimeout(key));
      clearHoverTimeout('clinicalTrials');
      setClinicalTrialsDropdownOpen(true);
    }
  };

  const handleClinicalTrialsMouseLeave = (e) => {
    if (window.innerWidth > 768) {
      const relatedTarget = e.relatedTarget;
      const wrapper = e.currentTarget;
      
      // Check if mouse is moving to another nav item or its dropdown
      if (relatedTarget && relatedTarget.closest) {
        const isMovingToNavItem = relatedTarget.closest('[data-about-dropdown]') || 
                                   relatedTarget.closest('[data-hospitals-dropdown]') ||
                                   relatedTarget.closest('[data-treatments-dropdown]') ||
                                   relatedTarget.closest('[data-clinical-trials-dropdown]') ||
                                   relatedTarget.closest('[data-resources-dropdown]');
        if (isMovingToNavItem) {
          return;
        }
        if (wrapper.contains(relatedTarget)) {
          return;
        }
      }
      
      setHoverTimeout('clinicalTrials', () => {
        setClinicalTrialsDropdownOpen(false);
      }, 250);
    }
  };

  const handleClinicalTrialsMenuClose = () => {
    setClinicalTrialsDropdownOpen(false);
  };

  const handleResourcesToggle = (e) => {
    e.preventDefault();
    setResourcesDropdownOpen(!resourcesDropdownOpen);
  };

  const handleResourcesMouseEnter = () => {
    if (window.innerWidth > 768) {
      // Close all other dropdowns
      setAboutDropdownOpen(false);
      setHospitalsDropdownOpen(false);
      setTreatmentsDropdownOpen(false);
      setClinicalTrialsDropdownOpen(false);
      // Clear all timeouts
      Object.keys(hoverTimeouts).forEach(key => clearHoverTimeout(key));
      clearHoverTimeout('resources');
      setResourcesDropdownOpen(true);
    }
  };

  const handleResourcesMouseLeave = (e) => {
    if (window.innerWidth > 768) {
      const relatedTarget = e.relatedTarget;
      const wrapper = e.currentTarget;
      
      // Check if mouse is moving to another nav item or its dropdown
      if (relatedTarget && relatedTarget.closest) {
        const isMovingToNavItem = relatedTarget.closest('[data-about-dropdown]') || 
                                   relatedTarget.closest('[data-hospitals-dropdown]') ||
                                   relatedTarget.closest('[data-treatments-dropdown]') ||
                                   relatedTarget.closest('[data-clinical-trials-dropdown]') ||
                                   relatedTarget.closest('[data-resources-dropdown]');
        if (isMovingToNavItem) {
          return;
        }
        if (wrapper.contains(relatedTarget)) {
          return;
        }
      }
      
      setHoverTimeout('resources', () => {
        setResourcesDropdownOpen(false);
      }, 250);
    }
  };

  const handleResourcesMenuClose = () => {
    setResourcesDropdownOpen(false);
  };

  const toggleMobileSubMenu = (menuKey) => {
    setMobileSubMenuOpen(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  // Fallback data
  const defaultMenuItems = [
    { label: 'About', link: '#about' },
    { label: 'Hospitals & Doctors', link: '/hospitals' },
    { label: 'Treatments', link: '#treatments' },
    { label: 'Clinical Trials', link: '#trials' },
    { label: 'Survivor Stories', link: '#stories' },
    { label: 'Resources', link: '#resources' },
  ];

  const defaultLanguages = [
    { id: 1, name: 'English', code: 'en', flag: '🇬🇧' },
    { id: 2, name: 'Spanish', code: 'es', flag: '🇪🇸' },
    { id: 3, name: 'French', code: 'fr', flag: '🇫🇷' },
    { id: 4, name: 'German', code: 'de', flag: '🇩🇪' },
    { id: 5, name: 'Chinese', code: 'zh', flag: '🇨🇳' },
  ];

  const navigationLinks = menuItems && menuItems.length > 0 ? menuItems : defaultMenuItems;
  
  // Logo handling - resolve from Strapi first, fallback to local asset only if Strapi data missing
  const footerDataRaw = globalData?.footer;
  const footerData = footerDataRaw?.data?.attributes || footerDataRaw || null;
  const footerLogo = footerData?.logo?.data?.attributes || footerData?.logo || null;
  const footerLogoUrlFromStore = globalData?.footerLogoUrl || null;

  const extractLogoUrl = (media) => {
    if (!media) return null;

    if (typeof media === 'string') {
      const trimmed = media.trim();
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    // Handle Strapi v4 media structure: { id, name, hash, url, ... }
    // When populated, logo has: { id, documentId, name, hash, url, ... }
    if (media.url) {
      const trimmed = typeof media.url === 'string' ? media.url.trim() : media.url;
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    // Handle nested data.attributes.url structure
    if (media.data?.attributes?.url) {
      const trimmed = media.data.attributes.url?.trim?.() ?? media.data.attributes.url;
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    if (media.attributes?.url) {
      const trimmed = media.attributes.url?.trim?.() ?? media.attributes.url;
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    // Some Strapi responses might nest the media object deeper
    if (Array.isArray(media.data) && media.data.length > 0) {
      const nestedAttributesUrl = media.data[0]?.attributes?.url;
      if (nestedAttributesUrl) {
        return getMediaUrl(nestedAttributesUrl);
      }
    }

    // Handle hash-based URL construction (Strapi v4 pattern)
    // If we have hash and name, construct URL: /uploads/{hash}_{name}
    if (media.hash && media.name) {
      const hash = media.hash.trim();
      const name = media.name.trim();
      return getMediaUrl(`/uploads/${hash}_${name}`);
    }

    if (media.logo && media.logo !== media) {
      return extractLogoUrl(media.logo);
    }

    // As a last resort, check common fields
    if (media.src) {
      return getMediaUrl(media.src);
    }

    return null;
  };

  const strapiNavbarLogoUrl = formatMedia(navbarData?.logo);
  const strapiGlobalLogoUrl = formatMedia(globalData?.logo);
  const strapiFooterLogoUrl = formatMedia(footerData?.logo);

  const logoUrlRaw =
    navbarLogoUrlFromStore ||
    extractLogoUrl(navbarLogo) ||
    strapiNavbarLogoUrl ||
    globalLogoUrlFromStore ||
    extractLogoUrl(globalLogo) ||
    strapiGlobalLogoUrl ||
    footerLogoUrlFromStore ||
    extractLogoUrl(footerLogo) ||
    strapiFooterLogoUrl ||
    '';

  const logoUrl = logoUrlRaw ? logoUrlRaw.trim() : '';
  useEffect(() => {
    console.log('🔍 Navigation logo debug - Full Resolution Chain:', {
      // Raw logo objects
      navbarLogo,
      globalLogo,
      footerLogo,
      // Resolved URLs from store
      navbarLogoUrlFromStore,
      globalLogoUrlFromStore,
      footerLogoUrlFromStore,
      // Extracted URLs
      extractedNavbarUrl: extractLogoUrl(navbarLogo),
      extractedGlobalUrl: extractLogoUrl(globalLogo),
      extractedFooterUrl: extractLogoUrl(footerLogo),
      // FormatMedia results
      strapiNavbarLogoUrl,
      strapiGlobalLogoUrl,
      strapiFooterLogoUrl,
      // Final result
      logoUrlRaw,
      computedLogoUrl: logoUrl,
      // Debug: Check logo object structure
      navbarLogoStructure: navbarLogo ? {
        hasUrl: !!navbarLogo.url,
        hasHash: !!navbarLogo.hash,
        hasName: !!navbarLogo.name,
        hasData: !!navbarLogo.data,
        keys: Object.keys(navbarLogo)
      } : null,
    });
  }, [navbarLogo, navbarLogoUrlFromStore, logoUrl, globalLogoUrlFromStore, footerLogoUrlFromStore, globalLogo, footerLogo, strapiNavbarLogoUrl, strapiGlobalLogoUrl, strapiFooterLogoUrl, logoUrlRaw]);
  useEffect(() => {
    console.log('Navigation: logo sources', {
      globalLogo,
      navbarLogo,
      footerLogo,
      legacyLogo,
      resolvedUrl: logoUrl
    });
  }, [globalLogo, navbarLogo, footerLogo, legacyLogo, logoUrl]);
  const derivedLogoText =
    navbarData?.brandName ||
    globalData?.brandName ||
    globalData?.siteTitle ||
    globalData?.site_name ||
    (typeof logo?.name === 'string' && logo.name.toLowerCase() !== 'logo.png'
      ? logo.name.replace(/\.[^/.]+$/, '')
      : '') ||
    '';

  const logoText = derivedLogoText || 'CancerFax';

  useEffect(() => {
    console.log('Navigation: logo resolution', {
      globalLogo,
      navbarLogo,
      footerLogo,
      computedLogo: logo,
      logoUrl
    });
  }, [globalLogo, navbarLogo, footerLogo, logo, logoUrl]);
  
  // Languages handling
  const availableLanguages = languages && languages.length > 0 ? languages : defaultLanguages;
  const selectedLanguage = currentLanguage || availableLanguages[0];
  
  // Language flag/icon handling - check multiple possible fields
  const languageIcon = selectedLanguage?.flagImage?.data?.attributes?.url 
    ? getMediaUrl(selectedLanguage.flagImage.data.attributes.url) 
    : (selectedLanguage?.flag?.data?.attributes?.url 
      ? getMediaUrl(selectedLanguage.flag.data.attributes.url) 
      : null);
  
  // Button handling - use actual API structure
  // Priority: globalCtaLabel/globalCtaUrl > navbar.cta > legacy buttons > default
  const connectButtonText = actualCtaLabel || buttons?.connectButtonText || buttons?.connectButton?.text || 'Connect With Us';
  const connectButtonLink = actualCtaUrl || buttons?.connectButtonLink || buttons?.connectButton?.link || '/contact';


  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // change 80 to whatever scroll offset you want
      setIsSticky(window.scrollY > 92);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run on mount in case page is already scrolled

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <NavContainer className={`header ${isSticky ? "header-fixed" : ""}`}>
      <NavContent>
        <Logo href="/" aria-label={logoText || 'CancerFax'}>
          {/* Always render img tag to maintain layout, show/hide based on logoUrl */}
          <LogoImage
            key={logoUrl || 'placeholder'}
            src={logoUrl || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='}
            alt={logoText || 'CancerFax logo'}
            style={{ 
              display: logoUrl ? 'block' : 'none',
              visibility: logoUrl ? 'visible' : 'hidden'
            }}
            onError={(e) => {
              console.error('❌ Navigation logo image failed to load:', {
                logoUrl,
                attemptedUrl: e.target.src,
                navbarLogo,
                navbarLogoUrlFromStore,
                globalLogoUrlFromStore,
                footerLogoUrlFromStore,
                error: 'Image load failed'
              });
              e.target.style.display = 'none';
              e.target.style.visibility = 'hidden';
            }}
            onLoad={() => {
              if (logoUrl) {
                console.log('✅ Navigation logo image loaded successfully:', logoUrl);
              }
            }}
          />
          {/* Show fallback only when logoUrl is empty */}
          {!logoUrl && (
            <>
              <LogoFallbackIcon>📞</LogoFallbackIcon>
              <LogoFallbackText>{logoText || 'CancerFax'}</LogoFallbackText>
            </>
          )}
        </Logo>
        
        <NavMenu $darkText={darkText}>
          {navigationLinks.map((item, index) => {
            if (item.label === 'About') {
              return (
                <NavLinkWrapper 
                  key={index} 
                  data-about-dropdown
                  onMouseEnter={handleAboutMouseEnter}
                  onMouseLeave={handleAboutMouseLeave}
                >
                  <NavLink 
                    href={item.link || '#about'} 
                    onClick={handleAboutToggle}
                    $darkText={darkText}
                  >
                    {item.label}
                  </NavLink>
                  <AboutDropdown 
                    isOpen={aboutDropdownOpen}
                    onMouseEnter={handleAboutMouseEnter}
                    onMouseLeave={handleAboutMouseLeave}
                  >
                    <DropdownHeader>
                      <DropdownHeaderIcon hasIcon={false} />
                      <DropdownHeaderText>About</DropdownHeaderText>
                    </DropdownHeader>
                    <DropdownMenuItem to="/about" onClick={handleAboutMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>About Us</MenuItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem to="/specialisation" onClick={handleAboutMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>Our Specialisation</MenuItemText>
                    </DropdownMenuItem>
                  </AboutDropdown>
                </NavLinkWrapper>
              );
            }
            if (item.label === 'Hospitals & Doctors') {
              return (
                <NavLinkWrapper 
                  key={index} 
                  data-hospitals-dropdown
                  onMouseEnter={handleHospitalsMouseEnter}
                  onMouseLeave={handleHospitalsMouseLeave}
                >
                  <NavLink 
                    href={item.link || '/hospitals'} 
                    onClick={handleHospitalsToggle}
                    $darkText={darkText}
                  >
                    {item.label}
                  </NavLink>
                  <AboutDropdown 
                    isOpen={hospitalsDropdownOpen}
                    onMouseEnter={handleHospitalsMouseEnter}
                    onMouseLeave={handleHospitalsMouseLeave}
                  >
                    <DropdownHeader>
                      <DropdownHeaderIcon hasIcon={true}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 14C19 15.3261 18.4732 16.5979 17.5355 17.5355C16.5979 18.4732 15.3261 19 14 19C12.6739 19 11.4021 18.4732 10.4645 17.5355C9.52678 16.5979 9 15.3261 9 14C9 12.6739 9.52678 11.4021 10.4645 10.4645C11.4021 9.52678 12.6739 9 14 9C15.3261 9 16.5979 9.52678 17.5355 10.4645C18.4732 11.4021 19 12.6739 19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 6L8 10H11V18H17V10H20L16 6H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </DropdownHeaderIcon>
                      <DropdownHeaderText>Hospitals & Doctors</DropdownHeaderText>
                    </DropdownHeader>
                    <DropdownMenuItem to="/hospitals" onClick={handleHospitalsMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>Hospitals</MenuItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem to="/doctors" onClick={handleHospitalsMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>Doctors</MenuItemText>
                    </DropdownMenuItem>
                  </AboutDropdown>
                </NavLinkWrapper>
              );
            }
            if (item.label === 'Treatments') {
              return (
                <NavLinkWrapper 
                  key={index} 
                  data-treatments-dropdown
                  onMouseEnter={handleTreatmentsMouseEnter}
                  onMouseLeave={handleTreatmentsMouseLeave}
                >
                  <NavLink 
                    href={item.link || '#treatments'} 
                    onClick={handleTreatmentsToggle}
                    $darkText={darkText}
                  >
                    {item.label}
                  </NavLink>
                  <TreatmentsDropdown 
                    isOpen={treatmentsDropdownOpen}
                    onMouseEnter={handleTreatmentsMouseEnter}
                    onMouseLeave={handleTreatmentsMouseLeave}
                  >
                    <DropdownHeader>
                      <DropdownHeaderIcon hasIcon={true}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </DropdownHeaderIcon>
                      <DropdownHeaderText>Treatments</DropdownHeaderText>
                    </DropdownHeader>
                    <TreatmentsContent>
                      <TreatmentsColumn>
                        <TreatmentCategoryItem 
                          active={selectedTreatmentCategory === 'car-t-cell'}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTreatmentCategory('car-t-cell');
                          }}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            if (window.innerWidth > 768) {
                              clearHoverTimeout('treatments');
                            }
                          }}
                        >
                          {selectedTreatmentCategory === 'car-t-cell' ? null : <MenuItemIndicator />}
                          <MenuItemText>CAR T-Cell therapy</MenuItemText>
                        </TreatmentCategoryItem>
                        <TreatmentCategoryItem 
                          active={selectedTreatmentCategory === 'gene-therapy'}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTreatmentCategory('gene-therapy');
                          }}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            if (window.innerWidth > 768) {
                              clearHoverTimeout('treatments');
                            }
                          }}
                        >
                          {selectedTreatmentCategory === 'gene-therapy' ? null : <MenuItemIndicator />}
                          <MenuItemText>Gene Therapy</MenuItemText>
                        </TreatmentCategoryItem>
                        <TreatmentCategoryItem 
                          active={selectedTreatmentCategory === 'til-therapy'}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTreatmentCategory('til-therapy');
                          }}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            if (window.innerWidth > 768) {
                              clearHoverTimeout('treatments');
                            }
                          }}
                        >
                          {selectedTreatmentCategory === 'til-therapy' ? null : <MenuItemIndicator />}
                          <MenuItemText>TIL therapy</MenuItemText>
                        </TreatmentCategoryItem>
                      </TreatmentsColumn>
                      <TreatmentsColumn>
                        <TreatmentSubItems>
                          {selectedTreatmentCategory === 'car-t-cell' && (
                            <>
                              <DropdownMenuItem to="/treatments/car-t-autoimmune" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>CAR T Cell Therapy In Autoimmune Disorders</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/car-t-cll" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>CAR T-Cell Therapy For Chronic Lymphocytic Leukemia</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/car-t-gastric" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>CAR T Cell Therapy For Gastric Cancer</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/car-t-glioblastoma" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>CAR T-Cell Therapy For Glioblastoma</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/car-t-myeloma" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>CAR T Cell Therapy For Multiple Myeloma</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/fucaso" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>FUCASO: CAR T-Cell Therapy For Multiple Myeloma</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/car-t-neuroblastoma" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>CAR T-Cell Therapy For Neuroblastoma</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/car-t-china" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>CAR T-Cell Therapy In China</MenuItemText>
                              </DropdownMenuItem>
                            </>
                          )}
                          {selectedTreatmentCategory === 'gene-therapy' && (
                            <>
                              <DropdownMenuItem to="/treatments/crispr-china" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>CRISPR/Cas9 Gene Therapy In China</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/gene-metachromatic" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>Gene Therapy For Metachromatic</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/gene-sickle-cell" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>Gene Therapy For Sickle Cell Anemia</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/gene-thalassemia" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>Gene Therapy for Thalassemia</MenuItemText>
                              </DropdownMenuItem>
                            </>
                          )}
                          {selectedTreatmentCategory === 'til-therapy' && (
                            <>
                              <DropdownMenuItem to="/treatments/gamma-delta" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>Gamma Delta T-Cell Therapy</MenuItemText>
                              </DropdownMenuItem>
                              <DropdownMenuItem to="/treatments/til-china" onClick={handleTreatmentsMenuClose}>
                                <MenuItemIndicator />
                                <MenuItemText>Tumor-Infiltrating Lymphocyte (TIL) Therapy In China</MenuItemText>
                              </DropdownMenuItem>
                            </>
                          )}
                        </TreatmentSubItems>
                      </TreatmentsColumn>
                    </TreatmentsContent>
                  </TreatmentsDropdown>
                </NavLinkWrapper>
              );
            }
            if (item.label === 'Clinical Trials') {
              return (
                <NavLinkWrapper 
                  key={index} 
                  data-clinical-trials-dropdown
                  onMouseEnter={handleClinicalTrialsMouseEnter}
                  onMouseLeave={handleClinicalTrialsMouseLeave}
                >
                  <NavLink 
                    href={item.link || '#trials'} 
                    onClick={handleClinicalTrialsToggle}
                    $darkText={darkText}
                  >
                    {item.label}
                  </NavLink>
                  <AboutDropdown 
                    isOpen={clinicalTrialsDropdownOpen}
                    onMouseEnter={handleClinicalTrialsMouseEnter}
                    onMouseLeave={handleClinicalTrialsMouseLeave}
                  >
                    <DropdownHeader>
                      <DropdownHeaderIcon hasIcon={true}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </DropdownHeaderIcon>
                      <DropdownHeaderText>Clinical Trials</DropdownHeaderText>
                    </DropdownHeader>
                    <DropdownMenuItem to="/clinical-trials/ongoing" onClick={handleClinicalTrialsMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>Ongoing Clinical Trials</MenuItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem to="/clinical-trials/car-t-cell" onClick={handleClinicalTrialsMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>CAR T Cell therapy clinical trials</MenuItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem to="/clinical-trials/ball-car-t" onClick={handleClinicalTrialsMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>Clinical trial for BALL CAR T-Cell therapy</MenuItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem to="/clinical-trials/car-t-myeloma" onClick={handleClinicalTrialsMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>CAR T Cell therapy trials for multiple myeloma</MenuItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem to="/clinical-trials/car-t-thrombocytopenia" onClick={handleClinicalTrialsMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>CAR T-Cell therapy clinical trials for Immune thrombocytopenia</MenuItemText>
                    </DropdownMenuItem>
                  </AboutDropdown>
                </NavLinkWrapper>
              );
            }
            if (item.label === 'Resources') {
              return (
                <NavLinkWrapper 
                  key={index} 
                  data-resources-dropdown
                  onMouseEnter={handleResourcesMouseEnter}
                  onMouseLeave={handleResourcesMouseLeave}
                >
                  <NavLink 
                    href={item.link || '#resources'} 
                    onClick={handleResourcesToggle}
                    $darkText={darkText}
                  >
                    {item.label}
                  </NavLink>
                  <AboutDropdown 
                    isOpen={resourcesDropdownOpen}
                    onMouseEnter={handleResourcesMouseEnter}
                    onMouseLeave={handleResourcesMouseLeave}
                  >
                    <DropdownHeader>
                      <DropdownHeaderIcon hasIcon={true}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 7V5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V7M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7M3 7H21M7 3V7M15 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </DropdownHeaderIcon>
                      <DropdownHeaderText>Resources</DropdownHeaderText>
                    </DropdownHeader>
                    <DropdownMenuItem to="/resources" onClick={handleResourcesMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>Resource Listing</MenuItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem to="/faqs" onClick={handleResourcesMenuClose}>
                      <MenuItemIndicator />
                      <MenuItemText>FAQs</MenuItemText>
                    </DropdownMenuItem>
                  </AboutDropdown>
                </NavLinkWrapper>
              );
            }
            return (
            <NavLink key={index} href={item.link || `#${item.label.toLowerCase().replace(/\s+/g, '-')}`} $darkText={darkText}>
              {item.label}
            </NavLink>
            );
          })}
        </NavMenu>
        
        <NavButtons>
          <LanguageWrapper data-language-menu>
            <LanguageButton onClick={handleLanguageToggle} aria-label="Change Language">
            {languageIcon ? (
                <img src={languageIcon} alt={selectedLanguage?.name || 'Language'} />
            ) : (
                // Show flag emoji or default UK Flag SVG
                selectedLanguage?.flag && typeof selectedLanguage.flag === 'string' ? (
                  <span style={{ fontSize: '22px', lineHeight: '16px' }}>{selectedLanguage.flag}</span>
                ) : (
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                <circle cx="17.5" cy="17.5" r="17.5" fill="#012169"/>
                <path d="M3.5 6.5L17.5 17.5M31.5 28.5L17.5 17.5M17.5 17.5L31.5 6.5M17.5 17.5L3.5 28.5" stroke="white" strokeWidth="2"/>
                <path d="M3.5 6.5L17.5 17.5M31.5 28.5L17.5 17.5M17.5 17.5L31.5 6.5M17.5 17.5L3.5 28.5" stroke="#C8102E" strokeWidth="1"/>
                <path d="M0 17.5H35M17.5 0V35" stroke="white" strokeWidth="4"/>
                <path d="M0 17.5H35M17.5 0V35" stroke="#C8102E" strokeWidth="2.5"/>
              </svg>
                )
            )}
          </LanguageButton>
            <LanguageDropdown isOpen={languageMenuOpen}>
              {availableLanguages.map((lang) => (
                <LanguageOption
                  key={lang.id}
                  isActive={selectedLanguage?.id === lang.id}
                  onClick={() => handleLanguageSelect(lang)}
                >
                  <LanguageFlag>
                    {lang.flagImage?.data?.attributes?.url ? (
                      <img src={getMediaUrl(lang.flagImage.data.attributes.url)} alt={lang.name} />
                    ) : lang.flag?.data?.attributes?.url ? (
                      <img src={getMediaUrl(lang.flag.data.attributes.url)} alt={lang.name} />
                    ) : typeof lang.flag === 'string' ? (
                      <span className='flag-text'>{lang.flag}</span>
                    ) : (
                      <span className='flag-text'>🌐</span>
                    )}
                  </LanguageFlag>
                  <LanguageLabel>{lang.name}</LanguageLabel>
                </LanguageOption>
              ))}
            </LanguageDropdown>
          </LanguageWrapper>
          <ConnectButton to={connectButtonLink}>
            {connectButtonText}
          </ConnectButton>
          <HamburgerButton onClick={toggleMenu} isOpen={isMenuOpen} $darkText={darkText}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
        </NavButtons>
      </NavContent>

      <MobileMenu isOpen={isMenuOpen}>
        {navigationLinks.map((item, index) => {
          const menuKey = item.label.toLowerCase().replace(/\s+/g, '').replace('&', '');
          
          if (item.label === 'About') {
            return (
              <MobileNavItem key={index}>
                <MobileNavItemHeader
                  onClick={() => toggleMobileSubMenu('about')}
                  isOpen={mobileSubMenuOpen.about}
                >
                  <span>{item.label}</span>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </MobileNavItemHeader>
                <MobileSubMenu isOpen={mobileSubMenuOpen.about}>
                  <MobileSubMenuItem to="/about" onClick={closeMenu}>
                    About Us
                  </MobileSubMenuItem>
                  <MobileSubMenuItem to="/specialisation" onClick={closeMenu}>
                    Our Specialisation
                  </MobileSubMenuItem>
                </MobileSubMenu>
              </MobileNavItem>
            );
          }
          
          if (item.label === 'Hospitals & Doctors') {
            return (
              <MobileNavItem key={index}>
                <MobileNavItemHeader
                  onClick={() => toggleMobileSubMenu('hospitals')}
                  isOpen={mobileSubMenuOpen.hospitals}
                >
                  <span>{item.label}</span>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </MobileNavItemHeader>
                <MobileSubMenu isOpen={mobileSubMenuOpen.hospitals}>
                  <MobileSubMenuItem to="/hospitals" onClick={closeMenu}>
                    Hospitals
                  </MobileSubMenuItem>
                  <MobileSubMenuItem to="/doctors" onClick={closeMenu}>
                    Doctors
                  </MobileSubMenuItem>
                </MobileSubMenu>
              </MobileNavItem>
            );
          }
          
          if (item.label === 'Treatments') {
            return (
              <MobileNavItem key={index}>
                <MobileNavItemHeader
                  onClick={() => toggleMobileSubMenu('treatments')}
                  isOpen={mobileSubMenuOpen.treatments}
                >
                  <span>{item.label}</span>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </MobileNavItemHeader>
                <MobileSubMenu isOpen={mobileSubMenuOpen.treatments}>
                  <MobileTreatmentCategoryItem
                    onClick={() => setMobileTreatmentCategory(
                      mobileTreatmentCategory === 'car-t-cell' ? null : 'car-t-cell'
                    )}
                    isOpen={mobileTreatmentCategory === 'car-t-cell'}
                  >
                    <span>CAR T-Cell therapy</span>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </MobileTreatmentCategoryItem>
                  <MobileTreatmentSubMenu isOpen={mobileTreatmentCategory === 'car-t-cell'}>
                    <MobileSubMenuItem to="/treatments/car-t-autoimmune" onClick={closeMenu}>
                      CAR T Cell Therapy In Autoimmune Disorders
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/car-t-cll" onClick={closeMenu}>
                      CAR T-Cell Therapy For Chronic Lymphocytic Leukemia
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/car-t-gastric" onClick={closeMenu}>
                      CAR T Cell Therapy For Gastric Cancer
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/car-t-glioblastoma" onClick={closeMenu}>
                      CAR T-Cell Therapy For Glioblastoma
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/car-t-myeloma" onClick={closeMenu}>
                      CAR T Cell Therapy For Multiple Myeloma
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/fucaso" onClick={closeMenu}>
                      FUCASO: CAR T-Cell Therapy For Multiple Myeloma
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/car-t-neuroblastoma" onClick={closeMenu}>
                      CAR T-Cell Therapy For Neuroblastoma
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/car-t-china" onClick={closeMenu}>
                      CAR T-Cell Therapy In China
                    </MobileSubMenuItem>
                  </MobileTreatmentSubMenu>
                  
                  <MobileTreatmentCategoryItem
                    onClick={() => setMobileTreatmentCategory(
                      mobileTreatmentCategory === 'gene-therapy' ? null : 'gene-therapy'
                    )}
                    isOpen={mobileTreatmentCategory === 'gene-therapy'}
                  >
                    <span>Gene Therapy</span>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </MobileTreatmentCategoryItem>
                  <MobileTreatmentSubMenu isOpen={mobileTreatmentCategory === 'gene-therapy'}>
                    <MobileSubMenuItem to="/treatments/crispr-china" onClick={closeMenu}>
                      CRISPR/Cas9 Gene Therapy In China
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/gene-metachromatic" onClick={closeMenu}>
                      Gene Therapy For Metachromatic
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/gene-sickle-cell" onClick={closeMenu}>
                      Gene Therapy For Sickle Cell Anemia
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/gene-thalassemia" onClick={closeMenu}>
                      Gene Therapy for Thalassemia
                    </MobileSubMenuItem>
                  </MobileTreatmentSubMenu>
                  
                  <MobileTreatmentCategoryItem
                    onClick={() => setMobileTreatmentCategory(
                      mobileTreatmentCategory === 'til-therapy' ? null : 'til-therapy'
                    )}
                    isOpen={mobileTreatmentCategory === 'til-therapy'}
                  >
                    <span>TIL therapy</span>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </MobileTreatmentCategoryItem>
                  <MobileTreatmentSubMenu isOpen={mobileTreatmentCategory === 'til-therapy'}>
                    <MobileSubMenuItem to="/treatments/gamma-delta" onClick={closeMenu}>
                      Gamma Delta T-Cell Therapy
                    </MobileSubMenuItem>
                    <MobileSubMenuItem to="/treatments/til-china" onClick={closeMenu}>
                      Tumor-Infiltrating Lymphocyte (TIL) Therapy In China
                    </MobileSubMenuItem>
                  </MobileTreatmentSubMenu>
                </MobileSubMenu>
              </MobileNavItem>
            );
          }
          
          if (item.label === 'Clinical Trials') {
            return (
              <MobileNavItem key={index}>
                <MobileNavItemHeader
                  onClick={() => toggleMobileSubMenu('clinicalTrials')}
                  isOpen={mobileSubMenuOpen.clinicalTrials}
                >
                  <span>{item.label}</span>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </MobileNavItemHeader>
                <MobileSubMenu isOpen={mobileSubMenuOpen.clinicalTrials}>
                  <MobileSubMenuItem to="/clinical-trials/ongoing" onClick={closeMenu}>
                    Ongoing Clinical Trials
                  </MobileSubMenuItem>
                  <MobileSubMenuItem to="/clinical-trials/car-t-cell" onClick={closeMenu}>
                    CAR T Cell therapy clinical trials
                  </MobileSubMenuItem>
                  <MobileSubMenuItem to="/clinical-trials/ball-car-t" onClick={closeMenu}>
                    Clinical trial for BALL CAR T-Cell therapy
                  </MobileSubMenuItem>
                  <MobileSubMenuItem to="/clinical-trials/car-t-myeloma" onClick={closeMenu}>
                    CAR T Cell therapy trials for multiple myeloma
                  </MobileSubMenuItem>
                  <MobileSubMenuItem to="/clinical-trials/car-t-thrombocytopenia" onClick={closeMenu}>
                    CAR T-Cell therapy clinical trials for Immune thrombocytopenia
                  </MobileSubMenuItem>
                </MobileSubMenu>
              </MobileNavItem>
            );
          }
          
          if (item.label === 'Resources') {
            return (
              <MobileNavItem key={index}>
                <MobileNavItemHeader
                  onClick={() => toggleMobileSubMenu('resources')}
                  isOpen={mobileSubMenuOpen.resources}
                >
                  <span>{item.label}</span>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </MobileNavItemHeader>
                <MobileSubMenu isOpen={mobileSubMenuOpen.resources}>
                  <MobileSubMenuItem to="/resources" onClick={closeMenu}>
                    Resource Listing
                  </MobileSubMenuItem>
                  <MobileSubMenuItem to="/faqs" onClick={closeMenu}>
                    FAQs
                  </MobileSubMenuItem>
                </MobileSubMenu>
              </MobileNavItem>
            );
          }
          
          return (
          <MobileNavLink 
            key={index} 
            href={item.link || `#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={closeMenu}
          >
            {item.label}
          </MobileNavLink>
          );
        })}
      </MobileMenu>
    </NavContainer>
  );
};

export default Navigation;

