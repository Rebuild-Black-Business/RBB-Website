import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { useTheme } from '@chakra-ui/core';
import ErrorBoundary from './../ErrorBoundary';
import { NavMenu, NavItem, NavLink } from '../Nav';

const FooterLinks = () => {
  const theme = useTheme();
  return (
    <ErrorBoundary>
      <StaticQuery
        query={MenuLinks}
        render={data => {
          return (
            <NavMenu
              display="flex"
              width="90%"
              wrap={['wrap', null]}
              alignItems="center"
              justify="center"
            >
              {data.site.siteMetadata.menuLinks.map(link => (
                <NavItem key={link.name} mr="4" mt={[2, null]} display="flex">
                  <NavLink
                    fontWeight={theme.fontWeights.regular}
                    fontFamily={theme.fonts.heading}
                    color={theme.footer.text}
                    to={link.slug}
                  >
                    {link.name}
                  </NavLink>
                </NavItem>
              ))}
            </NavMenu>
          );
        }}
      />
    </ErrorBoundary>
  );
};

const MenuLinks = graphql`
  query FooterLinksQuery {
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

export default FooterLinks;
