import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import { Flex, Button, useTheme } from '@chakra-ui/core';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
const UPDATE_PAGE_LIMIT = 'UPDATE_PAGE_LIMIT';
const UPDATE_PAGE_NEIGHBORS = 'UDPATE_PAGE_NEIGHBORS';
const UPDATE_PAGE_NUMBERS = 'UPDATE_PAGE_NUMBERS';
const UPDATE_TOTAL_PAGES = 'UPDATE_TOTAL_PAGES';
const UPDATE_TOTAL_RECORDS = 'UPDATE_TOTAL_RECORDS';

/**
 * @function range
 *
 * @param {number} from - Range start value
 * @param {number} to - Range end value
 * @param {number} [step] - Number to increment each loop count by
 * @returns {Array.<number>} - An array of numbers
 */

const range = (from, to, step = 1) => {
  const range = [];

  for (let i = from; i <= to; i = i + step) {
    range.push(i);
  }

  return range;
};

/**
 * @function reducer
 *
 * @param {Object} state - Current state
 * @param {number} state.currentPage - Current page number
 * @param {number} state.totalRecords - The total records count
 * @param {number} state.pageLimit - A number representing number of items per page
 * @param {number} state.pageNeighbors - Number of neighboring pages when pagination is in the middle of the list
 * @param {Array.<number|LEFT_PAGE|RIGHT_PAGE>} state.pages - An array containing numbers, "LEFT", or "RIGHT"
 * @param {Object} action - Action object containing action type and various payloads
 * @param {UPDATE_CURRENT_PAGE| UPDATE_PAGE_LIMIT | UPDATE_PAGE_NEIGHBORS | UPDATE_PAGE_NUMBERS | UPDATE_TOTAL_PAGES | UPDATE_TOTAL_RECORDS} action.type - Action type to dispatch
 * @param {number} [action.currentPage] - Current page number to update
 * @param {number} [action.pageNeighbors] - Number to update page neighbors
 * @param {number} [action.pageLimit] - Number to update page limit
 * @param {number} [action.totalRecords] - Number to update total records
 * @param {number} [action.totalPages] - Number to update total pages
 * @param {Array.<number|LEFT_PAGE|RIGHT_PAGE>} [action.pages] - Array containing numbers, "LEFT", or "RIGHT" to update page list
 * @returns {state} - Returns current state
 */

function reducer(state, action) {
  switch (action.type) {
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case UPDATE_PAGE_LIMIT:
      return {
        ...state,
        pageLimit: action.pageLimit,
      };
    case UPDATE_PAGE_NEIGHBORS:
      return {
        ...state,
        pageNeighbors: action.pageNeighbors,
      };
    case UPDATE_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.totalPages,
      };
    case UPDATE_TOTAL_RECORDS:
      return {
        ...state,
        totalRecords: action.totalRecords,
      };
    case UPDATE_PAGE_NUMBERS: {
      return {
        ...state,
        pages: action.pages,
      };
    }
    default:
      return state;
  }
}

/**
 * @function Pagination
 *
 * @param {Object} props - Props object that is passed into Pagination
 * @param {number} props.currentPage - current page number that is being viewed
 * @param {number} props.totalRecords - Total records count
 * @param {number} [props.pageLimit=10] - Number of items to display per page
 * @param {number} [props.pageNeighbors=1] - Number of neighboring pages when pagination is in the middle of the list
 * @param {function} props.onPageChanged - Callback function that passes paginated information
 *
 */

const Pagination = props => {
  const theme = useTheme();

  const { currentPage, pageLimit, pageNeighbors, totalRecords } = props;

  const [state, dispatch] = useReducer(reducer, {
    totalRecords: null,
    totalPages: 0,
    pageLimit: 0,
    pageNeighbors: 1,
    currentPage: 1,
    pages: [],
  });

  useEffect(() => {
    dispatch({
      type: UPDATE_PAGE_NEIGHBORS,
      pageNeighbors: Math.max(0, Math.min(pageNeighbors, 2)),
    });
    dispatch({
      type: UPDATE_PAGE_LIMIT,
      pageLimit,
    });
    dispatch({
      type: UPDATE_TOTAL_RECORDS,
      totalRecords,
    });
    dispatch({
      type: UPDATE_TOTAL_PAGES,
      totalPages: Math.ceil(totalRecords / pageLimit),
    });
    dispatch({
      type: UPDATE_CURRENT_PAGE,
      currentPage,
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
      /**
       * totalNumbers: the total page numbers to show on the control
       * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
       */
      const totalNumbers = state.pageNeighbors * 2 + 3;
      const totalBlocks = totalNumbers + 2;

      if (state.totalPages > totalBlocks) {
        const startPage = Math.max(2, state.currentPage - state.pageNeighbors);
        const endPage = Math.min(
          state.totalPages - 1,
          state.currentPage + state.pageNeighbors
        );

        let pages = range(startPage, endPage);

        /**
         * hasLeftSpill: has hidden pages to the left
         * hasRightSpill: has hidden pages to the right
         * spillOffset: number of hidden pages either to the left or to the right
         */
        const hasLeftSpill = startPage > 2;
        const hasRightSpill = state.totalPages - endPage > 1;
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

        return [1, ...pages, state.totalPages];
      }

      return range(1, state.totalPages);
    };

    const pageNumbers = fetchPageNumbers();

    dispatch({
      type: UPDATE_PAGE_NUMBERS,
      pages: pageNumbers,
    });
  }, [state.currentPage, state.totalPages, state.pageNeighbors]);

  const gotoPage = page => {
    const { pageLimit, totalPages, totalRecords } = state;
    const { onPageChanged } = props;

    const currentPage = Math.max(0, Math.min(page, totalPages));
    dispatch({
      type: UPDATE_CURRENT_PAGE,
      currentPage,
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

Pagination.defaultProps = {
  currentPage: 1,
  totalRecords: 0,
  pageLimit: 10,
  pageNeighbors: 1,
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired,
};

export default Pagination;
