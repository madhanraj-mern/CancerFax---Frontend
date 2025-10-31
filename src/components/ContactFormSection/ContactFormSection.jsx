import React, { useState, useEffect, memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  fetchContactFormSection, 
  fetchTestimonials, 
  fetchInquiryTypes, 
  submitContactForm,
  setCurrentTestimonial,
  resetSubmissionStatus
} from '../../store/slices/contactFormSlice';
import { getMediaUrl } from '../../services/api';

const ContactFormSection = () => {
  const dispatch = useDispatch();
  const { 
    sectionData, 
    testimonials, 
    inquiryTypes, 
    currentTestimonialIndex,
    submissionStatus 
  } = useSelector((state) => state.contactForm);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    inquiryType: '',
    message: '',
    agreeToTerms: false,
  });

  useEffect(() => {
    dispatch(fetchContactFormSection());
    dispatch(fetchTestimonials());
    dispatch(fetchInquiryTypes());
  }, [dispatch]);

  useEffect(() => {
    if (submissionStatus === 'succeeded') {
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zipCode: '',
        inquiryType: '',
        message: '',
        agreeToTerms: false,
      });
      
      // Show success message and reset after 3 seconds
      setTimeout(() => {
        dispatch(resetSubmissionStatus());
      }, 3000);
    }
  }, [submissionStatus, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  const handleTestimonialChange = (index) => {
    dispatch(setCurrentTestimonial(index));
  };

  // Default/Fallback data
  const defaultDescription = "Our team is highly dedicated to help you with your queries.\nJust drop an 'hi' through the form & our team will be in touch with you with-in same day.";
  
  const defaultTestimonial = {
    rating: 5,
    text: "QuickInk helps me to manage & grow my Instagram account from 467 followers to 748K followers with-in a year.",
    name: "Vishal Pragya",
    role: "Cancer Patient",
    avatar: "https://via.placeholder.com/48"
  };

  const defaultInquiryTypes = [
    { id: 1, attributes: { name: 'General Inquiry', value: 'general' } },
    { id: 2, attributes: { name: 'Treatment Information', value: 'treatment' } },
    { id: 3, attributes: { name: 'Appointment Request', value: 'appointment' } },
    { id: 4, attributes: { name: 'Support', value: 'support' } }
  ];

  const defaultFormFields = {
    firstNameLabel: 'First Name*',
    firstNamePlaceholder: 'Enter first name',
    lastNameLabel: 'Last Name*',
    lastNamePlaceholder: 'Enter last name',
    emailLabel: 'Email Address*',
    emailPlaceholder: 'Enter email address',
    phoneLabel: 'Phone Number*',
    phonePlaceholder: 'Enter phone number',
    zipCodeLabel: 'Zip code*',
    zipCodePlaceholder: 'Enter zip code',
    inquiryTypeLabel: 'Inquiry type*',
    inquiryTypePlaceholder: 'Select Inquiry type',
    messageLabel: 'Message*',
    messagePlaceholder: 'Write your message',
    termsText: 'By reaching out to us, you agree to our',
    termsLinkText: 'Terms & Condition',
    termsLink: '#',
    buttonText: 'Send Message'
  };

  // Get data from Strapi or use defaults
  const description = sectionData?.attributes?.description || defaultDescription;
  const currentTestimonial = testimonials[currentTestimonialIndex] || defaultTestimonial;
  const availableInquiryTypes = inquiryTypes.length > 0 ? inquiryTypes : defaultInquiryTypes;
  const formFields = sectionData?.attributes || defaultFormFields;
  
  // Get testimonial data with proper fallback
  const testimonialData = currentTestimonial.attributes || currentTestimonial;
  const testimonialRating = testimonialData.rating || 5;
  const testimonialText = testimonialData.text || testimonialData.testimonial || defaultTestimonial.text;
  const testimonialName = testimonialData.name || defaultTestimonial.name;
  const testimonialRole = testimonialData.role || testimonialData.designation || defaultTestimonial.role;
  const testimonialAvatar = testimonialData.avatar?.data?.attributes?.url 
    ? getMediaUrl(testimonialData.avatar.data.attributes.url) 
    : testimonialData.avatar || defaultTestimonial.avatar;

  return (
    <SectionContainer>
      <ContentWrapper>
        <LeftContent>
          <TextContent>
            <Description>
              {description.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < description.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </Description>
          </TextContent>

          <TestimonialCard>
            <Stars>
              {[...Array(testimonialRating)].map((_, index) => (
                <Star key={index}>⭐</Star>
              ))}
            </Stars>
            <TestimonialText>
              {testimonialText}
            </TestimonialText>
            <ProfileSection>
              <Avatar src={testimonialAvatar} alt={testimonialName} />
              <ProfileInfo>
                <ProfileName>{testimonialName}</ProfileName>
                <ProfileRole>{testimonialRole}</ProfileRole>
              </ProfileInfo>
            </ProfileSection>
            <CarouselDots>
              {testimonials.length > 0 ? 
                testimonials.map((_, index) => (
                  <Dot 
                    key={index} 
                    active={index === currentTestimonialIndex}
                    onClick={() => handleTestimonialChange(index)}
                  />
                ))
                :
                <>
                  <Dot />
                  <Dot />
                  <Dot active />
                  <Dot />
                </>
              }
            </CarouselDots>
          </TestimonialCard>
        </LeftContent>

        <RightContent>
          <FormContainer onSubmit={handleSubmit}>
            {submissionStatus === 'succeeded' && (
              <SuccessMessage>Thank you! Your message has been sent successfully.</SuccessMessage>
            )}
            {submissionStatus === 'failed' && (
              <ErrorMessage>Sorry, there was an error sending your message. Please try again.</ErrorMessage>
            )}
            
            <FormRow>
              <FormGroup>
                <Label>{formFields.firstNameLabel || 'First Name*'}</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder={formFields.firstNamePlaceholder || 'Enter first name'}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={submissionStatus === 'loading'}
                />
              </FormGroup>
              <FormGroup>
                <Label>{formFields.lastNameLabel || 'Last Name*'}</Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder={formFields.lastNamePlaceholder || 'Enter last name'}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={submissionStatus === 'loading'}
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>{formFields.emailLabel || 'Email Address*'}</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder={formFields.emailPlaceholder || 'Enter email address'}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={submissionStatus === 'loading'}
                />
              </FormGroup>
              <FormGroup>
                <Label>{formFields.phoneLabel || 'Phone Number*'}</Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder={formFields.phonePlaceholder || 'Enter phone number'}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={submissionStatus === 'loading'}
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>{formFields.zipCodeLabel || 'Zip code*'}</Label>
                <Input
                  type="text"
                  name="zipCode"
                  placeholder={formFields.zipCodePlaceholder || 'Enter zip code'}
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  disabled={submissionStatus === 'loading'}
                />
              </FormGroup>
              <FormGroup>
                <Label>{formFields.inquiryTypeLabel || 'Inquiry type*'}</Label>
                <Select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  required
                  disabled={submissionStatus === 'loading'}
                >
                  <option value="">{formFields.inquiryTypePlaceholder || 'Select Inquiry type'}</option>
                  {availableInquiryTypes.map((type) => (
                    <option key={type.id} value={type.attributes?.value || type.value}>
                      {type.attributes?.name || type.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>{formFields.messageLabel || 'Message*'}</Label>
              <TextArea
                name="message"
                placeholder={formFields.messagePlaceholder || 'Write your message'}
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                disabled={submissionStatus === 'loading'}
              />
            </FormGroup>

            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                disabled={submissionStatus === 'loading'}
              />
              <CheckboxLabel htmlFor="agreeToTerms">
                {formFields.termsText || 'By reaching out to us, you agree to our'}{' '}
                <TermsLink href={formFields.termsLink || '#'}>
                  {formFields.termsLinkText || 'Terms & Condition'}
                </TermsLink>
              </CheckboxLabel>
            </CheckboxWrapper>

            <SubmitButton type="submit" disabled={submissionStatus === 'loading'}>
              {submissionStatus === 'loading' ? 'Sending...' : (formFields.buttonText || 'Send Message')}
            </SubmitButton>
          </FormContainer>
        </RightContent>
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  background: #FFFFFF;
  padding: 80px 120px;
  
  @media (max-width: 1200px) {
    padding: 60px 60px;
  }
  
  @media (max-width: 968px) {
    padding: 60px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 100px;
  align-items: start;
  
  @media (max-width: 1200px) {
    gap: 60px;
  }
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-top: 20px;
  
  @media (max-width: 968px) {
    gap: 40px;
    padding-top: 0;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  padding: 0;
`;

const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.7;
  color: #36454F;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }     
`;

const TestimonialCard = styled.div`
  background: #FAFAFA;
  border-radius: 20px;
  padding: 20px 24px;
  border: 1px solid #F0F0F0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 335px;
  height: 185px;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    width: 100%;
    height: auto;
    gap: 16px;
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 6px;
`;

const Star = styled.span`
  font-size: 22px;
  color: #FF8A00;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const TestimonialText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: #36454F;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  
  @media (max-width: 768px) {
    font-size: 14px;
    -webkit-line-clamp: unset;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ProfileName = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #36454F;
  margin: 0;
  line-height: 1.2;
`;

const ProfileRole = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #999999;
  margin: 0;
  line-height: 1.2;
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 0;
`;

const Dot = styled.div`
  width: ${props => props.active ? '24px' : '6px'};
  height: 6px;
  border-radius: 3px;
  background: ${props => props.active ? '#666666' : '#D9D9D9'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? '#666666' : '#B0B0B0'};
  }
`;

const SuccessMessage = styled.div`
  padding: 12px 16px;
  background: #D4EDDA;
  border: 1px solid #C3E6CB;
  border-radius: 8px;
  color: #155724;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #F8D7DA;
  border: 1px solid #F5C6CB;
  border-radius: 8px;
  color: #721C24;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const RightContent = styled.div`
  background: #F7F8FA;
  border-radius: 24px;
  padding: 36px 36px;
  border: 1px solid #EBEBEB;
  min-height: 530px;
  max-height: 530px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    min-height: auto;
    max-height: none;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  flex: 1;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #36454F;
  line-height: 1.2;
`;

const Input = styled.input`
  font-family: 'Montserrat', sans-serif;
  padding: 13px 16px;
  background: #FFFFFF;
  border: 1px solid #DCDCDC;
  border-radius: 10px;
  font-size: 14px;
  color: #36454F;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #B0B0B0;
  }
  
  &:focus {
    outline: none;
    border-color: #00A89C;
    box-shadow: 0 0 0 3px rgba(0, 168, 156, 0.08);
  }
`;

const Select = styled.select`
  font-family: 'Montserrat', sans-serif;
  padding: 13px 16px;
  background: #FFFFFF;
  border: 1px solid #DCDCDC;
  border-radius: 10px;
  font-size: 14px;
  color: #36454F;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 18px;
  padding-right: 48px;
  
  &:focus {
    outline: none;
    border-color: #00A89C;
    box-shadow: 0 0 0 3px rgba(0, 168, 156, 0.08);
  }
  
  option {
    color: #36454F;
  }
`;

const TextArea = styled.textarea`
  font-family: 'Montserrat', sans-serif;
  padding: 14px 16px;
  background: #FFFFFF;
  border: 1px solid #DCDCDC;
  border-radius: 10px;
  font-size: 14px;
  color: #36454F;
  resize: none;
  height: 90px;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #B0B0B0;
  }
  
  &:focus {
    outline: none;
    border-color: #00A89C;
    box-shadow: 0 0 0 3px rgba(0, 168, 156, 0.08);
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border: 2px solid #E0E0E0;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2px;
  flex-shrink: 0;
  
  &:checked {
    accent-color: #FF69B4;
  }
`;

const CheckboxLabel = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 1.5;
  cursor: pointer;
`;

const TermsLink = styled.a`
  color: #00A89C;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  width: 520px;
  height: 40px;
  max-width: 100%;
  padding: 0 32px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF8EC5 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(255, 105, 180, 0.25);
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(255, 105, 180, 0.35);
    background: linear-gradient(135deg, #FF5FAB 0%, #FF7DB8 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default memo(ContactFormSection);

