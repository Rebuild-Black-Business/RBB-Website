import 'isomorphic-fetch';
import { useEffect, useState } from 'react';

const endpoint = process.env.GATSBY_SEARCH_API_ENDPOINT;
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

  if (filters.need && filters.need !== 'false') {
    filterArr.push(`in-need=true`);
  }

  if (filters.type) {
    filterArr.push(`category=${filters.type}`);
  }

  if (filters.search) {
    filterArr.push(`search=${filters.search}`);
  }

  if (filters.hasDonationLink === true) {
    filterArr.push(`hasDonationLink=${filters.hasDonationLink}`);
  }

  if (Object.keys(filters.coordinates).length) {
    filterArr.push(
      `lat=${filters.coordinates.lat}&long=${filters.coordinates.lng}&radius=25`
    );
  }

  return filterArr.join('&');
}

function useSearch(filters, page, pageSize = 11) {
  const [results, setResults] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATE.INITIAL);
  const [totalPages, setTotalPages] = useState(0);

  const defaultFilters = `pageSize=${pageSize}`;

  useEffect(() => {
    async function getBusinesses() {
      try {
        const filterStr = createFilterString(defaultFilters, filters);
        const response = await fetch(
          `${endpoint}api/v1/businesses?page=${page}&${filterStr}`,
          {
            headers: {
              'x-api-key': process.env.GATSBY_RBB_API_KEY,
            },
          }
        );
        const results = await response.json();

        setResults(results.records);
        setTotalPages(Math.ceil(results.total / pageSize));
        setLoadingState(LOADING_STATE.NONE);
      } catch (e) {
        console.log('error searching', e);
      }
    }

    getBusinesses();
  }, [page, filters, defaultFilters, pageSize]);

  return {
    results,
    totalPages,
    loadingState,
    setLoadingState,
  };
}

export default useSearch;
export { LOADING_STATE };
