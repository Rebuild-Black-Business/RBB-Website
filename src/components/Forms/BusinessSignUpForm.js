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
} from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';
import { submitBusiness } from '../../services/AirtableServices';

const businessCategories = [
  'Entertainment',
  'Retail',
  'Professional services',
  'Food and beverage',
  'Health and wellness',
  'Other',
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
  const [zipcode, setZipcode] = useState('');
  const [donationLink, setDonationLink] = useState('');
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
      zipcode,
      directlyAffected,
      donationLink,
    };

    //Custom Validation
    const valuesToValidate = Object.values(infoToSubmit);
    //Validates all required fields are filled (non-required fields need to default to empty string for this to work)
    if (valuesToValidate.includes(null)) {
      setValidationMessage('All fields with * are required.');
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
          <FormLabel isRequired htmlFor="firstName">
            Your First name
          </FormLabel>
          <Input
            value={firstName}
            id="firstName"
            type="text"
            placeholder="First name"
            onChange={event => setFirstName(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel isRequired htmlFor="lastName">
            Your Last name
          </FormLabel>
          <Input
            value={lastName}
            id="lastName"
            type="text"
            placeholder="Last name"
            onChange={event => setLastName(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel isRequired htmlFor="email">
            Your Email
          </FormLabel>
          <Input
            value={email}
            id="email"
            type="text"
            placeholder="Email"
            onChange={event => setEmail(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel isRequired htmlFor="businessName">
            Business Name
          </FormLabel>
          <Input
            value={businessName}
            id="businessName"
            type="text"
            placeholder="Business name"
            onChange={event => setBusinessName(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel isRequired htmlFor="category">
            Category
          </FormLabel>
          <Select
            id="category"
            placeholder="Category"
            value={category}
            onChange={event => setCategory(event.currentTarget.value)}
          >
            {businessCategories.map(category => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel isRequired htmlFor="businessDescription">
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
          <Input
            value={businessWebsite}
            id="businessWebsite"
            type="text"
            placeholder="Business website"
            onChange={event => setBusinessWebsite(event.currentTarget.value)}
          />
        </Flex>
        <Flex align="center" margin={theme.spacing.base}>
          <Checkbox
            value={physicalLocation}
            id="physicalLocation"
            onChange={() => {
              setPhysicalLocation(prev => !prev);

              //needed for custome validation
              if (zipcode === '') setZipcode(null);
              if (zipcode === null) setZipcode('');
            }}
            marginRight="0.5rem"
          />
          <FormLabel htmlFor="physicalLocation" paddingTop="5px">
            Business has a physical location
          </FormLabel>
        </Flex>
        {physicalLocation && (
          <Flex direction="column" margin={theme.spacing.base}>
            <FormLabel isRequired htmlFor="zipcode">
              Zipcode
            </FormLabel>
            <Input
              value={zipcode}
              id="zipcode"
              type="text"
              placeholder="Zipcode"
              onChange={event => setZipcode(event.currentTarget.value)}
            />
          </Flex>
        )}
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
      {directlyAffected && (
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="donationLink">Donation Link (optional)</FormLabel>
          <Input
            value={donationLink}
            id="donationLink"
            type="text"
            placeholder="Donation Link"
            onChange={event => setDonationLink(event.currentTarget.value)}
          />
        </Flex>
      )}
      <Flex width="100%" justify="center">
        <PrimaryButton onClick={handleSubmit}>Register</PrimaryButton>
      </Flex>
    </FormControl>
  );
};

export default BusinessSignUpForm;
