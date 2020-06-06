import React from 'react';

import { Flex, Heading, Link } from '@chakra-ui/core';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { Link as GatsbyLink } from 'gatsby';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Link as={GatsbyLink} to="/about">
        About
      </Link>
      <Flex direction="column" align="center" justify="center">
        <Heading size="2xl" fontFamily="Arvo">
          Home
        </Heading>
      </Flex>
    </Layout>
  );
};
