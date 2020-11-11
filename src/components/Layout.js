import React from 'react';
import config from '../config';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import { Box } from '@chakra-ui/core';
import { ReactQueryDevtools } from 'react-query-devtools';

import { SEO } from '.';
import PrimaryNav from './PrimaryNav';
import ErrorBoundary from './ErrorBoundary';
import Footer from './footer/Footer';

export default function Layout({ children, ...props }) {
  return (
    <>
      <ErrorBoundary>
        <SEO />
        <SkipNavLink />
        <PrimaryNav
          menuLinks={config.siteMetadata.menuLinks}
          logoInformation={config.siteMetadata.logo}
        />
        <SkipNavContent />
        <Box
          as="main"
          id="primary-content"
          style={{ maxWidth: '100vw', minHeight: 'calc(100vh - 475px)' }}
          {...props}
        >
          {children}
        </Box>
        <Footer />
      </ErrorBoundary>
      <ReactQueryDevtools />
    </>
  );
}
