import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchFeaturedTestimonial } from '../../store/slices/testimonialsSlice';
import { getMediaUrl } from '../../services/api';

const Section = styled.section`
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 654px;
  background: linear-gradient(270deg, rgba(54, 69, 79, 0) 30%, rgba(54, 69, 79, 1) 80%),
              url('https://images.unsplash.com/photo-1579154204845-e59e40d2c79f?w=1920') center/cover;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    height: 580px;
  }
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 500px;
    background: linear-gradient(rgba(54, 69, 79, 0.85), rgba(54, 69, 79, 0.85)),
                url('https://images.unsplash.com/photo-1579154204845-e59e40d2c79f?w=1920') center/cover;
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    min-height: 450px;
    padding: 50px 0;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 140px;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 0 80px;
  }
  
  @media (max-width: 768px) {
    padding: 0 40px;
  }
  
  @media (max-width: 480px) {
    padding: 0 24px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 483px;
  
  @media (max-width: 1024px) {
    gap: 40px;
    max-width: 450px;
  }
  
  @media (max-width: 768px) {
    gap: 32px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    gap: 28px;
  }
`;

const Label = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 9px;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 8px;
    letter-spacing: 1.8px;
  }
`;

const TestimonialsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const Quote = styled.blockquote`
  font-family: ${props => props.theme.fonts.body};
  font-size: 30px;
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  line-height: 1.0;
  letter-spacing: -0.9px;
  margin: 0;
  min-height: auto;
  
  @media (max-width: 1024px) {
    font-size: 30px;
    line-height: 1.55;
  }
  
  @media (max-width: 768px) {
    font-size: 26px;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 22px;
    line-height: 1.65;
  }
`;

const Author = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  line-height: 1.6;
  margin: 0;
  opacity: 0.95;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ReadButton = styled.a`
  font-family: ${props => props.theme.fonts.body};
  padding: 16px 32px;
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 38px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 14px;
    border-radius: 32px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 13px;
    width: 100%;
    text-align: center;
  }
`;

const Testimonials = () => {
  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(fetchFeaturedTestimonial());
  }, [dispatch]);

  // Fallback data
  const fallbackTestimonial = {
    label: 'Testimonials',
    quote: "After exhausting options at home, CancerFax connected me to a CAR-T trial in the US. Today, I'm in complete remission. Their team guided my entire journey, from medical coordination to travel logistics.",
    author: 'Elena, Spain',
    buttonText: 'Read Full Story',
    buttonUrl: '/testimonials'
  };

  // Get featured testimonial or use fallback
  const testimonial = Array.isArray(testimonials) && testimonials.length > 0 
    ? testimonials[0] 
    : fallbackTestimonial;

  return (
    <Section>
      <Container>
        <Content>
          <Label>{testimonial.label || 'Testimonials'}</Label>
          
          <TestimonialsBox>
            <Quote>
              {testimonial.quote}
            </Quote>
            <Author>- {testimonial.author}</Author>
          </TestimonialsBox>
          
          <ReadButton href={testimonial.buttonUrl || '#'}>
            {testimonial.buttonText || 'Read Full Story'}
          </ReadButton>
        </Content>
      </Container>
    </Section>
  );
};

export default Testimonials;

