import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchFAQs } from '../../store/slices/faqSlice';

// Default fallback data
const defaultFAQs = [
  {
    id: 1,
    question: "What services does CancerFax provide?",
    answer: "CancerFax provides comprehensive cancer treatment facilitation services including access to advanced therapies, clinical trial matching, second opinion consultations, and coordination with leading oncologists worldwide.",
    category: "General"
  },
  {
    id: 2,
    question: "How do I get started with CancerFax?",
    answer: "Getting started is simple. Fill out our contact form or call our support team. We'll schedule an initial consultation to understand your medical history and treatment needs, then create a personalized care plan.",
    category: "Getting Started"
  },
  {
    id: 3,
    question: "What types of cancer treatments do you specialize in?",
    answer: "We specialize in advanced cancer treatments including CAR T-Cell therapy, immunotherapy, targeted therapy, clinical trials, and innovative treatment protocols available at our partner hospitals.",
    category: "Treatments"
  },
  {
    id: 4,
    question: "Do you work with insurance companies?",
    answer: "Yes, we work with many insurance providers and can help you navigate coverage options. Our team will assist in understanding your benefits and exploring financial assistance programs if needed.",
    category: "Insurance & Billing"
  },
  {
    id: 5,
    question: "How long does the treatment process typically take?",
    answer: "Treatment timelines vary based on the specific therapy and individual patient needs. Initial consultations typically occur within 1-2 weeks, and we work to expedite treatment starts whenever medically appropriate.",
    category: "Treatment Process"
  }
];

const FAQSection = () => {
  const dispatch = useDispatch();
  const { faqs, loading } = useSelector((state) => state.faq);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  // Get unique categories
  const categories = ['All', ...new Set(displayFAQs.map(faq => 
    faq.attributes?.category || faq.category
  ))];

  // Filter FAQs by category
  const filteredFAQs = selectedCategory === 'All' 
    ? displayFAQs 
    : displayFAQs.filter(faq => 
        (faq.attributes?.category || faq.category) === selectedCategory
      );

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionContainer>
      <ContentWrapper>
        <CategoryFilter>
          {categories.map((category, index) => (
            <CategoryButton
              key={index}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryFilter>

        <FAQList>
          {filteredFAQs.map((faq, index) => {
            const faqData = faq.attributes || faq;
            const question = faqData.question;
            const answer = faqData.answer;
            const isOpen = openIndex === index;

            return (
              <FAQItem key={faq.id || index}>
                <FAQQuestion onClick={() => toggleFAQ(index)} isOpen={isOpen}>
                  <QuestionText>{question}</QuestionText>
                  <IconWrapper isOpen={isOpen}>
                    {isOpen ? '−' : '+'}
                  </IconWrapper>
                </FAQQuestion>
                <FAQAnswer isOpen={isOpen}>
                  <AnswerText>{answer}</AnswerText>
                </FAQAnswer>
              </FAQItem>
            );
          })}
        </FAQList>

        {filteredFAQs.length === 0 && (
          <NoResults>No FAQs found in this category.</NoResults>
        )}
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  background: #FFFFFF;
  padding: 100px 20px;
  
  @media (max-width: 968px) {
    padding: 80px 20px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 30px;
  }
`;

const CategoryButton = styled.button`
  padding: 10px 24px;
  background: ${props => props.active ? 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)' : '#F7F8FA'};
  color: ${props => props.active ? '#FFFFFF' : '#64748b'};
  border: 2px solid ${props => props.active ? 'transparent' : '#E0E0E0'};
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)' 
      : '#E8E9EB'};
    border-color: ${props => props.active ? 'transparent' : '#D0D0D0'};
  }
  
  @media (max-width: 768px) {
    padding: 8px 18px;
    font-size: 13px;
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQItem = styled.div`
  background: #F7F8FA;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 105, 180, 0.05);
  }
  
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

const QuestionText = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #36454F;
  margin: 0;
  padding-right: 20px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.isOpen ? '#FF69B4' : '#E0E0E0'};
  color: ${props => props.isOpen ? '#FFFFFF' : '#64748b'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 300;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 20px;
  }
`;

const FAQAnswer = styled.div`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.4s ease;
`;

const AnswerText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  color: #64748b;
  margin: 0;
  padding: 0 28px 24px 28px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 20px 20px 20px;
  }
`;

const NoResults = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: #64748b;
  text-align: center;
  padding: 40px 20px;
`;

export default memo(FAQSection);

