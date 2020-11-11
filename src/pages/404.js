import { Flex, List, ListItem, Text, useTheme } from '@chakra-ui/core';
import config from '../config';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Image from '../components/Image';
import Layout from '../components/Layout';
import Link from '../components/Link';
import ExternalLink from '../components/ExternalLink';

export default function NotFound() {
  const theme = useTheme();
  return (
    <Layout>
      <ErrorBoundary>
        <Flex
          alignItems="center"
          justifyContent="center"
          marginTop={['4rem', '4rem', 0, 0]}
          marginBottom={['4rem', '4rem', 0, 0]}
          textAlign={['center', 'center ', 'left ', 'left ']}
          direction={['column', 'column', 'column', 'row']}
        >
          <Flex direction="column" maxW="335px">
            <Text
              as="h1"
              fontFamily={theme.fonts['heading-slab']}
              color={theme.colors['rbb-gray']}
              fontWeight="900"
              fontSize="64px"
              lineHeight="77px"
              textTransform="uppercase"
              marginBottom="0.625rem"
            >
              OUR BAD,
            </Text>
            <Text
              fontFamily={theme.fonts['heading-slab']}
              color={theme.colors['rbb-gray']}
              fontSize="24px"
              lineHeight="30px"
            >
              Something went wrong.
            </Text>
            <Text
              fontFamily={theme.fonts['heading-slab']}
              color={theme.colors['rbb-gray']}
              fontSize="24px"
              lineHeight="30px"
            >
              If this problem continues,{' '}
              <ExternalLink
                variant="cta"
                href={`mailto:${config.siteMetadata.social.bugs}`}
              >
                please let us know.
              </ExternalLink>
            </Text>
            <br />
            <Text
              as="h1"
              fontFamily={theme.fonts['heading-slab']}
              lineHeight="20px"
              fontSize="16px"
              color={theme.colors['rbb-gray']}
            >
              Try these links instead:
            </Text>
            <br />

            <List spacing={3}>
              <ListItem>
                <Link variant="standard" href="/businesses" color="#000">
                  See businesses
                </Link>
              </ListItem>
              <ListItem>
                <Link variant="standard" href="/allies" color="#000">
                  View Allies
                </Link>
              </ListItem>

              <ListItem>
                <ExternalLink
                  variant="standard"
                  href="http://join.rebuildblackbusiness.com/"
                  color="#000"
                >
                  Volunteer with us
                </ExternalLink>
              </ListItem>
              <ListItem>
                <ExternalLink
                  href={`mailto:${config.siteMetadata.social.contact}`}
                  variant="standard"
                  color="#000"
                >
                  Contact us
                </ExternalLink>
              </ListItem>
            </List>
          </Flex>

          <Image
            publicId="/assets/business-services"
            cloudName="rebuild-black-business"
            alt="illustration of professionals standing"
            transforms={{
              height: 0.2,
            }}
          />
        </Flex>
      </ErrorBoundary>
    </Layout>
  );
}
