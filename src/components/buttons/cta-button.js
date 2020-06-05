import React from 'react';
import { PseudoBox } from '@chakra-ui/core';

const CTAButton = props => (
  <PseudoBox
    as="button"
    bg="#f46036"
    border="1px solid #C34D2B"
    borderRadius="100px"
    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    color="#F4F5F7"
    fontFamily="Arvo"
    fontSize="16px"
    fontStyle="normal"
    fontWeight="bold"
    height="44px"
    letterSpacing="0.05em"
    lineHeight="20px"
    padding="10px 35px"
    textTransform="uppercase"
    _hover={{ bg: '#AB4326' }}
    _focus={{ bg: '#AB4326' }}
    _active={{
      bg: '#F7F7F2',
      border: '1px solid #F46036',
      color: '#AB4326',
    }}
    _disabled={{
      bg: '#AB4326',
      boxShadow: 'none',
      color: '#491D10',
    }}
  >
    {props.text}
  </PseudoBox>
);

export default CTAButton;
