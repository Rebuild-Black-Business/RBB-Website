import React from 'react';
import {
  AspectRatioBox,
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Stack,
  useTheme,
} from '@chakra-ui/core';

const PageHero = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box as="header" display="flex" flexDirection="column" alignItems="center">
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
      <Heading as="h2" size="16pt" width={['100%', '80%']}>
        {subtitle}
      </Heading>
    </Box>
  );
};

export default PageHero;
