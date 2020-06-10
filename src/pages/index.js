import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  Link,
  useTheme,
} from '@chakra-ui/core';
import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Button from '../components/Button';
import ContentBlock from '../components/ContentBlock';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';

export default () => {
  const theme = useTheme();
  return (
    <Layout>
      <Flex direction="column" align="center" justify="center">
        <ContentBlock
          layout="left"
          imageSource="assets/home-header-bg" // @TODO :: Pass this to cloudinary
          backgroundColor="#000"
          backgroundMode="fade"
        >
          <Box pt={16} pb={[72, 72, 145]} color="white">
            <Heading mb={theme.spacing.lg}>
              <Text
                lineHeight="0.5"
                fontWeight="900"
                fontSize={['50px', '50px', '50px', '72px']}
                fontFamily={theme.fonts['heading-slab']}
                textTransform="uppercase"
              >
                Rebuild
              </Text>
              <Text
                fontSize={['100px', '100px', '100px', '150px']}
                fontWeight="900"
                lineHeight="1"
                fontFamily={theme.fonts['heading-slab']}
                textTransform="uppercase"
              >
                Black
              </Text>
              <Text
                lineHeight="0.5"
                fontWeight="900"
                fontSize={['50px', '50px', '50px', '72px']}
                fontFamily={theme.fonts['heading-slab']}
                textTransform="uppercase"
              >
                Businesses
              </Text>
            </Heading>
            <Text
              fontSize={theme.fontSizes.lg}
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              py={8}
              maxW="540px"
            >
              Black-Owned businesses need <strong>us</strong>. In a time of
              social unrest and economic uncertainty, we are called to Action!
              Let’s Do our Part.
            </Text>
            <ButtonGroup spacing={4} mt={theme.spacing.base}>
              <Button variant="cta" m={3} h="auto" px="30px">
                I need help
              </Button>
              <Button
                as={Link}
                href="/allies"
                variant="primary"
                style={{ textDecoration: 'none' }}
                m={3}
                h="auto"
                px="30px"
              >
                I can help
              </Button>
            </ButtonGroup>
          </Box>
        </ContentBlock>

        <ContentBlock
          layout="right"
          imageSource="assets/cta1-bg" // @TODO :: Pass this to cloudinary
          backgroundColor="#fff"
          backgroundMode="fade"
          backgroundOpacity="0.85"
        >
          <Box py={[72, 72, 190]} color={theme.colors['rbb-black-100']}>
            <Heading
              mb={theme.spacing.lg}
              fontFamily={theme.fonts['heading-slab']}
              fontWeight="900"
              fontSize="40px"
              lineHeight="1.2"
              textTransform="uppercase"
            >
              Business Owners,
              <br />
              We’re here for you.
            </Heading>
            <Box fontSize={theme.fontSizes.lg} maxW="540px">
              <Text
                fontFamily={theme.fonts.heading}
                lineHeight="1.25"
                pb={theme.spacing.base}
              >
                We want to restore wealth to black communities by supporting you
                and your business. Whether your business is doing well or you
                have an urgent need, we're here to help.
              </Text>
              <Text fontFamily={theme.fonts.heading} lineHeight="1.25">
                You can add your business to our online directory of black-owned
                businesses. You can also contact one of our registered Allies
                directly for help. <strong>We are all in this together.</strong>
              </Text>
            </Box>
            <ButtonGroup spacing={4} mt={theme.spacing.base}>
              <Button variant="primary" maxW="230px;" m={3} h="auto" px="30px">
                Add Business
              </Button>
              <Button variant="secondary" m={3} h="auto" px="30px">
                See Allies
              </Button>
            </ButtonGroup>
          </Box>
        </ContentBlock>

        <ContentBlock
          layout="left"
          imageSource="assets/cta2-bg" // @TODO :: Pass this to cloudinary
          backgroundColor="#000"
          backgroundMode="fade"
        >
          <Box py={[72, 72, 190]} color={theme.colors['rbb-white']}>
            <Heading
              mb={theme.spacing.lg}
              fontFamily={theme.fonts['heading-slab']}
              fontWeight="900"
              fontSize="40px"
              lineHeight="1.2"
              textTransform="uppercase"
            >
              How to help
            </Heading>
            <Box fontSize={theme.fontSizes.lg} maxW="540px">
              <Text
                fontFamily={theme.fonts.heading}
                lineHeight="1.25"
                pb={theme.spacing.base}
              >
                Click for our growing list of Black-owned businesses across the
                nation! You can search for black-owned businesses in your area,
                as well as register any business that is missing from our list.
              </Text>
              <Text fontFamily={theme.fonts.heading} lineHeight="1.25">
                If you have specific skills you'd like to offer, you can
                register as an Ally.
              </Text>
            </Box>
            <ButtonGroup spacing={4} mt={theme.spacing.base}>
              <Button variant="primary" maxW="230px" m={3} h="auto" px="30px">
                Add Business
              </Button>
              <Button variant="secondary" m={3} h="auto" px="30px">
                See Allies
              </Button>
            </ButtonGroup>
          </Box>
        </ContentBlock>

        <ContentBlock
          layout="full"
          imageSource="assets/cta3-bg"
          backgroundColor={theme.colors['rbb-white']}
        >
          <Box py={[140, 140, 200]} maxW="574px">
            <Text
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              pb={theme.spacing.base}
            >
              Join our group of over 250 volunteers. We’re developers,
              designers, marketers, project managers, policy makers, and web
              professionals. Welcome!
            </Text>
            <ErrorBoundary>
              <StaticQuery
                query={ContactQuery}
                render={data => (
                  <Button
                    variant="cta"
                    w="100%"
                    as="a"
                    href={`mailto:${data.site.siteMetadata.social.contact}`}
                  >
                    Contact Us
                  </Button>
                )}
              />
            </ErrorBoundary>
          </Box>
        </ContentBlock>
      </Flex>
    </Layout>
  );
};

const ContactQuery = graphql`
  query HomeContactQuery {
    site {
      siteMetadata {
        social {
          contact
        }
      }
    }
  }
`;
