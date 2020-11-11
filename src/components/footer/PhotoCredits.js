import React from 'react';
import { useRouter } from 'next/router';
import config from '../../config';
import ErrorBoundary from './../ErrorBoundary';
import { Flex, useTheme, Text } from '@chakra-ui/core';
import ExternalLink from '../ExternalLink';

const CreditLink = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ErrorBoundary>
      {
        // We check the current pages pathname against the credits pathname to render the correct photographers for each page
        config.siteMetadata.photoCreditLinks
          .filter(link => link.pagePathname === router.pathname)
          .map((link, index) => {
            return (
              <Flex
                justify="center"
                direction={['column', 'column', 'column', 'row']}
              >
                <Text
                  fontSize="12px"
                  fontFamily={theme.fonts.heading}
                  color={theme.colors['rbb-white']}
                  opacity={0.5}
                >
                  Photography credits:
                </Text>
                <ExternalLink
                  variant="footer"
                  href={link.url}
                  fontSize="12px"
                  fontWeight="bold"
                  ml="1"
                  mr="1"
                  color={theme.footer.photoCreditLink}
                  isExternal
                  key={index}
                >
                  {link.photographer}
                </ExternalLink>
              </Flex>
            );
          })
      }
    </ErrorBoundary>
  );
};

const PhotoCredit = () => {
  return (
    <Flex w="100%" justify="center" align="center" pb="3">
      <Flex
        textAlign="center"
        direction={['column', 'column', 'column', 'row']}
      >
        <CreditLink />
      </Flex>
    </Flex>
  );
};

export default PhotoCredit;
