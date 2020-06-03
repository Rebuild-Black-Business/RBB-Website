import React from 'react';

import {
  Flex, Link, Heading
} from '@chakra-ui/core';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { Link as GatsbyLink } from 'gatsby';

export default () => {
  return (
    <Layout>
      <Helmet><title>Home</title></Helmet>
      <Link as={GatsbyLink} to="/about">About</Link>
      <Flex align="center" justify="center">
        <Heading>Home</Heading>
      </Flex>
    </Layout>
  )
}