import React from 'react';
import { Button, useTheme } from '@chakra-ui/core';

function PrimaryButton(props) {
  const theme = useTheme();

  return (
    <Button
      {...props}
      bg={theme.buttons.primary.backgroundColor}
      color={theme.buttons.primary.color}
      borderRadius="button"
      border="primaryButton"
      borderWidth="button"
      fontFamily={theme.buttons.primary.fontFamily}
      fontSize="button"
      fontWeight="bold"
      letterSpacing="button"
      lineHeight="button"
      padding={theme.buttons.primary.padding}
      textTransform={theme.buttons.primary.textTransform}
      _active={{
        bg: theme.buttons.primary.activeBackgroundColor,
        borderColor: theme.buttons.primary.activeColor,
        color: theme.buttons.primary.activeColor,
      }}
      _disabled={{
        color: theme.buttons.primary.disabledColor,
      }}
      _focus={{
        bg: theme.buttons.primary.hoverBackgroundColor,
      }}
      _hover={{
        bg: theme.buttons.primary.hoverBackgroundColor,
      }}
    >
      {props.children}
    </Button>
  );
}

export default PrimaryButton;
