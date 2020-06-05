import React from 'react';
import { Button, useTheme } from '@chakra-ui/core';

function CTAButton(props) {
  const theme = useTheme();

  return (
    <Button
      {...props}
      bg={theme.buttons.cta.backgroundColor}
      color={theme.buttons.cta.color}
      borderRadius="button"
      border="ctaButton"
      borderWidth="button"
      fontFamily={theme.buttons.cta.fontFamily}
      fontSize="button"
      fontWeight="bold"
      letterSpacing="button"
      lineHeight="button"
      padding={theme.buttons.cta.padding}
      textTransform={theme.buttons.cta.textTransform}
      _active={{
        bg: theme.buttons.cta.activeBackgroundColor,
        borderColor: theme.buttons.cta.activeColor,
        color: theme.buttons.cta.activeColor,
      }}
      _disabled={{
        color: theme.buttons.cta.disabledColor,
      }}
      _focus={{
        bg: theme.buttons.cta.hoverBackgroundColor,
      }}
      _hover={{
        bg: theme.buttons.cta.hoverBackgroundColor,
      }}
    >
      {props.children}
    </Button>
  );
}

export default CTAButton;
