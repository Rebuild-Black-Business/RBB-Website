import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import BusinessFeed from '../components/Feeds/BusinessFeed';

export default function Businesses() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Heading>Businesses</Heading>
        <BusinessFeed />
      </Flex>
    </Layout>
  );
}
