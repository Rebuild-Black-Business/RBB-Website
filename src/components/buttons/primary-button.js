import React from 'react';
import { PseudoBox } from '@chakra-ui/core';

const PrimaryButton = props => (
  <PseudoBox
    as="button"
    bg="#0E1111"
    border="1px solid #ffffff"
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
    _hover={{ bg: '#565858' }}
    _focus={{ bg: '#565858' }}
    _active={{
      bg: '#F7F7F2',
      border: '1px solid #565858',
      color: '#565858',
    }}
    _disabled={{
      bg: '#0E1111',
      boxShadow: 'none',
      color: '#7D7D7D',
    }}
  >
    {props.text}
  </PseudoBox>
);

export default PrimaryButton;
