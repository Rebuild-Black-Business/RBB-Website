import React from 'react';
import { PseudoBox, IconButton } from '@chakra-ui/core';
import PropTypes from 'prop-types';

/**
 * @function PaginationArrow
 *
 * @param {function} onClick - Callback function that runs when icon is clicked
 * @param {boolean} isDisabled - Boolean that determines whether the icon is disabled
 * @param {string} icon - Name of the svg icon from the theme.js file
 *
 */

const PaginationArrow = ({ onClick, hidden, direction = 'RIGHT' }) => {
  return hidden ? null : (
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
        color: '#fff',
      }}
      _focus={{
        color: '#fff',
      }}
    >
      <IconButton
        onClick={onClick}
        aria-label={`Go to ${direction === 'RIGHT' ? 'next' : 'previous'} page`}
        variant="unstyled"
        fill="rbb-black-100"
        icon={direction === 'RIGHT' ? 'arrowRight' : 'arrowLeft'}
        size="lg"
        minWidth={0}
      />
    </PseudoBox>
  );
};

PaginationArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(['RIGHT', 'LEFT']).isRequired,
};

export default PaginationArrow;
