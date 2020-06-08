import React from 'react';
import { Box, Stack } from '@chakra-ui/core';

import { Image, PageHeading, PageSubtitle } from '../components';

const PageHero = ({ title, subtitle }) => {
  return (
    <Box as="header" position="relative">
      <Image
        publicId="assets/business-header"
        cloudName="rebuild-black-business"
        zIndex={-10}
        position="absolute"
        top={0}
        display="block"
        style={{ filter: 'grayscale(100%)' }}
        transforms={{
          gradient_fade: '100,y_-0.1',
        }}
      />
      <Stack
        zIndex={1}
        display="block"
        flexDirection="column"
        alignItems="center"
        padding="76px 0 1.5rem 0"
      >
        <PageHeading>{title}</PageHeading>
        <PageSubtitle>{subtitle}</PageSubtitle>
      </Stack>
    </Box>
  );
};

export default PageHero;
