import { useState, useEffect, useMemo } from 'react';
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);
const index = client.initIndex(process.env.GATSBY_ALGOLIA_INDEX);

const LOADING_STATE = {
  NONE: 'none',
  INITIAL: 'intial',
  SEARCHING: 'searching',
};

function createFilterString(filters) {
  const filterArr = [];

  if (filters.need !== 'false') {
    filterArr.push(`in_need=1`);
  }

  if (filters.type) {
    filterArr.push(`category:"${filters.type}"`);
  }

  return filterArr.join(' AND ');
}

function useAlgoliaSearch(filters) {
  const [results, setResults] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATE.INITIAL);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilters, setSearchFilters] = useState(filters);

  useMemo(() => {
    setSearchFilters(filters);
  }, [filters]);

  useEffect(() => {
    async function getBusinesses() {
      try {
        const algoliaResponse = await index.search('', {
          page: currentPage,
          filters: createFilterString(searchFilters),
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
  }, [currentPage, searchFilters]);

  return {
    results,
    totalPages,
    totalResults,
    loadingState,
    setSearchPage: setCurrentPage,
  };
}

export default useAlgoliaSearch;
export { LOADING_STATE };
