import React from 'react';
import { Button, Flex, Input, Select, useTheme } from '@chakra-ui/core';

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
      <Button variantColor="black" variant="solid">
        Search
      </Button>
    </Flex>
  );
}

export default ResourceFilter;
