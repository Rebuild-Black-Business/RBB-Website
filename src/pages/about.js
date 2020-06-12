import { Flex, Grid, Heading, List, ListItem, useTheme } from '@chakra-ui/core';
import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import ContactCard from '../components/about/ContactCard';
import Content from '../components/about/Content';
import ErrorBoundary from '../components/ErrorBoundary';
import ExternalLink from '../components/ExternalLink';
import PageHeading from '../components/Headings/PageHeading';
import Image from '../components/Image';
import Layout from '../components/Layout';
import { JustinLogo } from '../components/SVG/JustinLogo';
import {
  FOUNDER_MESSAGE,
  JUSTIN_PERSONAL_SITE,
  MISSION_MESSAGE,
  WHO_WE_ARE_MESSAGE,
} from '../constants/about';

export default function About() {
  const theme = useTheme();
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Flex
          w="100%"
          minH="260px"
          align="center"
          justify="center"
          zIndex="-1"
          backgroundColor="#000"
          color="#FFF"
          position="relative"
        >
          <PageHeading>About</PageHeading>
          <Image
            publicId="assets/people-protesting-on-street-4552840_gginry"
            cloudName="rebuild-black-business"
            pos="absolute"
            left={0}
            top="50%"
            transform="translateY(-50%)"
            objectFit="cover"
            w="100%"
            h="100%"
            zIndex="-1"
            transforms={{
              height: 0.6,
              opacity: '50',
            }}
          />
        </Flex>
        <Flex w="100%" backgroundColor={theme.colors['rbb-white']}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            marginTop={[theme.spacing.base, theme.spacing.base, 0, 0]}
            marginBottom={['1.125rem', '1.125rem', 0, 0]}
            marginLeft={[0, 0, '5%', '15%', '15%', '30%']}
            marginRight={[0, 0, '5%', '20%', '22%', '35%']}
          >
            <Content
              heading="MISSION"
              message={MISSION_MESSAGE}
              marginTop="1.9375rem"
              marginBottom="0"
              dividerMargin="6.313rem"
            />
            <Content
              heading="OUR TEAM"
              message={WHO_WE_ARE_MESSAGE}
              marginTop="3rem"
              marginBottom="1.9375rem"
              dividerMargin="3.9375rem"
            />
            <Content
              heading="OUR FOUNDER'S STORY"
              message={
                <>
                  When I started {''}
                  <ExternalLink variant="cta" href="https://www.renderatl.com/">
                    Render-Atlanta
                  </ExternalLink>{' '}
                  {FOUNDER_MESSAGE}
                  <Flex
                    marginBottom="1rem"
                    marginTop="0.3125rem"
                    justifyContent={[
                      'center',
                      'center',
                      'center',
                      'flex-start',
                    ]}
                  >
                    <JustinLogo link={JUSTIN_PERSONAL_SITE}></JustinLogo>
                  </Flex>
                  <List>
                    <ListItem>
                      <ExternalLink
                        variant="cta"
                        href="https://twitter.com/ThugDebugger"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </ExternalLink>
                    </ListItem>
                    <ListItem>
                      <ExternalLink
                        variant="cta"
                        href="https://www.instagram.com/thugdebugger/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </ExternalLink>
                    </ListItem>
                    <ListItem>
                      <ExternalLink
                        variant="cta"
                        href="https://www.facebook.com/thugdebugger-109112997164763/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Facebook
                      </ExternalLink>
                    </ListItem>
                  </List>
                </>
              }
              marginTop="3rem"
              marginBottom="1.9375rem"
              dividerMargin="3.9375rem"
            />
          </Flex>
        </Flex>

        <Flex
          align="center"
          width="100%"
          minH="500px"
          justify="center"
          direction="column"
          backgroundColor="#DEDEDA"
        >
          <Heading
            as="h2"
            size="xl"
            fontFamily={theme.fonts['heading-slab']}
            paddingTop={['2.5rem', '2.75rem']}
            textTransform="uppercase"
          >
            Contact
          </Heading>
          <Grid
            margin="0 auto"
            maxWidth={theme.containers.main}
            columnGap="24px"
            rowGap="24px"
            templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
            w="100%"
            direction={['column', 'column', 'row', 'row']}
            paddingTop="2rem"
            paddingBottom="2rem"
          >
            <ContactCard
              modalCard
              title="Business Owners"
              publicId="assets/contact-left"
              transforms={{ width: 800, height: 450, crop: 'crop' }}
              blurb="Add your business to our list"
            />
            <ErrorBoundary>
              <StaticQuery
                query={ContactQuery}
                render={data => (
                  <ContactCard
                    mailtoCard
                    title="General Inquiry"
                    email={data.site.siteMetadata.social.contact}
                    blurb="Send us an email and we will be in touch"
                    publicId="assets/contact-middle"
                  />
                )}
              />
            </ErrorBoundary>
            <ContactCard
              title="Volunteers"
              blurb="Join us"
              publicId="assets/contact-right"
            />
          </Grid>
        </Flex>
      </Flex>
    </Layout>
  );
}

const ContactQuery = graphql`
  query AboutContactQuery {
    site {
      siteMetadata {
        social {
          contact
        }
      }
    }
  }
`;
