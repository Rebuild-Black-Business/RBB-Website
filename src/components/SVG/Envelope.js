import React from 'react';
import { useTheme, Box } from '@chakra-ui/core';
import { IconContainer } from './index';

/**
 * The Envelope icon link
 * @param {string} The external link the icon points to
 */
export function Envelope({ link }) {
  const theme = useTheme();
  return (
    <IconContainer link={link}>
      <Box
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        h="75%"
        w="75%"
        viewBox="0 0 1792 1792"
        aria-labelledby="envelopeTitle"
        role="img"
      >
        <title id="envelopeTitle">An Envelope Icon SVG</title>
        <path
          fill={theme.footer.iconsFill}
          d="M1792 710v794q0 66-47 113t-113 47H160q-66 0-113-47T0 1504V710q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38T639 1015q-91-64-262-182.5T172 690q-62-42-117-115.5T0 438q0-78 41.5-130T160 256h1472q65 0 112.5 47t47.5 113z"
        ></path>
      </Box>
    </IconContainer>
  );
}
