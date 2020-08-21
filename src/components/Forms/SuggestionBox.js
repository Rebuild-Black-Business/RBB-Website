import React, { useState } from 'react';
import {
  FormControl,
  Flex,
  useTheme,
  FormLabel,
  Input,
  Textarea,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';
import PrimaryButton from '../Buttons/PrimaryButton';

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

//how to intigrate with netlifys for handling
//https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/#form-handling-with-static-site-generators

export default function SuggestionBox() {
  const [topic, setTopic] = useState(null);
  const [description, setDescription] = useState(null);
  const [benefits, setBenefits] = useState(null);
  const [urgency, setUrgency] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const theme = useTheme();

  const handleSubmit = event => {
    const toSubmit = {
      topic,
      description,
      benefits,
      urgency,
      name,
      email,
    };

    //Custom Validation
    const valuesToValidate = Object.values(toSubmit);
    //Validates all required fields (initiated with null) are filled
    if (valuesToValidate.includes(null)) {
      setValidationMessage('All fields with * are required.');
      return;
    }

    //posts to Netlify intigration
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', toSubmit }),
    })
      .then(() => console.log('Success!'))
      .catch(error => console.log(error));

    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Text fontSize="2xl" textAlign="center" margin="0 0 2rem 0">
        Thank you for your suggestion!
      </Text>
    );
  }

  return (
    <FormControl
      width="100%"
      maxWidth="1000px"
      margin="0 auto 3rem"
      padding="0 24px"
      onKeyPress={event => {
        if (event.key === 'Enter') {
          handleSubmit(event);
        }
      }}
      //netlify form handling
      method="post"
      data-netlify-honeypot="bot-field"
      data-netlify="true"
      name="contact"
    >
      {/* netlify form handling */}
      <form netlify>
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />

        <Text fontSize="xl" textAlign="center">
          Suggestion Box
        </Text>

        {/* renders when form is submitted with validation errors */}
        {validationMessage && (
          <Text textAlign="center">{validationMessage}</Text>
        )}

        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel isRequired htmlFor="topic">
            Topic
          </FormLabel>
          <Input
            value={topic}
            id="topic"
            type="text"
            placeholder="e.g. Business, Functionality, New Feature"
            onChange={event => setTopic(event.currentTarget.value)}
          />
        </Flex>

        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel isRequired htmlFor="textField">
            Description
          </FormLabel>
          <Textarea
            value={description}
            id="description"
            placeholder="Description"
            onChange={event => setDescription(event.currentTarget.value)}
          />
        </Flex>

        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel isRequired htmlFor="benefits">
            Benefits
          </FormLabel>
          <Textarea
            value={benefits}
            id="benefits"
            placeholder="Benefits"
            onChange={event => setBenefits(event.currentTarget.value)}
          />
        </Flex>

        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel isRequired htmlFor="urgency">
            Urgency: 1 (Most Urgent) - 5 (Not Urgent)
          </FormLabel>
          <NumberInput
            id="urgency"
            type="number"
            min={1}
            max={5}
            value={urgency}
            onChange={value => setUrgency(value > 5 ? 5 : value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>

        <Flex width="100%" direction="column">
          <Flex direction="column" margin={theme.spacing.base}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              value={name}
              id="name"
              type="text"
              placeholder="Name"
              onChange={event => setName(event.currentTarget.value)}
            />
          </Flex>
          <Flex direction="column" margin={theme.spacing.base}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              value={email}
              id="email"
              type="text"
              placeholder="Email"
              onChange={event => setEmail(event.currentTarget.value)}
            />
          </Flex>

          <Flex width="100%" justify="center">
            <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
          </Flex>
        </Flex>
      </form>
    </FormControl>
  );
}
