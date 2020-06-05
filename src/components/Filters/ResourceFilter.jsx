import React, { useRef } from 'react';
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
  const locationRef = useRef('');

  const handleSearch = event => {
    event.preventDefault();
    onSearch({
      role: roleRef.current.value,
      location: locationRef.current.value,
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
            ref={locationRef}
            id="location"
            type="text"
            placeholder="Enter city"
          />
        </Flex>
        <Flex direction="column">
          <PrimaryButton onClick={handleSearch} onKeyPress={handleSearch}>
            Search
          </PrimaryButton>
        </Flex>
      </Flex>
    </FormControl>
  );
}

export default ResourceFilter;
