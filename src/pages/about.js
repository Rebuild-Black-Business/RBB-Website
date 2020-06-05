import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <Flex align="center" justify="center">
        <Heading>About</Heading>
      </Flex>
    </Layout>
  );
}
