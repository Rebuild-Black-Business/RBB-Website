import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useTheme,
} from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { handleLocationToCoords } from '../../api/geocode';
import PrimaryButton from '../Buttons/PrimaryButton';

const businessTypes = [
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food and Beverage' },
  { id: 'health', label: 'Health and Wellness' },
  { id: 'professional', label: 'Professional Services' },
  { id: 'retail', label: 'Retail' },
  { id: 'other', label: 'Other' },
];

function BusinessFilter({ isSearching, onSearch, selectedFilters }) {
  const [location, setLocation] = useState(selectedFilters.location || '');
  const typeRef = useRef();
  const needRef = useRef();
  const theme = useTheme();

  const typeToLabel = selectedFilters.type.replace(/-/g, ' ');

  const rbbWhite = theme.colors['rbb-white'];
  const rbbBlack = theme.colors['rbb-black-000'];

  const handleSearchClick = async event => {
    event.preventDefault();
    const coordinates = await handleLocationToCoords(location);
    onSearch({
      type: typeRef.current.value,
      location: location,
      need: needRef.current.value,
      coordinates,
    });
  };

  const handleSearchKeyPress = async event => {
    event.preventDefault();
    const coordinates = await handleLocationToCoords(location);
    onSearch({
      type: typeRef.current.value,
      location,
      need: needRef.current.value,
      coordinates,
    });
  };

  return (
    <FormControl
      bg={[rbbWhite, rbbWhite, 'rgba(0,0,0,0)']}
      maxWidth="1000px"
      margin="0 auto 3rem"
      padding={['24px', '24px', '0 24px']}
      fontFamily="Arvo"
    >
      <Flex
        width="100%"
        justifyContent="center"
        direction={['column', 'column', 'row', 'row']}
      >
        <Flex
          direction="column"
          marginRight={[0, 0, theme.spacing.base]}
          marginBottom={[theme.spacing.base, theme.spacing.base, 0]}
        >
          <FormLabel htmlFor="type" color={[rbbBlack, rbbBlack, rbbWhite]}>
            Business Type
          </FormLabel>
          <Select ref={typeRef} id="type" placeholder="All">
            {businessTypes.map(resource => {
              return (
                <option
                  key={resource.id}
                  value={resource.label}
                  selected={resource.label === typeToLabel}
                >
                  {resource.label}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex
          direction="column"
          marginRight={[0, 0, theme.spacing.base]}
          marginBottom={[theme.spacing.base, theme.spacing.base, 0]}
        >
          <FormLabel htmlFor="location" color={[rbbBlack, rbbBlack, rbbWhite]}>
            Location
          </FormLabel>
          <Input
            value={location}
            id="location"
            type="text"
            placeholder="e.g. Atlanta or 30308"
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
          marginRight={[0, 0, theme.spacing.base]}
          marginBottom={[theme.spacing.base, theme.spacing.base, 0]}
        >
          <FormLabel htmlFor="need" color={[rbbBlack, rbbBlack, rbbWhite]}>
            Show me
          </FormLabel>
          <Select ref={needRef} id="need">
            <option
              value="true"
              defaultValue
              selected={selectedFilters.need === 'true'}
            >
              Businesses in need
            </option>
            <option value="false" selected={selectedFilters.need === 'false'}>
              All
            </option>
          </Select>
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
            isLoading={isSearching}
          >
            Search
          </PrimaryButton>
        </Flex>
      </Flex>
    </FormControl>
  );
}

BusinessFilter.propTypes = {
  isSearching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  selectedFilters: PropTypes.object.isRequired,
};

export default BusinessFilter;
