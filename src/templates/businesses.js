import React from 'react';

import { graphql, navigate } from 'gatsby';
import { Flex, Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import BusinessFeed from '../components/Feeds/BusinessFeed';
import Pagination from '../components/Pagination/Pagination';

export default function Businesses(data) {
  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Heading as="h1">Businesses</Heading>
        <Pagination
          onPageChanged={pagination =>
            navigate(
              `/businesses/${
                pagination.currentPage === 1 ? '' : `${pagination.currentPage}/`
              }`
            )
          }
          currentPage={data.pageContext.page}
          totalRecords={data.pageContext.totalRecords}
          pageLimit={data.pageContext.itemsPerPage}
        />
        <BusinessFeed {...data} />
      </Flex>
    </Layout>
  );
}

export const query = graphql`
  query($itemsPerPage: Int!, $skip: Int!) {
    allAirtableBusinesses(limit: $itemsPerPage, skip: $skip) {
      nodes {
        data {
          Email
          Name
          Business_Name
          Category
          Zip_Code
          Business_Description
          Website
          Donation_Link
          In_Need
          CreatedAt
        }
      }
    }
  }
`;
