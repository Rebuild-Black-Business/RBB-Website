import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import BlackOwnedBusinessFeed from '../components/Feeds/BlackOwnedBusinessFeed';

export default function BlackOwnedBusinesses() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Heading>Black Owned Businesses</Heading>
        <BlackOwnedBusinessFeed />
      </Flex>
    </Layout>
  );
}
