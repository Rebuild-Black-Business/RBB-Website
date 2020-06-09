import React from 'react';
import { SEO } from '.';
import PrimaryNav from './PrimaryNav';
import { StaticQuery, graphql } from 'gatsby';
import ErrorBoundary from './ErrorBoundary';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import Footer from './footer/Footer';

export default function Layout({ children }) {
  return (
    <ErrorBoundary>
      <StaticQuery
        query={MenuLinks}
        render={data => (
          <>
            <SEO />
            <SkipNavLink />
            <PrimaryNav
              menuLinks={data.site.siteMetadata.menuLinks}
              logoInformation={data.site.siteMetadata.logo}
            />
            <SkipNavContent />
            <main id="primary-content">{children}</main>
            <Footer />
          </>
        )}
      />
    </ErrorBoundary>
  );
}

const MenuLinks = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        logo {
          src
          alt
        }
        menuLinks {
          name
          slug
        }
      }
    }
  }
`;
