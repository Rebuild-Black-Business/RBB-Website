import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Flex, PseudoBox, useTheme } from '@chakra-ui/core';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * @function Pagination
 *
 * @param {number} totalRecords - Total records count
 * @param {function} onPageChanged - Callback function that passes paginated information
 * @param {number} pageLimit - Number of items to display per page
 * @param {number} pageNeighbors - Number of neighboring pages when pagination is in the middle of the list
 *
 */

const Pagination = props => {
  const theme = useTheme();

  const [totalRecords, setTotalRecords] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageLimit, setPageLimit] = useState(10);
  const [pageNeighbors, setPageNeighbors] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const { totalRecords, pageLimit, pageNeighbors } = props;

    if (pageLimit) {
      setPageLimit(pageLimit);
    }
    if (pageNeighbors) {
      setPageNeighbors(Math.max(0, Math.min(pageNeighbors, 2)));
    }

    const totalPages = Math.ceil(totalRecords / pageLimit);
    setTotalRecords(totalRecords);
    setTotalPages(totalPages);
  }, []);

  useEffect(() => {
    setPages(fetchPageNumbers());
  }, [totalPages, currentPage]);

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

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
  const fetchPageNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbors * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  const gotoPage = page => {
    const { onPageChanged = f => f } = props;

    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords,
    };

    setCurrentPage(currentPage);
    onPageChanged(paginationData);
  };

  const handleClick = page => {
    gotoPage(page);
  };

  const handleMoveLeft = () => {
    gotoPage(currentPage - pageNeighbors * 2 - 1);
  };

  const handleMoveRight = () => {
    gotoPage(currentPage + pageNeighbors * 2 + 1);
  };

  return (
    <Flex flexWrap="nowrap" justifyContent="center">
      {pages.map((page, i) => {
        return (
          <PseudoBox
            key={i}
            display="flex"
            alignItems="center"
            backgroundColor={
              currentPage === page ? theme.colors['rbb-orange'] : ''
            }
            cursor="pointer"
            fontFamily={theme.fonts['heading-slab']}
            fontSize={theme.fontSizes.lg}
            fontWeight={theme.fontWeights.bold}
            justifyContent="center"
            height={10}
            width={10}
            _hover={{
              backgroundColor:
                currentPage !== page ? theme.colors['rbb-hover-gray'] : null,
            }}
            onClick={() => {
              if (page === LEFT_PAGE) {
                handleMoveLeft();
              } else if (page === RIGHT_PAGE) {
                handleMoveRight();
              } else {
                handleClick(page);
              }
            }}
          >
            {page === LEFT_PAGE ? (
              <span aria-label="Previous">
                <span aria-hidden="true">...</span>
              </span>
            ) : page === RIGHT_PAGE ? (
              <span aria-label="Next">
                <span aria-hidden="true">...</span>
              </span>
            ) : (
              <span>{page}</span>
            )}
          </PseudoBox>
        );
      })}
    </Flex>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
};

export default Pagination;
