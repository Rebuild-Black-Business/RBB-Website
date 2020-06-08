import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import { Flex, Button, useTheme } from '@chakra-ui/core';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const SET_PAGINATION_CONFIG = 'SET_PAGINATION_CONFIG';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_PAGE_NUMBERS = 'SET_PAGE_NUMBERS';

/**
 * @function range
 *
 * @param {number} from - Range start value
 * @param {number} to - Range end value
 * @param {number} step - Number to increment each loop count by
 * @returns {Array.<number>} - An array of numbers
 */

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  for (let i = from; i <= to; i = i + step) {
    range.push(i);
  }

  return range;
};

/**
 * @function Pagination
 *
 * @param {number} totalRecords - Total records count
 * @param {number} pageLimit - Number of items to display per page
 * @param {number} pageNeighbors - Number of neighboring pages when pagination is in the middle of the list
 * @param {function} onPageChanged - Callback function that passes paginated information
 *
 */

function reducer(state, action) {
  switch (action.type) {
    case SET_PAGINATION_CONFIG:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_PAGE_NUMBERS: {
      return {
        ...state,
        pages: action.payload,
      };
    }
    default:
      return state;
  }
}

const Pagination = props => {
  const theme = useTheme();

  const [state, dispatch] = useReducer(reducer, {
    totalRecords: null,
    totalPages: 0,
    pageLimit: 0,
    pageNeighbors: 1,
    currentPage: 1,
    pages: [],
  });

  useEffect(() => {
    const {
      currentPage = 1,
      totalRecords = 0,
      pageLimit = 10,
      pageNeighbors = 1,
    } = props;

    dispatch({
      type: SET_PAGINATION_CONFIG,
      payload: {
        currentPage,
        totalRecords,
        pageLimit,
        pageNeighbors: Math.max(0, Math.min(pageNeighbors, 2)),
        totalPages: Math.ceil(totalRecords / pageLimit),
      },
    });
  }, [
    props.currentPage,
    props.totalRecords,
    props.pageLimit,
    props.pageNeighbors,
  ]);

  useEffect(() => {
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
      const { currentPage, pageNeighbors, totalPages } = state;
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

    const pageNumbers = fetchPageNumbers();

    dispatch({
      type: SET_PAGE_NUMBERS,
      payload: pageNumbers,
    });
  }, [state.currentPage, state.totalPages, state.pageNeighbors]);

  const gotoPage = page => {
    const { pageLimit, totalPages, totalRecords } = state;
    const { onPageChanged } = props;

    const currentPage = Math.max(0, Math.min(page, totalPages));
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: currentPage,
    });

    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords,
    };
    if (onPageChanged) onPageChanged(paginationData);
  };

  const handleClick = page => {
    gotoPage(page);
  };

  const handleMoveLeft = () => {
    const { currentPage, pageNeighbors } = state;
    gotoPage(currentPage - pageNeighbors * 2 - 1);
  };

  const handleMoveRight = () => {
    const { currentPage, pageNeighbors } = state;
    gotoPage(currentPage + pageNeighbors * 2 + 1);
  };

  return (
    <Flex flexWrap="nowrap" justifyContent="center">
      {state.pages.map((page, i) => {
        return (
          <Button
            key={i}
            display="flex"
            alignItems="center"
            backgroundColor={
              state.currentPage === page ? theme.colors['rbb-orange'] : ''
            }
            cursor="pointer"
            fontFamily={theme.fonts['heading-slab']}
            fontSize={theme.fontSizes.lg}
            fontWeight={theme.fontWeights.bold}
            justifyContent="center"
            height={10}
            width={10}
            _hover={{
              bg: state.currentPage !== page ? theme.colors['rbb-gray'] : null,
            }}
            onClick={() => {
              if (page === LEFT_PAGE) handleMoveLeft();
              else if (page === RIGHT_PAGE) handleMoveRight();
              else handleClick(page);
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
          </Button>
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
