import React from 'react';

import { graphql, navigate } from 'gatsby';
import { Flex } from '@chakra-ui/core';

import { PageHero, Layout, BusinessFeed, Pagination } from '../components';

export default function Businesses(data) {
  const pageSubtitle = (
    <p>
      These business owners have been impacted during the protests. Your support
      will assist their rebuilding efforts. If you are a business owner in need,
      please <a href="#temp">sign up to be added to our list</a>
    </p>
  );

  const heroBackgroundImageUrl =
    'http://res.cloudinary.com/rebuild-black-business/image/upload/f_auto/v1/assets/business-header';

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Businesses"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />
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
