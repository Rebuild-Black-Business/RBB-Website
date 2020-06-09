import { Flex, Grid, Heading, useTheme } from '@chakra-ui/core';
import React from 'react';
import ContactCard from '../components/about/ContactCard';
import Content from '../components/about/Content';
import Image from '../components/Image';
import Layout from '../components/Layout';
import { MISSION_MESSAGE, WHO_WE_ARE_MESSAGE } from '../constants/about';

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
        >
          <Image
            publicId="assets/people-protesting-on-street-4552840_gginry"
            cloudName="rebuild-black-business"
            pos="absolute"
            objectFit="cover"
            w="100%"
            h="100%"
            zIndex="-1"
            transforms={{
              gravity: 'auto',
              opacity: '50',
            }}
          />
          <Heading fontFamily={theme.fonts['heading-slab']} size="xl">
            ABOUT
          </Heading>
        </Flex>
        <Flex w="100%" backgroundColor={theme.colors['rbb-white']}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            alignItems="flex-start"
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
              heading="WHO WE ARE"
              message={WHO_WE_ARE_MESSAGE}
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
          >
            CONTACT
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
              title="Business Owner"
              modalTitle="This is a modal!"
              publicId="assets/contact-left"
              blurb="Add your business to our list"
            />
            <ContactCard
              mailtoCard
              title="General Inquiry"
              email="social@rebuildblackbusiness.com"
              blurb="Send us an email and we'll be in touch"
              publicId="assets/contact-middle"
            />
            <ContactCard
              title="Volunteers"
              blurb="Join our group chat in Discord"
              publicId="assets/contact-right"
            />
          </Grid>
        </Flex>
      </Flex>
    </Layout>
  );
}
