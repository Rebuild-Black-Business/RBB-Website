import React, { useRef, useState } from 'react';
import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';

const businessTypes = [
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food & Beverage' },
  { id: 'health', label: 'Health & Wellness' },
  { id: 'professional', label: 'Professional Services' },
  { id: 'retail', label: 'Retail' },
];

function ResourceFilter(props) {
  const { onSearch } = props;
  const [location, setLocation] = useState('');
  const typeRef = useRef();
  const needRef = useRef();

  const handleSearchClick = event => {
    event.preventDefault();
    onSearch({
      type: typeRef.current.value,
      location: location,
      need: needRef.current.checked,
    });
  };

  const handleSearchKeyPress = event => {
    event.preventDefault();
    onSearch({
      type: typeRef.current.value,
      location: location,
      need: needRef.current.checked,
    });
  };

  return (
    <FormControl>
      <Flex>
        <Flex direction="column">
          <FormLabel htmlFor="type">Business</FormLabel>
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
          <FormLabel htmlFor="need">Need</FormLabel>
          <Checkbox ref={needRef} defaultIsChecked>
            Affected by protests
          </Checkbox>
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
