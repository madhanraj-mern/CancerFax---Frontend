import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchQuickFindsSection } from '../../store/slices/quickFindsSlice';

const Section = styled.section`
  width: 100%;
  background: #F5F5F5;
  padding: 50px 120px 50px 120px;
  
  @media (max-width: 1400px) {
    padding: 50px 80px 45px 80px;
  }
  
  @media (max-width: 1200px) {
    padding: 45px 60px 45px 60px;
  }
  
  @media (max-width: 1024px) {
    padding: 40px 40px 40px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 35px 24px 35px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 16px 30px 16px;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const Label = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  letter-spacing: 2px;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 11px;
    letter-spacing: 1.5px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #36454F;
  line-height: 1.3;
  letter-spacing: -0.5px;
  margin: 0;
  max-width: 600px;
  
  @media (max-width: 1200px) {
    font-size: 42px;
  }
  
  @media (max-width: 1024px) {
    font-size: 38px;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #36454F;
  line-height: 1.8;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 15px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.7;
  }
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 1200px) {
    gap: 20px;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
  
  &:focus-within {
    box-shadow: 0 4px 16px rgba(255, 105, 180, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #36454F;
  background: transparent;
  
  &::placeholder {
    color: #999;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color: #666;
  font-size: 18px;
  cursor: pointer;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #36454F;
  background: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 16px 24px;
  border-radius: 50px;
  z-index: 2;
  
  option {
    font-family: 'Montserrat', sans-serif;
    padding: 12px;
    background: white;
    color: #36454F;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 14px 20px;
  }
`;

const SelectDisplay = styled.div`
  flex: 1;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #36454F;
  pointer-events: none;
  z-index: 1;
  
  &.placeholder {
    color: #999;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color: #666;
  font-size: 18px;
  pointer-events: none;
  transition: transform 0.3s ease;
  z-index: 1;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const QuickFinds = () => {
  const dispatch = useDispatch();
  const { sectionContent, countries, specialties, treatments } = useSelector((state) => state.quickFinds);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');

  useEffect(() => {
    dispatch(fetchQuickFindsSection());
  }, [dispatch]);

  // Fallback content
  const defaultContent = {
    label: 'QUICK FINDS',
    title: 'Look For Available Center Near You',
    description: "At CancerFax, we're transforming the way patients discover and receive life-saving therapies, simplifying global care with science, technology, and trust.",
    searchPlaceholder: 'Search with keywords',
  };

  const defaultCountries = [
    { id: 1, name: 'United States', value: 'us' },
    { id: 2, name: 'United Kingdom', value: 'uk' },
    { id: 3, name: 'Canada', value: 'ca' },
    { id: 4, name: 'Germany', value: 'de' },
    { id: 5, name: 'France', value: 'fr' },
  ];

  const defaultSpecialties = [
    { id: 1, name: 'Oncology', value: 'oncology' },
    { id: 2, name: 'Cardiology', value: 'cardiology' },
    { id: 3, name: 'Neurology', value: 'neurology' },
    { id: 4, name: 'Immunotherapy', value: 'immunotherapy' },
  ];

  const defaultTreatments = [
    { id: 1, name: 'Chemotherapy', value: 'chemotherapy' },
    { id: 2, name: 'Radiation Therapy', value: 'radiation' },
    { id: 3, name: 'Immunotherapy', value: 'immunotherapy' },
    { id: 4, name: 'Surgery', value: 'surgery' },
  ];

  const content = sectionContent || defaultContent;
  const countryOptions = Array.isArray(countries) && countries.length > 0 ? countries : defaultCountries;
  const specialtyOptions = Array.isArray(specialties) && specialties.length > 0 ? specialties : defaultSpecialties;
  const treatmentOptions = Array.isArray(treatments) && treatments.length > 0 ? treatments : defaultTreatments;

  const handleSearch = () => {
    // Implement search functionality
    console.log('Search:', {
      searchTerm,
      country: selectedCountry,
      specialty: selectedSpecialty,
      treatment: selectedTreatment,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Section>
      <Container>
        <TopSection>
          <LeftContent>
            <Label>{content.label}</Label>
            <Title>{content.title}</Title>
          </LeftContent>
          
          <RightContent>
            <Description>{content.description}</Description>
          </RightContent>
        </TopSection>

        <FiltersContainer>
          <SearchInput>
            <Input
              type="text"
              placeholder={content.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchIcon onClick={handleSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </SearchIcon>
          </SearchInput>

          <SelectWrapper>
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select country</option>
              {countryOptions.map((country) => (
                <option key={country.id} value={country.value}>
                  {country.name}
                </option>
              ))}
            </Select>
            <SelectDisplay className={!selectedCountry ? 'placeholder' : ''}>
              {selectedCountry 
                ? countryOptions.find(c => c.value === selectedCountry)?.name || 'Select country'
                : 'Select country'}
            </SelectDisplay>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </DropdownIcon>
          </SelectWrapper>

          <SelectWrapper>
            <Select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">Select specialty</option>
              {specialtyOptions.map((specialty) => (
                <option key={specialty.id} value={specialty.value}>
                  {specialty.name}
                </option>
              ))}
            </Select>
            <SelectDisplay className={!selectedSpecialty ? 'placeholder' : ''}>
              {selectedSpecialty 
                ? specialtyOptions.find(s => s.value === selectedSpecialty)?.name || 'Select specialty'
                : 'Select specialty'}
            </SelectDisplay>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </DropdownIcon>
          </SelectWrapper>

          <SelectWrapper>
            <Select
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value)}
            >
              <option value="">Select treatment</option>
              {treatmentOptions.map((treatment) => (
                <option key={treatment.id} value={treatment.value}>
                  {treatment.name}
                </option>
              ))}
            </Select>
            <SelectDisplay className={!selectedTreatment ? 'placeholder' : ''}>
              {selectedTreatment 
                ? treatmentOptions.find(t => t.value === selectedTreatment)?.name || 'Select treatment'
                : 'Select treatment'}
            </SelectDisplay>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </DropdownIcon>
          </SelectWrapper>
        </FiltersContainer>
      </Container>
    </Section>
  );
};

export default QuickFinds;

