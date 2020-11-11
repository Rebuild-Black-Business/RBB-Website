import React from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components';
import Businesses from '../../templates/businesses';

const BusinessRoot = () => {
  const router = useRouter();
  return (
    <Layout>
      <Businesses location={router} />;
    </Layout>
  );
};

export default BusinessRoot;
