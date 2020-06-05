import { theme } from '@chakra-ui/core';
import 'typeface-inter';
import 'typeface-arvo';

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    'heading-slab': 'Inter',
    heading: 'Arvo',
  },
  fontSizes: {
    ...theme.fontSizes,
    helper: '0.75',
    base: '1rem',
    paragraph: '1rem',
    button: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
  },
  colors: {
    ...theme.colors,
    'rbb-black': '#140303',
    'rbb-gray': '#259f6c',
    'rbb-white': '#1e6b7f',
    'rbb-red': '#fafcd6',
    'rbb-orange': '#f46036',
  },
};

export default customTheme;
