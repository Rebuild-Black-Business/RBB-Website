import React from 'react';
import { useRouter } from 'next/router';

const SingleBusinessPage = props => {
  const { query } = useRouter();

  return (
    <>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </>
  );
};

export default SingleBusinessPage;
