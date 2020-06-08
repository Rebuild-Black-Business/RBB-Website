import React from 'react';
import { Heading, Stack, useTheme } from '@chakra-ui/core';

const PageHero = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Stack
      as="header"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="1.5rem 0"
    >
      <Heading
        as="h1"
        size="2xl"
        textTransform="uppercase"
        fontFamily={theme.fonts['heading-slab']}
        fontWeight={theme.fontWeights.bold}
      >
        {title}
      </Heading>
      <Heading as="h2" size="16pt" width={['100%', '80%']}>
        {subtitle}
      </Heading>
    </Stack>
  );
};

export default PageHero;
