import React from 'react';
import { PseudoBox, Box, IconButton } from '@chakra-ui/core';
import PropTypes from 'prop-types';

/**
 * @function PaginationArrow
 *
 * @param {function} onClick - Callback function that runs when icon is clicked
 * @param {boolean} isDisabled - Boolean that determines whether the icon is disabled
 * @param {string} direction - Direction the arrow points
 *
 */

const PaginationArrow = ({ onClick, hidden, direction }) => {
  return hidden ? (
    <Box width={10} height={10} />
  ) : (
    <PseudoBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={10}
      width={10}
      stroke="rbb-black"
      _hover={{
        color: 'rbb-orange',
      }}
      _active={{
        color: 'rbb-white',
      }}
      _focus={{
        color: 'rbb-white',
      }}
    >
      <IconButton
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onClick}
        aria-label={`Go to ${direction === 'NEXT' ? 'next' : 'previous'} page`}
        variant="unstyled"
        icon={direction === 'NEXT' ? 'arrowRight' : 'arrowLeft'}
        fontSize="28px"
        minWidth={0}
      />
    </PseudoBox>
  );
};

PaginationArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(['PREVIOUS', 'NEXT']).isRequired,
};

export default PaginationArrow;
