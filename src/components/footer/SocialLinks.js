import React from 'react';
import { Flex } from '@chakra-ui/core';
import { Facebook } from './../SVG/Facebook';
import { Instagram } from './../SVG/Instagram';
import { Envelope } from './../SVG/Envelope';
import { Paypal } from './../SVG/Paypal';
import { Twitter } from './../SVG/Twitter';

const SocialLinks = () => {
  return (
    <Flex
      w={['90%', '80%']}
      justify="space-evenly"
      mr={[0, 0, 0, 2]}
      ml={[0, 0, 0, 2]}
    >
      <Facebook link="#" />
      <Instagram link="#" />
      <Twitter link="#" />
      <Envelope link="#" />
      <Paypal link="#" />
    </Flex>
  );
};

export default SocialLinks;
