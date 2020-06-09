import React from 'react';
import PropTypes from 'prop-types';
import { Link as ChakraLink, useTheme } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';

function getLinkStyles(theme, variant) {
  const linkOpacityStates = theme.links[variant].opacity || {};
  return {
    fontFamily: theme.links.font,
    textDecoration: 'underline',
    color: theme.links[variant].color.default,
    opacity: linkOpacityStates.default || 1,
    _hover: {
      color: theme.links[variant].color.hover,
      opacity: linkOpacityStates.hover || 1,
    },
    _focus: {
      color: theme.links[variant].color.focus,
      opacity: linkOpacityStates.focus || 1,
    },
  };
}

function Link(props) {
  const theme = useTheme();

  if (!['standard', 'cta', 'footer'].includes(props.variant))
    throw new Error(`Invalid <Link> variant: "${props.variant}"`);

  const linkStyles = getLinkStyles(theme, props.variant);

  return (
    <ChakraLink as={GatsbyLink} {...linkStyles} {...props}>
      {props.children}
    </ChakraLink>
  );
}

Link.displayName = 'Link';
Link.propTypes = {
  variant: PropTypes.oneOf(['standard', 'cta', 'footer']),
};

export default Link;
