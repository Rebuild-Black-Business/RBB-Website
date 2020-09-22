import React from 'react';
import { Flex, useTheme } from '@chakra-ui/core';
import SocialLinks from './SocialLinks';
import FooterLinks from './FooterLinks';
import PhotoCredit from './PhotoCredits';
import Copyright from './Copyright';
import NetlifyThanks from './NetlifyThanks';

const Footer = () => {
  const theme = useTheme();
  return (
    <Flex
      as="footer"
      w="100%"
      align="center"
      justify="center"
      h="375px"
      bg={theme.colors['rbb-black-100']}
    >
      <Flex
        direction="column"
        align="center"
        justify="space-evenly"
        maxW="1220px"
        h="80%"
        mt="5"
      >
        <SocialLinks />
        <FooterLinks />
        <Flex direction="column">
          <PhotoCredit />
          <NetlifyThanks />
          <Copyright />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
