import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import ContactCard from '../components/about/ContactCard';

export default function About() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Heading>About</Heading>
        <Flex
          w="100%"
          // margin="3em"
          justify="space-evenly"
          direction={['column', 'column', 'row', 'row']}
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
    </Layout>
  );
}
