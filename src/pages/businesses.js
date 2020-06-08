import React from 'react';

import { Flex, Heading, useTheme, Text, Box } from '@chakra-ui/core';
import Layout from '../components/Layout';
import BusinessFeed from '../components/Feeds/BusinessFeed';
import Pagination from '../components/Pagination/Pagination';

export default function Businesses() {
  const theme = useTheme();

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Box maxW="859px">
          <Heading
            as="h1"
            fontFamily={theme.fonts['heading-slab']}
            fontSize="3xl"
            paddingTop="59px"
            textAlign="center"
            textTransform="uppercase"
          >
            Businesses
          </Heading>
          <Text paddingBottom="59px">
            These business owners have been impacted during the protests. Your
            support will assist their rebuilding efforts. If you are a business
            owner in need, please sign up to be added to our list
          </Text>
        </Box>
        <BusinessFeed />

        <Pagination
          onPageChanged={pagination => {
            // @TODO add pagination handler
          }}
          totalRecords={70}
          pageLimit={5}
        />
      </Flex>
    </Layout>
  );
}
