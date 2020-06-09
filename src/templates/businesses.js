import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';

import { graphql } from 'gatsby';
import { Flex } from '@chakra-ui/core';
import { PageHero, Layout, BusinessFeed, Pagination } from '../components';
import CardSkeleton from '../components/Loading/CardSkeleton';

const client = algoliasearch('LRWZTMM362', 'b1556413e51961cacf7dbb37f22f4094');
const index = client.initIndex('businesses');

const LOADING_STATE = {
  NONE: 'none',
  INITIAL: 'intial',
  SEARCHING: 'searching',
};

function useAlgoliaSearch() {
  const [results, setResults] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATE.INITIAL);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function getBusinesses() {
      try {
        const algoliaResponse = await index.search('', {
          page: 1,
        });

        setResults(algoliaResponse.hits);
        setTotalPages(algoliaResponse.nbPages);
        setTotalResults(algoliaResponse.nbHits);
        setCurrentPage(algoliaResponse.page);
        setLoadingState(LOADING_STATE.NONE);
      } catch (e) {
        console.log('error searching', e);
      }
    }

    getBusinesses();
  }, []);

  return {
    results,
    totalPages,
    totalResults,
    currentPage,
    loadingState,
  };
}

export default function Businesses(data) {
  const {
    currentPage,
    loadingState,
    results,
    totalPages,
    totalResults,
  } = useAlgoliaSearch();

  // AirTable passes us and extra data...
  const businessFeedData = data.data.allAirtableBusinesses.nodes;

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

        <CardSkeleton data={businessFeedData}>
          <BusinessFeed {...data} />
        </CardSkeleton>

        <Pagination totalRecords={totalResults} pageLimit={20} />
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
