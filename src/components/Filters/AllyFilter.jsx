import React, { useRef, useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';

const skillTypes = [
  { id: 'business', label: 'Business' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'tech', label: 'Tech' },
  { id: 'government', label: 'Government' },
];

function BusinessFilter(props) {
  const { onSearch } = props;
  const [location, setLocation] = useState('');
  const skillRef = useRef('');

  const handleSearchClick = event => {
    event.preventDefault();
    onSearch({
      skill: skillRef.current.value,
      location: location,
    });
  };

  const handleSearchKeyPress = event => {
    event.preventDefault();
    onSearch({
      skill: skillRef.current.value,
      location: location,
    });
  };

  return (
    <FormControl>
      <Flex>
        <Flex direction="column">
          <FormLabel htmlFor="skill">Skill</FormLabel>
          <Select ref={skillRef} id="skill" placeholder="Select type">
            {skillTypes.map(skill => {
              return (
                <option key={skill.id} value={skill.label}>
                  {skill.label}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex direction="column">
          <FormLabel htmlFor="location">Zip Code</FormLabel>
          <Input
            value={location}
            id="location"
            type="text"
            placeholder="e.g. 80219"
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
