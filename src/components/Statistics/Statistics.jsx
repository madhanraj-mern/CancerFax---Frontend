import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// Custom hook for counter animation - animates every time section comes into view
const useCounterAnimation = (targetValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animationFrameRef = useRef(null);
  const observerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Parse the target value (e.g., "10,000k+" -> 10000)
  const parseNumber = (value) => {
    if (typeof value !== 'string') return value;
    
    // Remove commas
    let numStr = value.replace(/,/g, '');
    
    // Check for 'k' multiplier
    const hasK = numStr.toLowerCase().includes('k');
    numStr = numStr.replace(/k/i, '');
    
    // Remove % and + signs for parsing
    numStr = numStr.replace(/[%+]/g, '');
    
    const num = parseFloat(numStr);
    return hasK ? num * 1000 : num;
  };

  const formatNumber = (value, originalValue) => {
    // Preserve the original format
    const hasComma = originalValue.includes(',');
    const hasK = originalValue.toLowerCase().includes('k');
    const hasPercent = originalValue.includes('%');
    const hasPlus = originalValue.includes('+');
    
    let formatted = value.toString();
    
    // Add commas
    if (hasComma && !hasK) {
      formatted = value.toLocaleString();
    }
    
    // Add 'k' suffix
    if (hasK) {
      formatted = (value / 1000).toFixed(0) + 'k';
    }
    
    // Add % or +
    if (hasPercent) formatted += '%';
    if (hasPlus) formatted += '+';
    
    return formatted;
  };

  // Animation function - memoized to avoid stale closures
  const startAnimation = useCallback(() => {
    // Prevent multiple simultaneous animations
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setCount(0);
    const targetNum = parseNumber(targetValue);
    let startTime;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation (easeOutQuart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(targetNum * easeOutQuart);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(targetNum);
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [targetValue, duration]);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: start animation after a delay
      const timer = setTimeout(() => {
        startAnimation();
      }, 300);
      return () => clearTimeout(timer);
    }

    // Function to check if element is in viewport
    const isElementInViewport = (element) => {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      
      return (
        rect.top < windowHeight * 0.8 &&
        rect.bottom > windowHeight * 0.2 &&
        rect.left < windowWidth &&
        rect.right > 0
      );
    };

    // Function to setup observer
    const setupObserver = () => {
      // Clean up existing observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Start animation when element comes into view
              hasAnimatedRef.current = false;
              startAnimation();
            } else {
              // Reset when leaving viewport so it can animate again
              setCount(0);
              hasAnimatedRef.current = false;
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
              }
            }
          });
        },
        { 
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
          rootMargin: '0px 0px -5% 0px'
        }
      );

      if (currentRef) {
        observerRef.current.observe(currentRef);
      }
    };

    // Check initial visibility and setup observer
    // Use multiple timeouts to ensure DOM is fully rendered in production
    const initialCheckTimer = setTimeout(() => {
      if (isElementInViewport(currentRef) && !hasAnimatedRef.current) {
        startAnimation();
        hasAnimatedRef.current = true;
      }
      setupObserver();
    }, 200);

    // Additional check after a longer delay for production builds
    const productionCheckTimer = setTimeout(() => {
      if (isElementInViewport(currentRef) && !hasAnimatedRef.current) {
        startAnimation();
        hasAnimatedRef.current = true;
      }
    }, 500);

    return () => {
      clearTimeout(initialCheckTimer);
      clearTimeout(productionCheckTimer);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [targetValue, duration, startAnimation]);

  return { 
    displayValue: formatNumber(count, targetValue),
    ref 
  };
};

const Section = styled.section`
  padding: 100px 120px;
  background: #FFFFFF;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 80px 60px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 24px;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const StatisticsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const StatCard = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid #D1D5DB;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  
  &:first-child {
    padding-top: 0;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    padding: 32px 0;
    gap: 10px;
    
    &:first-child {
      padding-top: 0;
    }
  }
`;

const StatNumber = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 108px;
  font-weight: 500;
  font-style: normal;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  line-height: 100%;
  letter-spacing: 0px;
  
  @media (max-width: 1024px) {
    font-size: 80px;
  }
  
  @media (max-width: 768px) {
    font-size: 64px;
  }
  
  @media (max-width: 480px) {
    font-size: 52px;
  }
`;

const StatLabel = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 15px;
  font-weight: 400;
  color: ${props => props.theme.colors.primary};
  line-height: 1.5;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

// Counter component that uses the animation hook
const AnimatedStat = ({ number, label }) => {
  const { displayValue, ref } = useCounterAnimation(number, 2000);
  
  return (
    <StatCard ref={ref}>
      <StatNumber>{displayValue}</StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatCard>
  );
};

const Statistics = () => {
  const statistics = [
    { number: '10,000k+', label: 'Patients guided globally' },
    { number: '98%', label: 'Patient Satisfaction Rate' },
    { number: '250+', label: 'Clinical Trials Accessed' },
    { number: '100+', label: 'Partner Hospitals Globally' },
  ];

  return (
    <Section id="statistics">
      <Container>
        <StatisticsGrid>
          {statistics.map((stat, index) => (
            <AnimatedStat 
              key={index}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </StatisticsGrid>
      </Container>
    </Section>
  );
};

export default Statistics;

