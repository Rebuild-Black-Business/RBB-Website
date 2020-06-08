import { Flex, Heading } from '@chakra-ui/core';
import React from 'react';
import ContactCard from '../components/about/ContactCard';
import Content from '../components/about/Content';
import Layout from '../components/Layout';
import { MISSION_MESSAGE, WHO_WE_ARE_MESSAGE } from '../constants/about';

export default function About() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Flex
          w="100%"
          minH="200px"
          backgroundColor="#000"
          align="center"
          justify="center"
          color="#FFF"
          backgroundImage="url('https://source.unsplash.com/daily')"
        >
          <Heading>ABOUT</Heading>
        </Flex>
        <Flex
          w="100%"
          h={['605px', '605px', '405px', '377px', '377px']}
          backgroundColor="#F7F7F2"
        >
          <Flex
            direction="column"
            align="center"
            justify="center"
            marginTop={['21px', '21px', '0', '0']}
            marginBottom={['21px', '21px', '0', '0']}
            marginLeft={['0', '0', '5%', '15%', '15%', '30%']}
            marginRight={['0', '0', '5%', '20%', '20%', '35%']}
          >
            <Content heading="MISSION" message={MISSION_MESSAGE} />
            <Content
              heading="WHO WE ARE"
              message={WHO_WE_ARE_MESSAGE}
              margin="3em"
            />
          </Flex>
        </Flex>

        <Flex
          align="center"
          width="100%"
          minH="500px"
          maxH="500px"
          justify="center"
          direction="column"
          backgroundColor="#DEDEDA"
        >
          <Heading>CONTACT</Heading>
          <Flex w="1240px" margin="3em" justify="space-evenly">
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
