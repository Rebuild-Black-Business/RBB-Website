import React, { useRef, useState } from 'react';
import { handleLocationToCoords } from '../../api/geocode';

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useTheme,
} from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';

const businessTypes = [
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food and Beverage' },
  { id: 'health', label: 'Health and Wellness' },
  { id: 'professional', label: 'Professional Services' },
  { id: 'retail', label: 'Retail' },
  { id: 'other', label: 'Other' },
];

function BusinessFilter(props) {
  const { onSearch, selectedFilters } = props;
  const [location, setLocation] = useState('');
  const typeRef = useRef();
  const needRef = useRef();
  const theme = useTheme();

  const typeToLabel = selectedFilters.type.replace(/-/g, ' ');

  const rbbWhite = theme.colors['rbb-white'];

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
    <FormControl maxWidth="1000px" margin="0 auto 3rem" padding="0 24px">
      <Flex width="100%" justifyContent="space-between">
        <Flex direction="column">
          <FormLabel htmlFor="need" color={rbbWhite}>
            Black Businesses
          </FormLabel>
          <Select ref={needRef} id="need">
            <option
              value="true"
              defaultValue
              selected={selectedFilters.need === 'true'}
            >
              In Urgent Need
            </option>
            <option value="false" selected={selectedFilters.need === 'false'}>
              All
            </option>
          </Select>
        </Flex>
        <Flex direction="column">
          <FormLabel htmlFor="type" color={rbbWhite}>
            Business Type
          </FormLabel>
          <Select ref={typeRef} id="type" placeholder="Select type">
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
        <Flex direction="column">
          <FormLabel htmlFor="location" color={rbbWhite}>
            Location
          </FormLabel>
          <Input
            value={location}
            id="location"
            type="text"
            placeholder="Denver or 80219"
            onChange={event => setLocation(event.currentTarget.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleSearchKeyPress(event);
              }
            }}
          />
        </Flex>
        <Flex direction="column" alignSelf="flex-end">
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
