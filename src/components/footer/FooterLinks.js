import React from 'react';
import config from '../../config';
import ErrorBoundary from './../ErrorBoundary';
import { NavMenu, NavItem } from '../Nav';
import Link from './../Link';

const FooterLinks = () => {
  return (
    <ErrorBoundary>
      <NavMenu
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        {[
          ...config.siteMetadata.menuLinks,
          {
            name: 'Legal',
            slug: '/legal',
          },
        ].map(link => (
          <NavItem key={link.name} mr="2" mt={[2, 2, 2, null]} display="flex">
            <Link variant="footer" href={link.slug}>
              {link.name}
            </Link>
          </NavItem>
        ))}
      </NavMenu>
    </ErrorBoundary>
  );
};

export default FooterLinks;
