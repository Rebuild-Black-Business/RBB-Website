import React from 'react';
import { PseudoBox } from '@chakra-ui/core';

const SecondaryButton = props => (
  <PseudoBox
    as="button"
    bg="#F4F5F7"
    border="1px solid #C0C0C0"
    borderRadius="100px"
    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    color="#0E1111"
    fontFamily="Arvo"
    fontSize="16px"
    fontStyle="normal"
    fontWeight="bold"
    height="44px"
    letterSpacing="0.05em"
    lineHeight="20px"
    padding="10px 35px"
    textTransform="uppercase"
    _hover={{ bg: '#C0C0C0' }}
    _focus={{ bg: '#C0C0C0' }}
    _active={{
      bg: '#F7F7F2',
      border: '1px solid #0E1111',
      color: '#0E1111',
    }}
    _disabled={{
      bg: '#F7F7F2',
      boxShadow: 'none',
      color: '#A6A6A6',
    }}
  >
    {props.text}
  </PseudoBox>
);

export default SecondaryButton;
