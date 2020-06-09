import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import ErrorBoundary from './../ErrorBoundary';
import { Flex, useTheme, Text } from '@chakra-ui/core';
import { useLocation } from '@reach/router';
import Link from '../Link';

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
              {data.site.siteMetadata.photoCreditLinks
                .filter(link => link.pagePathname === location.pathname) // We check the current pages pathname against the credits pathname to render the correct photographers for each page
                .map((link, index) => {
                  return (
                    <Link
                      variant="footer"
                      to={link.url}
                      fontSize="12px"
                      fontWeight="bold"
                      ml="1"
                      mr="1"
                      color={theme.footer.photoCreditLink}
                      isExternal
                      key={index}
                    >
                      {link.photographer}
                    </Link>
                  );
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
    <Flex w="100%" justify="center" align="center" pb="3">
      <Flex
        textAlign="center"
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
        <CreditLink />
      </Flex>
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
