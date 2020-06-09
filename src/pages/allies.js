import React, { useState } from 'react';

import { Flex, Heading, useTheme, Text, Box } from '@chakra-ui/core';
import Layout from '../components/Layout';
import AllyFeed from '../components/Feeds/AllyFeed';
import Pagination from '../components/Pagination/Pagination';
import AllyFilter from '../components/Filters/AllyFilter';

export default function Allies() {
  const theme = useTheme();
  const [allyFilters, setAllyFilters] = useState({
    skill: '',
    location: '',
  });

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
            Allies
          </Heading>
          <Text paddingBottom="59px">
            These Allies have skills to share in assisting black-owned
            businesses to return to business, and stay afloat while operating.
            Reach out to those on this page if you know of a way to join the
            fight in helping businesses survive and thrive.
          </Text>
        </Box>
        <AllyFilter onSearch={setAllyFilters} />
        <AllyFeed filters={allyFilters} />
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
