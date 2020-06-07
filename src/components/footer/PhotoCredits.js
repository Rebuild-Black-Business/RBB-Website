import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import ErrorBoundary from './../ErrorBoundary';
import { Flex, useTheme, Text } from '@chakra-ui/core';
import { useLocation } from '@reach/router';

const CreditLink = () => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <ErrorBoundary>
      <StaticQuery
        query={PhotoCreditsLinks}
        render={data => {
          return (
            <Flex justify="center">
              {data.site.siteMetadata.photoCreditLinks.map(link => {
                // We check the current pages pathname against the credits pathname to render the correct photographers for each page
                if (link.pagePathname === location.pathname) {
                  return (
                    <Text
                      fontSize="12px"
                      textDecoration="underline"
                      fontFamily={theme.fonts.heading}
                      opacity={0.7}
                      ml="1"
                      mr="1"
                      color={theme.footer.photoCreditLink}
                      as="a"
                      href={link.url}
                      isExternal
                    >
                      {link.photographer}
                    </Text>
                  );
                }
              })}
            </Flex>
          );
        }}
      />
    </ErrorBoundary>
  );
};

const PhotoCredit = () => {
  const theme = useTheme();
  return (
    <Flex w="80%" textAlign="center" direction={['column', 'row']}>
      <Text
        fontSize="12px"
        fontFamily={theme.fonts.heading}
        color={theme.footer.text}
        opacity={0.5}
      >
        Photography credits:
      </Text>
      <CreditLink />
    </Flex>
  );
};

export default PhotoCredit;

const PhotoCreditsLinks = graphql`
  query PhotoCreditsLinksQuery {
    site {
      siteMetadata {
        photoCreditLinks {
          photographer
          url
          pagePathname
        }
      }
    }
  }
`;
