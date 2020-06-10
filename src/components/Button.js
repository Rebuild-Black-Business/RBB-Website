import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button as ChakraButton, useTheme } from '@chakra-ui/core';

function getButtonStyles(theme, variant) {
  return {
    bg: theme.buttons[variant].backgroundColor.default,
    color: theme.buttons[variant].color.default,
    borderRadius: 'button',
    border: '1px',
    borderColor: theme.buttons[variant].borderColor.default,
    fontFamily: theme.buttons[variant].fontFamily,
    fontSize: 'button',
    fontWeight: 'bold',
    height: 'auto',
    letterSpacing: 'button',
    lineHeight: 'button',
    padding: theme.buttons[variant].padding,
    textTransform: theme.buttons[variant].textTransform,
    _hover: {
      bg: theme.buttons[variant].backgroundColor.hover,
      borderColor: theme.buttons[variant].borderColor.hover,
      color: theme.buttons[variant].color.hover,
    },
    _focus: {
      bg: theme.buttons[variant].backgroundColor.focus,
      borderColor: theme.buttons[variant].borderColor.focus,
      color: theme.buttons[variant].color.focus,
    },
    _active: {
      bg: theme.buttons[variant].backgroundColor.active,
      borderColor: theme.buttons[variant].borderColor.active,
      color: theme.buttons[variant].color.active,
    },
    _disabled: {
      bg: theme.buttons[variant].backgroundColor.disabled,
      borderColor: theme.buttons[variant].borderColor.disabled,
      color: theme.buttons[variant].color.disabled,
    },
  };
}

const Button = forwardRef(({ variant = 'primary', ...props }, ref) => {
  const theme = useTheme();
  console.log(variant, props.children);

  if (!['cta', 'primary', 'secondary'].includes(variant))
    throw new Error(`Invalid <Button> variant: "${variant}"`);

  const buttonStyles = getButtonStyles(theme, variant);
  return <ChakraButton {...buttonStyles} ref={ref} {...props} />;
});

Button.displayName = 'Button';
Button.propTypes = {
  variant: PropTypes.oneOf(['cta', 'primary', 'secondary']),
};

export { Button };
export default Button;
