import React from 'react';

import { Heading, useTheme } from '@chakra-ui/core';

const PageSubtitle = ({ children, ...rest }) => {
  const theme = useTheme();
  return (
    <Heading
      as="h2"
      fontSize={theme.fontSizes.lg}
      maxWidth="960px"
      fontWeight="regular"
      {...rest}
    >
      {children}
    </Heading>
  );
};

export default PageSubtitle;
