import React from 'react';

import { SEO } from '.';

export default function Layout({ children }) {
  return (
    <>
      <SEO />
      {children}
    </>
  );
}
