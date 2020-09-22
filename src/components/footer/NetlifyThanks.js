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
          <ExternalLink variant="footer" isExternal href="https://netlify.com">
            Netlify
          </ExternalLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default NetlifyThanks;
