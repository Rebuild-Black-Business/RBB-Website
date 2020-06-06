import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import BusinessInNeedFeed from '../components/Feeds/BusinessInNeedFeed';

export default function Businesses() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Heading>Businesses</Heading>
        <BusinessInNeedFeed />
      </Flex>
    </Layout>
  );
}
