import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Home</title>
        <html lang="en" />
      </Helmet>
      <Flex align="center" justify="center">
        <Heading size="2xl" fontFamily="Arvo">
          Home
        </Heading>
      </Flex>
    </Layout>
  );
};
