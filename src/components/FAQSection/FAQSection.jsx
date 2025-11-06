import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchFAQs } from '../../store/slices/faqSlice';

// Default fallback data
const defaultFAQs = [
  {
    id: 1,
    question: "Cytokine Release Syndrome (CRS)",
    answer: "An inflammatory response causing fever, low blood pressure, and potential multi-organ effects. Managed with tocilizumab and supportive care.",
    category: "Treatments"
  },
  {
    id: 2,
    question: "Neurotoxicity / Neurological Events",
    answer: "Neurological side effects that may occur during treatment, managed with appropriate medical interventions.",
    category: "Treatments"
  },
  {
    id: 3,
    question: "Cytopenias (Low Blood Counts)",
    answer: "Low blood cell counts that may require supportive care and monitoring during treatment.",
    category: "Treatments"
  },
  {
    id: 4,
    question: "Infection Risk",
    answer: "Increased risk of infections during treatment, requiring careful monitoring and preventive measures.",
    category: "Treatments"
  },
  {
    id: 5,
    question: "Tumor Lysis Syndrome (TLS)",
    answer: "A metabolic condition that can occur when cancer cells break down rapidly, requiring medical management.",
    category: "Treatments"
  },
  {
    id: 6,
    question: "Organ Toxicities",
    answer: "Potential side effects affecting various organs, monitored and managed by the medical team.",
    category: "Treatments"
  },
  {
    id: 7,
    question: "Hypogammaglobulinemia & Long-Term Immune Dysfunction",
    answer: "Long-term immune system changes that may require ongoing monitoring and management.",
    category: "Treatments"
  },
  {
    id: 8,
    question: "Other Rare Risks",
    answer: "Additional rare risks that are discussed during the consultation process.",
    category: "Treatments"
  }
];

const FAQSection = () => {
  const dispatch = useDispatch();
  const { faqs, loading } = useSelector((state) => state.faq);
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Treatments');

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  // Category list matching the design
  const categories = [
    'About CancerFax',
    'Hospitals',
    'Treatments',
    'Clinical Trials',
    'Locations',
    'How To Connect'
  ];

  // Filter FAQs by category
  const filteredFAQs = displayFAQs.filter(faq => {
    const faqCategory = faq.attributes?.category || faq.category || 'Treatments';
    return faqCategory === selectedCategory || 
           (selectedCategory === 'Treatments' && !faqCategory);
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionContainer>
      <ContentWrapper>
        <HeaderSection>
          <SuperTitle>Deep diving</SuperTitle>
          <HeaderTitle>Everything you need to know, all in one place.</HeaderTitle>
        </HeaderSection>

        <MainContent>
          <Sidebar>
            {categories.map((category) => (
              <CategoryButton
                key={category}
                isActive={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryButton>
            ))}
          </Sidebar>

          <FAQContent>
            {filteredFAQs.map((faq, index) => {
              const faqData = faq.attributes || faq;
              const question = faqData.question;
              const answer = faqData.answer;
              const isOpen = openIndex === index;

              return (
                <FAQItem key={faq.id || index} isOpen={isOpen}>
                  <FAQQuestion onClick={() => toggleFAQ(index)}>
                    <QuestionText>{question}</QuestionText>
                    <IconWrapper>
                      <DropdownIcon isOpen={isOpen}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </DropdownIcon>
                    </IconWrapper>
                  </FAQQuestion>
                  {isOpen && (
                    <FAQAnswer>
                      <AnswerText>{answer}</AnswerText>
                    </FAQAnswer>
                  )}
                </FAQItem>
              );
            })}

            {filteredFAQs.length === 0 && (
              <NoResults>No FAQs found in this category.</NoResults>
            )}
          </FAQContent>
        </MainContent>
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  background: #FAF5F0;
  padding: 112px;
  min-height: 1000px;
  
  @media (max-width: 1200px) {
    padding: 80px 60px;
  }
  
  @media (max-width: 968px) {
    padding: 60px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const SuperTitle = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #374151;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 11px;
    letter-spacing: 2px;
  }
`;

const HeaderTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  color: #374151;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 40px;
    line-height: 48px;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 36px;
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 48px;
  align-items: flex-start;
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const Sidebar = styled.div`
  width: 288px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
  
  @media (max-width: 968px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
  }
`;

const CategoryButton = styled.button`
  width: 100%;
  padding: 20px;
  background: ${props => props.isActive ? '#FF69B4' : 'rgba(55, 65, 81, 0.1)'};
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: ${props => props.isActive ? '#FFFFFF' : '#374151'};
  
  &:hover {
    background: ${props => props.isActive ? '#FF1493' : 'rgba(55, 65, 81, 0.15)'};
  }
  
  @media (max-width: 968px) {
    width: auto;
    min-width: 150px;
    padding: 16px 20px;
    font-size: 16px;
  }
`;

const FAQContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FAQItem = styled.div`
  padding-bottom: ${props => props.isOpen ? '28px' : '0'};
  border-bottom: 0.5px solid #E5E7EB;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 16px;
  
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const QuestionText = styled.h3`
  flex: 1;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #374151;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropdownIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const FAQAnswer = styled.div`
  padding-top: 0;
  animation: fadeIn 0.3s ease;
  
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
`;

const AnswerText = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #374151;
  margin: 0;
  padding-top: 16px;
  
  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 22px;
  }
`;

const NoResults = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  color: #6B7280;
  text-align: center;
  padding: 60px 20px;
`;

export default memo(FAQSection);
