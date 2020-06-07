import React from 'react';
import { Flex, useTheme } from '@chakra-ui/core';
import SocialLinks from './SocialLinks';
import FooterLinks from './FooterLinks';
import PhotoCredit from './PhotoCredits';
import Copyright from './Copyright';

const Footer = () => {
  const theme = useTheme();
  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      h="375px"
      bg={theme.footer.background}
    >
      <Flex
        direction="column"
        align="center"
        justify="space-evenly"
        minW={{ sm: '300px', md: '500px' }}
        h="80%"
        mt="5"
      >
        <SocialLinks />
        <FooterLinks />
        <PhotoCredit />
        <Copyright />
      </Flex>
    </Flex>
  );
};

export default Footer;
