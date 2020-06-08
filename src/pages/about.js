import { Flex, Heading } from '@chakra-ui/core';
import React from 'react';
import ContactCard from '../components/about/ContactCard';
import Content from '../components/about/Content';
import Image from '../components/Image';
import Layout from '../components/Layout';
import { MISSION_MESSAGE, WHO_WE_ARE_MESSAGE } from '../constants/about';

export default function About() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Flex
          w="100%"
          minH="260px"
          backgroundColor="#000"
          align="center"
          justify="center"
          color="#FFF"
          zIndex="-1"
        >
          <Image
            publicId="assets/people-protesting-on-street-4552840_gginry"
            cloudName="rebuild-black-business"
            zIndex="-1"
            minW="1000px"
            position="absolute"
          />
          <Heading>ABOUT</Heading>
        </Flex>
        <Flex w="100%" backgroundColor="#F7F7F2">
          <Flex
            direction="column"
            align="center"
            justify="center"
            marginTop={['16px', '16px', '0', '0']}
            marginBottom={['18px', '18px', '0', '0']}
            marginLeft={['0', '0', '5%', '15%', '15%', '30%']}
            marginRight={['0', '0', '5%', '20%', '22%', '35%']}
          >
            <Content
              heading="MISSION"
              message={MISSION_MESSAGE}
              marginTop="31px"
              marginBottom="0"
              dividerMargin="101px"
            />
            <Content
              heading="WHO WE ARE"
              message={WHO_WE_ARE_MESSAGE}
              marginTop="48px"
              marginBottom="31px"
              dividerMargin="63px"
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
          <Heading as="h2" size="xl" paddingTop={['40px', '44px']}>
            CONTACT
          </Heading>
          <Flex
            w="100%"
            direction={['column', 'column', 'row', 'row']}
            paddingTop="32px"
            paddingBottom="32px"
          >
            <ContactCard
              modalCard
              title="Business Owner"
              modalTitle="This is a modal!"
              blurb="Add your business to our list"
              imageUrl="https://source.unsplash.com/daily"
              imageAlt="Random image from unsplash"
            />
            <ContactCard
              mailtoCard
              title="General Inquiry"
              email="test@test.com"
              blurb="Send us an email and we'll be in touch"
              imageUrl="https://source.unsplash.com/daily"
              imageAlt="Random image from unsplash"
            />
            <ContactCard
              title="Volunteers"
              blurb="Join our group chat in Discord"
              imageUrl="https://source.unsplash.com/daily"
              imageAlt="Random image from unsplash"
            />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
