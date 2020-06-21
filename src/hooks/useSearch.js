import { useState, useEffect } from 'react';
import 'isomorphic-fetch';

const endpoint = process.env.GATSBY_SEARCH_API_ENDPOINT;
const LOADING_STATE = {
  NONE: 'none',
  INITIAL: 'intial',
  SEARCHING: 'searching',
};
const pageSize = 20;

function createFilterString(defaultFilters = '', filters) {
  const filterArr = [];

  if (defaultFilters) {
    filterArr.push(defaultFilters);
  }

  if (filters.need !== 'false') {
    filterArr.push(`in-need=true`);
  }

  if (filters.type) {
    filterArr.push(`category=${filters.type}`);
  }

  if (Object.keys(filters.coordinates).length) {
    filterArr.push(
      `lat=${filters.coordinates.lat}&long=${filters.coordinates.lng}&radius=25`
    );
  }

  return filterArr.join('&');
}

const defaultFilters = `pageSize=${pageSize}`;

function useSearch(filters, page) {
  const [results, setResults] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATE.INITIAL);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getBusinesses() {
      try {
        const filterStr = createFilterString(defaultFilters, filters);
        const response = await fetch(
          `${endpoint}api/v1/businesses?page=${page}&${filterStr}`
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
  }, [page, filters]);

  return {
    results,
    totalPages,
    loadingState,
    setLoadingState,
  };
}

export default useSearch;
export { LOADING_STATE };
