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
  InputLeftElement,
  InputGroup,
  Icon,
  RadioGroup,
  Radio,
} from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';
import { submitBusiness } from '../../services/AirtableServices';
import { stateObj } from '../../utils/stateObj';

const businessCategories = [
  'Entertainment',
  'Retail',
  'Professional services',
  'Food and beverage',
  'Health and wellness',
  'Other',
];

const BusinessSignUpForm = () => {
  const [email, setEmail] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const [category, setCategory] = useState(null);
  const [businessDescription, setBusinessDescription] = useState(null);
  const [phone, setPhone] = useState('');
  const [physicalLocation, setPhysicalLocation] = useState(true);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [streetAddress, setStreetAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [bizState, setBizState] = useState(null); //bizState and setBizState are named such to avoid conflict with the React method setState().
  const [zipcode, setZipcode] = useState(null);
  const [serviceArea, setServiceArea] = useState(null);
  const [website, setWebsite] = useState('');
  const [yelp, setYelp] = useState('');
  const [adult, setAdult] = useState(false);
  const [hasDonation, setHasDonation] = useState(false);
  const [donationLink, setDonationLink] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [story, setStory] = useState('');
  const [cash, setCash] = useState(false);
  const [check, setCheck] = useState(false);
  const [credit, setCredit] = useState(false);
  const [bitcoin, setBitcoin] = useState(false);
  const [bobAgreement, setBobAgreement] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);
  const theme = useTheme();

  const handleSubmit = async event => {
    event.preventDefault();
    const infoToSubmit = {
      email,
      businessName,
      category,
      businessDescription,
      phone,
      physicalLocation,
      onlineOnly,
      streetAddress,
      city,
      bizState,
      zipcode,
      serviceArea,
      website,
      yelp,
      adult,
      donationLink,
      story,
      cash,
      check,
      credit,
      bitcoin,
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

  const handleLocationType = event => {
    const val = event.target.value;
    if ('physical' === val) {
      setPhysicalLocation(true);
      setOnlineOnly(false);
    } else if ('online' === val) {
      setPhysicalLocation(false);
      setOnlineOnly(true);
      setStreetAddress('');
      setCity('');
      setBizState('');
    }
  };

  const handleDonation = event => {
    const val = event.target.checked;
    if (false === val) {
      setHasDonation(false);
      setDonationLink('');
    } else if (true === val) {
      setHasDonation(true);
    }
  };

  const handleOwnership = event => {
    const val = event.target.checked;
    if (false === val) {
      setIsOwner(false);
      setStory('');
      setCash(false);
      setCheck(false);
      setCredit(false);
      setBitcoin(false);
    } else if (true === val) {
      setIsOwner(true);
    }
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
          <FormLabel isRequired htmlFor="email">
            Your Email
          </FormLabel>

          <InputGroup>
            <InputLeftElement
              children={<Icon name="email" color="gray.300" />}
            />
            <Input
              value={email}
              id="email"
              type="text"
              placeholder="Email"
              onChange={event => setEmail(event.currentTarget.value)}
            />
          </InputGroup>
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
            maxLength="250"
            onChange={event =>
              setBusinessDescription(event.currentTarget.value)
            }
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="phone">Business Phone Number</FormLabel>
          <InputGroup>
            <InputLeftElement
              children={<Icon name="phone" color="gray.300" />}
            />
            <Input
              value={phone}
              id="phone"
              type="phone"
              placeholder="(281) 330-8004"
              onChange={event => setPhone(event.currentTarget.value)}
            />
          </InputGroup>
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          <Flex>
            <RadioGroup
              defaultValue="physical"
              spacing={5}
              isInline
              onChange={event => handleLocationType(event)}
            >
              <Radio value="physical">Physical Location</Radio>
              <Radio value="online">Online Only</Radio>
            </RadioGroup>
          </Flex>
          {physicalLocation && (
            <Flex direction="column">
              <Flex direction="column" mt={theme.spacing.base}>
                <FormLabel isRequired htmlFor="streetAddress">
                  Street Address
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    children={<Icon name="home" color="gray.300" />}
                  />
                  <Input
                    value={streetAddress}
                    id="streetAddress"
                    type="text"
                    placeholder="123 Marin Luther King Blvd."
                    onChange={event =>
                      setStreetAddress(event.currentTarget.value)
                    }
                  />
                </InputGroup>
              </Flex>
              <Flex direction="column" mt={theme.spacing.base}>
                <FormLabel isRequired htmlFor="city">
                  City
                </FormLabel>
                <Input
                  value={city}
                  id="city"
                  type="text"
                  placeholder="Atlanta"
                  onChange={event => setCity(event.currentTarget.value)}
                />
              </Flex>
              <Flex direction="column" mt={theme.spacing.base}>
                <FormLabel isRequired htmlFor="state">
                  State
                </FormLabel>
                <Select
                  id="state"
                  placeholder="Select a State"
                  value={bizState}
                  onChange={event => setBizState(event.currentTarget.value)}
                >
                  {Object.entries(stateObj).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Flex direction="column" mt={theme.spacing.base}>
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
            </Flex>
          )}
          {onlineOnly && (
            <Flex direction="column">
              <Flex direction="column" mt={theme.spacing.base}>
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
              <Flex direction="column" mt={theme.spacing.base}>
                <FormLabel htmlFor="website">Website</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    children={<Icon name="link" color="gray.300" />}
                  />
                  <Input
                    value={website}
                    id="website"
                    type="url"
                    placeholder="https://"
                    onChange={event => setWebsite(event.currentTarget.value)}
                  />
                </InputGroup>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex direction="column" margin={theme.spacing.base}>
        <Flex direction="column">
          <FormLabel isRequired htmlFor="serviceArea">
            What area do you service?
          </FormLabel>
          <Select
            placeholder="Select your service area"
            id="serviceArea"
            value={serviceArea}
            onChange={event => setServiceArea(event.currentTarget.value)}
          >
            <option value="nationwide">Nationwide</option>
            <option value="local">Local</option>
            <option value="global">Global</option>
          </Select>
        </Flex>
      </Flex>
      {physicalLocation && (
        <Flex direction="column" margin={theme.spacing.base}>
          <FormLabel htmlFor="website">Website</FormLabel>
          <InputGroup>
            <InputLeftElement
              children={<Icon name="link" color="gray.300" />}
            />
            <Input
              value={website}
              id="website"
              type="url"
              placeholder="https://"
              onChange={event => setWebsite(event.currentTarget.value)}
            />
          </InputGroup>
        </Flex>
      )}
      <Flex align="center" margin={theme.spacing.base}>
        <Checkbox
          value={adult}
          id="adult"
          onChange={() => setAdult(prev => !prev)}
          marginRight="0.5rem"
        />
        <FormLabel htmlFor="adult">Adult Business (18+)</FormLabel>
      </Flex>
      <Flex direction="column" margin={theme.spacing.base}>
        <Flex>
          <Checkbox
            value={hasDonation}
            id="hasDonation"
            onChange={event => handleDonation(event)}
            marginRight="0.5rem"
          />
          <FormLabel htmlFor="hasDonation">
            Business has an ongoing donation campaign
          </FormLabel>
        </Flex>
        {hasDonation && (
          <Flex direction="column" mt={theme.spacing.base}>
            <FormLabel
              isRequired={hasDonation ? true : false}
              htmlFor="donationLink"
            >
              Donation Link
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                children={<Icon name="link" color="gray.300" />}
              />
              <Input
                value={donationLink}
                id="donationLink"
                type="text"
                placeholder="Donation Link"
                onChange={event => setDonationLink(event.currentTarget.value)}
              />
            </InputGroup>
          </Flex>
        )}
      </Flex>
      <Flex direction="column" margin={theme.spacing.base}>
        <Flex>
          <Checkbox
            value={isOwner}
            id="isOwner"
            onChange={event => handleOwnership(event)}
            marginRight="0.5rem"
          />
          <FormLabel htmlFor="isOwner">I am the owner</FormLabel>
        </Flex>
        {isOwner && (
          <Flex direction="column">
            <Flex direction="column" mt={theme.spacing.base}>
              <FormLabel htmlFor="story">Your story</FormLabel>
              <Textarea
                value={story}
                id="story"
                maxLength="250"
                placeholder="Tell us your business' story"
                onChange={event => setStory(event.currentTarget.value)}
              />
            </Flex>
            <Flex direction="column" mt={theme.spacing.base}>
              <FormLabel isRequired htmlFor="paymentTypes">
                Accepted Payment Types
              </FormLabel>
              <Flex align="center" mb={theme.spacing.base}>
                <Checkbox
                  value={cash}
                  id="cash"
                  onChange={() => {
                    setCash(prev => !prev);
                  }}
                  marginRight="0.5rem"
                />
                <FormLabel htmlFor="cash">Cash</FormLabel>
              </Flex>
              <Flex align="center" mb={theme.spacing.base}>
                <Checkbox
                  value={check}
                  id="check"
                  onChange={() => {
                    setCheck(prev => !prev);
                  }}
                  marginRight="0.5rem"
                />
                <FormLabel htmlFor="check">Check</FormLabel>
              </Flex>
              <Flex align="center" mb={theme.spacing.base}>
                <Checkbox
                  value={credit}
                  id="credit"
                  onChange={() => {
                    setCredit(prev => !prev);
                  }}
                  marginRight="0.5rem"
                />
                <FormLabel htmlFor="credit">Credit</FormLabel>
              </Flex>
              <Flex align="center" mb={theme.spacing.base}>
                <Checkbox
                  value={bitcoin}
                  id="bitcoin"
                  onChange={() => {
                    setBitcoin(prev => !prev);
                  }}
                  marginRight="0.5rem"
                />
                <FormLabel htmlFor="bitcoin">Bitcoin</FormLabel>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex align="center" margin={theme.spacing.base}>
        <Checkbox
          value={bobAgreement}
          id="bobAgreement"
          onChange={() => setBobAgreement(prev => !prev)}
          marginRight="0.5rem"
        />
        <FormLabel htmlFor="bobAgreement">
          I understand that I am registering this business as Black-owned
        </FormLabel>
      </Flex>
      <Flex width="100%" justify="center">
        <PrimaryButton onClick={handleSubmit}>Register</PrimaryButton>
      </Flex>
    </FormControl>
  );
};

export default BusinessSignUpForm;
