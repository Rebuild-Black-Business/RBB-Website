import React, { useRef, useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';

const resourceCategories = [
  { id: 'legal', label: 'Legal' },
  { id: 'financial', label: 'Financial' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'health', label: 'Health' },
  { id: 'business', label: 'Business' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'tech', label: 'Tech' },
  { id: 'other', label: 'Other' },
];

function ResourceFilter(props) {
  const { onSearch } = props;
  const [location, setLocation] = useState('');
  const categoryRef = useRef({});

  const handleSearchClick = event => {
    event.preventDefault();
    onSearch({
      category: categoryRef.current.value,
      location: location,
    });
  };

  const handleSearchKeyPress = event => {
    event.preventDefault();
    onSearch({
      category: categoryRef.current.value,
      location: location,
    });
  };

  return (
    <FormControl>
      <Flex>
        <Flex direction="column">
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select
            ref={categoryRef}
            id="category"
            placeholder="Choose a category"
          >
            {
              // TODO: Iterate through list of categories to create <option>s
              resourceCategories.map(resource => {
                return (
                  <option key={resource.id} value={resource.label}>
                    {resource.label}
                  </option>
                );
              })
            }
          </Select>
        </Flex>
        <Flex direction="column">
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            value={location}
            id="location"
            type="text"
            placeholder="Enter city"
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

export default ResourceFilter;
