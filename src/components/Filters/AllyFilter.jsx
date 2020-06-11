import React, { useRef, useState } from 'react';
import Geocode from 'react-geocode';

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useTheme,
} from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';

const skillTypes = [
  { id: 'business', label: 'Business' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'tech', label: 'Tech' },
  { id: 'government', label: 'Government' },
];

function BusinessFilter(props) {
  const { onSearch } = props;
  const [location, setLocation] = useState('');
  const skillRef = useRef('');
  const theme = useTheme();

  const rbbWhite = theme.colors['rbb-white'];

  const handleSearchClick = event => {
    event.preventDefault();
    handleLocationToCoords(location);
    onSearch({
      skill: skillRef.current.value,
      location: location,
    });
  };

  const handleSearchKeyPress = event => {
    event.preventDefault();
    handleLocationToCoords(location);
    onSearch({
      skill: skillRef.current.value,
      location: location,
    });
  };

  const handleLocationToCoords = location => {
    Geocode.setApiKey(process.env.GATSBY_GOOGLE_PLACES_API_KEY);
    Geocode.fromAddress(location).then(
      res => {
        const { lat, lng } = res.results[0].geometry.location;

        //@TODO :: Need to pass this lat / lng to Algolia.
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
  };

  return (
    <FormControl
      width="100%"
      maxWidth="1000px"
      margin="0 auto 3rem"
      padding="0 24px"
    >
      <Flex
        width="100%"
        direction={['column', 'column', 'row', 'row']}
        justify="center"
      >
        <Flex direction="column" marginRight={theme.spacing.base}>
          <FormLabel htmlFor="skill" color={rbbWhite}>
            Skill
          </FormLabel>
          <Select ref={skillRef} id="skill" placeholder="Select type">
            {skillTypes.map(skill => {
              return (
                <option key={skill.id} value={skill.label}>
                  {skill.label}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex direction="column" marginRight={theme.spacing.base}>
          <FormLabel htmlFor="location" color={rbbWhite}>
            Zip Code
          </FormLabel>
          <Input
            value={location}
            id="location"
            type="text"
            placeholder="80219"
            onChange={event => setLocation(event.currentTarget.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleSearchKeyPress(event);
              }
            }}
          />
        </Flex>
        <Flex
          direction="column"
          alignSelf={['center', 'center', 'flex-end']}
          pt={['2rem', '2rem', 0, 0]}
        >
          <PrimaryButton
            onClick={handleSearchClick}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleSearchKeyPress(event);
              }
            }}
          >
            Search
          </PrimaryButton>
        </Flex>
      </Flex>
    </FormControl>
  );
}

export default BusinessFilter;
