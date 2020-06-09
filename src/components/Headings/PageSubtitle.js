import React from 'react';

import { Heading } from '@chakra-ui/core';

const PageSubtitle = ({ children, ...rest }) => {
  return (
    <Heading as="h2" size="16pt" maxWidth="960px" {...rest}>
      {children}
    </Heading>
  );
};

export default PageSubtitle;
