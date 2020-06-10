import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';

import { Flex } from '@chakra-ui/core';
import { PageHero, BusinessFeed, Pagination } from '../components';
import CardSkeleton from '../components/Loading/CardSkeleton';

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

const LOADING_STATE = {
  NONE: 'none',
  INITIAL: 'intial',
  SEARCHING: 'searching',
};

function useAlgoliaSearch({ page = 1 } = {}) {
  const [results, setResults] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATE.INITIAL);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    async function getBusinesses() {
      try {
        const algoliaResponse = await index.search('', {
          page: currentPage,
        });

        setResults(algoliaResponse.hits);
        setTotalPages(algoliaResponse.nbPages);
        setTotalResults(algoliaResponse.nbHits);
        setLoadingState(LOADING_STATE.NONE);
      } catch (e) {
        console.log('error searching', e);
      }
    }

    getBusinesses();
  }, [currentPage]);

  return {
    results,
    totalPages,
    totalResults,
    loadingState,
    setSearchPage: setCurrentPage,
  };
}

function usePagination(location, onChange) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get('page');

    if (pageParam) {
      setPage(pageParam);
      onChange(pageParam);
    } else {
      setPage(1);
      onChange(1);
    }
  }, [location.search, onChange]);

  return page;
}

export default function Businesses(props) {
  const {
    loadingState,
    results,
    totalPages,
    setSearchPage,
  } = useAlgoliaSearch();

  const page = usePagination(props.location, page => setSearchPage(page));

  const pageSubtitle = (
    <p>
      These business owners have been impacted during the protests. Your support
      will assist their rebuilding efforts. If you are a business owner in need,
      please <a href="#temp">sign up to be added to our list</a>
    </p>
  );

  const heroBackgroundImageUrl =
    'http://res.cloudinary.com/rebuild-black-business/image/upload/c_scale,f_auto,h_0.6,q_auto/v1/assets/business-header';

  return (
    <>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Businesses"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />

        <CardSkeleton data={results}>
          <BusinessFeed businesses={results} />
        </CardSkeleton>

        <Pagination
          location={props.location}
          currentPage={parseInt(page)}
          totalPages={parseInt(totalPages) - 1}
        />
      </Flex>
    </>
  );
}
