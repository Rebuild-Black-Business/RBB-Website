import React from 'react';
import { Link as ChakraLink, useTheme } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';

function Link(props) {
  const theme = useTheme();
  const isBizOrAlly = props.isBizOrAlly ? true : false;

  return (
    <ChakraLink
      as={GatsbyLink}
      {...props}
      fontFamily={theme.links.font}
      textDecoration="underline"
      color={
        isBizOrAlly
          ? theme.links.bizOrAlly.color.default
          : theme.links.default.color.default
      }
      _hover={{
        color: isBizOrAlly
          ? theme.links.bizOrAlly.color.hover
          : theme.links.default.color.hover,
      }}
      _focus={{
        color: isBizOrAlly
          ? theme.links.bizOrAlly.color.focus
          : theme.links.default.color.focus,
      }}
      _visited={{
        color: isBizOrAlly
          ? theme.links.bizOrAlly.color.visited
          : theme.links.default.color.visited,
      }}
    >
      {props.children}
    </ChakraLink>
  );
}

export default Link;
