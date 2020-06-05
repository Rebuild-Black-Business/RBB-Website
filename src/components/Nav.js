import React, { forwardRef } from 'react';
import { Flex, Link, Box } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';

const Nav = forwardRef(
  (
    {
      'aria-label': ariaLabel = 'Navigation menu',
      component: Comp = Flex,
      as = 'nav',
      children,
      ...props
    },
    ref
  ) => (
    <Comp ref={ref} as={as} aria-label={ariaLabel} {...props}>
      {children}
    </Comp>
  )
);

const NavMenu = forwardRef(
  ({ component: Comp = Flex, as = 'ul', children, ...props }, ref) => (
    <Comp ref={ref} as={as} {...props}>
      {children}
    </Comp>
  )
);

const NavItem = forwardRef(
  ({ component: Comp = Box, as = 'li', children, ...props }, ref) => (
    <Comp ref={ref} as={as} {...props}>
      {children}
    </Comp>
  )
);

const NavLink = forwardRef(({ as = GatsbyLink, children, ...props }, ref) => (
  <Link ref={ref} as={as} display="block" {...props}>
    {children}
  </Link>
));

Nav.displayName = 'Nav';
NavMenu.displayName = 'NavMenu';
NavItem.displayName = 'NavItem';
NavLink.displayName = 'NavLink';

export { Nav, NavMenu, NavItem, NavLink };
