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
  fontWeights: {
    bold: 'bold',
  },
  border: {
    primaryButton: 'solid #ffffff',
  },
  borderWidths: {
    button: '1px',
  },
  colors: {
    ...theme.colors,
    'rbb-black': '#140303',
    'rbb-gray': '#259f6c',
    'rbb-white': '#1e6b7f',
    'rbb-red': '#fafcd6',
    'rbb-orange': '#f46036',
  },
  letterSpacings: {
    button: '0.05em',
  },
  lineHeights: {
    button: '20px',
  },
  radii: {
    button: '100px',
  },
  buttons: {
    primary: {
      backgroundColor: '#0e1111',
      color: '#f4f5f7',
      fontFamily: 'Arvo',
      padding: '0 44px',
      textTransform: 'uppercase',
      hoverBackgroundColor: '#565858',
      disabledColor: '#7d7d7d',
      activeBackgroundColor: '#f7f7f2',
      activeColor: '#565858',
    },
    secondary: {
      backgroundColor: '#f7f7f2',
      color: '#0e1111',
      fontFamily: 'Arvo',
      padding: '0 44px',
      textTransform: 'uppercase',
      hoverBackgroundColor: '#c0c0c0',
      disabledColor: '#a6a6a6',
      activeBackgroundColor: '#f7f7f2',
      activeColor: '#0e1111',
    },
    cta: {
      backgroundColor: '#f46036',
      color: '#f4f5f7',
      fontFamily: 'Arvo',
      padding: '0 44px',
      textTransform: 'uppercase',
      hoverBackgroundColor: '#ab4326',
      disabledColor: '#491d10',
      activeBackgroundColor: '#f7f7f2',
      activeColor: '#ab4326',
    },
  },
};

export default customTheme;
