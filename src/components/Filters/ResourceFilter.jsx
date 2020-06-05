import React, { useRef, useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';

const userRoles = [
  {
    role: 'ally',
    label: 'Ally',
  },
  {
    role: 'owner',
    label: 'Business owner',
  },
];

function ResourceFilter(props) {
  const { onSearch } = props;

  const roleRef = useRef({});
  const [location, setLocation] = useState('');

  const handleSearchClick = event => {
    event.preventDefault();
    onSearch({
      role: roleRef.current.value,
      location: location,
    });
  };

  const handleSearchKeyPress = event => {
    event.preventDefault();
    onSearch({
      role: roleRef.current.value,
      location: location,
    });
  };

  return (
    <FormControl>
      <Flex>
        <Flex direction="column">
          <FormLabel htmlFor="role">Resources For</FormLabel>
          <Select ref={roleRef} id="role" placeholder="Who are you?">
            {userRoles.map((role, index) => {
              return (
                <option key={index} value={role.role}>
                  {role.label}
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
