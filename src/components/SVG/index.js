import React from 'react';
import { Flex, Link, useTheme, PseudoBox } from '@chakra-ui/core';

/**
 * Icon container with external link
 * @param {string} The external link the icon points to
 */
export const IconContainer = ({ children, link }) => {
  const theme = useTheme();
  return (
    <Flex
      as={Link}
      href={link}
      isExternal
      h={['50px', '40px']}
      w={['50px', '40px']}
      justify="center"
      align="center"
      borderRadius="50%"
      p="2"
      backgroundColor={theme.footer.iconsBackground}
    >
      <PseudoBox _hover={{ transform: 'scale(1.1)' }} />
      {children}
    </Flex>
  );
};
