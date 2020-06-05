import React, { useState } from 'react';

import { Flex, Link, Heading, Box } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';

const NavItem = ({ slug, children }) => (
  <Link
    as={GatsbyLink}
    to={slug}
    mt={{ base: 4, md: 0 }}
    mr={6}
    display="block"
  >
    {children}
  </Link>
);

const Nav = props => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const { menuLinks } = props;

  return (
    <Flex
      id="primary-navigation"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          <Link as={GatsbyLink} to="/">
            Rebuild Black Businesses
          </Link>
        </Heading>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Flex
        as="ul"
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        justify="flex-end"
        flexGrow={1}
      >
        {menuLinks.map(link => (
          <li>
            <NavItem as="li" slug={link.slug}>
              {link.name}
            </NavItem>
          </li>
        ))}
      </Flex>
    </Flex>
  );
};

export default Nav;
