import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import ResourceFeed from '../components/Feeds/ResourceFeed';

export default function Resources() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Heading>Resources</Heading>
        <ResourceFeed />
      </Flex>
    </Layout>
  );
}
