import React from 'react';
import { Link as ChakraLink, useTheme } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';

function Link(props) {
  const theme = useTheme();
  const isCallToAction = props.isCallToAction ? true : false;

  return (
    <ChakraLink
      as={GatsbyLink}
      {...props}
      fontFamily={theme.links.font}
      textDecoration="underline"
      color={
        isCallToAction
          ? theme.links.cta.color.default
          : theme.links.standard.color.default
      }
      _hover={{
        color: isCallToAction
          ? theme.links.cta.color.hover
          : theme.links.standard.color.hover,
      }}
      _focus={{
        color: isCallToAction
          ? theme.links.cta.color.focus
          : theme.links.standard.color.focus,
      }}
    >
      {props.children}
    </ChakraLink>
  );
}

export default Link;
