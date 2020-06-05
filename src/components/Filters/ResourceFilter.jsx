import React from 'react';
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

function ResourceFilter() {
  return (
    <FormControl>
      <Flex>
        <Flex direction="column">
          <FormLabel htmlFor="role">Resources For</FormLabel>
          <Select id="role" placeholder="Who are you?">
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
          <Input id="location" type="text" placeholder="Enter city" />
        </Flex>
        <Flex direction="column">
          <PrimaryButton onClick={() => console.log('searching')}>
            Search
          </PrimaryButton>
        </Flex>
      </Flex>
    </FormControl>
  );
}

export default ResourceFilter;
