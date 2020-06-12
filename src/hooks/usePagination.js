import { useState, useEffect } from 'react';

function usePagination(location) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get('page');

    if (pageParam) {
      setPage(pageParam);
    } else {
      setPage(1);
    }
  }, [location]);

  return { page };
}

export default usePagination;
