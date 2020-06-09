import React from 'react';
import { Flex, Link, useTheme, PseudoBox } from '@chakra-ui/core';

/**
 * Icon container with external link
 * @param {string} The external link the icon points to
 */
export const IconContainer = ({ children, link }) => {
  const theme = useTheme();
  return (
    <Link
      href={link}
      borderRadius="50%"
      backgroundColor={theme.footer.iconsBackground}
      _hover={{ transform: 'scale(1.1)' }}
      _focus={{ transform: 'scale(1.1)' }}
      isExternal
    >
      <Flex
        justify="center"
        align="center"
        p="2"
        h={['50px', '40px']}
        w={['50px', '40px']}
      >
        {children}
      </Flex>
    </Link>
  );
};
