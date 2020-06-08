import React from 'react';
import { Box, Stack, useTheme } from '@chakra-ui/core';

import { Image, PageHeading, PageSubtitle } from '../components';

const PageHero = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box as="header" position="relative" color={theme.colors['rbb-white']}>
      <Image
        publicId="assets/business-header"
        cloudName="rebuild-black-business"
        zIndex={-10}
        position="absolute"
        top={0}
        display="block"
        style={{ filter: 'grayscale(100%)' }}
        transforms={{
          transformation: [
            { effect: 'gradient_fade:100,y_-0.4', gravity: 'north' },
            {
              effect: 'gradient_fade:10,y_0.4',
              gravity: 'south',
              background: 'rgb:000000',
            },
          ],
        }}
      />
      <Stack
        zIndex={1}
        display="block"
        flexDirection="column"
        alignItems="center"
        padding="76px 24px 1.5rem"
      >
        <PageHeading>{title}</PageHeading>
        <PageSubtitle>{subtitle}</PageSubtitle>
      </Stack>
    </Box>
  );
};

export default PageHero;
