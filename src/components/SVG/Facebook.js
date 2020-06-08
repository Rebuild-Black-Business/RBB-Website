import React from 'react';
import { useTheme, Box } from '@chakra-ui/core';
import { IconContainer } from './index';

/**
 * The Facebook icon link
 * @param {string} The external link the icon points to
 */
export function Facebook({ link }) {
  const theme = useTheme();
  return (
    <IconContainer link={link}>
      <Box
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        h="75%"
        w="75%"
        viewBox="0 0 1792 1792"
        aria-labelledby="facebookTitle"
        role="img"
      >
        <title id="facebookTitle">A Facebook Icon SVG</title>
        <path
          fill={theme.footer.iconsFill}
          d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759H734V905H479V609h255V391q0-186 104-288.5T1115 0q147 0 228 12z"
        ></path>
      </Box>
    </IconContainer>
  );
}
