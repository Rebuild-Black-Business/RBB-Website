import React, { useMemo } from 'react';
import { Button, Flex, PseudoBox, useTheme } from '@chakra-ui/core';
import PaginationArrow from '../Svgs/PaginationArrow';
import { range } from '../../utils/common';
import PropTypes from 'prop-types';
import useMedia from 'react-use/lib/useMedia';
import { Link } from 'gatsby';

const PLACEHOLDER = '...';

/**
 * @function Pagination
 *
 * @param {number} currentPage - current page number that is being viewed
 * @param {number} totalRecords - Total records count
 * @param {number} [pageLimit=10] - Number of items to display per page
 */
function Pagination({ currentPage, totalRecords, pageLimit }) {
  const theme = useTheme();

  const isWide = useMedia('(min-width: 480px)');
  const pageNeighbors = isWide ? 2 : 1;

  const totalPages = useMemo(() => Math.ceil(totalRecords / pageLimit), [
    totalRecords,
    pageLimit,
  ]);

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const pages = useMemo(() => {
    // the total page numbers to show on the control
    const totalNumbers = pageNeighbors * 2 + 3;

    // totalNumbers + 2 to cover for the left(<) and right(>) controls
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
      let pages = range(startPage, endPage);

      // has hidden pages to the left
      const hasLeftSpill = startPage > 2;

      // has hidden pages to the right
      const hasRightSpill = totalPages - endPage > 1;

      // number of hidden pages either to the left or to the right
      const spillOffset = totalNumbers - (pages.length + 1);

      // handle: (1) < {5 6} [7] {8 9} (10)
      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [PLACEHOLDER, ...extraPages, ...pages];
      }
      // handle: (1) {2 3} [4] {5 6} > (10)
      else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, PLACEHOLDER];
      }
      // handle: (1) < {4 5} [6] {7 8} > (10)
      else if (hasLeftSpill && hasRightSpill) {
        pages = [PLACEHOLDER, ...pages, PLACEHOLDER];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }, [currentPage, totalPages, pageNeighbors]);

  return (
    <Flex
      flexWrap="nowrap"
      justifyContent="center"
      marginTop={theme.spacing.lg}
      marginBottom={theme.spacing.lg}
      marginX={theme.spacing.lg}
    >
      <PaginationArrow
        hidden={currentPage === 1}
        direction="PREVIOUS"
        onClick={() => {
          // Turn these into link buttons instead of goTo functions?
          console.log('previous');
        }}
      />
      {pages.map((page, index) => {
        if (page === PLACEHOLDER) {
          return (
            <PseudoBox
              key={index}
              as="span"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={isWide ? 10 : ''}
              height={isWide ? 10 : ''}
              fontFamily={theme.fonts['heading-slab']}
              fontSize={theme.fontSizes.xl}
              fontWeight={theme.fontWeights.bold}
              aria-hidden={true}
            >
              {PLACEHOLDER}
            </PseudoBox>
          );
        }

        const isActivePage = currentPage === page;

        return (
          <Button
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={10}
            height={10}
            backgroundColor={isActivePage && theme.colors['rbb-orange']}
            fontFamily={theme.fonts['heading-slab']}
            fontSize={theme.fontSizes.lg}
            fontWeight={theme.fontWeights.bold}
            cursor="pointer"
            _hover={{ bg: !isActivePage && theme.colors['rbb-lightgray'] }}
            title={`Go to page ${page}`}
            aria-label={`Go to page ${page}`}
          >
            <Link to={page === 1 ? `/businesses` : `/businesses/${page}`}>
              {page}
            </Link>
          </Button>
        );
      })}
      <PaginationArrow
        hidden={currentPage === totalPages}
        direction="NEXT"
        onClick={() => {
          // Turn these into link buttons instead of goTo functions?
          console.log('next');
        }}
      />
    </Flex>
  );
}

Pagination.defaultProps = {
  pageLimit: 10,
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
};

export default Pagination;
