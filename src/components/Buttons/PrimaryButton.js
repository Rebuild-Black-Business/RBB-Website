import React from 'react';
import { Button, useTheme } from '@chakra-ui/core';

function PrimaryButton(props) {
  const theme = useTheme();

  return (
    <Button
      {...props}
      as="a"
      bg={theme.buttons.primary.backgroundColor.default}
      color={theme.buttons.primary.color.default}
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
        bg: theme.buttons.primary.backgroundColor.active,
        borderColor: theme.buttons.primary.borderColor.active,
        color: theme.buttons.primary.color.active,
      }}
      _disabled={{
        color: theme.buttons.primary.color.disabled,
      }}
      _focus={{
        bg: theme.buttons.primary.backgroundColor.focus,
      }}
      _hover={{
        bg: theme.buttons.primary.backgroundColor.hover,
      }}
    >
      {props.children}
    </Button>
  );
}

export default PrimaryButton;
