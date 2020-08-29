import React from 'react';
import PropTypes from 'prop-types';
import { Link as ChakraLink, useTheme } from '@chakra-ui/core';

import { getLinkStyles } from './Link';

function ExternalLink(props) {
  const theme = useTheme();

  if (!['standard', 'cta', 'ctaBlackBg', 'footer'].includes(props.variant))
    throw new Error(`Invalid <Link> variant: "${props.variant}"`);

  const linkStyles = getLinkStyles(theme, props.variant);

  return (
    <ChakraLink {...linkStyles} {...props}>
      {props.children}
    </ChakraLink>
  );
}

ExternalLink.displayName = 'Link';
ExternalLink.propTypes = {
  variant: PropTypes.oneOf(['standard', 'cta', 'ctaBlackBg', 'footer']),
};

export default ExternalLink;
