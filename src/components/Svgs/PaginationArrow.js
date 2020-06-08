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

const PaginationArrow = ({ onClick, isDisabled, icon }) => {
  return (
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
        color: 'white',
      }}
      _focus={{
        color: 'white',
      }}
    >
      <IconButton
        onClick={onClick}
        aria-label="Next"
        aria-labelledby={icon}
        variant="unstyled"
        fill="white"
        icon={icon}
        size="lg"
        isDisabled={isDisabled}
        minWidth={0}
      />
    </PseudoBox>
  );
};

PaginationArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  icon: PropTypes.oneOf(['arrowRight', 'arrowLeft']).isRequired,
};

export default PaginationArrow;
