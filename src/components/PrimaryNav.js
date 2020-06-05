import React, { useState, useLayoutEffect, forwardRef } from 'react';
import { useTheme } from '@chakra-ui/core';
import { Flex, Link, Heading, Box } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';
import VisuallyHidden from '@reach/visually-hidden';
import { Nav, NavMenu, NavItem, NavLink } from './Nav';

const INITIAL_TOGGLE_STATE = false;

const PrimaryNav = forwardRef(({ menuLinks, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(INITIAL_TOGGLE_STATE);
  const isMedium = useThemeBreakpoint('md');
  const handleToggle = () => setIsVisible(!isVisible);

  // Layout effect prevents a flash of visibility when resizing the screen
  useLayoutEffect(() => {
    setIsVisible(isMedium);
  }, [isMedium]);

  return (
    <Nav
      ref={ref}
      align="center"
      justify="space-between"
      wrap="wrap"
      aria-label="Primary site navigation"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          <Link as={GatsbyLink} to="/">
            Rebuild Black Businesses
          </Link>
        </Heading>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }}>
        <button onClick={handleToggle}>
          <VisuallyHidden>
            {`${isVisible ? 'Hide' : 'Show'} the navigation menu`}
          </VisuallyHidden>
          <svg
            aria-hidden
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </Box>

      <NavMenu
        display={{ sm: 'block', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        justify="flex-end"
        flexGrow={1}
        hidden={!isVisible || undefined}
      >
        {menuLinks.map((link, index, src) => (
          <NavItem
            key={link.name}
            mt={{ base: 4, md: 0 }}
            mr={{
              base: undefined,
              md: index !== src.length - 1 ? 6 : undefined,
            }}
            display="block"
          >
            <NavLink to={link.slug}>{link.name}</NavLink>
          </NavItem>
        ))}
      </NavMenu>
    </Nav>
  );
});

export default PrimaryNav;

// TODO: Consider extracting to separate util
const sizes = ['sm', 'md', 'lg', 'xl'];

/**
 * @param {'sm'|'md'|'lg'|'xl'} breakpoint
 */
function useThemeBreakpoint(breakpoint) {
  const index = sizes.indexOf(breakpoint);
  const theme = useTheme();
  const query = `(min-width: ${theme.breakpoints[index]})`;
  const [matches, setMatches] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useLayoutEffect(() => {
    let matcher = window.matchMedia(query);
    setMatches(matcher.matches);
    matcher.addListener(listener);
    return () => {
      matcher.removeListener(listener);
    };
    function listener(event) {
      setMatches(event.matches);
    }
  }, [query]);

  if (index < 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'An incorrect breakpoint key was used in `useThemeBreakpoint`. Use `sm`, `md`, `lg` or `xl`'
      );
    }
    return false;
  }
  return matches;
}
