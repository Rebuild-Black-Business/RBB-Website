import React from 'react';
import { SEO } from '.';
import PrimaryNav from './PrimaryNav';
import { StaticQuery, graphql } from 'gatsby';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';

export default function Layout({ children }) {
  return (
    <StaticQuery
      query={MenuLinks}
      render={data => (
        <>
          <SEO />
          <SkipNavLink />
          <PrimaryNav menuLinks={data.site.siteMetadata.menuLinks} />
          <SkipNavContent />
          <main id="primary-content">{children}</main>
        </>
      )}
    />
  );
}

const MenuLinks = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        menuLinks {
          name
          slug
        }
      }
    }
  }
`;
