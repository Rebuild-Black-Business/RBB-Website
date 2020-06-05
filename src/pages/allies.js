import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import AllyFeed from '../components/Feeds/AllyFeed';

export default function Allies() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Heading>Allies</Heading>
        <AllyFeed />
      </Flex>
    </Layout>
  );
}
