import React from 'react';

import {
  Flex, Link, Heading
} from '@chakra-ui/core';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { Link as GatsbyLink } from 'gatsby';
import Image from '../components/Image';

export default () => {
  return (
    <Layout>
      <Helmet><title>Home</title></Helmet>
      <Link as={GatsbyLink} to="/about">About</Link>
      <Flex direction="column" align="center" justify="center">
        <Heading>Home</Heading>

        <Image
          cloudName="testing-hooks-upload"
          publicId="test toasts"
          mt={10}
          transforms={{
            height: 0.3,
            fetchFormat: "auto",
            quality: "auto"
          }}
        />
      </Flex>
    </Layout>
  )
}