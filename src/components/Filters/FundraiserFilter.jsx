import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useTheme,
} from '@chakra-ui/core';

import { handleLocationToCoords } from '../../api/geocode';
import PrimaryButton from '../Buttons/PrimaryButton';

function FundraiserFilter({ onSearch, selectedFilters }) {
  const [name, setName] = useState(selectedFilters.search || '');
  const [location, setLocation] = useState(selectedFilters.location || '');

  const theme = useTheme();

  const rbbWhite = theme.colors['rbb-white'];
  const rbbBlack = theme.colors['rbb-black-000'];

  const handleSearchClick = async event => {
    event.preventDefault();
    const coordinates = await handleLocationToCoords(location);
    onSearch({
      coordinates,
      search: name,
      location,
    });
  };

  const handleSearchKeyPress = async event => {
    event.preventDefault();
    const coordinates = await handleLocationToCoords(location);
    onSearch({
      coordinates,
      search: name,
      location,
    });
  };

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
            flex={1}
          >
            <FormLabel htmlFor="name" color={[rbbBlack, rbbBlack, rbbWhite]}>
              Name
            </FormLabel>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              id="name"
              placeholder=" e.g. Rebuild the Block"
            />
          </Flex>
          <Flex
            direction="column"
            marginRight={[0, 0, theme.spacing.base]}
            marginBottom={[theme.spacing.base, theme.spacing.base, 0]}
            flex={1}
          >
            <FormLabel
              htmlFor="location"
              color={[rbbBlack, rbbBlack, rbbWhite]}
            >
              Location
            </FormLabel>
            <Input
              value={location}
              onChange={e => setLocation(e.target.value)}
              id="location"
              placeholder=" e.g Atlanta"
            />
          </Flex>
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

export default FundraiserFilter;
