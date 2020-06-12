import { useState, useEffect } from 'react';

function usePagination(location, onChange) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get('page');

    // Duplicated because otherwise it wants it to be inside useEffect
    // And then that gets complex. Easier this way for now!
    if (pageParam) {
      setPage(pageParam);
      onChange(pageParam);
    } else {
      setPage(1);
      onChange(1);
    }
  }, [location.search, onChange]);

  return { page };
}

export default usePagination;
