import React, { useMemo, useState } from 'react';
import { Button, Flex, PseudoBox, useTheme } from '@chakra-ui/core';
import { range } from '../../utils/common';
import PropTypes from 'prop-types';
import useMedia from 'react-use/lib/useMedia';

const PLACEHOLDER = '...';

/**
 * @function Pagination
 *
 * @param {Object} props - Props object that is passed into Pagination
 * @param {number} props.currentPage - current page number that is being viewed
 * @param {number} totalRecords - Total records count
 * @param {number} [pageLimit=10] - Number of items to display per page
 * @param {function} onPageChanged - Callback function that passes paginated information
 */
function Pagination({ onPageChanged, totalRecords, pageLimit, ...props }) {
  const theme = useTheme();

  const isWide = useMedia('(min-width: 480px)');
  const pageNeighbors = isWide ? 2 : 1;

  const totalPages = useMemo(() => Math.ceil(totalRecords / pageLimit), [
    totalRecords,
    pageLimit,
  ]);

  const [currentPage, setCurrentPage] = useState(1);

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

  function handleGoToPage(page) {
    setCurrentPage(Math.max(0, Math.min(page, totalPages)));

    if (onPageChanged)
      onPageChanged({
        currentPage,
        totalPages,
        pageLimit,
        totalRecords,
      });
  }

  const handleMoveLeft = () => handleGoToPage(currentPage - 1);
  const handleMoveRight = () => handleGoToPage(currentPage + 1);

  return (
    <Flex flexWrap="nowrap"
          justifyContent="center"
          marginTop={theme.spacing.lg}
          marginBottom={theme.spacing.lg}>
      {/*<PaginationArrow hidden={currentPage === 1} direction="left" onClick={handleMoveLeft} />*/}
      {pages.map((page, index) => {
        if (page === PLACEHOLDER) {
          return (
            <PseudoBox
              key={index}
              as="span"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={10}
              height={10}
              fontFamily={theme.fonts['heading-slab']}
              fontSize={theme.fontSizes.lg}
              fontWeight={theme.fontWeights.bold}
              aria-hidden={true}
            >
              {PLACEHOLDER}
            </PseudoBox>
          );
        }

        const isActivePage = currentPage === page;
        function handleClick() {
          handleGoToPage(page);
        }

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
            onClick={handleClick}
            title={`Go to page ${page}`}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </Button>
        );
      })}
      {/*<PaginationArrow hidden={currentPage === totalPages} direction="right" onClick={handleMoveLeft} />*/}
    </Flex>
  );
}

Pagination.defaultProps = {
  pageLimit: 10,
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Pagination;
