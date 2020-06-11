import React from 'react';
import { Box, Stack, useTheme } from '@chakra-ui/core';

import { PageHeading, PageSubtitle } from '../components';

const PageHero = ({
  title,
  subtitle,
  heroImageUrl,
  hasFadedHeroImage,
  height,
}) => {
  const theme = useTheme();

  const baseHeight = height ? height : '130vh';
  const gradientFade =
    'linear-gradient(180deg,rgba(0,0,0,0.81) 42.26%,rgba(121,121,121,0.58) 69.6%,rgba(213,214,212,0.61) 81.71%,rgba(247,247,242,0.96) 93.19%,#FFFFFF 101%), ';

  return (
    <>
      {heroImageUrl && (
        <Box
          position="absolute"
          zIndex={-9}
          top={0}
          left={0}
          width="100%"
          height={[baseHeight, baseHeight, '100vh']}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="top center"
          backgroundImage={`${
            hasFadedHeroImage ? gradientFade : ''
          } url(${heroImageUrl})`}
        />
      )}
      <Box as="header" position="relative" color={theme.colors['rbb-white']}>
        <Stack
          zIndex={2}
          display="block"
          flexDirection="column"
          alignItems="center"
          padding="70px 24px 1.5rem"
          minHeight="240px"
        >
          <PageHeading>{title}</PageHeading>
          <PageSubtitle>{subtitle}</PageSubtitle>
        </Stack>
      </Box>
    </>
  );
};

export default PageHero;
