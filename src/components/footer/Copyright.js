import React from 'react';
import { Flex, Text, useTheme } from '@chakra-ui/core';
import { Link } from 'gatsby';
import footerStyles from './Footer.module.css';

const DynamicYear = new Date().getFullYear();

const TermsLink = () => {
  return (
    <Link to="/terms" fontWeight="bold" className={footerStyles.termsLink}>
      Terms and Conditions
    </Link>
  );
};

const Copyright = () => {
  const theme = useTheme();
  return (
    <Flex w={['80%', '100%']} textAlign="center">
      <Text
        fontSize="12px"
        fontFamily={theme.fonts.heading}
        color={theme.footer.text}
        opacity={0.5}
      >
        Copyright &copy; {DynamicYear} Rebuild Black Businesses. All rights
        reserved. <TermsLink />
      </Text>
    </Flex>
  );
};

export default Copyright;
