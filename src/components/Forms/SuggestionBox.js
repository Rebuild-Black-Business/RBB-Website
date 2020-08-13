import React, { useState } from 'react';
import {
  FormControl,
  Flex,
  useTheme,
  FormLabel,
  Input,
  Textarea,
  Text,
} from '@chakra-ui/core';
import PrimaryButton from '../Buttons/PrimaryButton';

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export default function SuggestionBox() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [textField, setTextField] = useState('');

  const theme = useTheme();

  const handleSubmit = event => {
    const toSubmit = {
      name,
      subject,
      textField,
      email,
    };
    console.log(toSubmit);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', toSubmit }),
    })
      .then(() => alert('Success!'))
      .catch(error => alert(error));

    event.preventDefault();
  };

  return (
    <FormControl
      isRequired
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
      //netlify form handling
    >
      {/* netlify form handling */}
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      {/* netlify form handling */}

      <Text fontSize="xl" textAlign="center">
        Suggestion Box
      </Text>
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
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="subject">Subject</FormLabel>
          <Input
            value={subject}
            id="subject"
            type="text"
            placeholder="Subject"
            onChange={event => setSubject(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="textField">Suggestions</FormLabel>
          <Textarea
            value={textField}
            id="textField"
            placeholder="Suggestions"
            maxLength="250"
            onChange={event => setTextField(event.currentTarget.value)}
          />
        </Flex>
        <Flex width="100%" justify="center">
          <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
        </Flex>
      </Flex>
    </FormControl>
  );
}
