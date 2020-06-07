import React, { useState, useLayoutEffect, forwardRef } from 'react';
import { useTheme } from '@chakra-ui/core';
import { Flex, Link, Box } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';
import VisuallyHidden from '@reach/visually-hidden';
import { Nav, NavMenu, NavItem, NavLink } from './Nav';
import Image from './Image';

const INITIAL_TOGGLE_STATE = false;

const PrimaryNav = forwardRef(
  ({ menuLinks, logoInformation, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(INITIAL_TOGGLE_STATE);
    const isMedium = useThemeBreakpoint('md');
    const handleToggle = () => setIsVisible(!isVisible);
    const theme = useTheme();
    const toUpperCase = text => text.toUpperCase();

    // Layout effect prevents a flash of visibility when resizing the screen
    useLayoutEffect(() => {
      setIsVisible(isMedium);
    }, [isMedium]);

    return (
      // Breakpoints follow a [default, 1st breakpoint, 2nd breakpoint] structure.
      // In this case, padding would be 0 by default, 0 for the 'sm' breakpoint, and 6
      // for the 'md' breakpoint and above (lg, xl, ...).

      <Nav
        ref={ref}
        align="center"
        justify="space-between"
        wrap="wrap"
        aria-label="Primary site navigation"
        backgroundColor={theme.colors['rbb-black-000']}
        color={theme.colors['rbb-white']}
        fontFamily="Arvo"
        p={[0, 0, 6]}
        {...props}
      >
        <Flex align="center" ml={5} my={[5, 5, 0]}>
          <Link as={GatsbyLink} to="/">
            <Image
              cloudName="rebuild-black-business"
              publicId="assets/RBBLogoFinal_ugdskx"
              transforms={{
                height: 0.1,
                fetchFormat: 'auto',
                quality: 'auto',
              }}
              alt={logoInformation.alt}
            />
          </Link>
        </Flex>

        <Box display={['block', 'block', 'none']} mr={{ sm: '5' }}>
          <button
            onClick={handleToggle}
            aria-expanded={isVisible}
            aria-controls="navigation"
          >
            <VisuallyHidden>
              {`${isVisible ? 'Hide' : 'Show'} the navigation menu`}
            </VisuallyHidden>
            <svg
              aria-hidden
              width="30px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill={theme.colors['rbb-white']}
            >
              <title>Menu</title>

              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </Box>

        <NavMenu
          display={['flex', 'block', 'flex']}
          width={['auto', 'full', 'auto']}
          alignItems="center"
          justify="flex-end"
          flexGrow={1}
          hidden={!isVisible || undefined}
          aria-hidden={isVisible}
          id="navigation"
        >
          {menuLinks.map((link, index, src) => (
            <NavItem
              key={link.name}
              p={[6, 6, 0]}
              border={[
                `1px solid ${theme.colors['rbb-gray']}`,
                `1px solid ${theme.colors['rbb-gray']}`,
                'none',
              ]}
              mx={[undefined, undefined, index !== src.length - 1 ? 6 : 8]}
              display="block"
              fontWeight="bold"
              textAlign="right"
            >
              <NavLink to={link.slug}>{toUpperCase(link.name)}</NavLink>
            </NavItem>
          ))}
        </NavMenu>
      </Nav>
    );
  }
);

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
