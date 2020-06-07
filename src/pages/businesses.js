import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import BusinessFeed from '../components/Feeds/BusinessFeed';
import Pagination from '../components/Pagination/Pagination';

export default function Businesses() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Heading as="h1">Businesses</Heading>
        <Pagination
          onPageChanged={pagination => {
            // @TODO add pagination handler
          }}
          totalRecords={70}
          pageLimit={5}
        />
        <BusinessFeed />
      </Flex>
    </Layout>
  );
}
