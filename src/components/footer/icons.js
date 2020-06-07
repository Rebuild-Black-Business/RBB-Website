import React from 'react';
import { Box, Link, useTheme } from '@chakra-ui/core';
import footerStyles from './Footer.module.css';

/**
 * Icon container with external link
 * @param {string} The external link the icon points to
 */
const IconContainer = ({ children, link }) => {
  const theme = useTheme();
  return (
    <Box
      className={footerStyles.icon}
      as={Link}
      href={link}
      isExternal
      maxH="50px"
      maxW="50px"
      borderRadius="50%"
      p="3"
      backgroundColor={theme.footer.iconsBackground}
    >
      {children}
    </Box>
  );
};

/**
 * The Twitter icon link
 * @param {string} The external link the icon points to
 */
export function Twitter({ link }) {
  const theme = useTheme();
  return (
    <IconContainer link={link}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 1792 1792"
        aria-labelledby="twitterTitle"
        role="img"
      >
        <title id="twitterTitle">A Twitter Icon SVG</title>
        <path
          fill={theme.footer.iconsFill}
          d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5T1369.5 1125 1185 1335.5t-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5T285 1033q33 5 61 5 43 0 85-11-112-23-185.5-111.5T172 710v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5T884 653q-8-38-8-74 0-134 94.5-228.5T1199 256q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"
        ></path>
      </svg>
    </IconContainer>
  );
}

/**
 * The Instagram icon link
 * @param {string} The external link the icon points to
 */
export function Instagram({ link }) {
  const theme = useTheme();
  return (
    <IconContainer link={link}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 1792 1792"
        aria-labelledby="instagramTitle"
        role="img"
      >
        <title id="instagramTitle">A Instagram Icon SVG</title>
        <path
          fill={theme.footer.iconsFill}
          d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm138 0q0 164-115 279t-279 115-279-115-115-279 115-279 279-115 279 115 115 279zm108-410q0 38-27 65t-65 27-65-27-27-65 27-65 65-27 65 27 27 65zM896 266q-7 0-76.5-.5t-105.5 0-96.5 3-103 10T443 297q-50 20-88 58t-58 88q-11 29-18.5 71.5t-10 103-3 96.5 0 105.5.5 76.5-.5 76.5 0 105.5 3 96.5 10 103T297 1349q20 50 58 88t88 58q29 11 71.5 18.5t103 10 96.5 3 105.5 0 76.5-.5 76.5.5 105.5 0 96.5-3 103-10 71.5-18.5q50-20 88-58t58-88q11-29 18.5-71.5t10-103 3-96.5 0-105.5-.5-76.5.5-76.5 0-105.5-3-96.5-10-103T1495 443q-20-50-58-88t-88-58q-29-11-71.5-18.5t-103-10-96.5-3-105.5 0-76.5.5zm768 630q0 229-5 317-10 208-124 322t-322 124q-88 5-317 5t-317-5q-208-10-322-124t-124-322q-5-88-5-317t5-317q10-208 124-322t322-124q88-5 317-5t317 5q208 10 322 124t124 322q5 88 5 317z"
        ></path>
      </svg>
    </IconContainer>
  );
}

/**
 * The Facebook icon link
 * @param {string} The external link the icon points to
 */
export function Facebook({ link }) {
  const theme = useTheme();
  return (
    <IconContainer link={link}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 1792 1792"
        aria-labelledby="facebookTitle"
        role="img"
      >
        <title id="facebookTitle">A Facebook Icon SVG</title>
        <path
          fill={theme.footer.iconsFill}
          d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759H734V905H479V609h255V391q0-186 104-288.5T1115 0q147 0 228 12z"
        ></path>
      </svg>
    </IconContainer>
  );
}

/**
 * The Envelope icon link
 * @param {string} The external link the icon points to
 */
export function Envelope({ link }) {
  const theme = useTheme();
  return (
    <IconContainer link={link}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 1792 1792"
        aria-labelledby="envelopeTitle"
        role="img"
      >
        <title id="envelopeTitle">An Envelope Icon SVG</title>
        <path
          fill={theme.footer.iconsFill}
          d="M1792 710v794q0 66-47 113t-113 47H160q-66 0-113-47T0 1504V710q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38T639 1015q-91-64-262-182.5T172 690q-62-42-117-115.5T0 438q0-78 41.5-130T160 256h1472q65 0 112.5 47t47.5 113z"
        ></path>
      </svg>
    </IconContainer>
  );
}
