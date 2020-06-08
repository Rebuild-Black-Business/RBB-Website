import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import AllyFeed from '../components/Feeds/AllyFeed';
import Pagination from '../components/Pagination/Pagination';

export default function Allies() {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Heading as="h1">Allies</Heading>
        <Pagination
          onPageChanged={pagination => {
            // @TODO add pagination handler
          }}
          totalRecords={70}
          pageLimit={5}
        />
        <AllyFeed />
      </Flex>
    </Layout>
  );
}
