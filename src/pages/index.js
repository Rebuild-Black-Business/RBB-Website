import React from 'react';

import { Flex, Heading, Link } from '@chakra-ui/core';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { Link as GatsbyLink } from 'gatsby';
import Image from '../components/Image';
import Search from '../components/Search';

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

        <Image
          cloudName="rebuild-black-business"
          publicId="samples/animals/three-dogs"
          mt={10}
          transforms={{
            height: 0.3,
            fetchFormat: 'auto',
            quality: 'auto',
          }}
        />

        <Search />
      </Flex>
    </Layout>
  );
};
