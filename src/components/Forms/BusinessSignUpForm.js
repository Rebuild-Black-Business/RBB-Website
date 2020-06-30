import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useTheme,
  Text,
  Textarea,
  Checkbox,
  InputLeftAddon,
} from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';
import { submitBusiness } from '../../services/AirtableServices';

const businessTypes = [
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food and Beverage' },
  { id: 'health', label: 'Health and Wellness' },
  { id: 'professional', label: 'Professional Services' },
  { id: 'retail', label: 'Retail' },
  { id: 'other', label: 'Other' },
];

const BusinessSignUpForm = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const [category, setCategory] = useState(null);
  const [businessDescription, setBusinessDescription] = useState(null);
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [physicalLocation, setPhysicalLocation] = useState(false);
  const [directlyAffected, setDirectlyAffected] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();

  const handleSubmit = async event => {
    event.preventDefault();
    const infoToSubmit = {
      email,
      firstName,
      lastName,
      businessName,
      category,
      businessDescription,
      businessWebsite,
      physicalLocation,
      directlyAffected,
    };

    //Custom Validation
    const valuesToValidate = Object.values(infoToSubmit);
    //Validates all fields are filled (exept website which defaults to empty string)
    if (valuesToValidate.includes(null)) {
      setValidationMessage('All fields are required.');
      return;
    }

    //Validates that website returns 200
    const validSite = await fetch(`https://${businessWebsite}`)
      .then(res => {
        console.log(res);
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
    if (!validSite) {
      setValidationMessage(
        'Please make sure your website url is formatted correctly.'
      );
      return;
    }

    submitBusiness(infoToSubmit);

    setSubmitted(true);
  };

  //renders in place of form once it has been submitted
  if (submitted) return <Text fontSize="2xl">Thank you for signing up!</Text>;

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
    >
      {/* renders when form is submitted with validation errors */}
      {validationMessage && <Text>{validationMessage}</Text>}

      <Flex width="100%" direction="column">
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="firstName">Your First name</FormLabel>
          <Input
            value={firstName}
            id="firstName"
            type="text"
            placeholder="First name"
            onChange={event => setFirstName(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="lastName">Your Last name</FormLabel>
          <Input
            value={lastName}
            id="lastName"
            type="text"
            placeholder="Last name"
            onChange={event => setLastName(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="email">Your Email</FormLabel>
          <Input
            value={email}
            id="email"
            type="text"
            placeholder="Email"
            onChange={event => setEmail(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="businessName">Business Name</FormLabel>
          <Input
            value={businessName}
            id="businessName"
            type="text"
            placeholder="Business name"
            onChange={event => setBusinessName(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select
            id="category"
            placeholder="Category"
            value={category}
            onChange={event => setCategory(event.currentTarget.value)}
          >
            {businessTypes.map(category => {
              return (
                <option key={category.id} value={category.label}>
                  {category.label}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="businessDescription">
            Business Description
          </FormLabel>
          <Textarea
            value={businessDescription}
            id="businessDescription"
            placeholder="Business description"
            onChange={event =>
              setBusinessDescription(event.currentTarget.value)
            }
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="businessWebsite">Business Website</FormLabel>
          <Flex>
            <InputLeftAddon children="https://" />
            <Input
              value={businessWebsite}
              id="businessWebsite"
              type="text"
              placeholder="Business website"
              onChange={event => setBusinessWebsite(event.currentTarget.value)}
            />
          </Flex>
        </Flex>
        <Flex align="center" margin={theme.spacing.base}>
          <Checkbox
            value={physicalLocation}
            id="physicalLocation"
            onChange={() => setPhysicalLocation(prev => !prev)}
            marginRight="0.5rem"
          />
          <FormLabel htmlFor="physicalLocation" paddingTop="5px">
            Business has a physical location
          </FormLabel>
        </Flex>
        <Flex align="center" margin={theme.spacing.base}>
          <Checkbox
            value={directlyAffected}
            id="directlyAffected"
            onChange={() => setDirectlyAffected(prev => !prev)}
            marginRight="0.5rem"
          />
          <FormLabel htmlFor="directlyAffected" paddingTop="5px">
            Business has been directly affected by recent events
          </FormLabel>
        </Flex>
      </Flex>
      <Flex width="100%" justify="center">
        <PrimaryButton onClick={handleSubmit}>Register</PrimaryButton>
      </Flex>
    </FormControl>
  );
};

export default BusinessSignUpForm;
