import React from 'react';
import { Flex, Text, useTheme } from '@chakra-ui/core';

import ExternalLink from '../ExternalLink';

/*
  Shout out to netlify for free build minutes for the OSS project.  More context here: 
  https://www.netlify.com/legal/open-source-policy/
*/
const NetlifyThanks = () => {
  const theme = useTheme();
  return (
    <Flex w="full" justify="center" align="center" mb={4}>
      <Flex
        w={['80%', '80%', '80%', 'full']}
        justify="center"
        textAlign="center"
      >
        <Text
          fontSize="12px"
          fontFamily={theme.fonts.heading}
          color={theme.colors['rbb-white']}
          opacity={0.5}
        >
          This site is powered by
        </Text>
        <ExternalLink
          fontSize="12px"
          fontWeight="bold"
          ml="1"
          mr="1"
          color={theme.footer.photoCreditLink}
          isExternal
          variant="footer"
          href="https://netlify.com"
        >
          Netlify
        </ExternalLink>
      </Flex>
    </Flex>
  );
};

export default NetlifyThanks;
