import React from 'react';
import { Button, useTheme } from '@chakra-ui/core';

function SecondaryButton(props) {
  const theme = useTheme();

  return (
    <Button
      {...props}
      bg={theme.buttons.secondary.backgroundColor}
      color={theme.buttons.secondary.color}
      borderRadius="button"
      border="secondaryButton"
      borderWidth="button"
      fontFamily={theme.buttons.secondary.fontFamily}
      fontSize="button"
      fontWeight="bold"
      letterSpacing="button"
      lineHeight="button"
      padding={theme.buttons.secondary.padding}
      textTransform={theme.buttons.secondary.textTransform}
      _active={{
        bg: theme.buttons.secondary.activeBackgroundColor,
        borderColor: theme.buttons.secondary.activeColor,
        color: theme.buttons.secondary.activeColor,
      }}
      _disabled={{
        color: theme.buttons.secondary.disabledColor,
      }}
      _focus={{
        bg: theme.buttons.secondary.hoverBackgroundColor,
      }}
      _hover={{
        bg: theme.buttons.secondary.hoverBackgroundColor,
      }}
    >
      {props.children}
    </Button>
  );
}

export default SecondaryButton;
