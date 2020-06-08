import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';

export default () => {
  return (
    <Layout>
      <Flex direction="column" align="center" justify="center">
        <Heading as="h1" size="2xl" fontFamily="Arvo">
          Home
        </Heading>
      </Flex>
    </Layout>
  );
};
