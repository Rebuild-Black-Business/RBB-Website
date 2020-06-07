import React from 'react';
import { Flex } from '@chakra-ui/core';
import { Facebook, Instagram, Twitter, Envelope } from './icons';

const SocialLinks = () => {
  return (
    <Flex w={['80%', '60%']} justify="space-evenly">
      <Facebook />
      <Instagram />
      <Twitter />
      <Envelope />
    </Flex>
  );
};

export default SocialLinks;
