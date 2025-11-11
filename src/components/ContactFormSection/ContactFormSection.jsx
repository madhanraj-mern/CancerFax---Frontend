import React, { useState, useEffect, memo } from 'react';
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
  // const defaultDescription = "Our team is highly dedicated to help you with your queries.\nJust drop an 'hi' through the form & our team will be in touch with you with-in same day."; // Unused variable
  
  const defaultTestimonial = {
    rating: 5,
    text: "Quicklnk helps me to manage & grow  my Instagram account from 467 followers to 748K followers with-in a year.",
    name: "Vishal Pragya",
    role: "Cancer Patient",
    avatar: "https://placehold.co/40x41"
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
  // const description = sectionData?.attributes?.description || defaultDescription; // Unused variables
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
              Our team is highly dedicated to help you with your queries. Just drop an 'hi' through the form & our team will be in touch with you with-in same day.
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
  background: #FAF5F0;
  padding: 40px 112px;
  
  @media (max-width: 1200px) {
    padding: 40px 60px;
  }
  
  @media (max-width: 968px) {
    padding: 40px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  align-items: flex-start;
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LeftContent = styled.div`
  width: 384px;
  display: flex;
  flex-direction: column;
  gap: 112px;
  flex-shrink: 0;
  
  @media (max-width: 968px) {
    width: 100%;
    gap: 40px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Description = styled.div`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  color: #374151;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }     
`;

const TestimonialCard = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 40px;
  border: 2px solid #FF69B4;
  border-width: 2px;
  border-style: solid;
  border-color: #FF69B4;
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    gap: 24px;
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.span`
  font-size: 16px;
  color: #FFD700;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TestimonialText = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #374151;
  margin: 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 22px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  gap: 4px;
  flex: 1;
`;

const ProfileName = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #374151;
  margin: 0;
  line-height: 24px;
`;

const ProfileRole = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: rgba(55, 65, 81, 0.6);
  margin: 0;
  line-height: 20px;
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 0;
`;

const Dot = styled.div`
  width: ${props => props.active ? '28px' : '10px'};
  height: 6px;
  border-radius: 24px;
  background: ${props => props.active ? 'rgba(55, 65, 81, 0.7)' : 'rgba(55, 65, 81, 0.2)'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? 'rgba(55, 65, 81, 0.7)' : 'rgba(55, 65, 81, 0.4)'};
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
  flex: 1;
  background: rgba(55, 65, 81, 0.05);
  border-radius: 30.97px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 0;
  
  @media (max-width: 968px) {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    border-radius: 24px;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const Label = styled.label`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #374151;
  line-height: 20px;
`;

const Input = styled.input`
  font-family: 'Inter', sans-serif;
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(55, 65, 81, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #FF69B4;
    box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  font-family: 'Inter', sans-serif;
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 14px;
  padding-right: 48px;
  
  &:focus {
    outline: none;
    border-color: #FF69B4;
    box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
  }
  
  option {
    color: #374151;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  font-family: 'Inter', sans-serif;
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  resize: none;
  height: 112px;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(55, 65, 81, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #FF69B4;
    box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 2px 0;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #374151;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2px;
  flex-shrink: 0;
  
  &:checked {
    accent-color: #FF69B4;
    background-color: #FF69B4;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CheckboxLabel = styled.label`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #374151;
  line-height: 20px;
  cursor: pointer;
`;

const TermsLink = styled.a`
  color: #0e7490;
  text-decoration: none;
  font-weight: 400;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  font-family: 'Be Vietnam Pro', sans-serif;
  width: 100%;
  padding: 16px 28px;
  background: #FF69B4;
  color: #FFFFFF;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #FF1493;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export default memo(ContactFormSection);

