import React from 'react';
import { useTheme, Box } from '@chakra-ui/core';
import { IconContainer } from './index';

/**
 * The Twitter icon link
 * @param {string} The external link the icon points to
 */
export function Twitter({ link }) {
  const theme = useTheme();
  return (
    <IconContainer link={link}>
      <Box
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        h="75%"
        w="75%"
        viewBox="0 0 1792 1792"
        aria-labelledby="twitterTitle"
        role="img"
      >
        <title id="twitterTitle">A Twitter Icon SVG</title>
        <path
          fill={theme.footer.iconsFill}
          d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5T1369.5 1125 1185 1335.5t-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5T285 1033q33 5 61 5 43 0 85-11-112-23-185.5-111.5T172 710v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5T884 653q-8-38-8-74 0-134 94.5-228.5T1199 256q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"
        ></path>
      </Box>
    </IconContainer>
  );
}
