import React, { useRef, useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';

const businessTypes = [
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food and Beverage' },
  { id: 'health', label: 'Health and Wellness' },
  { id: 'professional', label: 'Professional Services' },
  { id: 'retail', label: 'Retail' },
];

function BusinessFilter(props) {
  const { onSearch } = props;
  const [location, setLocation] = useState('');
  const typeRef = useRef();
  const needRef = useRef();

  const handleSearchClick = event => {
    event.preventDefault();
    onSearch({
      type: typeRef.current.value,
      location: location,
      need: needRef.current.value,
    });
  };

  const handleSearchKeyPress = event => {
    event.preventDefault();
    onSearch({
      type: typeRef.current.value,
      location: location,
      need: needRef.current.value,
    });
  };

  return (
    <FormControl>
      <Flex>
        <Flex direction="column">
          <FormLabel htmlFor="need">Black Businesses</FormLabel>
          <Select ref={needRef} id="need">
            <option value="true" defaultValue>
              In Urgent Need
            </option>
            <option value="false">All</option>
          </Select>
        </Flex>
        <Flex direction="column">
          <FormLabel htmlFor="type">Business Type</FormLabel>
          <Select ref={typeRef} id="type" placeholder="Select type">
            {businessTypes.map(resource => {
              return (
                <option key={resource.id} value={resource.label}>
                  {resource.label}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex direction="column">
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            value={location}
            id="location"
            type="text"
            placeholder="Denver, CO or 80219"
            onChange={event => setLocation(event.currentTarget.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleSearchKeyPress(event);
              }
            }}
          />
        </Flex>
        <Flex direction="column">
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
