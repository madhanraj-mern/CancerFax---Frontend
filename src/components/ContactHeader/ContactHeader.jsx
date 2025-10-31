import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchNavigation, fetchLogo, fetchLanguages, fetchButtons, setCurrentLanguage } from '../../store/slices/navigationSlice';

const ContactHeader = () => {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const { menuItems, logo, languages, currentLanguage } = useSelector((state) => state.navigation);

  useEffect(() => {
    dispatch(fetchNavigation());
    dispatch(fetchLogo());
    dispatch(fetchLanguages());
    dispatch(fetchButtons());
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

  return (
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
  );
};

// Styled Components
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
  width: 173px;
  height: 48px;
  padding: 16px 20px;
  gap: 8px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border: none;
  border-radius: 20px;
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
  opacity: 1;
  transform: rotate(0deg);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.3);
    background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 1400px) {
    width: 160px;
    padding: 14px 18px;
  }
  
  @media (max-width: 1024px) {
    width: 150px;
    height: 44px;
    padding: 12px 16px;
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

export default memo(ContactHeader);


