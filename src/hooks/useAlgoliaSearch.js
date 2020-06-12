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

function createFilterString(defaultFilters = '', filters) {
  const filterArr = [];

  if (defaultFilters) {
    filterArr.push(defaultFilters);
  }

  if (filters.need !== 'false') {
    filterArr.push(`in_need=1`);
  }

  if (filters.type) {
    filterArr.push(`category:"${filters.type}"`);
  }

  return filterArr.join(' AND ');
}

function useAlgoliaSearch(filters, page) {
  const [results, setResults] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATE.INITIAL);
  const [totalPages, setTotalPages] = useState(0);

  const defaultFilters = `approved=1`;

  useEffect(() => {
    async function getBusinesses() {
      try {
        const algoliaResponse = await index.search('', {
          page: page - 1,
          filters: createFilterString(defaultFilters, filters),
          aroundLatLng: Object.keys(filters.coordinates).length
            ? `${filters.coordinates.lat}, ${filters.coordinates.lng}`
            : '',
          aroundRadius: 40000, // 40 km -- Note: Please change this I didn't know how far to search!
        });

        setResults(algoliaResponse.hits);
        setTotalPages(algoliaResponse.nbPages);
        setLoadingState(LOADING_STATE.NONE);
      } catch (e) {
        console.log('error searching', e);
      }
    }

    getBusinesses();
  }, [page, defaultFilters, filters]);

  return {
    results,
    totalPages,
    loadingState,
    setLoadingState,
  };
}

export default useAlgoliaSearch;
export { LOADING_STATE };
