import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchNavigation, fetchLogo, fetchLanguages, fetchButtons, setCurrentLanguage } from '../../store/slices/navigationSlice';
import { getMediaUrl } from '../../services/api';

const NavContainer = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 100;
  padding: 22px 0;
  box-sizing: border-box;
  overflow: visible;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  img {
    height: 29px;
    width: auto;
    max-width: 176px;
    object-fit: contain;
  }

  svg {
    width: 176px;
    height: 29px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: 811px;
  height: 48px;
  padding: 0 24px;
  border-radius: 20px;
  background: #FFFFFF2B; /* rgba(255,255,255,0.17) */
  backdrop-filter: blur(126.4px);
  opacity: 1;
  transform: rotate(0deg);
  flex-shrink: 0;

  @media (max-width: 1400px) {
    width: 720px;
    gap: 24px;
  }

  @media (max-width: 1200px) {
    width: 600px;
    gap: 20px;
    height: 44px;
  }

  @media (max-width: 1024px) {
    width: auto;
    gap: 16px;
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.white};
  font-size: 15px;
  font-weight: 400;
  transition: opacity 0.3s;
  white-space: nowrap;
  
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LanguageWrapper = styled.div`
  position: relative;
`;

const LanguageButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 20px;
  border: 1px solid #A1A1A1;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
  padding: 10px;
  flex-shrink: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    padding: 8px;
    
    svg {
      width: 24px !important;
      height: 24px !important;
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
  transition: opacity 0.3s;
  white-space: nowrap;
  flex-shrink: 0;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transform: rotate(0deg);
  
  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    width: auto;
    height: 44px;
    padding: 12px 16px;
    font-size: 14px;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid #A1A1A1;
  border-radius: 20px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 8px;
  transition: background 0.3s;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 20px;
    height: 2px;
    background: white;
    transition: all 0.3s;
    border-radius: 2px;

    ${props => props.isOpen && `
      &:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    `}
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 88px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 24px;
    gap: 20px;
    z-index: 99;
    animation: slideDown 0.3s ease-out;

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

const MobileNavLink = styled.a`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-weight: 400;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Navigation = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  
  const { menuItems, logo, languages, currentLanguage, buttons, loading } = useSelector((state) => state.navigation);

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
  const logoUrl = logo?.image?.data?.attributes?.url ? getMediaUrl(logo.image.data.attributes.url) : null;
  const logoText = logo?.text || 'CancerFax';
  const availableLanguages = languages && languages.length > 0 ? languages : defaultLanguages;
  const selectedLanguage = currentLanguage || availableLanguages[0];
  const languageIcon = selectedLanguage?.flag?.data?.attributes?.url ? getMediaUrl(selectedLanguage.flag.data.attributes.url) : null;
  const connectButtonText = buttons?.connectButton?.text || 'Connect With Us';
  const connectButtonLink = buttons?.connectButton?.link || '#connect';

  return (
    <NavContainer>
      <NavContent>
        <Logo href="/">
          {logoUrl ? (
            <img src={logoUrl} alt={logoText} />
          ) : (
            <span>{logoText}</span>
          )}
        </Logo>
        
        <NavMenu>
          {navigationLinks.map((item, index) => (
            <NavLink key={index} href={item.link || `#${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
              {item.label}
            </NavLink>
          ))}
        </NavMenu>
        
        <NavButtons>
          <HamburgerButton onClick={toggleMenu} isOpen={isMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
          <LanguageWrapper data-language-menu>
            <LanguageButton onClick={handleLanguageToggle} aria-label="Change Language">
              {languageIcon ? (
                <img src={languageIcon} alt={selectedLanguage?.name || 'Language'} />
              ) : (
                // Show flag emoji or default UK Flag SVG
                selectedLanguage?.flag && typeof selectedLanguage.flag === 'string' ? (
                  <span style={{ fontSize: '24px' }}>{selectedLanguage.flag}</span>
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
                  <LanguageFlag>{lang.flag}</LanguageFlag>
                  <LanguageLabel>{lang.name}</LanguageLabel>
                </LanguageOption>
              ))}
            </LanguageDropdown>
          </LanguageWrapper>
          <ConnectButton to="/contact">
            {connectButtonText}
          </ConnectButton>
        </NavButtons>
      </NavContent>

      <MobileMenu isOpen={isMenuOpen}>
        {navigationLinks.map((item, index) => (
          <MobileNavLink 
            key={index} 
            href={item.link || `#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={closeMenu}
          >
            {item.label}
          </MobileNavLink>
        ))}
      </MobileMenu>
    </NavContainer>
  );
};

export default Navigation;

