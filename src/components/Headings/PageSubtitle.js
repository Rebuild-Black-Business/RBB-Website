import React from 'react';

import { Heading, useTheme } from '@chakra-ui/core';

const PageHeading = ({ children, ...rest }) => {
  const theme = useTheme();

  return (
    <Heading as="h2" size="16pt" maxWidth="960px" {...rest}>
      {children}
    </Heading>
  );
};

export default PageHeading;
