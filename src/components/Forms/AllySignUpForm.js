import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useTheme,
  Text,
} from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';
import { submitAlly } from '../../services/AirtableServices';

const allySpecialities = ['Outreach', 'Tech', 'Business', 'Marketing'];

const AllySignUpForm = () => {
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();

  const handleSubmit = event => {
    event.preventDefault();
    const infoToSubmit = {
      email,
      firstName,
      lastName,
      speciality,
      zipcode,
    };

    //Custom Validation
    const valuesToValidate = Object.values(infoToSubmit);
    //Validates all fields are filled
    if (valuesToValidate.includes(null)) {
      setValidationMessage('All fields with * are required.');
      return;
    }

    const possibleError = submitAlly(infoToSubmit);

    if (possibleError) setValidationMessage(possibleError);
    else setSubmitted(true);
  };

  //renders in place of form once it has been submitted
  if (submitted) return <Text fontSize="2xl">Thank you for signing up!</Text>;

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
    >
      <Text fontSize="xl" textAlign="center">
        Sign up to be an Ally
      </Text>
      {/* renders when form is submitted with validation errors */}
      {validationMessage && <Text>{validationMessage}</Text>}

      <Flex width="100%" direction="column">
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="firstName">First name</FormLabel>
          <Input
            value={firstName}
            id="firstName"
            type="text"
            placeholder="First name"
            onChange={event => setFirstName(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <Input
            value={lastName}
            id="lastName"
            type="text"
            placeholder="Last name"
            onChange={event => setLastName(event.currentTarget.value)}
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
          <FormLabel htmlFor="speciality">Speciality</FormLabel>
          <Select
            id="speciality"
            placeholder="Specialty"
            value={speciality}
            onChange={event => setSpeciality(event.currentTarget.value)}
          >
            {allySpecialities.map(speciality => {
              return (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="zipcode">Zipcode</FormLabel>
          <Input
            value={zipcode}
            id="zipcode"
            type="text"
            placeholder="Zipcode"
            onChange={event => setZipcode(event.currentTarget.value)}
          />
        </Flex>
      </Flex>
      <Flex width="100%" justify="center">
        <PrimaryButton onClick={handleSubmit}>Register</PrimaryButton>
      </Flex>
    </FormControl>
  );
};

export default AllySignUpForm;
