import React from 'react';

import { Heading, useTheme } from '@chakra-ui/core';

const PageHeading = ({ children, ...rest }) => {
  const theme = useTheme();

  return (
    <Heading
      textAlign="center"
      as="h1"
      size="2xl"
      textTransform="uppercase"
      fontFamily={theme.fonts['heading-slab']}
      fontWeight={theme.fontWeights.bold}
      {...rest}
    >
      {children}
    </Heading>
  );
};

export default PageHeading;
