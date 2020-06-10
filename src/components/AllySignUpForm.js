import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useTheme,
} from '@chakra-ui/core';

import PrimaryButton from './Buttons/PrimaryButton';

const skillTypes = [
  { id: 'business', label: 'Business' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'tech', label: 'Tech' },
  { id: 'government', label: 'Government' },
];

const AllySignUpForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [skill, setSkill] = useState('');
  const theme = useTheme();

  const handleSubmit = event => {
    event.preventDefault();
    const infoToSubmit = {
      email,
      name,
      skill,
      zipcode,
    };
    console.log(infoToSubmit);
  };

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
      <Flex width="100%" direction="column">
        <Flex direction="column" margin={theme.spacing.base}>
          {/* <FormLabel htmlFor="email">Your email</FormLabel> */}
          <Input
            value={email}
            id="email"
            type="text"
            placeholder="Your email"
            onChange={event => setEmail(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          {/* <FormLabel htmlFor="name">Your name</FormLabel> */}
          <Input
            value={name}
            id="name"
            type="text"
            placeholder="Your name"
            onChange={event => setName(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          {/* <FormLabel htmlFor="zipcode">Zipcode</FormLabel> */}
          <Input
            value={zipcode}
            id="zipcode"
            type="text"
            placeholder="Zipcode"
            onChange={event => setZipcode(event.currentTarget.value)}
          />
        </Flex>
        <Flex direction="column" margin={theme.spacing.base}>
          {/* <FormLabel htmlFor="skill">Specialty</FormLabel> */}
          <Select
            id="skill"
            placeholder="Specialty"
            value={skill}
            onChange={event => setSkill(event.currentTarget.value)}
          >
            {skillTypes.map(skill => {
              return (
                <option key={skill.id} value={skill.label}>
                  {skill.label}
                </option>
              );
            })}
          </Select>
        </Flex>
      </Flex>
      <PrimaryButton onClick={handleSubmit}>Register</PrimaryButton>
    </FormControl>
  );
};

export default AllySignUpForm;
