import React from 'react';
import { Flex, Input, Select } from '@chakra-ui/core';

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
    <Flex>
      <Select placeholder="Who are you?">
        {userRoles.map((role, index) => {
          return (
            <option key={index} value={role.role}>
              {role.label}
            </option>
          );
        })}
      </Select>
      <Input placeholder="Enter city" />
      <div>
        <PrimaryButton>Search</PrimaryButton>
      </div>
    </Flex>
  );
}

export default ResourceFilter;
