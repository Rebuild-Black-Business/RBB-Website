import React from 'react';
import { Flex } from '@chakra-ui/core';
import { Facebook, Instagram, Twitter, Envelope } from './Icons';

const SocialLinks = () => {
  return (
    <Flex w={['80%', '70%']} justify="space-evenly">
      <Facebook link="#" />
      <Instagram link="#" />
      <Twitter link="#" />
      <Envelope link="#" />
    </Flex>
  );
};

export default SocialLinks;
