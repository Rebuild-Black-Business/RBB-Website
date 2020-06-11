import React, { useRef, useState } from 'react';
// import Geocode from 'react-geocode';

import {
  Box,
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
  const rbbBlack = theme.colors['rbb-black-000'];

  const handleSearchClick = event => {
    event.preventDefault();
    // handleLocationToCoords(location);
    onSearch({
      skill: skillRef.current.value,
      location: location,
    });
  };

  const handleSearchKeyPress = event => {
    event.preventDefault();
    // handleLocationToCoords(location);
    onSearch({
      skill: skillRef.current.value,
      location: location,
    });
  };

  // const handleLocationToCoords = location => {
  //   Geocode.setApiKey(process.env.GATSBY_GOOGLE_PLACES_API_KEY);
  //   Geocode.fromAddress(location).then(
  //     res => {
  //       const { lat, lng } = res.results[0].geometry.location;

  //       //@TODO :: Need to pass this lat / lng to Algolia.
  //       console.log(lat, lng);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // };

  return (
    <Box
      w="100%"
      maxW={theme.containers.main}
      paddingX={[null, theme.spacing.base, theme.spacing.lg]}
    >
      <FormControl
        bg={[rbbWhite, rbbWhite, 'rgba(0,0,0,0)']}
        width="100%"
        maxWidth="1000px"
        margin="0 auto 3rem"
        padding={['24px', '24px', '0 24px']}
        fontFamily="Arvo"
      >
        <Flex
          width="100%"
          direction={['column', 'column', 'row', 'row']}
          justify="center"
        >
          <Flex
            direction="column"
            marginRight={[0, 0, theme.spacing.base]}
            marginBottom={[theme.spacing.base, theme.spacing.base, 0]}
          >
            <FormLabel htmlFor="skill" color={[rbbBlack, rbbBlack, rbbWhite]}>
              Skill
            </FormLabel>
            <Select ref={skillRef} id="skill" placeholder="All">
              {skillTypes.map(skill => {
                return (
                  <option key={skill.id} value={skill.label}>
                    {skill.label}
                  </option>
                );
              })}
            </Select>
          </Flex>
          {/*
          This markup is left here intentionally, we will leverage zip code search once Allies are indexed in Algolia
          <Flex
            direction="column"
            marginRight={[0, 0, theme.spacing.base]}
            marginBottom={[theme.spacing.base, theme.spacing.base, 0]}
          >
            <FormLabel
              htmlFor="location"
              color={[rbbBlack, rbbBlack, rbbWhite]}
            >
              Zip Code
            </FormLabel>
            <Input
              value={location}
              id="location"
              type="text"
              placeholder="e.g. 30308"
              onChange={event => setLocation(event.currentTarget.value)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleSearchKeyPress(event);
                }
              }}
            />
          </Flex> */}
          <Flex
            direction="column"
            alignSelf={['center', 'center', 'flex-end']}
            pt={['1rem', '1rem', 0, 0]}
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
    </Box>
  );
}

export default BusinessFilter;
