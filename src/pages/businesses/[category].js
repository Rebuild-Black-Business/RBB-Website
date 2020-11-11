import React from 'react';
import { useRouter } from 'next/router';
import Businesses from '../../templates/businesses';

export default () => {
  const router = useRouter();
  return <Businesses location={router} />;
};
