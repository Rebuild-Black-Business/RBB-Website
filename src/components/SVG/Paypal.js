import React from 'react';
import { useTheme, Box } from '@chakra-ui/core';
import { IconContainer } from './index';

/**
 * The Paypal icon link
 * @param {string} The external link the icon points to
 */
export function Paypal({ link }) {
  const theme = useTheme();
  return (
    <IconContainer link={link}>
      <Box
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        h="75%"
        w="75%"
        viewBox="0 0 1792 1792"
        aria-labelledby="paypalTitle"
        role="img"
      >
        <title id="paypalTitle">A Paypal Icon SVG</title>
        <path
          fill={theme.footer.iconsFill}
          d="M1647 646q18 84-4 204-87 444-565 444h-44q-25 0-44 16.5t-24 42.5l-4 19-55 346-2 15q-5 26-24.5 42.5T836 1792H585q-21 0-33-15t-9-36q9-56 26.5-168t26.5-168 27-167.5 27-167.5q5-37 43-37h131q133 2 236-21 175-39 287-144 102-95 155-246 24-70 35-133 1-6 2.5-7.5t3.5-1 6 3.5q79 59 98 162zm-172-282q0 107-46 236-80 233-302 315-113 40-252 42 0 1-90 1l-90-1q-100 0-118 96-2 8-85 530-1 10-12 10H185q-22 0-36.5-16.5T137 1538L369 67q5-29 27.5-48T448 0h598q34 0 97.5 13T1255 45q107 41 163.5 123t56.5 196z"
        ></path>
      </Box>
    </IconContainer>
  );
}

export default Paypal;
