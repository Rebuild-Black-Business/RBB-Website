import React, { useState, useLayoutEffect, forwardRef } from 'react';
import { useTheme } from '@chakra-ui/core';
import { Flex, Link, Box } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';
import VisuallyHidden from '@reach/visually-hidden';
import { Nav, NavMenu, NavItem, NavLink } from './Nav';
import Image from './Image';
import Button from '../components/Button';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/core';

const INITIAL_TOGGLE_STATE = false;

const PrimaryNav = forwardRef(
  ({ menuLinks, logoInformation, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(INITIAL_TOGGLE_STATE);
    const isMedium = useThemeBreakpoint('md');
    const handleToggle = () => setIsVisible(!isVisible);
    const theme = useTheme();
    const toUpperCase = text => text.toUpperCase();
    const { isOpen, onOpen, onClose } = useDisclosure();

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
        backgroundColor={theme.colors['rbb-white']}
        color={theme.colors['rbb-black-000']}
        fontFamily="Arvo"
        p={[0, 0, 6]}
        {...props}
      >
        <Box display={['block', 'block', 'none']} ml={{ sm: '5' }}>
          <button
            onClick={handleToggle}
            aria-expanded={isVisible && !isMedium}
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
              fill={theme.colors['rbb-black-000']}
            >
              <title>Menu</title>

              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </Box>
        <Flex
          align="center"
          ml={[0, 0, 5]}
          mr={[8, 8, 0]}
          my={[5, 5, 0]}
          width={['50%', '50%', 'auto']}
        >
          <Link as={GatsbyLink} to="/">
            <Image
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

        <NavMenu
          display={['flex', 'block', 'flex']}
          width={['auto', 'full', 'auto']}
          alignItems="center"
          justify="flex-start"
          flexGrow={1}
          hidden={!isVisible || undefined}
          aria-hidden={isVisible && !isMedium}
          id="navigation"
        >
          {menuLinks.map((link, index, src) => (
            <NavItem
              key={link.name}
              p={[6, 6, 0]}
              borderTop={[
                `1px solid ${theme.colors['rbb-black-100']}`,
                `1px solid ${theme.colors['rbb-black-100']}`,
                'none',
              ]}
              borderBottom={[
                index !== src.length - 1
                  ? 'none'
                  : `1px solid ${theme.colors['rbb-black-100']}`,
                index !== src.length - 1
                  ? 'none'
                  : `1px solid ${theme.colors['rbb-black-100']}`,
                'none',
              ]}
              ml={[undefined, undefined, 8]}
              display="block"
              fontWeight="bold"
              textAlign="left"
            >
              <NavLink to={link.slug}>{toUpperCase(link.name)}</NavLink>
            </NavItem>
          ))}
          {/* Subscribe button when user is on mobile */}
          <NavItem
            display={['none', 'block', 'none']}
            p={[6, 6, 0]}
            borderBottom={[
              `1px solid ${theme.colors['rbb-black-100']}`,
              `1px solid ${theme.colors['rbb-black-100']}`,
              'none',
            ]}
          >
            <Flex direction="row" justify={['center', 'center', 'flex-end']}>
              <Button onClick={onOpen} hidden={!isVisible || undefined}>
                Subscribe
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>This is the modal content.</ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          </NavItem>
        </NavMenu>

        {/* Subscribe button when user is on web */}
        {isVisible ? (
          <Flex justify={['center', 'center', 'flex-end']}>
            <Button
              display={['none', 'none', 'block']}
              onClick={onOpen}
              hidden={!isVisible || undefined}
            >
              Subscribe
            </Button>
          </Flex>
        ) : null}
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
