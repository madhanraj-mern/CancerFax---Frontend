import React, { useState } from 'react';
import styled from 'styled-components';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    inquiryType: '',
    message: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <FormContainer>
      <LeftContent>
        <Paragraph>
          <Title>Our team is highly dedicated to help you with your queries.</Title>
          <Description>
            Just drop an 'hi' through the form & our team will be in touch with you with-in same day.
          </Description>
        </Paragraph>

        <TestimonialCard>
          <TestimonialContent>
            <StarIcon>★</StarIcon>
            <TestimonialText>
              Quicklnk helps me to manage & grow my Instagram account from 467 followers to 748K followers with-in a year.
            </TestimonialText>
          </TestimonialContent>
          <AuthorInfo>
            <Avatar />
            <AuthorDetails>
              <AuthorName>Vishal Pragya</AuthorName>
              <AuthorRole>Cancer Patient</AuthorRole>
            </AuthorDetails>
          </AuthorInfo>
        </TestimonialCard>
      </LeftContent>

      <FormWrapper onSubmit={handleSubmit}>
        <FormGrid>
          <InputRow>
            <InputGroup>
              <Label>First Name*</Label>
              <Input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Last Name*</Label>
              <Input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </InputRow>

          <InputRow>
            <InputGroup>
              <Label>Email Address*</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Phone Number*</Label>
              <Input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </InputRow>

          <InputRow>
            <InputGroup>
              <Label>Zip code*</Label>
              <Input
                type="text"
                name="zipCode"
                placeholder="Enter zip code"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Inquiry type*</Label>
              <Select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                required
              >
                <option value="">Select Inquiry type</option>
                <option value="general">General Inquiry</option>
                <option value="treatment">Treatment Information</option>
                <option value="appointment">Appointment Request</option>
                <option value="partnership">Partnership</option>
              </Select>
            </InputGroup>
          </InputRow>

          <InputGroup>
            <Label>Message*</Label>
            <TextArea
              name="message"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            />
          </InputGroup>
        </FormGrid>

        <CheckboxWrapper>
          <Checkbox
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <CheckboxLabel>
            By reaching out to us, you agree to our Terms & Condition
          </CheckboxLabel>
        </CheckboxWrapper>

        <SubmitButton type="submit">Send Message</SubmitButton>
      </FormWrapper>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  gap: 40px;
  background: #FFFFFF;
  border-radius: 30px;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 110px;
`;

const Paragraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Title = styled.h3`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.5em;
  color: #36454F;
  margin: 0;
`;

const Description = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.5em;
  color: #36454F;
  margin: 0;
`;

const TestimonialCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid #E9E9E9;
  border-radius: 20px;
`;

const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const StarIcon = styled.div`
  color: #FFD700;
  font-size: 24px;
`;

const TestimonialText = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #36454F;
  margin: 0;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #E5E7EB;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #36454F;
  margin: 0;
`;

const AuthorRole = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.57em;
  color: #36454F;
  opacity: 0.6;
  margin: 0;
`;

const FormWrapper = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  background: rgba(54, 69, 79, 0.05);
  border-radius: 30px;
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const Label = styled.label`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.57em;
  color: #36454F;
`;

const Input = styled.input`
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  border-radius: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #36454F;
  outline: none;

  &::placeholder {
    color: #36454F;
    opacity: 0.5;
  }

  &:focus {
    border-color: #FF69B4;
  }
`;

const Select = styled.select`
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  border-radius: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #36454F;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #FF69B4;
  }
`;

const TextArea = styled.textarea`
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  border-radius: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #36454F;
  outline: none;
  resize: vertical;

  &::placeholder {
    color: #36454F;
    opacity: 0.5;
  }

  &:focus {
    border-color: #FF69B4;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.57em;
  color: #36454F;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 20px;
  background: #FF69B4;
  color: #FFFFFF;
  border: none;
  border-radius: 20px;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #E55AA0;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default ContactForm;


