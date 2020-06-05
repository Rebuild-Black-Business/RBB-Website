import React from 'react';

import { SEO } from '.';
import Nav from './Nav/Nav';
import { StaticQuery, graphql } from 'gatsby';

export default function Layout({ children }) {
  return (
    <StaticQuery
      query={MenuLinks}
      render={data => (
        <>
          <SEO />
          <Nav menuLinks={data.site.siteMetadata.menuLinks} />
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
