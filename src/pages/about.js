import { Divider, Flex, Heading } from '@chakra-ui/core';
import React from 'react';
import ContactCard from '../components/about/ContactCard';
import Layout from '../components/Layout';
import { MISSION_STRING, WHO_WE_ARE_STRING } from '../constants/about';

export default function About() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Flex
          w="100%"
          h="250px"
          backgroundColor="#000"
          align="center"
          justify="center"
          color="#FFF"
          backgroundImage="url('https://source.unsplash.com/daily')"
        >
          <Heading>ABOUT</Heading>
        </Flex>
        <Flex w="100%" backgroundColor="#F7F7F2" h="250px">
          <Flex direction="column" align="center" justify="center">
            <Flex direction="row">
              <Heading
                display="inline-block"
                lineHeight="1"
                verticalAlign="top"
              >
                MISSION
              </Heading>
              <Divider
                marginLeft="25px"
                marginRight="25px"
                border="1px solid"
                borderColor="#BA2A2A"
                orientation="vertical"
              />
              <p style={{ whiteSpace: 'pre-wrap' }}> {MISSION_STRING} </p>
            </Flex>

            <Flex direction="row" marginTop="4em">
              <Heading
                display="inline-block"
                lineHeight="1"
                verticalAlign="top"
              >
                WHO WE ARE
              </Heading>
              <Divider
                marginLeft="25px"
                marginRight="25px"
                border="1px solid"
                borderColor="#BA2A2A"
                orientation="vertical"
              />
              <p> {WHO_WE_ARE_STRING} </p>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          align="center"
          width="100%"
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
