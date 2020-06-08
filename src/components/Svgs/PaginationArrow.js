import React from 'react';
import { PseudoBox, IconButton } from '@chakra-ui/core';
import PropTypes from 'prop-types';

const PaginationArrow = ({ onClick, transform, isDisabled, icon }) => {
  return (
    <PseudoBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      alignSelf="baseline"
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
  handleMove: PropTypes.func.isRequired,
  transform: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.oneOf(['arrowRight', 'arrowLeft']).isRequired,
};

export default PaginationArrow;
