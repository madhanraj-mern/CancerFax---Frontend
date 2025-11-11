import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 470px;
  
  @media (max-width: 1024px) {
    gap: 36px;
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
  color: ${props => props.theme.colors.white};
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
  font-weight: 300;
  color: ${props => props.theme.colors.white};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* Limit to 5 lines */
  -webkit-box-orient: vertical;
`;

const Author = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.white};
  line-height: 1.6;
  margin: 0;
  opacity: 0.95;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }

`;

const ReadButton = styled.a`
  max-width: 176px;
    @media (max-width: 575px) {
      max-width: 100%;
    }
`;

const Testimonials = () => {
  return (
    <section className='testimonials_single_sec py-120' id='testimonials' style={{backgroundImage: `url(${'../images/testimonial-img.jpg'})`}}>
      <div className='containerWrapper'>
        <div className='commContent_wrap z-2 position-relative'>
            <Content>
              <Label className='contentLabel'>Testimonials</Label>
              <TestimonialsBox className='pb-4'>
                <Quote className='title-4'>
                  After exhausting options at home, CancerFax connected me to a CAR-T trial in the US. Today, I'm in complete remission. Their team guided my entire journey, from medical coordination to travel logistics.            
                </Quote>
                <Author>- Elena, Spain</Author>
              </TestimonialsBox>
              
              <ReadButton className='btn btn-pink-solid mt-4' href={'#'}>
                Read Full Story
              </ReadButton>
            </Content>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

