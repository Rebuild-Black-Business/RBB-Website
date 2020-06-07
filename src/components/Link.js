import React from 'react';
import { Link as ChakraLink } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';

function Link(props) {
  return (
    <ChakraLink as={GatsbyLink} {...props}>
      {props.children}
    </ChakraLink>
  );
}

export default Link;
