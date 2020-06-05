import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { Link as GatsbyLink } from 'gatsby';
import Image from '../components/Image';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Link as={GatsbyLink} to="/about">About</Link>
      <Flex align="center" justify="center">
        <Heading size="2xl" fontFamily="Arvo">
          Home
        </Heading>

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
  );
};
